import React, { useState, useEffect } from 'react';
import { Search, Package, Clock, CheckCircle2, Truck, MapPin, AlertCircle, ShieldCheck } from 'lucide-react';

export const OrderTracking = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);
  const [selectedStageMap, setSelectedStageMap] = useState({});

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

    let serverResults = [];
    try {
      const res = await fetch(`/api/orders/track?query=${encodeURIComponent(term.trim())}`);
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          serverResults = data;
        }
      }
    } catch (err) {
      console.warn('API fetch warning:', err.message);
    }

    // Fallback search in user's browser localStorage placed orders
    let localMatching = [];
    try {
      const localOrders = JSON.parse(localStorage.getItem('ilai_user_orders') || '[]');
      const qStr = term.trim().toLowerCase();
      const cleanQ = qStr.replace(/[^a-z0-9]/g, '');
      const numQ = qStr.replace(/\D/g, '');

      localMatching = localOrders.filter(o => {
        const orderNum = String(o.order_number || '').toLowerCase();
        const cleanNum = orderNum.replace(/[^a-z0-9]/g, '');
        const orderId = String(o.id || '');
        const phone = String(o.customer_phone || '').replace(/\D/g, '');

        return orderNum.includes(qStr) || 
               (cleanQ && cleanNum.includes(cleanQ)) || 
               orderId === qStr || 
               (numQ && parseInt(numQ, 10) === o.id) ||
               (numQ && phone.includes(numQ));
      });
    } catch (e) {}

    // Deduplicate combined results
    const combinedMap = new Map();
    [...serverResults, ...localMatching].forEach(o => {
      combinedMap.set(String(o.id || o.order_number), o);
    });

    const finalOrders = Array.from(combinedMap.values());

    if (finalOrders.length > 0) {
      setOrders(finalOrders);
    } else {
      setError('No order found matching this Order ID or Phone Number. Please check your order confirmation details.');
    }
    setLoading(false);
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

  const getStageInfo = (stepNumber, order) => {
    switch (stepNumber) {
      case 1:
        return {
          title: "1. Order Received",
          badge: "Received",
          icon: Clock,
          color: "bg-blue-50 border-blue-200 text-blue-900",
          desc: "Order successfully placed and recorded in our Tamil Nadu dispatch log.",
          details: `Order #${order.order_number} registered on ${new Date(order.created_at || Date.now()).toLocaleDateString('en-IN')}. Delivery address: ${order.district}, TN.`
        };
      case 2:
        return {
          title: "2. Order Confirmed",
          badge: "Confirmed",
          icon: ShieldCheck,
          color: "bg-emerald-50 border-emerald-300 text-emerald-900",
          desc: "Payment / COD verified. Order approved for eco-packaging queue.",
          details: order.payment_method === 'cod' ? "Cash on Delivery (COD) approved. Doorstep collection enabled for ST Courier." : "GPay payment verified by merchant."
        };
      case 3:
        return {
          title: "3. Packaging in Progress",
          badge: "Packing",
          icon: Package,
          color: "bg-amber-50 border-amber-300 text-amber-950",
          desc: "Handcrafted 100% plastic-free banana fibre pads packaging at Coimbatore facility.",
          details: "Item: ilai XL Biodegradable Pads (6 Pads Pack). Eco-box packed with tamper-proof security seal."
        };
      case 4:
        return {
          title: "4. Shipped via Courier",
          badge: "Shipped",
          icon: Truck,
          color: "bg-sky-50 border-sky-300 text-sky-950",
          desc: "Consignment handed over to ST Courier for fast Tamil Nadu delivery.",
          details: `Waybill / Tracking No: ${order.tracking_number || `TN-STC-${String(order.id).padStart(3, '0')}`}. Courier: ${order.courier_name || 'ST Courier'}. Est. Delivery: 24-48 hours.`
        };
      case 5:
        return {
          title: "5. Delivered to Doorstep",
          badge: "Delivered",
          icon: CheckCircle2,
          color: "bg-emerald-100 border-emerald-400 text-emerald-950",
          desc: "Package delivered safely. Payment collected by ST Courier executive.",
          details: `Total ₹${order.total_amount} paid via Cash on Delivery. Enjoy natural eco-comfort!`
        };
      default:
        return null;
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
              onClick={() => { setQuery('#ILAI-004'); fetchOrderTracking('#ILAI-004'); }}
              className="text-[#2E6F40] font-bold hover:underline bg-emerald-50 px-2 py-0.5 rounded"
            >
              #ILAI-004
            </button>
            <button 
              type="button" 
              onClick={() => { setQuery('#ILAI004'); fetchOrderTracking('#ILAI004'); }}
              className="text-[#2E6F40] font-bold hover:underline bg-emerald-50 px-2 py-0.5 rounded"
            >
              #ILAI004
            </button>
            <button 
              type="button" 
              onClick={() => { setQuery('#ILAI-003'); fetchOrderTracking('#ILAI-003'); }}
              className="text-[#2E6F40] font-bold hover:underline bg-emerald-50 px-2 py-0.5 rounded"
            >
              #ILAI-003
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
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A2B] block">
                    Live Order Stepper (Click any stage to view details)
                  </span>
                  <span className="text-[11px] font-bold text-[#2E6F40]">
                    Current Status: Step {step} of 5
                  </span>
                </div>
                
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2 text-center text-[10px] sm:text-xs font-bold">
                  {[
                    { num: 1, label: "1. Received", icon: Clock },
                    { num: 2, label: "2. Confirmed", icon: ShieldCheck },
                    { num: 3, label: "3. Packing", icon: Package },
                    { num: 4, label: "4. Shipped", icon: Truck },
                    { num: 5, label: "5. Delivered", icon: CheckCircle2 },
                  ].map((st) => {
                    const IconComp = st.icon;
                    const isReached = step >= st.num;
                    const isCurrentActive = step === st.num;
                    const selectedStep = selectedStageMap[order.id] || step;
                    const isInspected = selectedStep === st.num;

                    let styleClasses = "bg-[#FAF7F2] border-2 border-emerald-200 text-[#1E3A2B] hover:bg-emerald-50 hover:border-[#2E6F40]";
                    if (isCurrentActive) {
                      styleClasses = "bg-[#2E6F40] text-white border-2 border-[#1E3A2B] shadow-md scale-[1.02]";
                    } else if (isReached) {
                      styleClasses = "bg-emerald-50 border-2 border-emerald-400 text-[#1E3A2B]";
                    }

                    if (isInspected && !isCurrentActive) {
                      styleClasses += " ring-2 ring-[#2E6F40] ring-offset-1";
                    }

                    return (
                      <button
                        key={st.num}
                        type="button"
                        onClick={() => setSelectedStageMap(prev => ({ ...prev, [order.id]: st.num }))}
                        className={`p-2.5 rounded-xl transition-all flex flex-col items-center justify-center cursor-pointer ${styleClasses}`}
                      >
                        <IconComp size={18} className="mb-1 shrink-0" />
                        <span className="leading-tight font-extrabold">{st.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Stage Details Inspection Card */}
                {(() => {
                  const selectedStep = selectedStageMap[order.id] || step;
                  const activeStageObj = getStageInfo(selectedStep, order);
                  if (!activeStageObj) return null;

                  return (
                    <div className={`p-4 rounded-2xl border ${activeStageObj.color} space-y-2 mt-3 text-xs transition-all shadow-sm`}>
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-sm flex items-center gap-2">
                          <activeStageObj.icon size={18} className="shrink-0" />
                          <span>{activeStageObj.title}</span>
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-current uppercase">
                          {activeStageObj.badge}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-800">{activeStageObj.desc}</p>
                      <p className="text-[#1E3A2B] bg-white/70 p-2.5 rounded-xl border border-current/20 leading-relaxed font-mono text-[11px]">
                        {activeStageObj.details}
                      </p>
                      {selectedStep === 4 && (
                        <div className="pt-1">
                          <a
                            href="https://stcourier.com"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 bg-[#2E6F40] text-white font-bold px-3 py-1.5 rounded-lg text-[11px] shadow hover:bg-[#255A33] transition-all"
                          >
                            <Truck size={14} /> Open ST Courier Website ↗
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })()}
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
