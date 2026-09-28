import React, { useState } from 'react';
import { Star, MessageSquare, Send, CheckCircle2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ReviewModal = ({ isOpen, onClose, onReviewSubmitted }) => {
  const { showToast } = useCart();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [district, setDistrict] = useState('Chennai');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const tnDistricts = [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
    "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur",
    "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris",
    "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga",
    "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
    "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore",
    "Viluppuram", "Virudhunagar"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      showToast('Please enter your feedback comments.', 'error');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        customer_name: customerName.trim() || 'Verified Customer',
        district,
        rating,
        comment: comment.trim()
      };

      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      let data;
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        data = { success: true, review: { ...payload, id: Date.now(), created_at: new Date().toISOString() } };
      }

      showToast('Thank you for rating ILAI! Your review has been published. ⭐🌿');
      
      // Save in localStorage backup
      try {
        const localRev = JSON.parse(localStorage.getItem('ilai_customer_reviews') || '[]');
        const updated = [data.review || payload, ...localRev];
        localStorage.setItem('ilai_customer_reviews', JSON.stringify(updated));
      } catch (e) {}

      if (onReviewSubmitted) onReviewSubmitted(data.review || payload);
      onClose();
      setComment('');
      setCustomerName('');
    } catch (err) {
      showToast(err.message || 'Error submitting review', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative animate-scale border border-emerald-100">
        
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#2E6F40] text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
            <MessageSquare size={14} /> Customer Feedback & Review
          </div>
          <h3 className="font-heading text-2xl font-extrabold text-[#1E3A2B]">
            Rate ILAI Sanitary Napkins
          </h3>
          <p className="text-xs text-gray-600">
            Share your comfort experience, absorbency review, or feedback to help other women choose plastic-free care.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Star Rating Selector */}
          <div className="space-y-2 text-center bg-[#FAF7F2] p-4 rounded-2xl border border-emerald-100">
            <label className="text-xs font-bold text-[#1E3A2B] uppercase tracking-wider block">
              Your Overall Product Rating *
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    size={32}
                    className={
                      star <= (hoverRating || rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-300'
                    }
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-[#2E6F40] block mt-1">
              {rating === 5 ? '⭐⭐⭐⭐⭐ 5/5 Excellent Comfort' :
               rating === 4 ? '⭐⭐⭐⭐ 4/5 Good Experience' :
               rating === 3 ? '⭐⭐⭐ 3/5 Average' : '⭐ Need Improvement'}
            </span>
          </div>

          {/* Customer Details Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Your Name / Initial</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Priya M."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#2E6F40]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">TN District *</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#2E6F40]"
              >
                {tnDistricts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Feedback Text Area */}
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Your Review & Feedback *</label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about the comfort, softness, leak-proof absorbency, or overall experience with ILAI..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#2E6F40] resize-none font-medium"
            />
          </div>

          {/* Submit Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#2E6F40] hover:bg-[#255A33] text-white font-extrabold py-3.5 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              {submitting ? <span>Publishing Review...</span> : (
                <>
                  <Send size={16} />
                  <span>Submit Rating & Feedback</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full border border-gray-300 text-gray-700 font-bold py-3.5 rounded-xl text-xs hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
