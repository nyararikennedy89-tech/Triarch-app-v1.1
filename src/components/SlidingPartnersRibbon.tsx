import React, { useState } from 'react';
import { KENYAN_PARTNER_BRANDS, PartnerBrand } from '../data/partnersData';
import { ShieldCheck, Sparkles, Building2, CheckCircle, ExternalLink, Award } from 'lucide-react';

export const SlidingPartnersRibbon: React.FC = () => {
  const [activePartner, setActivePartner] = useState<PartnerBrand | null>(null);

  // Split brands into two streams for a multi-directional double ribbon
  const row1 = KENYAN_PARTNER_BRANDS.slice(0, 7);
  const row2 = KENYAN_PARTNER_BRANDS.slice(7);

  // Duplicate for seamless infinite loop
  const infiniteRow1 = [...row1, ...row1, ...row1, ...row1];
  const infiniteRow2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <section className="py-12 sm:py-16 bg-[#F3F2EC] dark:bg-[#151715] border-y border-[#ECECEC] dark:border-white/10 relative overflow-hidden">
      
      {/* Subtle Gradient Overlays on Left & Right for Seamless Infinite Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#F3F2EC] dark:from-[#151715] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#F3F2EC] dark:from-[#151715] to-transparent z-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4E6B5A]/10 dark:bg-[#4E6B5A]/20 border border-[#4E6B5A]/30 text-[#4E6B5A] dark:text-[#A3B899] text-[11px] font-bold uppercase tracking-[0.25em] mb-2.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Direct Material Sourcing & Certified Supply Chain</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#1C1C1C] dark:text-white tracking-tight">
          Specified With Kenya’s Most Trusted Construction Manufacturers
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1.5 max-w-2xl mx-auto">
          We specify KEBS-certified materials sourced directly from primary mills and factories to guarantee structural longevity, avoid counterfeit rebars/cement, and eliminate middleman markups.
        </p>
      </div>

      {/* Ribbon Row 1 (Left to Right animation) */}
      <div className="overflow-hidden relative py-2 select-none">
        <div className="animate-marquee hover:pause">
          {infiniteRow1.map((brand, idx) => (
            <button
              key={`${brand.id}-r1-${idx}`}
              onClick={() => setActivePartner(brand)}
              className="mx-3 px-5 py-3.5 rounded-2xl bg-white dark:bg-[#1E201E] border border-[#ECECEC] dark:border-white/10 hover:border-[#4E6B5A] dark:hover:border-[#4E6B5A] shadow-xs hover:shadow-lg transition-all duration-300 flex items-center gap-3.5 text-left group shrink-0 cursor-pointer"
            >
              {/* Brand Color Indicator Block / Monogram */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-heading font-extrabold text-white text-xs shadow-xs shrink-0 transition-transform group-hover:scale-105"
                style={{ backgroundColor: brand.accentColor }}
              >
                {brand.logoText.slice(0, 3)}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-xs sm:text-sm text-[#1C1C1C] dark:text-white group-hover:text-[#4E6B5A] dark:group-hover:text-[#A3B899] transition-colors">
                    {brand.name}
                  </span>
                  {brand.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 font-medium">
                      {brand.badge}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">
                  <span className="font-medium text-[#B76E4A]">{brand.category}</span>
                  <span>•</span>
                  <span className="truncate max-w-[140px]">{brand.tagline}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Ribbon Row 2 (Right to Left animation) */}
      <div className="overflow-hidden relative py-2 mt-2 select-none">
        <div className="animate-marquee-reverse hover:pause">
          {infiniteRow2.map((brand, idx) => (
            <button
              key={`${brand.id}-r2-${idx}`}
              onClick={() => setActivePartner(brand)}
              className="mx-3 px-5 py-3.5 rounded-2xl bg-white dark:bg-[#1E201E] border border-[#ECECEC] dark:border-white/10 hover:border-[#B76E4A] dark:hover:border-[#B76E4A] shadow-xs hover:shadow-lg transition-all duration-300 flex items-center gap-3.5 text-left group shrink-0 cursor-pointer"
            >
              {/* Brand Color Indicator Block / Monogram */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-heading font-extrabold text-white text-xs shadow-xs shrink-0 transition-transform group-hover:scale-105"
                style={{ backgroundColor: brand.accentColor }}
              >
                {brand.logoText.slice(0, 3)}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-xs sm:text-sm text-[#1C1C1C] dark:text-white group-hover:text-[#B76E4A] transition-colors">
                    {brand.name}
                  </span>
                  {brand.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 font-medium">
                      {brand.badge}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">
                  <span className="font-medium text-[#4E6B5A] dark:text-[#A3B899]">{brand.category}</span>
                  <span>•</span>
                  <span className="truncate max-w-[140px]">{brand.tagline}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Partner Specification Modal */}
      {activePartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div
            className="w-full max-w-md bg-white dark:bg-[#1C1D1C] rounded-3xl p-6 sm:p-8 border border-[#ECECEC] dark:border-white/15 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePartner(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 flex items-center justify-center text-sm font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center font-heading font-bold text-white text-base shadow-sm shrink-0"
                style={{ backgroundColor: activePartner.accentColor }}
              >
                {activePartner.logoText.slice(0, 3)}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B76E4A]">
                  {activePartner.category}
                </span>
                <h4 className="text-lg font-heading font-bold text-[#1C1C1C] dark:text-white leading-tight">
                  {activePartner.name}
                </h4>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Origin: {activePartner.origin}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F7F4] dark:bg-white/5 border border-gray-100 dark:border-white/10 space-y-3 mb-6">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Core Product Line:</div>
                <div className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-0.5">
                  {activePartner.tagline}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Triarch Engineering Specification:</div>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed">
                  {activePartner.specNotes}
                </p>
              </div>

              {activePartner.badge && (
                <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-white/10 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Verified Standard: {activePartner.badge}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3">
              <a
                href="#kenya-hub"
                onClick={() => setActivePartner(null)}
                className="w-full text-center py-2.5 rounded-xl bg-[#4E6B5A] hover:bg-[#3D5547] text-white text-xs font-semibold uppercase tracking-wider transition-all"
              >
                View in BOQ Rate Index
              </a>
              <button
                onClick={() => setActivePartner(null)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
