import React, { useState, useEffect } from 'react';
import { ShieldCheck, Truck, Clock, CheckCircle2, Search, Mail, Eye, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const AdminPanel = () => {
  const { showToast } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending_verification, confirmed, shipped
  const [search, setSearch] = useState('');
  const [selectedProof, setSelectedProof] = useState(null);

  // Ship modal state
  const [shippingModal, setShippingModal] = useState(null);
  const [courierName, setCourierName] = useState('ST Courier');
  const [trackingNumber, setTrackingNumber] = useState('');

  // Diagnostic email test state
  const [testEmailAddr, setTestEmailAddr] = useState('info.ilai@gmail.com');
  const [testingEmail, setTestingEmail] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
      }
    } catch (err) {
      showToast('Error loading admin orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPayment = async (orderId) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/verify-payment`, {
        method: 'POST'
      });
      const data = await res.json();

      if (res.ok) {
        showToast(`Payment for order #${orderId} verified! Confirmation email dispatched.`);
        fetchOrders();
      } else {
        showToast(data.error || 'Failed to verify payment', 'error');
      }
    } catch (err) {
      showToast('Error verifying payment', 'error');
    }
  };

  const handleShipOrder = async (e) => {
    e.preventDefault();
    if (!shippingModal) return;

    try {
      const res = await fetch(`/api/orders/${shippingModal.id}/ship`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courier_name: courierName,
          tracking_number: trackingNumber || `TN-ILAI-${shippingModal.id}`
        })
      });

      const data = await res.json();

      if (res.ok) {
        showToast(`Order #${shippingModal.id} marked as Shipped! Email sent to customer.`);
        setShippingModal(null);
        fetchOrders();
      } else {
        showToast(data.error || 'Failed to update shipping', 'error');
      }
    } catch (err) {
      showToast('Error shipping order', 'error');
    }
  };

  const handleRunEmailTest = async () => {
    setTestingEmail(true);
    try {
      const res = await fetch('/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to_email: testEmailAddr })
      });
      const data = await res.json();
      showToast(data.simulated ? 'Simulated email test completed (check server logs)' : 'Live Gmail SMTP email sent!');
    } catch (err) {
      showToast('Diagnostic email test error', 'error');
    } finally {
      setTestingEmail(false);
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'pending_verification' ? o.payment_status === 'pending_verification' :
      filter === 'confirmed' ? (o.order_status === 'confirmed' || o.payment_status === 'verified') :
      filter === 'shipped' ? o.order_status === 'shipped' : true;

    const term = search.toLowerCase();
    const matchesSearch = 
      o.customer_name?.toLowerCase().includes(term) ||
      o.order_number?.toLowerCase().includes(term) ||
      o.customer_phone?.includes(term) ||
      o.district?.toLowerCase().includes(term);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="py-12 bg-[#FAF7F2] min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-200 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#2E6F40] text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 mb-2">
              <ShieldCheck size={14} /> ilai Merchant Operations Dashboard
            </div>
            <h1 className="font-heading text-3xl font-extrabold text-[#1E3A2B]">
              Admin Order Management Panel
            </h1>
            <p className="text-xs text-gray-500">
              Verify GPay payment proofs, trigger customer automated emails, and update ST Courier tracking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="bg-white border border-emerald-300 text-[#1E3A2B] font-bold px-4 py-2.5 rounded-xl text-xs hover:bg-emerald-50 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <RefreshCw size={14} /> Refresh Data
            </button>
          </div>
        </div>

        {/* Email Diagnostic Utility Bar */}
        <div className="bg-gradient-to-r from-emerald-900 to-[#1E3A2B] text-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-bold text-sm text-emerald-300 flex items-center justify-center md:justify-start gap-1.5">
              <Mail size={16} /> Email Dispatch Diagnostic Utility (info.ilai@gmail.com)
            </h3>
            <p className="text-xs text-emerald-100/80">
              Test customer email template dispatch directly from the backend server.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              value={testEmailAddr}
              onChange={(e) => setTestEmailAddr(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs text-gray-900 font-medium border-0 focus:outline-none w-full md:w-56"
              placeholder="Target email address"
            />
            <button
              onClick={handleRunEmailTest}
              disabled={testingEmail}
              className="bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold px-4 py-2 rounded-xl text-xs shrink-0 transition-all"
            >
              {testingEmail ? 'Sending...' : 'Send Test Email'}
            </button>
          </div>
        </div>

        {/* Filters & Search Controls */}
        <div className="bg-white p-6 rounded-3xl border border-emerald-200 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold w-full sm:w-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-2 rounded-xl transition-all ${filter === 'all' ? 'bg-[#2E6F40] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setFilter('pending_verification')}
              className={`px-3.5 py-2 rounded-xl transition-all ${filter === 'pending_verification' ? 'bg-amber-500 text-emerald-950' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}
            >
              ⏳ GPay Pending Verification ({orders.filter(o => o.payment_status === 'pending_verification').length})
            </button>
            <button
              onClick={() => setFilter('confirmed')}
              className={`px-3.5 py-2 rounded-xl transition-all ${filter === 'confirmed' ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-800'}`}
            >
              ✅ Confirmed
            </button>
            <button
              onClick={() => setFilter('shipped')}
              className={`px-3.5 py-2 rounded-xl transition-all ${filter === 'shipped' ? 'bg-sky-700 text-white' : 'bg-sky-50 text-sky-800'}`}
            >
              🚚 Shipped
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, phone, order #..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#2E6F40]"
            />
          </div>

        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-xs text-gray-500 font-medium">Loading orders data...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-12 text-center text-xs text-gray-500">No orders matching selected criteria.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAF7F2] text-[#1E3A2B] font-bold border-b border-emerald-100 uppercase tracking-wider">
                    <th className="p-4">Order ID & Date</th>
                    <th className="p-4">Customer & Contact</th>
                    <th className="p-4">TN Address</th>
                    <th className="p-4">Items & Total</th>
                    <th className="p-4">Payment & UTR</th>
                    <th className="p-4">Order Status</th>
                    <th className="p-4 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-emerald-50/30 transition-colors">
                      
                      {/* Order ID */}
                      <td className="p-4">
                        <span className="font-bold text-sm text-[#1E3A2B] block">{order.order_number}</span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="p-4">
                        <strong className="text-gray-900 block font-semibold">{order.customer_name}</strong>
                        <span className="text-gray-500 block">{order.customer_phone}</span>
                        <span className="text-emerald-800 text-[11px] block underline">{order.customer_email}</span>
                      </td>

                      {/* Address */}
                      <td className="p-4 max-w-xs">
                        <span className="font-bold text-[#1E3A2B] block">{order.district}, TN</span>
                        <span className="text-gray-600 block text-[11px] truncate">{order.shipping_address}, {order.city} ({order.pincode})</span>
                      </td>

                      {/* Items & Total */}
                      <td className="p-4">
                        <span className="font-bold text-sm text-[#2E6F40] block">₹{order.total_amount}</span>
                        <span className="text-gray-500 text-[10px] block">
                          {order.items?.length || 1} pack(s) • ₹{order.shipping_fee} TN ship
                        </span>
                      </td>

                      {/* Payment */}
                      <td className="p-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-1 ${
                          order.payment_status === 'verified' ? 'bg-emerald-100 text-emerald-800' :
                          order.payment_status === 'cod_confirmed' ? 'bg-sky-100 text-sky-800' :
                          'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}>
                          {order.payment_method === 'cod' ? 'COD' : order.payment_status}
                        </span>

                        {order.utr_number && (
                          <span className="block font-mono text-[10px] text-gray-600">UTR: {order.utr_number}</span>
                        )}

                        {order.payment_proof_url && (
                          <button
                            onClick={() => setSelectedProof(order.payment_proof_url)}
                            className="text-[#2E6F40] font-bold text-[10px] hover:underline flex items-center gap-1 mt-0.5"
                          >
                            <Eye size={12} /> View Proof Screenshot
                          </button>
                        )}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span className="font-bold text-xs capitalize text-gray-800 block">{order.order_status}</span>
                        {order.tracking_number && (
                          <span className="text-[10px] text-gray-500 block font-mono">{order.courier_name}: {order.tracking_number}</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right space-y-1">
                        
                        {/* Action 1: Verify Payment */}
                        {order.payment_method === 'gpay' && order.payment_status === 'pending_verification' && (
                          <button
                            onClick={() => handleVerifyPayment(order.id)}
                            className="bg-[#2E6F40] hover:bg-[#255A33] text-white font-bold px-3 py-1.5 rounded-lg text-[11px] shadow-sm transition-all w-full flex items-center justify-center gap-1"
                          >
                            <CheckCircle2 size={12} /> Verify Payment
                          </button>
                        )}

                        {/* Action 2: Ship Order */}
                        {order.order_status !== 'shipped' && order.order_status !== 'delivered' && (
                          <button
                            onClick={() => {
                              setShippingModal(order);
                              setTrackingNumber(`TN-STC-${String(order.id).padStart(3, '0')}`);
                            }}
                            className="bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold px-3 py-1.5 rounded-lg text-[11px] shadow-sm transition-all w-full flex items-center justify-center gap-1"
                          >
                            <Truck size={12} /> Ship via Courier
                          </button>
                        )}

                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal: View Payment Proof Screenshot */}
        {selectedProof && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 text-center">
              <h3 className="font-heading font-bold text-lg text-[#1E3A2B]">GPay Payment Proof Screenshot</h3>
              <div className="max-h-96 overflow-auto rounded-2xl border border-gray-200 p-2 bg-gray-50">
                <img src={selectedProof} alt="GPay Proof" className="max-w-full h-auto mx-auto rounded-xl" />
              </div>
              <button
                onClick={() => setSelectedProof(null)}
                className="bg-gray-800 text-white font-bold px-6 py-2 rounded-xl text-xs hover:bg-gray-900 transition-all"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}

        {/* Modal: Mark Order Shipped */}
        {shippingModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4">
              <h3 className="font-heading font-bold text-lg text-[#1E3A2B]">
                Dispatch Order {shippingModal.order_number}
              </h3>
              <p className="text-xs text-gray-600">
                Enter courier details to dispatch shipping confirmation email to <strong>{shippingModal.customer_email}</strong>.
              </p>

              <form onSubmit={handleShipOrder} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Courier Partner Name</label>
                  <input
                    type="text"
                    required
                    value={courierName}
                    onChange={(e) => setCourierName(e.target.value)}
                    placeholder="e.g. ST Courier / Professional Courier"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Waybill / Tracking Number</label>
                  <input
                    type="text"
                    required
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="e.g. TN-STC-49102"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-mono"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#2E6F40] hover:bg-[#255A33] text-white font-bold py-2.5 rounded-xl text-xs shadow transition-all"
                  >
                    Confirm Dispatch & Send Email
                  </button>

                  <button
                    type="button"
                    onClick={() => setShippingModal(null)}
                    className="w-full border border-gray-300 text-gray-700 font-bold py-2.5 rounded-xl text-xs hover:bg-gray-50 transition-all"
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
