import React, { useState, useEffect } from 'react';
import { Search, Package, Clock, CheckCircle2, Truck, MapPin, AlertCircle, ShieldCheck } from 'lucide-react';

export const OrderTracking = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  // Check URL query parameters for auto-search (e.g., ?query=#ILAI-001)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qParam = params.get('query');
    if (qParam) {
      setQuery(qParam);
      fetchOrderTracking(qParam);
    }
  }, []);

  const fetchOrderTracking = async (searchQuery) => {
    const term = searchQuery || query;
    if (!term.trim()) return;

    setLoading(true);
    setError(null);
    setOrders(null);

    try {
      const res = await fetch(`/api/orders/track?query=${encodeURIComponent(term.trim())}`);
      const contentType = res.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        throw new Error('API server returned invalid response.');
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to search order');
      }

      if (data && data.length > 0) {
        setOrders(data);
      } else {
        setError('No order found matching this Order ID or Phone Number. Please check your order confirmation details.');
      }
    } catch (err) {
      setError(err.message || 'Error fetching tracking details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchOrderTracking(query);
  };

  // Status Stepper Helper
  const getStatusStep = (status) => {
    switch (status) {
      case 'pending_verification': return 1;
      case 'confirmed':
      case 'cod_confirmed': return 2;
      case 'processing': return 3;
      case 'shipped': return 4;
      case 'delivered': return 5;
      default: return 1;
    }
  };

  return (
    <div className="py-12 bg-[#FAF7F2] min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#488B57] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Real-Time Order Updates
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1E3A2B]">
            Track Your ilai Order
          </h1>
          <p className="text-gray-600 text-sm">
            Enter your <strong>Order ID</strong> (e.g., #ILAI-001) or <strong>10-digit Phone Number</strong> to check live shipping status.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-200 shadow-soft">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Order ID (#ILAI-001) or Phone Number..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2E6F40] focus:ring-2 focus:ring-emerald-100 font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#2E6F40] hover:bg-[#255A33] text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm shrink-0"
            >
              {loading ? <span>Searching...</span> : (
                <>
                  <Search size={18} />
                  <span>Track Order</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Preset Helper Button */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span>Try sample order:</span>
            <button 
              type="button" 
              onClick={() => { setQuery('#ILAI-003'); fetchOrderTracking('#ILAI-003'); }}
              className="text-[#2E6F40] font-bold hover:underline bg-emerald-50 px-2 py-0.5 rounded"
            >
              #ILAI-003
            </button>
            <button 
              type="button" 
              onClick={() => { setQuery('#ILAI003'); fetchOrderTracking('#ILAI003'); }}
              className="text-[#2E6F40] font-bold hover:underline bg-emerald-50 px-2 py-0.5 rounded"
            >
              #ILAI003
            </button>
            <button 
              type="button" 
              onClick={() => { setQuery('08072757497'); fetchOrderTracking('08072757497'); }}
              className="text-[#2E6F40] font-bold hover:underline bg-emerald-50 px-2 py-0.5 rounded"
            >
              08072757497
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-sm rounded-2xl flex items-center gap-3">
            <AlertCircle size={20} className="shrink-0 text-rose-600" />
            <p>{error}</p>
          </div>
        )}

        {/* Tracking Results */}
        {orders && orders.map(order => {
          const step = getStatusStep(order.order_status);

          return (
            <div key={order.id} className="bg-white rounded-3xl border border-emerald-200 shadow-xl overflow-hidden space-y-6 p-6 sm:p-8">
              
              {/* Order Header Summary */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-2xl font-bold text-[#1E3A2B]">{order.order_number}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      order.payment_status === 'verified' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : order.payment_status === 'cod_confirmed'
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.payment_method === 'cod' ? 'Cash On Delivery' : 'GPay Manual Verification'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Placed on: {new Date(order.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-gray-500 uppercase font-semibold block">Total Payable</span>
                  <span className="text-2xl font-extrabold text-[#1E3A2B]">₹{order.total_amount}</span>
                </div>
              </div>

              {/* Status Stepper Progress Bar */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#488B57] block">Live Status Progress</span>
                
                <div className="grid grid-cols-5 gap-1 sm:gap-2 text-center text-[10px] sm:text-xs font-semibold">
                  
                  {/* Step 1: Received */}
                  <div className={`p-2.5 rounded-xl border ${step >= 1 ? 'bg-emerald-50 border-emerald-300 text-[#2E6F40]' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                    <Clock size={16} className="mx-auto mb-1" />
                    <span>1. Received</span>
                  </div>

                  {/* Step 2: Confirmed */}
                  <div className={`p-2.5 rounded-xl border ${step >= 2 ? 'bg-emerald-50 border-emerald-300 text-[#2E6F40]' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                    <ShieldCheck size={16} className="mx-auto mb-1" />
                    <span>2. Confirmed</span>
                  </div>

                  {/* Step 3: Packing */}
                  <div className={`p-2.5 rounded-xl border ${step >= 3 ? 'bg-emerald-50 border-emerald-300 text-[#2E6F40]' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                    <Package size={16} className="mx-auto mb-1" />
                    <span>3. Packing</span>
                  </div>

                  {/* Step 4: Shipped */}
                  <div className={`p-2.5 rounded-xl border ${step >= 4 ? 'bg-emerald-50 border-emerald-300 text-[#2E6F40]' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                    <Truck size={16} className="mx-auto mb-1" />
                    <span>4. Shipped</span>
                  </div>

                  {/* Step 5: Delivered */}
                  <div className={`p-2.5 rounded-xl border ${step >= 5 ? 'bg-emerald-50 border-emerald-300 text-[#2E6F40]' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                    <CheckCircle2 size={16} className="mx-auto mb-1" />
                    <span>5. Delivered</span>
                  </div>

                </div>
              </div>

              {/* Status Details Alert Box */}
              {order.order_status === 'pending_verification' && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-950">
                    <Clock size={16} className="text-amber-600" />
                    <span>GPay Screenshot Verification In Progress</span>
                  </div>
                  <p className="text-amber-800">
                    Our team is currently matching your GPay UTR number / receipt against our account. Once verified by admin, you will receive an automatic confirmation email with courier dispatch status!
                  </p>
                </div>
              )}

              {order.order_status === 'shipped' && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-[#2E6F40]">
                    <Truck size={16} />
                    <span>Courier Dispatched!</span>
                  </div>
                  <p>Courier Partner: <strong>{order.courier_name || 'ST Courier'}</strong></p>
                  <p>Waybill / Tracking No: <strong className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-300 text-[#1E3A2B]">{order.tracking_number || 'TN-ILAI-001'}</strong></p>
                </div>
              )}

              {/* Order Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 text-xs">
                
                {/* Shipping Address */}
                <div className="space-y-2 bg-[#FAF7F2] p-4 rounded-2xl border border-emerald-100">
                  <h4 className="font-bold text-[#1E3A2B] uppercase tracking-wider flex items-center gap-1">
                    <MapPin size={14} className="text-[#2E6F40]" /> Delivery Address (Tamil Nadu)
                  </h4>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    <strong>{order.customer_name}</strong><br/>
                    {order.shipping_address}, {order.city}<br/>
                    District: {order.district}, TN - {order.pincode}<br/>
                    Phone: {order.customer_phone}
                  </p>
                </div>

                {/* Items Ordered */}
                <div className="space-y-2 bg-[#FAF7F2] p-4 rounded-2xl border border-emerald-100">
                  <h4 className="font-bold text-[#1E3A2B] uppercase tracking-wider flex items-center gap-1">
                    <Package size={14} className="text-[#2E6F40]" /> Items In Order
                  </h4>
                  <ul className="space-y-1 text-gray-700 font-medium">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="flex justify-between py-1 border-b border-gray-200/50 last:border-0">
                        <span>{item.title} (x{item.quantity})</span>
                        <span className="font-bold text-[#1E3A2B]">₹{item.price * item.quantity}</span>
                      </li>
                    ))}
                    <li className="flex justify-between pt-1 text-gray-500">
                      <span>Shipping Fee (TN Flat)</span>
                      <span>₹{order.shipping_fee}</span>
                    </li>
                  </ul>
                </div>

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
};
