import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Contact = () => {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    district: 'Chennai',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to info.ilai@gmail.com! We will respond within 2 hours. 🌿');
  };

  return (
    <div className="py-12 bg-gradient-to-b from-[#F0F7F1] via-white to-[#E8F3EA] min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#488B57] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            We Are Here To Support You
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1E3A2B]">
            Contact ilai Care Team
          </h1>
          <p className="text-gray-600 text-sm">
            Have questions about our biodegradable materials, shipping inside Tamil Nadu, or bulk orders? Connect with us directly!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Quick Button */}
            <div className="bg-[#2E6F40] text-white p-6 rounded-3xl shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center font-bold">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Instant WhatsApp Support</h3>
                  <p className="text-xs text-emerald-100">Speak directly with our Tamil Nadu care executive</p>
                </div>
              </div>
              <a
                href="https://wa.me/919876543210?text=Hello%20ilai%20Team!%20I%20have%20a%20question%20about%20your%20biodegradable%20pads."
                target="_blank"
                rel="noreferrer"
                className="block w-full bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold py-3 text-center rounded-xl transition-all shadow text-sm"
              >
                Chat on WhatsApp (+91 98765 43210)
              </a>
            </div>

            {/* Email & Phone Cards */}
            <div className="bg-white p-6 rounded-3xl border border-emerald-200 shadow-soft space-y-4">
              <div className="flex items-center gap-4 text-xs sm:text-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2E6F40] flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[11px] uppercase">Official Email</span>
                  <a href="mailto:info.ilai@gmail.com" className="font-bold text-[#1E3A2B] hover:text-[#2E6F40] underline">
                    info.ilai@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs sm:text-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2E6F40] flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[11px] uppercase">Helpline</span>
                  <span className="font-bold text-[#1E3A2B]">+91 98765 43210 (Mon-Sat, 9 AM - 7 PM)</span>
                </div>
              </div>

              <div className="flex items-start gap-4 text-xs sm:text-sm pt-2 border-t border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2E6F40] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[11px] uppercase">Production Hubs</span>
                  <p className="font-bold text-[#1E3A2B] leading-snug">
                    No. 42, Anna Salai, Guindy, Chennai, TN 600032<br/>
                    &amp; Peelamedu Industrial Estate, Coimbatore, TN 641004
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-emerald-200 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#2E6F40] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#1E3A2B]">Message Dispatched!</h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our team will read your message and get back to you at <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#2E6F40] text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-[#255A33] transition-all"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-heading text-xl font-bold text-[#1E3A2B] mb-2">Send Us A Message</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Ramesh"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#2E6F40]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ananya@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#2E6F40]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#2E6F40]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Tamil Nadu District</label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#2E6F40]"
                    >
                      <option value="Chennai">Chennai</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Madurai">Madurai</option>
                      <option value="Tiruchirappalli">Tiruchirappalli (Trichy)</option>
                      <option value="Salem">Salem</option>
                      <option value="Tirunelveli">Tirunelveli</option>
                      <option value="Erode">Erode</option>
                      <option value="Vellore">Vellore</option>
                      <option value="Thanjavur">Thanjavur</option>
                      <option value="Other TN District">Other Tamil Nadu District</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Your Message or Inquiry *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ask about product details, GPay payment verification, delivery, or bulk orders..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#2E6F40]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2E6F40] hover:bg-[#255A33] text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Send size={16} />
                  <span>Submit Inquiry to info.ilai@gmail.com</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
