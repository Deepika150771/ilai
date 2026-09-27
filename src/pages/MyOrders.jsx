import React, { useState, useEffect } from 'react';
import { Package, Search, Clock, CheckCircle2, Truck, MapPin, AlertCircle, ShieldCheck, Upload, QrCode, Eye, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const MyOrders = ({ setActivePage }) => {
  const { savedOrders, showToast } = useCart();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [displayOrders, setDisplayOrders] = useState([]);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [error, setError] = useState(null);

  // Upload Modal State
  const [uploadModalOrder, setUploadModalOrder] = useState(null);
  const [utrNumber, setUtrNumber] = useState('');
  const [paymentFile, setPaymentFile] = useState(null);
  const [submittingProof, setSubmittingProof] = useState(false);

  // Preview Proof Modal State
  const [selectedProof, setSelectedProof] = useState(null);

  useEffect(() => {
    if (savedOrders && savedOrders.length > 0) {
      setDisplayOrders(savedOrders);
    }
  }, [savedOrders]);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) {
      setDisplayOrders(savedOrders || []);
      setSearchAttempted(false);
      return;
    }

    setLoading(true);
    setError(null);
    setSearchAttempted(true);

    try {
      const res = await fetch(`/api/orders/track?query=${encodeURIComponent(query.trim())}`);
      const contentType = res.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        throw new Error('API server returned invalid response');
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to find orders');
      }

      if (data && data.length > 0) {
        setDisplayOrders(data);
      } else {
        setDisplayOrders([]);
        setError('No orders found matching your search. Please check your Order ID, Email, or Phone Number.');
      }
    } catch (err) {
      setError(err.message || 'Error searching orders');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePaymentProof = async (e) => {
    e.preventDefault();
    if (!uploadModalOrder) return;

    if (!utrNumber && !paymentFile) {
      showToast('Please provide a UTR number or select a screenshot image.', 'error');
      return;
    }

    setSubmittingProof(true);

    try {
      const payload = new FormData();
      payload.append('utr_number', utrNumber);
      if (paymentFile) {
        payload.append('payment_proof', paymentFile);
      }

      const res = await fetch(`/api/orders/${uploadModalOrder.id}/update-proof`, {
        method: 'POST',
        body: payload
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update payment proof');
      }

      showToast(`Payment proof updated for Order ${uploadModalOrder.order_number}! Merchant will verify shortly. 🌿`);
      
      // Update local state
      setDisplayOrders(prev => prev.map(o => o.id === uploadModalOrder.id ? data.order : o));
      setUploadModalOrder(null);
      setUtrNumber('');
      setPaymentFile(null);
    } catch (err) {
      showToast(err.message || 'Error uploading payment proof', 'error');
    } finally {
      setSubmittingProof(false);
    }
  };

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
    <div className="py-12 bg-[#FAF7F2] min-h-[80vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#488B57] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            Customer Verification Hub
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1E3A2B]">
            My Orders & Payment Verification
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm">
            View your placed orders, check live GPay merchant verification status, and upload receipt proofs.
          </p>
        </div>

        {/* Search & Lookup Bar */}
        <div className="bg-white p-6 rounded-3xl border border-emerald-200 shadow-soft space-y-3">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by Order ID (#ILAI-003), Email, or Phone Number..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#2E6F40] focus:ring-2 focus:ring-emerald-100 font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#2E6F40] hover:bg-[#255A33] text-white font-bold px-6 py-3 rounded-xl shadow transition-all flex items-center justify-center gap-2 text-xs shrink-0"
            >
              {loading ? <span>Searching...</span> : (
                <>
                  <Search size={16} />
                  <span>Lookup Orders</span>
                </>
              )}
            </button>
          </form>

          <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
            <span>Showing {displayOrders.length} order(s)</span>
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(''); setDisplayOrders(savedOrders || []); setSearchAttempted(false); setError(null); }}
                className="text-[#2E6F40] font-bold hover:underline flex items-center gap-1"
              >
                <RefreshCw size={12} /> Clear Search Filter
              </button>
            )}
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-2xl flex items-center gap-3">
            <AlertCircle size={18} className="shrink-0 text-rose-600" />
            <p>{error}</p>
          </div>
        )}

        {/* Orders List */}
        {displayOrders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-emerald-200 p-12 text-center max-w-md mx-auto space-y-4 shadow-soft">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#2E6F40] flex items-center justify-center mx-auto">
              <Package size={32} />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#1E3A2B]">No Placed Orders Found</h3>
            <p className="text-xs text-gray-500">
              {searchAttempted ? 'No orders match your query. Try searching with your phone number.' : 'You have not placed any orders on this device yet.'}
            </p>
            <button
              onClick={() => setActivePage('shop')}
              className="bg-[#2E6F40] text-white font-bold px-6 py-3 rounded-xl text-xs hover:bg-[#255A33] transition-all shadow"
            >
              Order Eco-Friendly Pads Now
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {displayOrders.map(order => {
              const step = getStatusStep(order.order_status);

              return (
                <div key={order.id} className="bg-white rounded-3xl border border-emerald-200 shadow-xl overflow-hidden space-y-6 p-6 sm:p-8">
                  
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-heading text-2xl font-extrabold text-[#1E3A2B]">{order.order_number}</span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                          order.payment_status === 'verified' 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                            : order.payment_status === 'cod_confirmed'
                            ? 'bg-sky-100 text-sky-800 border border-sky-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}>
                          {order.payment_method === 'cod' ? 'COD Confirmed' : 
                           order.payment_status === 'verified' ? 'Payment Verified ✅' : 'GPay Verification Pending ⏳'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Order Date: {new Date(order.created_at || Date.now()).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[11px] text-gray-500 uppercase font-bold block">Total Paid/Payable</span>
                      <span className="text-2xl font-extrabold text-[#2E6F40]">₹{order.total_amount}</span>
                    </div>
                  </div>

                  {/* Order Verification & Status Alert Box */}
                  {order.payment_method === 'gpay' && order.payment_status === 'pending_verification' && (
                    <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-3 shadow-sm">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="font-bold flex items-center gap-2 text-amber-950 text-sm">
                            <Clock size={18} className="text-amber-600 shrink-0" />
                            <span>GPay Payment Screenshot Verification In Progress</span>
                          </div>
                          <p className="text-amber-800 text-xs leading-relaxed">
                            Our merchant team verifies GPay UTR numbers and payment proof screenshots. Once verified, your order is dispatched via ST Courier.
                          </p>
                          {order.utr_number && (
                            <p className="text-xs font-mono font-bold text-amber-900 pt-1">
                              Submitted UTR: <span className="bg-white px-2 py-0.5 rounded border border-amber-300">{order.utr_number}</span>
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            setUploadModalOrder(order);
                            setUtrNumber(order.utr_number || '');
                          }}
                          className="bg-[#2E6F40] hover:bg-[#255A33] text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow shrink-0 flex items-center gap-1.5 transition-all"
                        >
                          <Upload size={14} /> Update Proof / UTR
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Status Progress Stepper */}
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#488B57] block">Order Dispatch Stepper</span>
                    
                    <div className="grid grid-cols-5 gap-1 sm:gap-2 text-center text-[10px] sm:text-xs font-semibold">
                      <div className={`p-2.5 rounded-xl border ${step >= 1 ? 'bg-emerald-50 border-emerald-300 text-[#2E6F40]' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                        <Clock size={16} className="mx-auto mb-1" />
                        <span>1. Received</span>
                      </div>

                      <div className={`p-2.5 rounded-xl border ${step >= 2 ? 'bg-emerald-50 border-emerald-300 text-[#2E6F40]' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                        <ShieldCheck size={16} className="mx-auto mb-1" />
                        <span>2. Confirmed</span>
                      </div>

                      <div className={`p-2.5 rounded-xl border ${step >= 3 ? 'bg-emerald-50 border-emerald-300 text-[#2E6F40]' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                        <Package size={16} className="mx-auto mb-1" />
                        <span>3. Packing</span>
                      </div>

                      <div className={`p-2.5 rounded-xl border ${step >= 4 ? 'bg-emerald-50 border-emerald-300 text-[#2E6F40]' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                        <Truck size={16} className="mx-auto mb-1" />
                        <span>4. Shipped</span>
                      </div>

                      <div className={`p-2.5 rounded-xl border ${step >= 5 ? 'bg-emerald-50 border-emerald-300 text-[#2E6F40]' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                        <CheckCircle2 size={16} className="mx-auto mb-1" />
                        <span>5. Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 text-xs">
                    
                    {/* Delivery Address */}
                    <div className="space-y-2 bg-[#FAF7F2] p-4 rounded-2xl border border-emerald-100">
                      <h4 className="font-bold text-[#1E3A2B] uppercase tracking-wider flex items-center gap-1">
                        <MapPin size={14} className="text-[#2E6F40]" /> Delivery Address (Tamil Nadu)
                      </h4>
                      <p className="text-gray-700 leading-relaxed font-medium">
                        <strong>{order.customer_name}</strong><br/>
                        {order.shipping_address}, {order.city}<br/>
                        District: {order.district}, TN - {order.pincode}<br/>
                        Phone: {order.customer_phone}<br/>
                        Email: {order.customer_email}
                      </p>
                    </div>

                    {/* Items Purchased */}
                    <div className="space-y-2 bg-[#FAF7F2] p-4 rounded-2xl border border-emerald-100">
                      <h4 className="font-bold text-[#1E3A2B] uppercase tracking-wider flex items-center gap-1">
                        <Package size={14} className="text-[#2E6F40]" /> Purchased Items
                      </h4>
                      <ul className="space-y-1.5 text-gray-700 font-medium">
                        {order.items?.map((item, idx) => (
                          <li key={idx} className="flex justify-between py-1 border-b border-gray-200/50 last:border-0">
                            <span>{item.title} (x{item.quantity})</span>
                            <span className="font-bold text-[#1E3A2B]">₹{item.price * item.quantity}</span>
                          </li>
                        ))}
                        <li className="flex justify-between pt-1 text-gray-500">
                          <span>TN Shipping Fee (Flat)</span>
                          <span>₹{order.shipping_fee || 40}</span>
                        </li>
                      </ul>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Modal: Upload / Update Payment Proof */}
        {uploadModalOrder && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-scale">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-heading font-bold text-lg text-[#1E3A2B]">
                  Update Payment Proof ({uploadModalOrder.order_number})
                </h3>
                <button
                  type="button"
                  onClick={() => setUploadModalOrder(null)}
                  className="text-gray-400 hover:text-gray-600 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-gray-600">
                Provide your 12-digit GPay UTR transaction ID or upload your payment receipt screenshot for verification.
              </p>

              <form onSubmit={handleUpdatePaymentProof} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">12-Digit GPay UTR Number</label>
                  <input
                    type="text"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    placeholder="e.g. 428901928375"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-mono text-xs focus:outline-none focus:border-[#2E6F40]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Upload Receipt Screenshot</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPaymentFile(e.target.files[0])}
                    className="w-full text-xs text-gray-500 file:mr-2 file:py-2 file:px-3 file:rounded-xl file:border-0 file:bg-emerald-700 file:text-white file:font-semibold"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submittingProof}
                    className="w-full bg-[#2E6F40] hover:bg-[#255A33] text-white font-bold py-3 rounded-xl text-xs shadow transition-all flex items-center justify-center gap-1.5"
                  >
                    {submittingProof ? 'Submitting...' : 'Submit Proof to Merchant'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setUploadModalOrder(null)}
                    className="w-full border border-gray-300 text-gray-700 font-bold py-3 rounded-xl text-xs hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
