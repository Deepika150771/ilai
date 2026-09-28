import React, { useState } from 'react';
import { Leaf, ShieldCheck, Heart, Sparkles, ArrowRight, Truck, RefreshCw, CheckCircle2, Award, Star, MapPin, MessageSquarePlus } from 'lucide-react';
import { ProblemSection } from '../components/ProblemSection';
import { ReviewModal } from '../components/ReviewModal';
import { useCart } from '../context/CartContext';

export const Home = ({ setActivePage }) => {
  const { addToCart, reviews, addReview } = useCart();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

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
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F0F7F1] via-white to-[#E8F3EA] pt-12 pb-20 lg:pt-20 lg:pb-28">
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
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-200 shadow-2xl space-y-5 relative overflow-hidden group">
                
                <div className="absolute top-4 right-4 bg-amber-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow z-10">
                  25% OFF
                </div>

                {/* Hero Real Product Image */}
                <div 
                  onClick={() => setActivePage('shop')}
                  className="rounded-2xl bg-gradient-to-br from-[#FAF7F2] via-emerald-50 to-amber-50/50 flex flex-col items-center justify-center p-3 border border-emerald-200 relative overflow-hidden cursor-pointer group/img"
                >
                  <img
                    src="/images/ilai_box_front.jpg"
                    alt="ILAI Sustainable Femcare Box"
                    className="w-full h-56 sm:h-64 object-contain rounded-xl transition-transform duration-300 group-hover/img:scale-105"
                  />
                  <div className="mt-2 bg-white/95 backdrop-blur px-3 py-1 rounded-full border border-emerald-200 text-xs font-bold text-[#1E3A2B] shadow-sm flex items-center gap-1.5">
                    <Sparkles size={12} className="text-amber-500" />
                    <span>ILAI Sanitary Napkins (6 Pads Pack)</span>
                  </div>
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
                    className="bg-[#2E6F40] hover:bg-[#255A33] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 shadow transition-all"
                  >
                    <span>View Photos</span> <ArrowRight size={14} />
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
      <section className="py-20 bg-gradient-to-b from-[#E8F3EA] via-white to-[#F0F7F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="flex justify-center gap-1 text-amber-500 mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="currentColor" />)}
            </div>
            <h2 className="font-heading text-3xl font-bold text-[#1E3A2B]">Loved By Women Across Tamil Nadu</h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Real feedback and ratings from customers in Chennai, Coimbatore, Madurai, Trichy, and Salem.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(true)}
                className="bg-[#2E6F40] hover:bg-[#255A33] text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md transition-all inline-flex items-center gap-2"
              >
                <MessageSquarePlus size={16} />
                <span>Rate Our Product & Leave Feedback ⭐</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(reviews && reviews.length > 0 ? reviews : [
              { id: 1, customer_name: "Divya M.", district: "Chennai", rating: 5, comment: "I used to suffer from severe rashes every month with plastic pads. Switching to ILAI plant-based pads completely solved it! Extremely soft and so lightweight." },
              { id: 2, customer_name: "Sangeetha V.", district: "Coimbatore", rating: 5, comment: "Finding an affordable plastic-free pad for ₹45 per pack is amazing. Plus, knowing it comes from upcycled plant fibres makes me feel so proud!" },
              { id: 3, customer_name: "Meena R.", district: "Madurai", rating: 5, comment: "Order reached Madurai in just 2 days via ST Courier. The Cash on Delivery process was smooth and receipt confirmation was emailed instantly." }
            ]).map(rev => (
              <div key={rev.id || Math.random()} className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-soft space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(rev.rating || 5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed font-medium">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1E3A2B]">{rev.customer_name || 'Verified Customer'}</span>
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">{rev.district || 'Tamil Nadu'}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Review Submission Modal */}
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          onReviewSubmitted={(newRev) => {
            if (addReview) addReview(newRev);
          }}
        />
      </section>

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
