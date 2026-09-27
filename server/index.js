import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { db } from './db.js';
import { 
  sendOrderReceivedEmail, 
  sendPaymentVerifiedEmail, 
  sendCODConfirmedEmail, 
  sendOrderShippedEmail,
  sendEmail
} from './emailService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static uploaded screenshots & images
const uploadsDir = process.env.VERCEL ? path.join('/tmp', 'uploads') : path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
  } catch (e) {
    console.warn('Could not create uploads directory:', e.message);
  }
}
app.use('/uploads', express.static(uploadsDir));

// Multer storage for payment screenshot uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.png';
    cb(null, `gpay_proof_${Date.now()}${ext}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// API Routes

// 1. Submit New Order
app.post('/api/orders', upload.single('payment_proof'), async (req, res) => {
  try {
    const body = req.body;
    let items = [];
    try {
      items = typeof body.items === 'string' ? JSON.parse(body.items) : body.items;
    } catch (e) {
      items = [{ title: "ilai XL Biodegradable Sanitary Pads (6 Pads Pack)", quantity: 1, price: 45 }];
    }

    // Tamil Nadu shipping restriction validation
    if (body.state && body.state !== 'Tamil Nadu') {
      return res.status(400).json({ 
        error: 'Shipping is currently restricted strictly to Tamil Nadu only.' 
      });
    }

    let proofUrl = body.payment_proof_url || '';
    if (req.file) {
      proofUrl = `/uploads/${req.file.filename}`;
    }

    const orderPayload = {
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone,
      shipping_address: body.shipping_address,
      city: body.city,
      district: body.district || 'Chennai',
      pincode: body.pincode,
      state: 'Tamil Nadu',
      items: items,
      subtotal: parseFloat(body.subtotal || 45),
      shipping_fee: parseFloat(body.shipping_fee || 40),
      discount: parseFloat(body.discount || 0),
      total_amount: parseFloat(body.total_amount || 85),
      payment_method: body.payment_method || 'gpay', // gpay or cod
      payment_status: body.payment_method === 'cod' ? 'cod_confirmed' : 'pending_verification',
      order_status: body.payment_method === 'cod' ? 'confirmed' : 'pending_verification',
      utr_number: body.utr_number || '',
      payment_proof_url: proofUrl,
      notes: body.notes || ''
    };

    // Save in DB (sequential ID starting from 1)
    const newOrder = await db.createOrder(orderPayload);

    // Trigger automatic customer email
    if (newOrder.payment_method === 'gpay') {
      await sendOrderReceivedEmail(newOrder);
    } else {
      await sendCODConfirmedEmail(newOrder);
    }

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: newOrder
    });

  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to process order', details: err.message });
  }
});

// 2. Fetch All Orders (For Admin Panel)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await db.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// 3. Track Order by ID or Phone Number
app.get('/api/orders/track', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter required' });
    }
    const results = await db.getOrderByIdOrPhone(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Error tracking order' });
  }
});

// 4. Admin Verifies GPay Payment
app.post('/api/orders/:id/verify-payment', async (req, res) => {
  try {
    const id = req.params.id;
    const existing = await db.getOrderById(id);
    if (!existing) return res.status(404).json({ error: 'Order not found' });

    const updated = await db.updateOrderStatus(id, {
      payment_status: 'verified',
      order_status: 'confirmed'
    });

    // Dispatch Order Confirmed Email to customer
    await sendPaymentVerifiedEmail(updated);

    res.json({
      success: true,
      message: 'Payment verified and confirmation email sent to customer.',
      order: updated
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

// 5. Admin Marks Order Shipped with Tracking Number
app.post('/api/orders/:id/ship', async (req, res) => {
  try {
    const id = req.params.id;
    const { courier_name, tracking_number } = req.body;

    const updated = await db.updateOrderStatus(id, {
      order_status: 'shipped',
      courier_name: courier_name || 'ST Courier',
      tracking_number: tracking_number || `TN-ILAI-${id}`
    });

    await sendOrderShippedEmail(updated, updated.courier_name, updated.tracking_number);

    res.json({
      success: true,
      message: 'Order status updated to Shipped and tracking email sent.',
      order: updated
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update shipping status' });
  }
});

// 6. General Order Status Update (Delivered, Cancelled, Processing)
app.post('/api/orders/:id/status', async (req, res) => {
  try {
    const id = req.params.id;
    const { order_status, payment_status } = req.body;

    const updates = {};
    if (order_status) updates.order_status = order_status;
    if (payment_status) updates.payment_status = payment_status;

    const updated = await db.updateOrderStatus(id, updates);
    res.json({ success: true, order: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// 7. Customer Updates Payment Proof Screenshot or UTR Number
app.post('/api/orders/:id/update-proof', upload.single('payment_proof'), async (req, res) => {
  try {
    const id = req.params.id;
    const existing = await db.getOrderById(id);
    if (!existing) return res.status(404).json({ error: 'Order not found' });

    let proofUrl = existing.payment_proof_url || '';
    if (req.file) {
      proofUrl = `/uploads/${req.file.filename}`;
    }

    const updates = {};
    if (proofUrl) updates.payment_proof_url = proofUrl;
    if (req.body.utr_number) updates.utr_number = req.body.utr_number;

    const updated = await db.updateOrderStatus(id, updates);

    res.json({
      success: true,
      message: 'Payment proof & UTR updated successfully!',
      order: updated
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update payment proof' });
  }
});

// 7. Test Email Dispatch Utility
app.post('/api/test-email', async (req, res) => {
  try {
    const { to_email } = req.body;
    const result = await sendEmail({
      to: to_email || 'info.ilai@gmail.com',
      subject: 'ilai Email Service Diagnostic Test',
      html: '<h2>🌿 ilai Email System Operational</h2><p>This is a test verification email from info.ilai@gmail.com.</p>',
      logType: 'Diagnostic Test'
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 ilai Express Server running on http://localhost:${PORT}`);
  });
}

export default app;
