import React, { useState } from 'react';
import { Leaf, ShoppingBag, Search, Menu, X, ShieldCheck, MapPin, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Header = ({ activePage, setActivePage }) => {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'product', label: 'Product Details' },
    { id: 'about', label: 'About' },
    { id: 'tracking', label: 'Order Tracking' },
    { id: 'contact', label: 'Contact' },
    { id: 'admin', label: 'Admin Panel' }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8F5E9] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#2E6F40] text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-inner">
        <span className="bg-amber-400 text-emerald-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">Launch Offer</span>
        <span>₹45 / pack (MRP <span className="line-through opacity-75">₹60</span>)</span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:flex items-center gap-1">
          <MapPin size={12} className="text-amber-300" /> Shipping Exclusively within Tamil Nadu (₹40 Flat Fee)
        </span>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#2E6F40] group-hover:bg-[#2E6F40] group-hover:text-white transition-all shadow-sm">
              <Leaf size={22} className="transform group-hover:rotate-12 transition-transform" />
            </div>
            <div>
              <span className="font-heading text-3xl font-bold tracking-tight text-[#1E3A2B] group-hover:text-[#2E6F40] transition-colors">
                ilai
              </span>
              <span className="block text-[10px] uppercase font-semibold tracking-widest text-[#488B57] -mt-1">
                Pure Femcare
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links - ONE CONSISTENT COLOR #1E3A2B WITH #2E6F40 HOVER */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link-standard text-sm uppercase tracking-wider font-semibold py-2 transition-colors ${
                  activePage === item.id ? 'active' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            {/* Quick Tamil Nadu Badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-[#E8F5E9] text-[#2E6F40] text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200">
              <Truck size={14} />
              <span>TN Only</span>
            </div>

            {/* Cart Icon */}
            <button
              onClick={() => handleNavClick('cart')}
              className="relative p-2.5 rounded-full text-[#1E3A2B] hover:bg-[#E8F5E9] hover:text-[#2E6F40] transition-all focus:outline-none"
              title="View Shopping Cart"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-[#2E6F40] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1E3A2B] hover:text-[#2E6F40] focus:outline-none"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-t border-[#E8F5E9] px-4 pt-3 pb-6 shadow-xl space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                activePage === item.id 
                  ? 'bg-[#E8F5E9] text-[#2E6F40]' 
                  : 'text-[#1E3A2B] hover:bg-emerald-50 hover:text-[#2E6F40]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-xs text-[#2E6F40] font-semibold px-4">
            <span className="flex items-center gap-1"><MapPin size={12} /> Delivery in Tamil Nadu Only</span>
            <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded">₹45 / Pack</span>
          </div>
        </div>
      )}
    </header>
  );
};
