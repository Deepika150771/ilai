import React from 'react';
import { Leaf, Mail, Phone, MapPin, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const Footer = ({ setActivePage }) => {
  const handleNav = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF7F2] border-t border-[#E8F5E9] pt-16 pb-12 text-[#1E3A2B]">
      {/* Brand Trust Feature Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-white rounded-2xl border border-emerald-100 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] text-[#2E6F40] flex items-center justify-center shrink-0">
              <Leaf size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1E3A2B]">100% Plastic Free</h4>
              <p className="text-xs text-gray-500">Banana Fibre & Water Hyacinth</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] text-[#2E6F40] flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1E3A2B]">No SAP Chemicals</h4>
              <p className="text-xs text-gray-500">Zero synthetic absorbent gels</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] text-[#2E6F40] flex items-center justify-center shrink-0">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1E3A2B]">Tamil Nadu Delivery</h4>
              <p className="text-xs text-gray-500">Flat ₹40 shipping fee</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] text-[#2E6F40] flex items-center justify-center shrink-0">
              <RefreshCw size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1E3A2B]">Compostable Core</h4>
              <p className="text-xs text-gray-500">Degrades in 180 days naturally</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#2E6F40] text-white flex items-center justify-center">
              <Leaf size={18} />
            </div>
            <span className="font-heading text-2xl font-bold text-[#1E3A2B]">ilai</span>
          </div>
          <p className="text-xs leading-relaxed text-gray-600">
            Pioneering eco-friendly feminine care in Tamil Nadu. Our pads are crafted from upcycled banana tree fiber and invasive water hyacinth — completely plastic-free, chemical-free, and 100% biodegradable.
          </p>
          <div className="text-xs font-semibold bg-emerald-50 text-[#2E6F40] p-2.5 rounded-lg border border-emerald-200">
            🌱 6 XL Pads per pack • ₹45 Launch Offer
          </div>
        </div>

        {/* Col 2: Quick Links - ONE CONSISTENT COLOR #1E3A2B */}
        <div>
          <h4 className="font-heading font-bold text-base mb-4 text-[#1E3A2B] uppercase tracking-wider text-xs">Explore Pages</h4>
          <ul className="space-y-2.5 text-sm font-medium">
            <li>
              <button onClick={() => handleNav('home')} className="nav-link-standard">Home</button>
            </li>
            <li>
              <button onClick={() => handleNav('shop')} className="nav-link-standard">Shop Pads</button>
            </li>
            <li>
              <button onClick={() => handleNav('product')} className="nav-link-standard">Product Details (XL Pack)</button>
            </li>
            <li>
              <button onClick={() => handleNav('about')} className="nav-link-standard">About ilai Story</button>
            </li>
            <li>
              <button onClick={() => handleNav('tracking')} className="nav-link-standard">Track Your Order</button>
            </li>
          </ul>
        </div>

        {/* Col 3: Customer Care & Policy */}
        <div>
          <h4 className="font-heading font-bold text-base mb-4 text-[#1E3A2B] uppercase tracking-wider text-xs">Customer Support</h4>
          <ul className="space-y-2.5 text-sm font-medium">
            <li>
              <button onClick={() => handleNav('contact')} className="nav-link-standard">Contact Us</button>
            </li>
            <li>
              <button onClick={() => handleNav('admin')} className="nav-link-standard">Admin Panel</button>
            </li>
            <li>
              <span className="text-xs text-gray-500 block mt-1">Shipping: Restricted to Tamil Nadu State</span>
            </li>
            <li>
              <span className="text-xs text-gray-500 block">Payment: GPay Manual Verification / COD</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact Info */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-base mb-4 text-[#1E3A2B] uppercase tracking-wider text-xs">Get in Touch</h4>
          <div className="flex items-center gap-3 text-xs text-gray-700">
            <Mail size={16} className="text-[#2E6F40]" />
            <a href="mailto:info.ilai@gmail.com" className="hover:text-[#2E6F40] underline">info.ilai@gmail.com</a>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-700">
            <Phone size={16} className="text-[#2E6F40]" />
            <span>+91 98765 43210 (WhatsApp Available)</span>
          </div>
          <div className="flex items-start gap-3 text-xs text-gray-700">
            <MapPin size={16} className="text-[#2E6F40] shrink-0 mt-0.5" />
            <span>Chennai & Coimbatore, Tamil Nadu, India</span>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-emerald-100 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <p>© {new Date().getFullYear()} ilai Femcare. All rights reserved. Made with <Heart size={12} className="inline text-rose-500 fill-rose-500" /> for women & mother earth in Tamil Nadu.</p>
        <p className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Banana Fibre & Water Hyacinth • 100% Biodegradable
        </p>
      </div>
    </footer>
  );
};
