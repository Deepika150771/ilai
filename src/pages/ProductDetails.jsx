import React, { useState } from 'react';
import { Leaf, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, ShoppingBag, ArrowRight, Sparkles, RefreshCw, Droplets, Info, Maximize2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductDetails = ({ setActivePage }) => {
  const { addToCart } = useCart();
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);

  const productImages = [
    {
      url: '/images/ilai_box_front.jpg',
      title: 'ILAI Box Front View',
      subtitle: '6 Pads Outer Packaging with Gold Trim'
    },
    {
      url: '/images/ilai_box_open.jpg',
      title: 'Open Box View',
      subtitle: '6 Individually Wrapped Sanitary Napkin Pouches'
    },
    {
      url: '/images/ilai_wrapper_front.jpg',
      title: 'Individual Napkin Pouch Front',
      subtitle: 'Sealed Hygienic Eco Wrapper'
    },
    {
      url: '/images/ilai_box_back.jpg',
      title: 'Box Back Details',
      subtitle: 'Ingredients, Usage Steps, Batch & Care Contact'
    },
    {
      url: '/images/ilai_wrapper_back.jpg',
      title: 'Individual Napkin Pouch Back',
      subtitle: 'Plant-Based Layers & Usage Instructions'
    },
    {
      url: '/images/ilai_box_top.jpg',
      title: 'Box Lid View',
      subtitle: 'Premium Dark Green & Gold Lid Emblem'
    }
  ];

  const product = {
    id: 'pad-xl-6',
    title: 'ILAI Sustainable Femcare Sanitary Napkins (6 Pads Pack)',
    price: 45,
    mrp: 60,
    pack_details: '6 pads per pack | XL size (290mm) | Plant-based Absorbent Core'
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Can a plant-based pad without SAP chemicals really prevent leakage?",
      a: "Yes! Our core is made of upcycled plant fibres and water hyacinth pulp with exceptional micro-capillary absorption properties. Each pad holds 40–50ml of liquid, while an average menstrual cycle flow is around 30ml total across all days. The bottom layer is a breathable cornstarch bioplastic film that guarantees zero leakage onto clothing."
    },
    {
      q: "How long does the pad take to decompose in normal soil?",
      a: "Because ILAI pads contain zero plastic, synthetic gels, or non-woven polyester, they break down completely into nutrient-rich soil compost within 180 days in normal soil or backyard compost pits."
    },
    {
      q: "Why are ILAI pads safer for sensitive intimate skin?",
      a: "Conventional pads contain chlorine-bleached wood pulp, synthetic fragrances, and petroleum-derived SAP polymer gels that trap heat and moisture, leading to bacterial growth, itching, and rashes. ILAI uses unbleached organic plant fibres with zero toxic chemicals."
    },
    {
      q: "Why is shipping restricted to Tamil Nadu?",
      a: "To keep our carbon footprint strictly minimal and maintain fast 2-3 day local delivery guarantees at a flat ₹40 fee, we currently ship directly from our production hubs in Chennai & Coimbatore across all districts of Tamil Nadu."
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-b from-[#F0F7F1] via-white to-[#E8F3EA] min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Breadcrumb Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-200 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#2E6F40] text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
              <Sparkles size={14} /> Official Technical Specifications & Photo Gallery
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1E3A2B]">
              ILAI Sustainable Femcare Napkins (6 Pack)
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Plant-Based Absorbent Core • 100% Biodegradable • Made in India
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

        {/* High Resolution Product Photos Gallery */}
        <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#1E3A2B]">
                Official Product Photos & Packaging Overview
              </h2>
              <p className="text-xs text-gray-500">Click any image to view full high-resolution detail.</p>
            </div>

            <span className="text-xs font-bold text-[#2E6F40] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              6 Official Angles
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Main Featured Photo */}
            <div className="lg:col-span-8 relative group bg-gradient-to-br from-[#FAF7F2] to-emerald-50/60 rounded-2xl border border-emerald-200 p-4 flex items-center justify-center min-h-[360px] sm:min-h-[440px]">
              <img
                src={productImages[selectedImgIndex].url}
                alt={productImages[selectedImgIndex].title}
                className="w-full h-auto max-h-[420px] object-contain cursor-pointer transition-all duration-300 group-hover:scale-105 rounded-xl"
                onClick={() => setLightboxImg(productImages[selectedImgIndex].url)}
              />

              <div className="absolute bottom-4 left-4 bg-[#1E3A2B]/85 backdrop-blur text-white text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow">
                <Sparkles size={14} className="text-amber-300" />
                <span>{productImages[selectedImgIndex].title} — {productImages[selectedImgIndex].subtitle}</span>
              </div>

              <button
                type="button"
                onClick={() => setLightboxImg(productImages[selectedImgIndex].url)}
                className="absolute top-4 right-4 bg-white/90 text-[#1E3A2B] p-2.5 rounded-xl shadow border border-emerald-200 hover:bg-white transition-all"
                title="Expand image"
              >
                <Maximize2 size={18} />
              </button>
            </div>

            {/* Thumbnail Selectors Sidebar */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`p-2.5 rounded-2xl border transition-all text-left flex items-center gap-3 bg-white ${
                    selectedImgIndex === idx
                      ? 'border-[#2E6F40] ring-2 ring-emerald-300 shadow-md bg-emerald-50/40'
                      : 'border-gray-200 opacity-80 hover:opacity-100 hover:border-emerald-300'
                  }`}
                >
                  <div className="w-16 h-14 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0 p-0.5 flex items-center justify-center">
                    <img src={img.url} alt={img.title} className="w-full h-full object-contain rounded" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="font-bold text-xs text-[#1E3A2B] truncate">{img.title}</h4>
                    <p className="text-[10px] text-gray-500 truncate">{img.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* 4 Detailed Feature Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2E6F40] flex items-center justify-center font-bold">
              <Leaf size={22} />
            </div>
            <h3 className="font-bold text-base text-[#1E3A2B]">Plant-Based Materials</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Plant fibre absorbent core sourced naturally. Gentle on intimate skin, anti-microbial by nature, and chemical-free.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2E6F40] flex items-center justify-center font-bold">
              <Droplets size={22} />
            </div>
            <h3 className="font-bold text-base text-[#1E3A2B]">Soft & Absorbent</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Provides high fluid retention capacity naturally without artificial SAP gel beads or petroleum gels.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2E6F40] flex items-center justify-center font-bold">
              <ShieldCheck size={22} />
            </div>
            <h3 className="font-bold text-base text-[#1E3A2B]">0% Plastic & Chemicals</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Zero synthetic absorbents, zero chlorine bleaching dioxins, zero fragrances. Hypoallergenic care with zero rash risk.
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
            Official Product Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Product Category</span>
              <span className="font-bold text-[#1E3A2B]">Sanitary Napkins (6 Pads Pack)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Batch Number</span>
              <span className="font-bold text-[#1E3A2B] font-mono">ILAI-SEP26-001</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Manufacturing Date</span>
              <span className="font-bold text-[#1E3A2B]">09/2026 (Best Before: 09/2029)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Maximum Retail Price</span>
              <span className="font-bold text-[#2E6F40]">₹45.00 (Incl. of all taxes)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Top Sheet</span>
              <span className="font-bold text-[#1E3A2B]">Plant-based Soft Top Sheet</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Absorbent Core</span>
              <span className="font-bold text-[#1E3A2B]">Plant-based Absorbent Core</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Leak Proof Backing</span>
              <span className="font-bold text-[#1E3A2B]">Breathable Back Sheet</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Customer Care Phone</span>
              <span className="font-bold text-[#1E3A2B] font-mono">8072757497</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Customer Care Email</span>
              <span className="font-bold text-[#2E6F40]">info.ilaiofficial@gmail.com</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Origin</span>
              <span className="font-bold text-[#1E3A2B]">Made in India</span>
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

        {/* Lightbox Modal */}
        {lightboxImg && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-4xl w-full space-y-4 text-center shadow-2xl relative animate-scale">
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-xl font-bold bg-gray-100 hover:bg-gray-200 w-9 h-9 rounded-full flex items-center justify-center"
              >
                ✕
              </button>
              <h3 className="font-heading font-bold text-xl text-[#1E3A2B]">ILAI Product Photo View</h3>
              <div className="max-h-[78vh] overflow-auto rounded-2xl border border-gray-200 p-2 bg-[#FAF7F2]">
                <img src={lightboxImg} alt="Expanded ILAI View" className="max-w-full h-auto mx-auto rounded-xl object-contain max-h-[70vh]" />
              </div>
              <button
                onClick={() => setLightboxImg(null)}
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
