import React from 'react';
import { Leaf, Heart, ShieldCheck, RefreshCw, Users, MapPin, Award, Sparkles } from 'lucide-react';

export const About = ({ setActivePage }) => {
  return (
    <div className="py-12 bg-gradient-to-b from-[#F0F7F1] via-white to-[#E8F3EA] min-h-[85vh] space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#488B57] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            Our Tamil Nadu Origin Story
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#1E3A2B] leading-tight">
            Solving Two Environmental Crises With One Organic Innovation
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            <strong>ilai</strong> was born with a mission to eliminate plastic sanitary pads while cleansing our lakes and empowering local agricultural communities in Tamil Nadu.
          </p>
        </div>

        {/* The Dual Challenge Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white p-8 rounded-3xl border border-rose-100 shadow-soft space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xl">
              1
            </div>
            <h3 className="font-heading text-2xl font-bold text-[#1E3A2B]">The Plastic Pad Crisis</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Every month, millions of women use conventional plastic sanitary napkins containing petro-chemical SAP gels and synthetic covers. In Tamil Nadu alone, thousands of tons of non-biodegradable pad waste clutter landfills, taking over 500 years to decompose.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-soft space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#2E6F40] flex items-center justify-center font-bold text-xl">
              2
            </div>
            <h3 className="font-heading text-2xl font-bold text-[#1E3A2B]">The Water Hyacinth Weeds</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Invasive water hyacinth plants rapidly spread across lakes and water bodies in Chennai, Coimbatore, and Salem, suffocating aquatic life and blocking water flow. We harvest this weed and turn its fibrous core into a high-capacity natural absorbent.
            </p>
          </div>

        </div>

        {/* Circular Economy Flowcard */}
        <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#488B57]">Sustainable Circular Model</span>
            <h2 className="font-heading text-3xl font-bold text-[#1E3A2B]">From Tamil Nadu Fields To Eco-Period Care</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            <div className="text-center space-y-3 p-6 bg-[#FAF7F2] rounded-2xl border border-emerald-100">
              <div className="w-14 h-14 rounded-full bg-[#2E6F40] text-white flex items-center justify-center mx-auto shadow-md">
                <Leaf size={28} />
              </div>
              <h4 className="font-bold text-lg text-[#1E3A2B]">Ethical Raw Harvesting</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                We collect post-harvest banana stems from local farmers and clear invasive water hyacinth from TN lakes, generating green income for rural women workers.
              </p>
            </div>

            <div className="text-center space-y-3 p-6 bg-[#FAF7F2] rounded-2xl border border-emerald-100">
              <div className="w-14 h-14 rounded-full bg-[#2E6F40] text-white flex items-center justify-center mx-auto shadow-md">
                <Sparkles size={28} />
              </div>
              <h4 className="font-bold text-lg text-[#1E3A2B]">Clean Tech Processing</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Fibers are washed, sun-dried, and mechanically refined into absorbent sheets without chlorine bleach, SAP gels, or synthetic chemicals.
              </p>
            </div>

            <div className="text-center space-y-3 p-6 bg-[#FAF7F2] rounded-2xl border border-emerald-100">
              <div className="w-14 h-14 rounded-full bg-[#2E6F40] text-white flex items-center justify-center mx-auto shadow-md">
                <RefreshCw size={28} />
              </div>
              <h4 className="font-bold text-lg text-[#1E3A2B]">100% Soil Return</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                After use, ilai pads degrade in soil compost within 180 days, enriching the soil naturally without toxic microplastics.
              </p>
            </div>

          </div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-soft text-center space-y-2">
            <Users size={32} className="text-[#2E6F40] mx-auto" />
            <h4 className="font-bold text-base text-[#1E3A2B]">Women Self-Help Groups</h4>
            <p className="text-xs text-gray-600">Empowering rural women artisans across Tamil Nadu with fair wage employment.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-soft text-center space-y-2">
            <Heart size={32} className="text-[#2E6F40] mx-auto" />
            <h4 className="font-bold text-base text-[#1E3A2B]">Affordable Care (₹45)</h4>
            <p className="text-xs text-gray-600">Making organic, chemical-free period pads accessible to every woman at just ₹45/pack.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-soft text-center space-y-2">
            <MapPin size={32} className="text-[#2E6F40] mx-auto" />
            <h4 className="font-bold text-base text-[#1E3A2B]">Local TN Direct Delivery</h4>
            <p className="text-xs text-gray-600">Fast 2–3 day shipping directly to all districts of Tamil Nadu.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
