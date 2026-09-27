import React, { useState } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, MapPin, Truck, CheckCircle2, AlertCircle, Upload, QrCode } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart = ({ setActivePage }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, shippingFee, showToast } = useCart();
  
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    city: 'Chennai',
    district: 'Chennai',
    pincode: '600040',
    payment_method: 'gpay', // gpay or cod
    utr_number: '',
    notes: ''
  });

  const [paymentFile, setPaymentFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const totalAmount = subtotal + (cart.length > 0 ? shippingFee : 0);

  const tnDistricts = [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
    "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur",
    "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris",
    "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga",
    "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
    "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore",
    "Viluppuram", "Virudhunagar"
  ];

  const handlePincodeChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, pincode: val }));
    // TN Pincodes start with 60, 61, 62, 63, 64
    if (val.length === 6 && !val.startsWith('6')) {
      setErrorMsg('Notice: Delivery is strictly restricted within Tamil Nadu state (Pincodes starting with 6XXXXX).');
    } else {
      setErrorMsg(null);
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Your cart is empty!', 'error');
      return;
    }

    if (formData.pincode.length === 6 && !formData.pincode.startsWith('6')) {
      setErrorMsg('Shipping is restricted to Tamil Nadu state only. Please enter a valid TN pincode.');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const payload = new FormData();
      payload.append('customer_name', formData.customer_name);
      payload.append('customer_email', formData.customer_email);
      payload.append('customer_phone', formData.customer_phone);
      payload.append('shipping_address', formData.shipping_address);
      payload.append('city', formData.city);
      payload.append('district', formData.district);
      payload.append('pincode', formData.pincode);
      payload.append('state', 'Tamil Nadu');
      payload.append('items', JSON.stringify(cart));
      payload.append('subtotal', subtotal);
      payload.append('shipping_fee', shippingFee);
      payload.append('total_amount', totalAmount);
      payload.append('payment_method', formData.payment_method);
      payload.append('utr_number', formData.utr_number);
      payload.append('notes', formData.notes);

      if (paymentFile) {
        payload.append('payment_proof', paymentFile);
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        body: payload
      });

      const contentType = res.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(`API Endpoint Error (${res.status}): Server returned invalid response.`);
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      setOrderCompleted(data.order);
      clearCart();
      showToast(`Order ${data.order.order_number} placed successfully! Confirmation email sent. 🌿`);
    } catch (err) {
      setErrorMsg(err.message || 'Error processing order. Please check inputs.');
    } finally {
      setSubmitting(false);
    }
  };

  // SUCCESS STATE MODAL
  if (orderCompleted) {
    return (
      <div className="py-16 bg-[#FAF7F2] min-h-[75vh] flex items-center justify-center">
        <div className="max-w-xl mx-4 bg-white p-8 sm:p-10 rounded-3xl border border-emerald-200 shadow-2xl text-center space-y-6 animate-scale">
          
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#2E6F40] flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={48} />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#488B57] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Order Confirmed & Logged
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-[#1E3A2B]">
              Thank You, {orderCompleted.customer_name}!
            </h2>
            <p className="text-xs text-gray-600">
              Your order number is <strong className="text-[#2E6F40] text-base">{orderCompleted.order_number}</strong>
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-emerald-100 text-xs text-left space-y-2">
            <div className="flex justify-between font-bold text-[#1E3A2B]">
              <span>Payment Status:</span>
              <span className="text-emerald-800 uppercase">
                {orderCompleted.payment_method === 'gpay' ? 'GPay Verification Pending' : 'COD Confirmed'}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Destination:</span>
              <span>{orderCompleted.district}, Tamil Nadu ({orderCompleted.pincode})</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Total Paid/Payable:</span>
              <span className="font-bold text-[#1E3A2B]">₹{orderCompleted.total_amount}</span>
            </div>
            <div className="pt-2 border-t border-emerald-200 text-[11px] text-gray-500">
              ✉️ A complete order summary and receipt has been sent to <strong>{orderCompleted.customer_email}</strong>.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setActivePage('tracking')}
              className="w-full bg-[#2E6F40] hover:bg-[#255A33] text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-xs"
            >
              Track Order Status Live
            </button>

            <button
              onClick={() => { setOrderCompleted(null); setActivePage('home'); }}
              className="w-full border border-emerald-300 text-[#1E3A2B] font-bold py-3.5 rounded-xl text-xs hover:bg-emerald-50 transition-all"
            >
              Return to Home
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#488B57] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Secure Checkout
          </span>
          <h1 className="font-heading text-3xl font-extrabold text-[#1E3A2B]">
            Your Shopping Cart & Delivery
          </h1>
          <p className="text-xs text-gray-600">
            Exclusive shipping within Tamil Nadu • Flat ₹40 delivery fee
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl border border-emerald-200 p-12 text-center max-w-md mx-auto space-y-4 shadow-soft">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#2E6F40] flex items-center justify-center mx-auto">
              <ShoppingBag size={32} />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#1E3A2B]">Your Cart is Currently Empty</h3>
            <p className="text-xs text-gray-500">Add ilai XL Biodegradable Sanitary Pads (6 Pack for ₹45) to get started!</p>
            <button
              onClick={() => setActivePage('shop')}
              className="bg-[#2E6F40] text-white font-bold px-6 py-3 rounded-xl text-xs hover:bg-[#255A33] transition-all shadow"
            >
              Browse Shop
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Cart Items & Order Summary */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white p-6 rounded-3xl border border-emerald-200 shadow-soft space-y-4">
                <h3 className="font-heading font-bold text-lg text-[#1E3A2B] border-b border-gray-100 pb-3 flex items-center justify-between">
                  <span>Selected Products</span>
                  <span className="text-xs font-semibold text-[#2E6F40] bg-emerald-50 px-2.5 py-0.5 rounded-full">{cart.length} item(s)</span>
                </h3>

                {/* Items List */}
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between gap-4 p-3 bg-[#FAF7F2] rounded-2xl border border-emerald-100">
                      <div className="space-y-1 flex-1">
                        <h4 className="font-bold text-xs text-[#1E3A2B] leading-snug">{item.title}</h4>
                        <span className="text-[11px] text-gray-500 block">₹{item.price} / pack</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-emerald-200 rounded-lg bg-white overflow-hidden text-xs">
                          <button 
                            type="button" 
                            onClick={() => updateQuantity(item.id, -1)} 
                            className="p-1.5 text-gray-600 hover:bg-emerald-50"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-2 font-bold text-[#1E3A2B]">{item.quantity}</span>
                          <button 
                            type="button" 
                            onClick={() => updateQuantity(item.id, 1)} 
                            className="p-1.5 text-gray-600 hover:bg-emerald-50"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button 
                          type="button" 
                          onClick={() => removeFromCart(item.id)}
                          className="text-rose-500 hover:text-rose-700 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Summary */}
                <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-[#1E3A2B]">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-1"><Truck size={14} className="text-[#2E6F40]" /> TN Shipping Fee</span>
                    <span className="font-bold text-[#1E3A2B]">₹{shippingFee}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-[#1E3A2B] pt-2 border-t border-emerald-100">
                    <span>Total Amount</span>
                    <span className="text-xl text-[#2E6F40]">₹{totalAmount}</span>
                  </div>
                </div>

              </div>

              {/* Guarantees */}
              <div className="bg-emerald-900 text-white p-6 rounded-3xl space-y-3 shadow-md">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                  <ShieldCheck size={18} />
                  <span>100% Quality & Hygienic Pack Guarantee</span>
                </div>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  Every pack is sterilized and sealed in biodegradable cornstarch protective foil. Delivered across Tamil Nadu in 2-3 business days.
                </p>
              </div>

            </div>

            {/* Right Column: Shipping & Payment Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-emerald-200 shadow-xl">
              
              <form onSubmit={handleOrderSubmit} className="space-y-6">
                
                <div>
                  <h3 className="font-heading font-bold text-xl text-[#1E3A2B]">Delivery Details (Tamil Nadu)</h3>
                  <p className="text-xs text-gray-500">Please provide your complete address for ST Courier dispatch.</p>
                </div>

                {errorMsg && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle size={18} className="shrink-0 text-rose-600" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      placeholder="e.g. Priya Sundaram"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#2E6F40]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Email (For Order Updates) *</label>
                    <input
                      type="email"
                      required
                      value={formData.customer_email}
                      onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                      placeholder="priya@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#2E6F40]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Mobile Phone (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      value={formData.customer_phone}
                      onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                      placeholder="9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#2E6F40]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">State (Locked)</label>
                    <input
                      type="text"
                      disabled
                      value="Tamil Nadu (Restricted Delivery)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 text-xs font-bold text-[#2E6F40]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Door / Flat No & Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.shipping_address}
                    onChange={(e) => setFormData({ ...formData, shipping_address: e.target.value })}
                    placeholder="e.g. Door 42, 2nd Cross Street, Anna Nagar"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#2E6F40]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">City / Town *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Chennai"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#2E6F40]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">TN District *</label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#2E6F40]"
                    >
                      {tnDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Pincode (6XXXXX) *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={formData.pincode}
                      onChange={handlePincodeChange}
                      placeholder="600040"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#2E6F40]"
                    />
                  </div>
                </div>

                {/* PAYMENT METHOD SELECTION */}
                <div className="pt-4 border-t border-gray-100 space-y-4">
                  <h4 className="font-bold text-sm text-[#1E3A2B]">Select Payment Option</h4>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, payment_method: 'gpay' })}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        formData.payment_method === 'gpay'
                          ? 'border-[#2E6F40] bg-emerald-50/70 text-[#1E3A2B] font-bold shadow-sm ring-2 ring-emerald-200'
                          : 'border-gray-200 bg-white text-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <QrCode size={18} className="text-[#2E6F40]" />
                        <span className="text-xs font-bold">GPay / UPI Payment</span>
                      </div>
                      <span className="text-[10px] text-gray-500 block">Upload receipt screenshot or UTR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, payment_method: 'cod' })}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        formData.payment_method === 'cod'
                          ? 'border-[#2E6F40] bg-emerald-50/70 text-[#1E3A2B] font-bold shadow-sm ring-2 ring-emerald-200'
                          : 'border-gray-200 bg-white text-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Truck size={18} className="text-[#2E6F40]" />
                        <span className="text-xs font-bold">Cash On Delivery</span>
                      </div>
                      <span className="text-[10px] text-gray-500 block">Pay ₹{totalAmount} cash at delivery</span>
                    </button>
                  </div>

                  {/* GPay QR & UTR Details Box */}
                  {formData.payment_method === 'gpay' && (
                    <div className="p-5 bg-gradient-to-br from-emerald-50 to-amber-50 rounded-2xl border border-emerald-200 space-y-4">
                      
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* Simulated GPay QR visual */}
                        <div className="w-28 h-28 bg-white p-2 rounded-xl border border-emerald-300 shadow-sm shrink-0 flex flex-col items-center justify-center text-center">
                          <QrCode size={64} className="text-emerald-950" />
                          <span className="text-[9px] font-bold text-emerald-800">Scan to Pay ₹{totalAmount}</span>
                        </div>

                        <div className="space-y-1 text-xs text-gray-700">
                          <p className="font-bold text-[#1E3A2B]">GPay / PhonePe / Paytm UPI ID:</p>
                          <div className="font-mono bg-white px-3 py-1.5 rounded-lg border border-emerald-300 font-bold text-[#2E6F40] inline-block">
                            ilai.eco@okicici
                          </div>
                          <p className="text-[11px] text-gray-500">
                            Or transfer to <strong>+91 98765 43210</strong> (GPay / PhonePe Business)
                          </p>
                        </div>
                      </div>

                      {/* UTR & Screenshot upload inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-emerald-200/60 text-xs">
                        <div>
                          <label className="font-bold text-gray-700 block mb-1">12-Digit GPay UTR Number</label>
                          <input
                            type="text"
                            value={formData.utr_number}
                            onChange={(e) => setFormData({ ...formData, utr_number: e.target.value })}
                            placeholder="e.g. 428901928374"
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-gray-700 block mb-1">Upload Receipt Screenshot</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPaymentFile(e.target.files[0])}
                            className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-emerald-700 file:text-white file:font-semibold"
                          />
                        </div>
                      </div>

                    </div>
                  )}

                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#2E6F40] hover:bg-[#255A33] text-white font-extrabold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-base"
                >
                  {submitting ? <span>Processing Order...</span> : (
                    <>
                      <CheckCircle2 size={20} />
                      <span>Confirm Order (Total ₹{totalAmount})</span>
                    </>
                  )}
                </button>

              </form>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
