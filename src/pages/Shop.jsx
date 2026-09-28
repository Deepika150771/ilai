import React, { useState } from 'react';
import { Leaf, ShieldCheck, Truck, Check, Star, ShoppingBag, Plus, Minus, ArrowRight, RefreshCw, AlertCircle, Eye, Maximize2, Sparkles, Layers, Droplets } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Shop = ({ setActivePage }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  const productImages = [
    {
      url: '/images/ilai_box_front.jpg',
      label: 'Box Front View',
      subtitle: 'ILAI 6-Pads Outer Box Packaging'
    },
    {
      url: '/images/ilai_box_open.jpg',
      label: 'Open Box View',
      subtitle: '6 Individually Wrapped Napkins Inside'
    },
    {
      url: '/images/ilai_wrapper_front.jpg',
      label: 'Individual Pad Front',
      subtitle: 'Hygienic Sealed Sanitary Napkin Pouch'
    },
    {
      url: '/images/ilai_box_back.jpg',
      label: 'Box Back Specs',
      subtitle: 'Materials, Usage & Customer Care'
    },
    {
      url: '/images/ilai_wrapper_back.jpg',
      label: 'Individual Pad Back',
      subtitle: 'Plant-Based Layer Breakdown'
    },
    {
      url: '/images/ilai_box_top.jpg',
      label: 'Box Top View',
      subtitle: 'Gold Embossed Premium Cover'
    }
  ];

  const product = {
    id: 'pad-xl-6',
    title: 'ILAI Sustainable Femcare Sanitary Napkins (6 Pads Pack)',
    price: 45,
    mrp: 60,
    pack_details: '6 pads per pack | XL size (290mm) | Plant-based Absorbent Core'
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setActivePage('cart');
  };

  return (
    <div className="py-12 bg-gradient-to-b from-[#F0F7F1] via-white to-[#E8F3EA] min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#488B57] bg-[#E8F5E9] px-3.5 py-1 rounded-full border border-emerald-200">
            Official Product Gallery
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1E3A2B]">
            Shop ILAI Eco Sanitary Napkins
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm">
            Plant-based materials, 100% plastic-free, zero harmful chemicals. Delivered directly across Tamil Nadu.
          </p>
        </div>

        {/* Main Product Showcase Card */}
        <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl overflow-hidden max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Interactive Product Photo Gallery */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#FAF7F2] via-emerald-50/50 to-amber-50/40 p-6 sm:p-8 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-emerald-100">
              
              {/* Badges Overlay */}
              <div className="flex items-center justify-between z-10 mb-4">
                <div className="bg-[#2E6F40] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow">
                  <Leaf size={14} /> 100% Plant Fibre Based
                </div>
                <div className="bg-amber-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  Launch Offer ₹45
                </div>
              </div>

              {/* Main Product Image Display Box */}
              <div className="relative group rounded-2xl overflow-hidden bg-white border border-emerald-200 shadow-soft my-2 flex items-center justify-center min-h-[340px] sm:min-h-[400px]">
                <img
                  src={productImages[activeImageIndex].url}
                  alt={productImages[activeImageIndex].label}
                  className="w-full h-auto max-h-[380px] object-contain p-2 transition-all duration-300 group-hover:scale-105 cursor-pointer rounded-xl"
                  onClick={() => setLightboxImage(productImages[activeImageIndex].url)}
                />
                
                {/* Active View Label Tag */}
                <div className="absolute bottom-3 left-3 bg-[#1E3A2B]/85 backdrop-blur text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow">
                  <Sparkles size={12} className="text-amber-300" />
                  <span>{productImages[activeImageIndex].label}: {productImages[activeImageIndex].subtitle}</span>
                </div>

                {/* Click to Zoom Overlay Button */}
                <button
                  type="button"
                  onClick={() => setLightboxImage(productImages[activeImageIndex].url)}
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white text-[#1E3A2B] p-2 rounded-xl shadow border border-emerald-200 opacity-80 group-hover:opacity-100 transition-opacity"
                  title="Click to expand view"
                >
                  <Maximize2 size={16} />
                </button>
              </div>

              {/* 6 Interactive Thumbnail Selectors */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-4">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`p-1 rounded-xl border transition-all text-left bg-white ${
                      activeImageIndex === idx
                        ? 'border-[#2E6F40] ring-2 ring-emerald-300 shadow-md scale-105'
                        : 'border-gray-200 opacity-70 hover:opacity-100 hover:border-emerald-300'
                    }`}
                  >
                    <div className="h-14 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center p-0.5">
                      <img src={img.url} alt={img.label} className="w-full h-full object-contain rounded" />
                    </div>
                    <span className="text-[9px] font-bold text-[#1E3A2B] block text-center mt-1 truncate">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Micro guarantee row */}
              <div className="grid grid-cols-2 gap-2 text-center text-[11px] font-semibold text-emerald-950 pt-4 mt-2 border-t border-emerald-200/60">
                <div className="bg-white/70 p-2 rounded-lg border border-emerald-100">✓ Plant-Based Materials</div>
                <div className="bg-white/70 p-2 rounded-lg border border-emerald-100">✓ 100% Biodegradable</div>
                <div className="bg-white/70 p-2 rounded-lg border border-emerald-100">✓ Soft & Absorbent</div>
                <div className="bg-white/70 p-2 rounded-lg border border-emerald-100">✓ No Plastic / Chemicals</div>
              </div>

            </div>

            {/* Right Column: Order Configuration */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              <div>
                <div className="flex items-center gap-2 text-amber-500 text-xs font-bold mb-2">
                  <div className="flex"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                  <span>4.9 / 5.0 (120+ Tamil Nadu Customers)</span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1E3A2B]">
                  ILAI Sustainable Femcare Sanitary Napkins
                </h2>
                <p className="text-xs text-gray-500 font-medium mt-1">Pack of 6 Individually Wrapped Sanitary Napkins</p>

                {/* Pricing Box */}
                <div className="mt-4 p-4 bg-[#FAF7F2] rounded-2xl border border-emerald-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 font-semibold block uppercase">Launch Special Price</span>
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
                  className="w-full bg-[#2E6F40] hover:bg-[#255A33] text-white font-extrabold py-4 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-base"
                >
                  <ShoppingBag size={20} />
                  <span>Add {quantity} Pack(s) to Cart (₹{product.price * quantity})</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-emerald-950 font-extrabold py-4 px-6 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-base"
                >
                  <span>Buy Now (Direct Checkout)</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Customer Care snippet */}
              <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
                <div className="font-bold flex items-center gap-2 text-[#1E3A2B]">
                  <span>📞 Official Customer Care: 8072757497</span>
                </div>
                <div className="text-[11px] text-gray-600">
                  Email: info.ilaiofficial@gmail.com • Batch: ILAI-SEP26-001
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Lightbox High Resolution Preview Modal */}
        {lightboxImage && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-4xl w-full space-y-4 text-center shadow-2xl relative animate-scale">
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-xl font-bold bg-gray-100 hover:bg-gray-200 w-9 h-9 rounded-full flex items-center justify-center"
              >
                ✕
              </button>
              <h3 className="font-heading font-bold text-xl text-[#1E3A2B]">Official ILAI Product Photo View</h3>
              <div className="max-h-[78vh] overflow-auto rounded-2xl border border-gray-200 p-2 bg-[#FAF7F2]">
                <img src={lightboxImage} alt="ILAI Product Photo Zoom" className="max-w-full h-auto mx-auto rounded-xl object-contain max-h-[70vh]" />
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="bg-[#2E6F40] text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-[#255A33] transition-all"
              >
                Close Fullscreen View
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
