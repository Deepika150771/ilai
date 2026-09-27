import React, { useState } from 'react';
import { Leaf, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, ShoppingBag, ArrowRight, Sparkles, RefreshCw, Droplets, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductDetails = ({ setActivePage }) => {
  const { addToCart } = useCart();
  const [openFaq, setOpenFaq] = useState(null);

  const product = {
    id: 'pad-xl-6',
    title: 'ilai XL Biodegradable Sanitary Pads (6 Pads Pack)',
    price: 45,
    mrp: 60,
    pack_details: '6 pads per pack | XL size (290mm) | Banana Fibre & Water Hyacinth Core'
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Can a plant-based pad without SAP chemicals really prevent leakage?",
      a: "Yes! Our core is made of upcycled water hyacinth fiber which has exceptional micro-capillary absorption properties. Each pad holds 40–50ml of liquid, while an average menstrual cycle flow is around 30ml total across all days. The bottom layer is a breathable cornstarch bioplastic film that guarantees zero leakage onto clothing."
    },
    {
      q: "How long does the pad take to decompose in normal soil?",
      a: "Because ilai pads contain zero plastic, synthetic gels, or non-woven polyester, they break down completely into nutrient-rich soil compost within 180 days in normal soil or backyard compost pits."
    },
    {
      q: "Why are ilai pads safer for sensitive intimate skin?",
      a: "Conventional pads contain chlorine-bleached wood pulp, synthetic fragrances, and petroleum-derived SAP polymer gels that trap heat and moisture, leading to bacterial growth, itching, and rashes. ilai uses unbleached organic cotton and plant fibers with zero toxic chemicals."
    },
    {
      q: "Why is shipping restricted to Tamil Nadu?",
      a: "To keep our carbon footprint strictly minimal and maintain fast 2-3 day local delivery guarantees at a flat ₹40 fee, we currently ship directly from our production hubs in Chennai & Coimbatore across all districts of Tamil Nadu."
    }
  ];

  return (
    <div className="py-12 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Breadcrumb Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-200 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#2E6F40] text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
              <Sparkles size={14} /> Full Technical Specifications
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1E3A2B]">
              ilai XL Biodegradable Pads (6 Pack)
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Made from Banana Fibre & Upcycled Water Hyacinth • 100% Plastic Free
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="text-xs text-gray-400 line-through">MRP ₹60</span>
              <div className="text-3xl font-extrabold text-[#1E3A2B]">₹45</div>
            </div>
            <button
              onClick={() => { addToCart(product, 1); setActivePage('cart'); }}
              className="bg-[#2E6F40] hover:bg-[#255A33] text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm"
            >
              <ShoppingBag size={18} />
              <span>Buy Now</span>
            </button>
          </div>
        </div>

        {/* 4 Detailed Feature Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2E6F40] flex items-center justify-center font-bold">
              <Leaf size={22} />
            </div>
            <h3 className="font-bold text-base text-[#1E3A2B]">Banana Fiber Core</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Sourced from post-harvest banana stems in Tamil Nadu. High natural absorbency, anti-microbial properties, and 100% chemical-free.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2E6F40] flex items-center justify-center font-bold">
              <Droplets size={22} />
            </div>
            <h3 className="font-bold text-base text-[#1E3A2B]">Water Hyacinth Layer</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Upcycled invasive aquatic weed pulp. Provides 40–50ml liquid retention capacity naturally without artificial gel beads.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2E6F40] flex items-center justify-center font-bold">
              <ShieldCheck size={22} />
            </div>
            <h3 className="font-bold text-base text-[#1E3A2B]">0% SAP & Chlorine</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Zero synthetic absorbents (SAP), zero chlorine bleaching dioxins, zero fragrances. Hypoallergenic care for zero rash risk.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2E6F40] flex items-center justify-center font-bold">
              <RefreshCw size={22} />
            </div>
            <h3 className="font-bold text-base text-[#1E3A2B]">180-Day Degradation</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Decomposes into harmless organic soil compost within 6 months, unlike regular plastic pads that last 500+ years.
            </p>
          </div>

        </div>

        {/* Technical Specification Table */}
        <div className="bg-white rounded-3xl border border-emerald-200 shadow-card p-6 sm:p-8 space-y-6">
          <h2 className="font-heading text-2xl font-bold text-[#1E3A2B] border-b border-gray-100 pb-4">
            Product Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Pack Quantity</span>
              <span className="font-bold text-[#1E3A2B]">6 XL Sanitary Pads per pack</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Pad Dimension</span>
              <span className="font-bold text-[#1E3A2B]">290mm (Extra Large Heavy Flow)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Absorbent Core</span>
              <span className="font-bold text-[#1E3A2B]">Banana Tree Stem Fiber + Water Hyacinth</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Absorbency Capacity</span>
              <span className="font-bold text-[#1E3A2B]">40ml - 50ml Natural Fluid Retention</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Top Sheet</span>
              <span className="font-bold text-[#1E3A2B]">100% Unbleached Organic Cotton</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Leak Proof Barrier</span>
              <span className="font-bold text-[#1E3A2B]">Plant-based Cornstarch Bio-Film</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Chemical Additives</span>
              <span className="font-bold text-rose-600">0% SAP Gel, 0% Chlorine, 0% Fragrance</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Delivery Scope</span>
              <span className="font-bold text-[#2E6F40]">State of Tamil Nadu Only (Flat ₹40)</span>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-3xl border border-emerald-200 shadow-card p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#488B57]">Frequently Asked Questions</span>
            <h2 className="font-heading text-2xl font-bold text-[#1E3A2B]">Everything You Need To Know</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-emerald-100 rounded-2xl overflow-hidden transition-all bg-[#FAF7F2]"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 flex items-center justify-between font-bold text-sm text-[#1E3A2B] hover:text-[#2E6F40] transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  {openFaq === index ? <ChevronUp size={18} className="text-[#2E6F40]" /> : <ChevronDown size={18} className="text-gray-400" />}
                </button>
                {openFaq === index && (
                  <div className="p-5 pt-0 text-xs text-gray-600 leading-relaxed border-t border-emerald-100/60 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
