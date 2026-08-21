import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, SlidersHorizontal, CheckCircle2 } from 'lucide-react';

export const Introduction: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPos(percentage);
  };

  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#F8F7F4] dark:bg-[#121312] border-b border-[#ECECEC] dark:border-white/10 transition-colors overflow-hidden">
      {/* Background Architectural Grid Overlay */}
      <div className="absolute inset-0 bg-grid-dots opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Large Statement Typography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          <div className="lg:col-span-5">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[1px] w-12 bg-[#B76E4A]" />
              <span className="text-[#B76E4A] text-[11px] uppercase tracking-[0.3em] font-bold">
                Studio Philosophy
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#1C1C1C] dark:text-white leading-[1.1] tracking-tight">
              Multidisciplinary Mastery Under One Roof.
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-heading font-medium text-[#1C1C1C] dark:text-gray-100 leading-snug tracking-tight mb-8">
              "We design spaces that balance{' '}
              <span className="font-serif italic text-[#4E6B5A] dark:text-[#769b82] underline decoration-[#B76E4A]/40 underline-offset-8">
                beauty
              </span>
              ,{' '}
              <span className="font-serif italic text-[#B76E4A] underline decoration-[#4E6B5A]/40 underline-offset-8">
                function
              </span>{' '}
              and buildability."
            </blockquote>

            <p className="text-base sm:text-lg text-[#555555] dark:text-gray-300 font-normal leading-relaxed">
              Founded on the belief that world-class architecture emerges from seamless collaboration between designers, structural engineers, and project managers. Triarch Ventures eliminates friction between artistic concept and site reality.
            </p>
          </div>
        </div>

        {/* Interactive Before & After Render vs Reality Slider */}
        <div className="my-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-heading font-bold text-[#1C1C1C] dark:text-white flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#B76E4A]" />
                <span>Render vs. Completed Reality</span>
              </h3>
              <p className="text-sm text-[#555555] dark:text-gray-400">
                Drag the divider below to compare our 3D parametric visualization with the finished villa in Kileleshwa.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-[#555555] dark:text-gray-300">
              <span className="px-2.5 py-1 rounded bg-[#1C1C1C] text-white">3D Render (Left)</span>
              <span>vs</span>
              <span className="px-2.5 py-1 rounded bg-[#4E6B5A] text-white">Built Reality (Right)</span>
            </div>
          </div>

          <div
            className="relative h-[380px] sm:h-[500px] md:h-[600px] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none border border-[#ECECEC] dark:border-white/10 shadow-2xl"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
          >
            {/* After Image (Full background) */}
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85"
              alt="Completed Villa Reality"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-md text-xs font-mono">
              Built Structure
            </div>

            {/* Before Image (Clipped overlay) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1800&q=85"
                alt="Initial Construction Phase"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-md text-xs font-mono">
                Initial Site Work
              </div>
            </div>

            {/* Drag Handle Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-9 h-9 rounded-full bg-white text-[#1C1C1C] shadow-2xl border-2 border-[#4E6B5A] flex items-center justify-center text-xs font-bold">
                ↔
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <div className="p-8 rounded-2xl bg-white dark:bg-[#1C1D1C] border border-[#ECECEC] dark:border-white/10 shadow-xs hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#4E6B5A]/10 text-[#4E6B5A] dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-heading font-bold text-[#1C1C1C] dark:text-white mb-3">
              Climate-Responsive Form
            </h4>
            <p className="text-sm text-[#555555] dark:text-gray-300 leading-relaxed">
              Every orientation, cantilever overhang, and window aperture is calculated using local solar path data to eliminate heat gain and maximize natural ventilation.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-[#1C1D1C] border border-[#ECECEC] dark:border-white/10 shadow-xs hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#B76E4A]/10 text-[#B76E4A] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-heading font-bold text-[#1C1C1C] dark:text-white mb-3">
              In-House Engineering Synergy
            </h4>
            <p className="text-sm text-[#555555] dark:text-gray-300 leading-relaxed">
              Structural and MEP engineering are integrated into the architectural 3D BIM model from day one, eliminating costly site collisions and contractor rework.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-[#1C1D1C] border border-[#ECECEC] dark:border-white/10 shadow-xs hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#1C1C1C]/10 dark:bg-white/10 text-[#1C1C1C] dark:text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-heading font-bold text-[#1C1C1C] dark:text-white mb-3">
              On-Budget Guarantee
            </h4>
            <p className="text-sm text-[#555555] dark:text-gray-300 leading-relaxed">
              Our quantity surveying and contract administration methodologies ensure project variations are strictly controlled, protecting your return on capital.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
