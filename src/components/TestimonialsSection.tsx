import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { Testimonial } from '../types';
import { Star, Play, Quote, MapPin, X, Sparkles } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<Testimonial | null>(null);

  return (
    <section className="py-24 md:py-32 bg-[#F8F7F4] dark:bg-[#121312] border-b border-[#ECECEC] dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[1px] w-12 bg-[#B76E4A]" />
              <span className="text-[#B76E4A] text-[11px] uppercase tracking-[0.3em] font-bold">
                Client Endorsements
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#1C1C1C] dark:text-white tracking-tight leading-tight">
              Trusted by Discerning Homeowners & Institutional Developers.
            </h2>
          </div>
          <p className="text-base text-[#555555] dark:text-gray-300 max-w-md">
            Hear directly from our clients about their experience building with Triarch Ventures.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-[#1C1D1C] rounded-3xl p-8 border border-[#ECECEC] dark:border-white/10 shadow-lg flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
            >
              <div>
                {/* Video Thumbnail Header if available */}
                {t.videoThumbnail && (
                  <div
                    onClick={() => setActiveVideo(t)}
                    className="relative h-48 rounded-2xl overflow-hidden mb-6 cursor-pointer group bg-stone-900 border border-black/10"
                  >
                    <img src={t.videoThumbnail} alt={t.clientName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white text-[#1C1C1C] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 ml-1 fill-current text-[#4E6B5A]" />
                      </div>
                    </div>
                    {t.keyMetric && (
                      <div className="absolute bottom-3 left-3 bg-[#1C1C1C]/90 backdrop-blur-md text-amber-200 px-3 py-1 rounded-md text-[11px] font-mono font-bold">
                        ★ {t.keyMetric}
                      </div>
                    )}
                  </div>
                )}

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <blockquote className="text-base sm:text-lg text-[#1C1C1C] dark:text-gray-100 font-normal leading-relaxed mb-6 italic">
                  "{t.quote}"
                </blockquote>
              </div>

              <div className="pt-6 border-t border-[#ECECEC] dark:border-white/10 flex items-center gap-4">
                <img src={t.avatar} alt={t.clientName} className="w-12 h-12 rounded-full object-cover border border-[#4E6B5A]" />
                <div>
                  <h4 className="text-sm font-heading font-bold text-[#1C1C1C] dark:text-white">
                    {t.clientName}
                  </h4>
                  <p className="text-xs text-[#555555] dark:text-gray-400">
                    {t.roleTitle} • <span className="text-[#4E6B5A] dark:text-[#B76E4A] font-semibold">{t.companyOrProject}</span>
                  </p>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    {t.projectLocation}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-black rounded-3xl overflow-hidden z-10 shadow-2xl border border-white/20 p-2"
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-stone-900 flex flex-col justify-end p-8" style={{ backgroundImage: `url(${activeVideo.videoThumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 text-white space-y-3">
                  <span className="px-3 py-1 rounded-full bg-[#4E6B5A] text-xs font-bold uppercase">
                    Video Case Interview
                  </span>
                  <h3 className="text-2xl font-heading font-bold">{activeVideo.companyOrProject}</h3>
                  <p className="text-sm text-gray-200">{activeVideo.quote}</p>
                  <div className="text-xs text-amber-300 font-mono">
                    Client: {activeVideo.clientName} ({activeVideo.projectLocation})
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
