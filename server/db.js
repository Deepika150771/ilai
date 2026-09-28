import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = process.env.VERCEL ? path.join('/tmp', 'orders_db.json') : path.join(__dirname, 'orders_db.json');

// Initialize Supabase client if keys exist
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

if (supabase) {
  console.log('✅ Supabase client initialized connected to:', supabaseUrl);
} else {
  console.log('ℹ️ Supabase credentials missing/optional. Using local persistent database store.');
}

// Initial Data structure
const defaultData = {
  counter: 5, // Sequential counter starting from 1
  reviews: [
    {
      id: 1,
      customer_name: "Divya M.",
      district: "Chennai",
      rating: 5,
      comment: "I used to suffer from severe rashes every month with plastic pads. Switching to ILAI plant-based pads completely solved it! Extremely soft, lightweight, and eco-friendly.",
      created_at: new Date(Date.now() - 3600000 * 48).toISOString()
    },
    {
      id: 2,
      customer_name: "Sangeetha V.",
      district: "Coimbatore",
      rating: 5,
      comment: "Finding an affordable plastic-free pad for ₹45 per pack is amazing. Plus, knowing it comes from upcycled plant fibres makes me feel so proud!",
      created_at: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
      id: 3,
      customer_name: "Meena R.",
      district: "Madurai",
      rating: 5,
      comment: "Order reached Madurai in just 2 days via ST Courier. The Cash on Delivery process was smooth and receipt confirmation was emailed instantly.",
      created_at: new Date(Date.now() - 3600000 * 12).toISOString()
    }
  ],
  orders: [
    {
      id: 4,
      order_number: "#ILAI-004",
      customer_name: "Deepika SM",
      customer_email: "06deepikamyndhu2007@gmail.com",
      customer_phone: "08072757497",
      shipping_address: "Dharapuram",
      city: "Chennai",
      district: "Chennai",
      pincode: "638701",
      state: "Tamil Nadu",
      items: [
        {
          id: "pad-xl-6",
          title: "ilai XL Biodegradable Sanitary Pads (6 Pads Pack)",
          quantity: 1,
          price: 45,
          pack_details: "6 pads per pack | XL size | Banana Fibre & Water Hyacinth"
        }
      ],
      subtotal: 45,
      shipping_fee: 40,
      discount: 0,
      total_amount: 85,
      payment_method: "gpay",
      payment_status: "pending_verification",
      order_status: "pending_verification",
      utr_number: "428901928376",
      payment_proof_url: "",
      courier_name: "",
      tracking_number: "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      order_number: "#ILAI-003",
      customer_name: "Deepika SM",
      customer_email: "06deepikamyndhu2007@gmail.com",
      customer_phone: "08072757497",
      shipping_address: "Dharapuram",
      city: "Chennai",
      district: "Chennai",
      pincode: "638701",
      state: "Tamil Nadu",
      items: [
        {
          id: "pad-xl-6",
          title: "ilai XL Biodegradable Sanitary Pads (6 Pads Pack)",
          quantity: 1,
          price: 45,
          pack_details: "6 pads per pack | XL size | Banana Fibre & Water Hyacinth"
        }
      ],
      subtotal: 45,
      shipping_fee: 40,
      discount: 0,
      total_amount: 85,
      payment_method: "gpay",
      payment_status: "pending_verification",
      order_status: "pending_verification",
      utr_number: "428901928375",
      payment_proof_url: "",
      courier_name: "",
      tracking_number: "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      order_number: "#ILAI-002",
      customer_name: "Kavitha Rajan",
      customer_email: "kavitha.r@yahoo.com",
      customer_phone: "9443218765",
      shipping_address: "15 Gandhi Road, Near Bus Stand",
      city: "Coimbatore",
      district: "Coimbatore",
      pincode: "641001",
      state: "Tamil Nadu",
      items: [
        {
          id: "pad-xl-6",
          title: "ilai XL Biodegradable Sanitary Pads (6 Pads Pack)",
          quantity: 3,
          price: 45,
          pack_details: "6 pads per pack | XL size | Banana Fibre & Water Hyacinth"
        }
      ],
      subtotal: 135,
      shipping_fee: 40,
      discount: 10,
      total_amount: 165,
      payment_method: "cod",
      payment_status: "cod_confirmed",
      order_status: "confirmed",
      utr_number: "",
      payment_proof_url: "",
      courier_name: "",
      tracking_number: "",
      created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
      updated_at: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    {
      id: 1,
      order_number: "#ILAI-001",
      customer_name: "Priya Sundaram",
      customer_email: "priya.sundaram@gmail.com",
      customer_phone: "9876543210",
      shipping_address: "Door 42, Anna Nagar 2nd Street",
      city: "Chennai",
      district: "Chennai",
      pincode: "600040",
      state: "Tamil Nadu",
      items: [
        {
          id: "pad-xl-6",
          title: "ilai XL Biodegradable Sanitary Pads (6 Pads Pack)",
          quantity: 2,
          price: 45,
          pack_details: "6 pads per pack | XL size | Banana Fibre & Water Hyacinth"
        }
      ],
      subtotal: 90,
      shipping_fee: 40,
      discount: 0,
      total_amount: 130,
      payment_method: "gpay",
      payment_status: "verified",
      order_status: "processing",
      utr_number: "428901928374",
      payment_proof_url: "/images/sample_receipt.png",
      courier_name: "",
      tracking_number: "",
      created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
      updated_at: new Date(Date.now() - 3600000 * 24).toISOString()
    }
  ]
};

// Ensure database file exists
function loadLocalData() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      try {
        fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
      } catch (e) {
        console.warn('Could not write initial DB file:', e.message);
      }
      return defaultData;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local db file:', err);
    return defaultData;
  }
}

