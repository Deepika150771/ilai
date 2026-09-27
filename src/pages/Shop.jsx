import React, { useState } from 'react';
import { Leaf, ShieldCheck, Truck, Check, Star, ShoppingBag, Plus, Minus, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Shop = ({ setActivePage }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: 'pad-xl-6',
    title: 'ilai XL Biodegradable Sanitary Pads (6 Pads Pack)',
    price: 45,
    mrp: 60,
    pack_details: '6 pads per pack | XL size (290mm) | Banana Fibre & Water Hyacinth Core'
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setActivePage('cart');
  };

  return (
    <div className="py-12 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#488B57] bg-[#E8F5E9] px-3.5 py-1 rounded-full border border-emerald-200">
            Pure Organic Period Care
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A2B]">
            Shop Eco Sanitary Pads
          </h1>
          <p className="text-gray-600 text-sm">
            100% Plastic-free, zero SAP chemicals, biodegradable in 180 days. Delivered directly across Tamil Nadu.
          </p>
        </div>

        {/* Main Product Showcase Card */}
        <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl overflow-hidden max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Visual Showcase */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#E8F5E9] via-emerald-50 to-amber-50 p-8 flex flex-col justify-between relative">
              <div className="absolute top-4 left-4 bg-[#2E6F40] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow">
                <Leaf size={14} /> 100% Biodegradable
              </div>
              <div className="absolute top-4 right-4 bg-amber-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                Launch Deal ₹45
              </div>

              <div className="my-12 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-28 h-28 rounded-full bg-white text-[#2E6F40] flex items-center justify-center shadow-lg border-4 border-emerald-100">
                  <Leaf size={56} />
                </div>
                <div>
                  <h3 className="font-heading text-3xl font-extrabold text-[#1E3A2B]">ilai XL Pack</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#488B57] mt-1">6 Heavy-Flow XL Pads (290mm)</p>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-900 border border-emerald-200">
                  <span>Banana Fibre + Water Hyacinth</span>
                </div>
              </div>

              {/* Bottom Feature Badges */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold text-emerald-950 pt-4 border-t border-emerald-200/60">
                <div className="bg-white/60 p-2 rounded-lg">✓ Zero SAP Chemical Gels</div>
                <div className="bg-white/60 p-2 rounded-lg">✓ Chlorine-Free Unbleached</div>
                <div className="bg-white/60 p-2 rounded-lg">✓ 40–50ml Natural Flow</div>
                <div className="bg-white/60 p-2 rounded-lg">✓ 180 Days Soil Degradable</div>
              </div>
            </div>

            {/* Right Column: Order Configuration */}
            <div className="lg:col-span-6 p-8 flex flex-col justify-between space-y-6">
              
              <div>
                <div className="flex items-center gap-2 text-amber-500 text-xs font-bold mb-2">
                  <div className="flex"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                  <span>4.9 / 5.0 (120+ Tamil Nadu Customers)</span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1E3A2B]">
                  ilai XL Biodegradable Sanitary Pads
                </h2>
                <p className="text-xs text-gray-500 font-medium mt-1">Pack of 6 Extra Large Pads (290mm Length)</p>

                {/* Pricing Box */}
                <div className="mt-4 p-4 bg-[#FAF7F2] rounded-2xl border border-emerald-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 font-semibold block uppercase">Launch Promotional Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-[#1E3A2B]">₹45</span>
                      <span className="text-sm text-gray-400 line-through">MRP ₹60</span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Save 25%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-[#2E6F40] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      In Stock • TN Shipping
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1E3A2B] uppercase tracking-wider block">Select Packs Quantity:</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-emerald-200 rounded-xl bg-white overflow-hidden shadow-sm">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="p-3 text-gray-600 hover:bg-emerald-50 hover:text-[#2E6F40] transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-bold text-lg text-[#1E3A2B]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="p-3 text-gray-600 hover:bg-emerald-50 hover:text-[#2E6F40] transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="text-xs text-gray-600">
                    <div>Total Price: <strong className="text-[#1E3A2B] text-base">₹{product.price * quantity}</strong></div>
                    <div className="text-[11px] text-gray-500">+ ₹40 flat shipping fee within TN</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#2E6F40] hover:bg-[#255A33] text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-base"
                >
                  <ShoppingBag size={20} />
                  <span>Add {quantity} Pack(s) to Cart (₹{product.price * quantity})</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold py-3.5 px-6 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-base"
                >
                  <span>Buy Now (Direct Checkout)</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Shipping Notice Box */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Tamil Nadu Shipping Only:</strong> Orders are dispatched via ST Courier from Chennai/Coimbatore. Delivery estimated in 2-3 business days.
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
