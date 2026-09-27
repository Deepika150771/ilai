import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle, Droplets, Leaf, ShieldCheck, Clock } from 'lucide-react';

export const ProblemSection = ({ onShopClick }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#FAF7F2] via-emerald-50/50 to-[#FAF7F2] relative overflow-hidden">
      {/* Decorative leaf background elements */}
      <div className="absolute top-10 left-4 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-4 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-200">
            <AlertTriangle size={14} className="text-amber-600" />
            <span>The Hidden Crisis In Menstrual Hygiene</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A2B] tracking-tight">
            Why Regular Plastic Pads Are Harmful To You & The Environment
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Most commercial sanitary napkins look white and clean, but they hide synthetic chemicals, non-biodegradable plastics, and toxic absorbents. Here is the truth behind regular pads.
          </p>
        </div>

        {/* 4 Core Problem Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Problem 1 */}
          <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-soft hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <XCircle size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">90% Plastic Content</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              A single conventional sanitary pad contains plastic equivalent to <strong>4 plastic grocery bags</strong>. Each pad takes <strong>500+ years</strong> to decompose in landfills.
            </p>
          </div>

          {/* Problem 2 */}
          <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-soft hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Droplets size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Harmful SAP Chemicals</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Regular pads rely on synthetic <strong>Super Absorbent Polymers (SAP)</strong> — petroleum-derived gels that trap heat, cause rashes, severe chafing, and toxic shock risks.
            </p>
          </div>

          {/* Problem 3 */}
          <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-soft hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <AlertTriangle size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Chlorine Bleached Pulp</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              To look bright white, wood pulp in regular pads is bleached with chlorine, releasing carcinogenic dioxins that come into direct contact with intimate skin.
            </p>
          </div>

          {/* Problem 4 */}
          <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-soft hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clock size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">123,000 Tons Waste</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              India generates over 12 billion discarded plastic sanitary pads every year, choking municipal drains, incinerators, and soil across states like Tamil Nadu.
            </p>
          </div>

        </div>

        {/* Direct Comparison Box: Regular Plastic Pad vs ilai Natural Pad */}
        <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl overflow-hidden">
          <div className="bg-[#1E3A2B] text-white p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-emerald-400 font-semibold text-xs uppercase tracking-widest block mb-1">Side-By-Side Comparison</span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold">The Difference You Feel Every Cycle</h3>
            </div>
            <div className="bg-[#2E6F40] text-emerald-100 text-xs font-semibold px-4 py-2 rounded-full border border-emerald-500">
              🌿 100% Plant-Based Innovation
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            
            {/* Left: Conventional Pad */}
            <div className="p-8 bg-rose-50/40 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-lg">✕</div>
                <h4 className="font-bold text-xl text-rose-950">Regular Plastic Pads</h4>
              </div>

              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <XCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>90% Plastic:</strong> Plastic top layer, backing sheet, and individual wrappers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>SAP Synthetic Gel:</strong> Traps moisture, causes heat build-up and bacterial growth.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Chlorine Dioxins:</strong> Chemically bleached pulp causing skin sensitivity & allergies.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>500+ Years Waste:</strong> Remains in landfills forever without breaking down.</span>
                </li>
              </ul>
            </div>

            {/* Right: ilai Biodegradable Pad */}
            <div className="p-8 bg-emerald-50/60 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2E6F40] text-white flex items-center justify-center font-bold text-lg">✓</div>
                <div>
                  <h4 className="font-bold text-xl text-[#1E3A2B]">ilai Organic Pads</h4>
                  <span className="text-xs text-[#488B57] font-semibold">Banana Fibre & Water Hyacinth</span>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-gray-800">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#2E6F40] shrink-0 mt-0.5" />
                  <span><strong>100% Plastic Free:</strong> Natural plant fibres, breathable organic corn-starch leak barrier.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#2E6F40] shrink-0 mt-0.5" />
                  <span><strong>NO SAP Gel (40–50ml Capacity):</strong> High natural absorbency upcycled water hyacinth core comfortably covering average daily flow (&lt;30ml).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#2E6F40] shrink-0 mt-0.5" />
                  <span><strong>Unbleached & Hypoallergenic:</strong> Super soft, chemical-free top sheet designed for intimate comfort.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#2E6F40] shrink-0 mt-0.5" />
                  <span><strong>100% Biodegradable (180 Days):</strong> Completely decomposes into rich soil compost in 6 months.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Call to Action */}
          <div className="p-6 bg-gradient-to-r from-emerald-100 via-amber-50 to-emerald-100 text-center flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-emerald-200">
            <div className="text-left">
              <p className="font-bold text-[#1E3A2B] text-base">Make the Switch to Plastic-Free Period Care Today!</p>
              <p className="text-xs text-gray-600">6 XL Pads per pack • ₹45 promotional offer (Reg ₹60) • Tamil Nadu Delivery</p>
            </div>
            <button
              onClick={onShopClick}
              className="bg-[#2E6F40] hover:bg-[#255A33] text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 flex items-center gap-2 shrink-0"
            >
              <Leaf size={18} />
              <span>Switch to ilai (₹45)</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
