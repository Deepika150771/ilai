import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const GMAIL_USER = process.env.GMAIL_USER || 'info.ilai@gmail.com';
const GMAIL_PASS = process.env.GMAIL_PASS || process.env.GMAIL_APP_PASSWORD || '';

// Transporter configuration
const transporter = GMAIL_PASS ? nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS
  }
}) : null;

if (transporter) {
  console.log(`✉️ Email Service configured with Gmail SMTP: ${GMAIL_USER}`);
} else {
  console.log(`ℹ️ Email Service running in simulated mode. (Set GMAIL_PASS in .env to activate real SMTP sending from ${GMAIL_USER})`);
}

// Beautiful HTML email templates generator
function getEmailHeader() {
  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF7F2; border-radius: 12px; border: 1px solid #E2E8F0;">
      <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #E8F5E9;">
        <h1 style="color: #1E3A2B; margin: 0; font-size: 28px; letter-spacing: -0.5px;">🌿 ilai</h1>
        <p style="color: #488B57; font-size: 14px; margin: 5px 0 0 0; font-weight: 500;">Pure Biodegradable Sanitary Pads | Tamil Nadu</p>
      </div>
  `;
}

function getEmailFooter() {
  return `
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E2E8F0; text-align: center; color: #64748B; font-size: 12px; line-height: 1.5;">
        <p style="margin: 0 0 5px 0;">Thank you for choosing eco-friendly menstrual care!</p>
        <p style="margin: 0; color: #1E3A2B; font-weight: 600;">ilai Femcare Team • info.ilai@gmail.com</p>
        <p style="margin: 5px 0 0 0; color: #94A3B8;">Made from Banana Fibre & Water Hyacinth • 100% Plastic Free</p>
      </div>
    </div>
  `;
}

export async function sendEmail({ to, subject, html, logType }) {
  console.log(`\n================= EMAIL LOG [${logType}] =================`);
  console.log(`To Customer: ${to}`);
  console.log(`From Business: ${GMAIL_USER}`);
  console.log(`Subject: ${subject}`);
  
  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: `"ilai Eco Care" <${GMAIL_USER}>`,
        to: to,
        subject: subject,
        html: html
      });
      console.log(`✅ Real Email dispatched via Gmail SMTP: ${info.messageId}`);
      return { success: true, messageId: info.messageId, simulated: false };
    } catch (err) {
      console.error(`❌ SMTP Sending error:`, err.message);
      return { success: false, error: err.message, simulated: true };
    }
  } else {
    console.log(`ℹ️ [Simulated Email Content Sent to Customer ${to}]:`);
    console.log(`==========================================================\n`);
    return { success: true, simulated: true };
  }
}

// 1. Order Received (GPay Payment Verification Pending)
export async function sendOrderReceivedEmail(order) {
  const subject = `Order ${order.order_number} Received — Payment Verification Pending | ilai`;
  const itemsHtml = order.items.map(i => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; color: #1E293B;">${i.title} (x${i.quantity})</td>
      <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; text-align: right; font-weight: 600; color: #1E3A2B;">₹${i.price * i.quantity}</td>
    </tr>
  `).join('');

  const html = `
    ${getEmailHeader()}
    <div style="padding: 20px 0;">
      <div style="background-color: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 5px 0; color: #92400E; font-size: 16px;">⏳ Payment Verification Pending</h3>
        <p style="margin: 0; color: #B45309; font-size: 14px;">We've received your order info! Our team will manually verify your GPay screenshot/UTR shortly and send your final order confirmation email with delivery details.</p>
      </div>

      <p style="color: #334155; font-size: 15px;">Dear <strong>${order.customer_name}</strong>,</p>
      <p style="color: #334155; font-size: 15px; line-height: 1.6;">Thank you for placing your order with <strong>ilai</strong>! We are excited to serve you with our 100% natural, plastic-free biodegradable sanitary pads made from Banana Fibre & Water Hyacinth.</p>

      <div style="background-color: #FFFFFF; border-radius: 8px; padding: 15px; border: 1px solid #E2E8F0; margin: 20px 0;">
        <h3 style="margin: 0 0 10px 0; color: #1E3A2B; font-size: 16px;">Order Summary (${order.order_number})</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          ${itemsHtml}
          <tr>
            <td style="padding: 10px 10px 5px 10px; color: #64748B;">Shipping (Tamil Nadu flat fee)</td>
            <td style="padding: 10px 10px 5px 10px; text-align: right; color: #334155;">₹${order.shipping_fee}</td>
          </tr>
          ${order.discount > 0 ? `
          <tr>
            <td style="padding: 5px 10px; color: #16A34A;">Discount Applied</td>
            <td style="padding: 5px 10px; text-align: right; color: #16A34A;">-₹${order.discount}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 10px; border-top: 2px solid #E8F5E9; font-weight: bold; color: #1E3A2B; font-size: 16px;">Total Amount</td>
            <td style="padding: 10px; border-top: 2px solid #E8F5E9; text-align: right; font-weight: bold; color: #1E3A2B; font-size: 18px;">₹${order.total_amount}</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #F8FAFC; border-radius: 8px; padding: 15px; border: 1px solid #E2E8F0; margin: 20px 0;">
        <h4 style="margin: 0 0 8px 0; color: #1E3A2B;">Delivery Address (Tamil Nadu)</h4>
        <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.5;">
          <strong>${order.customer_name}</strong><br/>
          ${order.shipping_address}, ${order.city}<br/>
          District: ${order.district}, Tamil Nadu - ${order.pincode}<br/>
          Phone: ${order.customer_phone}
        </p>
      </div>

      <p style="color: #64748B; font-size: 13px;">If you have any questions regarding your payment or delivery, reply directly to this email or contact us at info.ilai@gmail.com.</p>
    </div>
    ${getEmailFooter()}
  `;

  return sendEmail({ to: order.customer_email, subject, html, logType: 'Order Received - Pending GPay Verification' });
}

// 2. Payment Verified & Order Confirmed
export async function sendPaymentVerifiedEmail(order) {
  const subject = `Payment Verified! Order ${order.order_number} Confirmed | ilai`;
  const html = `
    ${getEmailHeader()}
    <div style="padding: 20px 0;">
      <div style="background-color: #DCFCE7; border-left: 4px solid #16A34A; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 5px 0; color: #14532D; font-size: 16px;">✅ Payment Verified & Order Confirmed!</h3>
        <p style="margin: 0; color: #15803D; font-size: 14px;">Your payment for order ${order.order_number} has been verified successfully. Your pack is being packed with love and care!</p>
      </div>

      <p style="color: #334155; font-size: 15px;">Dear <strong>${order.customer_name}</strong>,</p>
      <p style="color: #334155; font-size: 15px; line-height: 1.6;">Great news! We have manually verified your payment proof (₹${order.total_amount}). Your order <strong>${order.order_number}</strong> is officially confirmed and ready for dispatch.</p>

      <div style="background-color: #FFFFFF; border-radius: 8px; padding: 15px; border: 1px solid #E2E8F0; margin: 20px 0;">
        <h4 style="margin: 0 0 8px 0; color: #1E3A2B;">Shipping Details</h4>
        <p style="margin: 0 0 5px 0; color: #334155; font-size: 14px;"><strong>Destination:</strong> ${order.district}, Tamil Nadu</p>
        <p style="margin: 0 0 5px 0; color: #334155; font-size: 14px;"><strong>Estimated Delivery:</strong> 2 - 3 Business Days</p>
        <p style="margin: 0; color: #334155; font-size: 14px;"><strong>Contact Phone:</strong> ${order.customer_phone}</p>
      </div>

      <p style="text-align: center; margin: 25px 0;">
        <a href="http://localhost:3000/#/tracking?query=${order.order_number}" style="background-color: #2E6F40; color: #FFFFFF; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Track Your Order Live</a>
      </p>
    </div>
    ${getEmailFooter()}
  `;

  return sendEmail({ to: order.customer_email, subject, html, logType: 'Payment Verified & Confirmed' });
}

// 3. COD Order Confirmed
export async function sendCODConfirmedEmail(order) {
  const subject = `COD Order Confirmed — ${order.order_number} | ilai`;
  const html = `
    ${getEmailHeader()}
    <div style="padding: 20px 0;">
      <div style="background-color: #E0F2FE; border-left: 4px solid #0284C7; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 5px 0; color: #0C4A6E; font-size: 16px;">📦 Cash on Delivery Order Placed</h3>
        <p style="margin: 0; color: #0369A1; font-size: 14px;">Please keep ₹${order.total_amount} cash ready at the time of delivery.</p>
      </div>

      <p style="color: #334155; font-size: 15px;">Dear <strong>${order.customer_name}</strong>,</p>
      <p style="color: #334155; font-size: 15px; line-height: 1.6;">Thank you for ordering with <strong>ilai</strong>! Your Cash on Delivery order <strong>${order.order_number}</strong> has been confirmed and queued for dispatch in Tamil Nadu.</p>

      <div style="background-color: #FFFFFF; border-radius: 8px; padding: 15px; border: 1px solid #E2E8F0; margin: 20px 0;">
        <h4 style="margin: 0 0 8px 0; color: #1E3A2B;">Amount Payable on Delivery: ₹${order.total_amount}</h4>
        <p style="margin: 0; color: #64748B; font-size: 13px;">Shipping to ${order.shipping_address}, ${order.district}, TN - ${order.pincode}</p>
      </div>
    </div>
    ${getEmailFooter()}
  `;

  return sendEmail({ to: order.customer_email, subject, html, logType: 'COD Order Confirmed' });
}

// 4. Order Shipped Email
export async function sendOrderShippedEmail(order, courierName, trackingNumber) {
  const subject = `Your ilai order ${order.order_number} has been Shipped! 🚀`;
  const html = `
    ${getEmailHeader()}
    <div style="padding: 20px 0;">
      <div style="background-color: #F0FDF4; border-left: 4px solid #22C55E; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 5px 0; color: #14532D; font-size: 16px;">🚚 Order Dispatched!</h3>
        <p style="margin: 0; color: #166534; font-size: 14px;">Your biodegradable pads are on their way to ${order.district}, Tamil Nadu.</p>
      </div>

      <div style="background-color: #FFFFFF; border-radius: 8px; padding: 15px; border: 1px solid #E2E8F0; margin: 20px 0;">
        <h4 style="margin: 0 0 10px 0; color: #1E3A2B;">Courier Tracking Information</h4>
        <p style="margin: 0 0 5px 0; color: #334155; font-size: 14px;"><strong>Courier Partner:</strong> ${courierName || 'ST Courier / Professional Courier'}</p>
        <p style="margin: 0 0 5px 0; color: #334155; font-size: 14px;"><strong>Tracking / Waybill No:</strong> ${trackingNumber || 'TN-ILAI-' + order.id}</p>
      </div>
    </div>
    ${getEmailFooter()}
  `;

  return sendEmail({ to: order.customer_email, subject, html, logType: 'Order Shipped' });
}
