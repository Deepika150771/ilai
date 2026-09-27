import React from 'react';
import { Leaf, ShieldCheck, Heart, Sparkles, ArrowRight, Truck, RefreshCw, CheckCircle2, Award, Star, MapPin } from 'lucide-react';
import { ProblemSection } from '../components/ProblemSection';
import { useCart } from '../context/CartContext';

export const Home = ({ setActivePage }) => {
  const { addToCart } = useCart();

  const sampleProduct = {
    id: 'pad-xl-6',
    title: 'ilai XL Biodegradable Sanitary Pads (6 Pads Pack)',
    price: 45,
    mrp: 60,
    pack_details: '6 pads per pack | XL size (290mm) | Banana Fibre & Water Hyacinth Core'
  };

  const handleBuyNow = () => {
    addToCart(sampleProduct, 1);
    setActivePage('cart');
  };

  return (
    <div className="space-y-0">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-emerald-50/60 to-[#FAF7F2] pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Soft background glow circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl -z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl -z-0 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text & Hero Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#2E6F40] px-4 py-2 rounded-full text-xs sm:text-sm font-bold border border-emerald-200 animate-pulse-subtle">
                <Sparkles size={16} className="text-amber-500" />
                <span>Launch Price Special: <strong>₹45 / pack</strong> (MRP ₹60)</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E3A2B] leading-[1.15] tracking-tight">
                Gentle On Your Body. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E6F40] via-[#488B57] to-[#1D3A24]">
                  100% Plastic-Free
                </span> For Earth.
              </h1>

              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Tamil Nadu’s first eco-conscious sanitary pad crafted from upcycled <strong>banana tree fibre</strong> and <strong>invasive water hyacinth</strong>. Zero synthetic SAP gels, zero chlorine bleaching, and 100% biodegradable in 180 days.
              </p>

              {/* Key Highlights Pill Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <span className="bg-white text-[#1E3A2B] px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-soft border border-emerald-100 flex items-center gap-1.5">
                  <Leaf size={14} className="text-[#2E6F40]" /> Banana & Hyacinth Core
                </span>
                <span className="bg-white text-[#1E3A2B] px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-soft border border-emerald-100 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#2E6F40]" /> 0% SAP Chemicals
                </span>
                <span className="bg-white text-[#1E3A2B] px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-soft border border-emerald-100 flex items-center gap-1.5">
                  <RefreshCw size={14} className="text-[#2E6F40]" /> Degrades in 180 Days
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => addToCart(sampleProduct, 1)}
                  className="w-full sm:w-auto bg-[#2E6F40] hover:bg-[#255A33] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 text-base"
                >
                  <Leaf size={20} />
                  <span>Add to Cart (₹45)</span>
                </button>
                
                <button
                  onClick={handleBuyNow}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold px-8 py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-base"
                >
                  <span>Buy Now Directly</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Tamil Nadu Express Shipping Guarantee */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-[#2E6F40]">
                <Truck size={16} />
                <span>Shipping Exclusively across Tamil Nadu • Flat ₹40 Shipping Fee</span>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-200 shadow-2xl space-y-6 relative overflow-hidden group">
                
                <div className="absolute top-4 right-4 bg-amber-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  25% OFF
                </div>

                {/* Hero Product Visual Card */}
                <div className="h-64 sm:h-72 rounded-2xl bg-gradient-to-br from-emerald-100 via-emerald-50 to-amber-50 flex flex-col items-center justify-center text-center p-6 border border-emerald-100 relative overflow-hidden">
                  <div className="w-20 h-20 rounded-full bg-white/80 backdrop-blur text-[#2E6F40] flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 transition-transform">
                    <Leaf size={44} />
                  </div>
                  <span className="font-heading font-extrabold text-2xl text-[#1E3A2B]">ilai XL</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#488B57]">6 Pads Pack • 290mm</span>
                  <span className="mt-2 text-xs text-gray-600 font-medium bg-white/90 px-3 py-1 rounded-full border border-emerald-100">
                    Upcycled Hyacinth + Banana Fiber
                  </span>
                </div>

                {/* Price & Spec snippet */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div>
                    <span className="text-xs text-gray-500 uppercase font-semibold block">Special Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-[#1E3A2B]">₹45</span>
                      <span className="text-sm text-gray-400 line-through font-medium">₹60</span>
                      <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Save ₹15</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActivePage('product')}
                    className="text-xs font-bold text-[#2E6F40] hover:text-[#1E3A2B] underline flex items-center gap-1"
                  >
                    Full Specs <ArrowRight size={12} />
                  </button>
                </div>

                {/* Micro guarantees */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 pt-2 border-t border-emerald-50">
                  <span className="flex items-center gap-1">✓ 6 Extra Large Pads</span>
                  <span className="flex items-center gap-1">✓ 40–50ml Natural Flow</span>
                  <span className="flex items-center gap-1">✓ No Rashes / Itchiness</span>
                  <span className="flex items-center gap-1">✓ 100% Bio-compostable</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM SECTION (IMPORTED COMPONENT) */}
      <ProblemSection onShopClick={() => setActivePage('shop')} />

      {/* 3. MATERIAL & INNOVATION BREAKDOWN */}
      <section className="py-20 bg-white border-y border-[#E8F5E9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#488B57] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              Nature-Powered Science
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A2B]">
              How We Turn Invasive Weeds Into Safe Menstrual Care
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              In Tamil Nadu lakes, water hyacinth is an invasive weed choking freshwater bodies. We upcycle it along with agricultural banana stem waste to create super-absorbent organic core layers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Material 1 */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-emerald-100 space-y-4 hover:shadow-soft transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#2E6F40] text-white flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h3 className="font-bold text-lg text-[#1E3A2B]">Banana Tree Stem Fiber</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Extracted from discarded banana trunks after fruit harvest in rural Tamil Nadu. High tensile strength, anti-bacterial by nature, and soft on sensitive skin.
              </p>
            </div>

            {/* Material 2 */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-emerald-100 space-y-4 hover:shadow-soft transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#2E6F40] text-white flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h3 className="font-bold text-lg text-[#1E3A2B]">Water Hyacinth Pulp</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Removed from choked lakes in Chennai & Coimbatore, sun-dried, and refined into a high-capacity absorbent mat that easily holds 40–50ml liquid naturally without SAP chemicals.
              </p>
            </div>

            {/* Material 3 */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-emerald-100 space-y-4 hover:shadow-soft transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#2E6F40] text-white flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h3 className="font-bold text-lg text-[#1E3A2B]">Organic Cotton Top Sheet</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                100% unbleached, toxin-free top sheet that feels feather-light against intimate skin. No artificial fragrances, no plastic mesh, zero chafing or redness.
              </p>
            </div>

            {/* Material 4 */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-emerald-100 space-y-4 hover:shadow-soft transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#2E6F40] text-white flex items-center justify-center font-bold text-xl">
                4
              </div>
              <h3 className="font-bold text-lg text-[#1E3A2B]">Bioplastic Leak Guard</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Plant-derived cornstarch film prevents leaks onto clothing while remaining completely breathable and 100% bio-compostable in soil within 180 days.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. REVIEWS & TESTIMONIALS */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <div className="flex justify-center gap-1 text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <h2 className="font-heading text-3xl font-bold text-[#1E3A2B]">Loved By Women Across Tamil Nadu</h2>
            <p className="text-xs text-gray-600">Real feedback from early adopters in Chennai, Coimbatore, Madurai, and Trichy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-soft space-y-4">
              <div className="flex text-amber-400 gap-1"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                "I used to suffer from severe rashes every month with plastic pads. Switching to ilai banana fiber pads completely solved it! Extremely soft and so lightweight."
              </p>
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="font-bold text-[#1E3A2B]">Divya M.</span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Chennai</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-soft space-y-4">
              <div className="flex text-amber-400 gap-1"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                "Finding an affordable plastic-free pad for ₹45 per pack is amazing. Plus, knowing it comes from upcycled water hyacinth from our TN lakes makes me feel so proud!"
              </p>
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="font-bold text-[#1E3A2B]">Sangeetha V.</span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Coimbatore</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-soft space-y-4">
              <div className="flex text-amber-400 gap-1"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                "Order reached Madurai in just 2 days via ST Courier. The GPay payment process was smooth and receipt confirmation was emailed instantly."
              </p>
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="font-bold text-[#1E3A2B]">Meena R.</span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Madurai</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION */}
      <section className="bg-[#1E3A2B] text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <span className="bg-[#2E6F40] text-emerald-200 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-emerald-600 inline-block">
            Join The Eco-Period Movement
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
            Ready For A Healthier Period & Clean Oceans?
          </h2>
          <p className="text-emerald-100/80 text-sm sm:text-base max-w-2xl mx-auto">
            Try your first pack of ilai XL Biodegradable Pads (6 Pads) for just ₹45 today. Shipping across Tamil Nadu.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => addToCart(sampleProduct, 1)}
              className="w-full sm:w-auto bg-[#2E6F40] hover:bg-[#255A33] text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-base"
            >
              <Leaf size={18} />
              <span>Add XL Pack to Cart (₹45)</span>
            </button>
            <button
              onClick={() => setActivePage('shop')}
              className="w-full sm:w-auto border border-emerald-400/50 hover:bg-emerald-900/50 text-white font-bold px-8 py-4 rounded-xl transition-all"
            >
              View Shop Details
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
