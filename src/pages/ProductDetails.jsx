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
      url: '/images/ilai_pack_front.png',
      title: 'Product Pack Overview',
      subtitle: 'ilai 6-Packs XL Front Packaging'
    },
    {
      url: '/images/ilai_pad_detail.png',
      title: 'Pad Close-Up Detail View',
      subtitle: '290mm Pad with Organic Cotton Top Sheet'
    },
    {
      url: '/images/ilai_materials_showcase.png',
      title: 'Natural Eco Materials Overview',
      subtitle: 'Banana Tree Fibre & Upcycled Water Hyacinth'
    },
    {
      url: '/images/ilai_absorbency_demo.png',
      title: 'Absorbency & Leak Guard Demo',
      subtitle: '40-50ml Retention & Cornstarch Backing'
    }
  ];

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
              <Sparkles size={14} /> Full Technical Specifications & Photo Gallery
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

        {/* High Resolution Product Photos Gallery */}
        <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#1E3A2B]">
                Product Photos & Visual Overview
              </h2>
              <p className="text-xs text-gray-500">Click any image to view full high-resolution detail.</p>
            </div>

            <span className="text-xs font-bold text-[#2E6F40] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              4 HD Angles Available
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Main Featured Photo */}
            <div className="lg:col-span-8 relative group bg-gradient-to-br from-[#FAF7F2] to-emerald-50/60 rounded-2xl border border-emerald-200 p-4 flex items-center justify-center min-h-[360px] sm:min-h-[420px]">
              <img
                src={productImages[selectedImgIndex].url}
                alt={productImages[selectedImgIndex].title}
                className="w-full h-auto max-h-[400px] object-contain cursor-pointer transition-all duration-300 group-hover:scale-105"
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
                  className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-3 bg-white ${
                    selectedImgIndex === idx
                      ? 'border-[#2E6F40] ring-2 ring-emerald-300 shadow-md bg-emerald-50/40'
                      : 'border-gray-200 opacity-80 hover:opacity-100 hover:border-emerald-300'
                  }`}
                >
                  <div className="w-16 h-14 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0 p-1 flex items-center justify-center">
                    <img src={img.url} alt={img.title} className="w-full h-full object-contain" />
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

        {/* Lightbox Modal */}
        {lightboxImg && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-3xl w-full space-y-4 text-center shadow-2xl relative animate-scale">
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-xl font-bold bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center"
              >
                ✕
              </button>
              <h3 className="font-heading font-bold text-lg text-[#1E3A2B]">Full Resolution Photo View</h3>
              <div className="max-h-[75vh] overflow-auto rounded-2xl border border-gray-200 p-3 bg-[#FAF7F2]">
                <img src={lightboxImg} alt="Expanded Product View" className="max-w-full h-auto mx-auto rounded-xl object-contain" />
              </div>
              <button
                onClick={() => setLightboxImg(null)}
                className="bg-[#2E6F40] text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-[#255A33] transition-all"
              >
                Close Fullscreen Photo
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
