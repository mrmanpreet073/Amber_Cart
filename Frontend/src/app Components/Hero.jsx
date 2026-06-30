import React from 'react';
import { ArrowRight, ShoppingBag, Percent, ShieldCheck } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-amber-50/70 via-stone-50 to-white overflow-hidden">
      
      {/* Decorative subtle background glow patterns */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-orange-100/40 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Text Content (Occupies 7 columns on desktop) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/60 text-xs font-bold text-amber-800 uppercase tracking-wider mx-auto lg:mx-0">
              <Percent className="h-3.5 w-3.5 text-amber-600" />
              Summer Collection 2026
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-stone-900 tracking-tight leading-[1.1]">
              Carefully Curated <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                Marketplace Essentials
              </span>
            </h1>

            {/* Sub-headline Description */}
            <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover a premium shopping experience featuring products hand-selected for quality. Beautifully warm styles that are exceptionally secure and genuinely easy on your eyes.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button className="w-full sm:w-auto h-12 px-6 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl shadow-md shadow-amber-600/10 flex items-center justify-center gap-2 transition-all hover:translate-x-0.5 cursor-pointer group">
                Shop Collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button className="w-full sm:w-auto h-12 px-6 bg-white hover:bg-stone-50 text-stone-700 font-medium border border-stone-200 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer">
                View Deals
              </button>
            </div>

            {/* Core trust factors bar */}
            <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-xs font-medium text-stone-500">
              <div className="flex items-center gap-1.5">
                <ShoppingBag className="h-4 w-4 text-amber-600" /> Free Shipping Over $50
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-amber-600" /> 2-Year Warranty Included
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Dynamic Image Grid Showcase (Occupies 5 columns on desktop, hidden or stacked elegantly) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none grid grid-cols-12 gap-4">
              
              {/* Primary Large Image Frame */}
              <div className="col-span-8 overflow-hidden rounded-3xl border-4 border-white shadow-xl shadow-stone-200/80 aspect-[3/4] bg-stone-100">
                <img 
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800" 
                  alt="Premium summer fashion attire setup"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Secondary Offset Smaller Image Frame */}
              <div className="col-span-4 flex flex-col gap-4 pt-12">
                <div className="overflow-hidden rounded-2xl border-4 border-white shadow-lg shadow-stone-200/60 aspect-square bg-stone-100">
                  <img 
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400" 
                    alt="Curated retail shop showcase items"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="overflow-hidden rounded-2xl border-4 border-white shadow-lg shadow-stone-200/60 aspect-[4/5] bg-stone-100">
                  <img 
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400" 
                    alt="Minimalist design tech product lifestyle"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Small accent floating stats banner box for visual interest */}
              <div className="absolute -bottom-4 left-6 bg-white border border-stone-100 p-3 rounded-2xl shadow-xl shadow-stone-900/5 flex items-center gap-3 animate-bounce duration-1000">
                <div className="flex -space-x-2">
                  <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80" alt="Customer avatar" />
                  <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80" alt="Customer avatar" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Trusted By</p>
                  <p className="text-xs font-bold text-stone-800">12k+ Happy Shoppers</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      
    </section>
  );
}