function saveLocalData(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing local db file:', err);
  }
}

// Database helper operations
export const db = {
  // Get next sequential order ID starting from 1
  async getNextOrderId() {
    if (supabase) {
      try {
        const { data, error } = await supabase.rpc('get_next_order_id');
        if (!error && data) return data;
      } catch (e) {
        console.log('Supabase sequence fallback to local counter');
      }
    }
    const data = loadLocalData();
    const nextId = data.counter || 1;
    data.counter = nextId + 1;
    saveLocalData(data);
    return nextId;
  },

  async getAllOrders() {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('orders').select('*').order('id', { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch (e) {
        console.log('Supabase fetch fallback to local');
      }
    }
    const data = loadLocalData();
    return data.orders.sort((a, b) => b.id - a.id);
  },

  async getOrderByIdOrPhone(query) {
    const orders = await this.getAllOrders();
    const rawQuery = String(query).trim().toLowerCase();
    const cleanQuery = rawQuery.replace(/[^a-z0-9]/g, '');
    const numOnlyQuery = rawQuery.replace(/\D/g, '');

    return orders.filter(o => {
      const orderNum = String(o.order_number || '').toLowerCase();
      const cleanOrderNum = orderNum.replace(/[^a-z0-9]/g, '');
      const orderId = String(o.id || '');
      const orderPhone = String(o.customer_phone || '').replace(/\D/g, '');

      // 1. Direct raw search match
      if (orderNum.includes(rawQuery)) return true;

      // 2. Cleaned alphanumeric match (e.g. #ILAI003 vs #ILAI-003)
      if (cleanQuery && cleanOrderNum.includes(cleanQuery)) return true;

      // 3. ID match (e.g. "3" or "003")
      if (orderId === rawQuery || (numOnlyQuery && parseInt(numOnlyQuery, 10) === o.id)) return true;

      // 4. Phone number match
      if (numOnlyQuery && orderPhone.includes(numOnlyQuery)) return true;

      return false;
    });
  },

  async getOrderById(id) {
    const orders = await this.getAllOrders();
    return orders.find(o => String(o.id) === String(id));
  },

  async createOrder(orderData) {
    const nextId = await this.getNextOrderId();
    const orderNumber = `#ILAI-${String(nextId).padStart(3, '0')}`;
    
    const newOrder = {
      id: nextId,
      order_number: orderNumber,
      ...orderData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (supabase) {
      try {
        await supabase.from('orders').insert([newOrder]);
      } catch (e) {
        console.error('Supabase insert error, saved locally:', e.message);
      }
    }

    const localData = loadLocalData();
    localData.orders.unshift(newOrder);
    saveLocalData(localData);

    return newOrder;
  },

  async updateOrderStatus(id, updates) {
    if (supabase) {
      try {
        await supabase.from('orders').update({
          ...updates,
          updated_at: new Date().toISOString()
        }).eq('id', id);
      } catch (e) {
        console.error('Supabase update error:', e.message);
      }
    }

    const localData = loadLocalData();
    const index = localData.orders.findIndex(o => String(o.id) === String(id));
    if (index !== -1) {
      localData.orders[index] = {
        ...localData.orders[index],
        ...updates,
        updated_at: new Date().toISOString()
      };
      saveLocalData(localData);
      return localData.orders[index];
    }
    return null;
  },

  async getAllReviews() {
    const localData = loadLocalData();
    if (!localData.reviews) {
      localData.reviews = defaultData.reviews;
      saveLocalData(localData);
    }
    return localData.reviews;
  },

  async createReview(reviewData) {
    const localData = loadLocalData();
    if (!localData.reviews) localData.reviews = [];
    
    const newReview = {
      id: Date.now(),
      customer_name: reviewData.customer_name || 'Verified Customer',
      district: reviewData.district || 'Tamil Nadu',
      rating: parseInt(reviewData.rating || 5, 10),
      comment: reviewData.comment || '',
      created_at: new Date().toISOString()
    };

    localData.reviews.unshift(newReview);
    saveLocalData(localData);

    return newReview;
  }
};
