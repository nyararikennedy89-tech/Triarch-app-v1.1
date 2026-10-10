import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, ArrowUpRight, Compass, Building2, ShieldCheck, Award } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface HeroProps {
  onOpenConsultation: () => void;
}

const STAT_ICON_MAP = {
  Building2,
  Compass,
  ShieldCheck,
  Award,
};

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = siteConfig.hero.slides;

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleExploreClick = () => {
    const section = document.querySelector('#projects');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-8 overflow-hidden">
      {/* Background Slideshow with Parallax Motion Zoom */}
      <div className="absolute inset-0 z-0 bg-[#121312]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide]?.image || ''})` }}
          />
        </AnimatePresence>
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121312] via-[#121312]/50 to-[#121312]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121312]/80 via-transparent to-[#121312]/40" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-3 xs:px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 pt-16 sm:pt-24 md:pt-32 flex-1 flex flex-col justify-center">
        {/* Floating Geometry for "Architectural Render" feel */}
        <div className="hidden xl:block absolute top-24 right-16 w-72 h-[420px] border-[0.5px] border-white/20 transform skew-x-12 pointer-events-none" />
        <div className="hidden xl:block absolute top-40 right-36 w-56 h-80 border-[0.5px] border-[#B76E4A]/30 transform -skew-x-6 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="max-w-5xl 2xl:max-w-6xl"
        >
          {/* Eyebrow badge with rust line */}
          <div className="flex items-center space-x-3 mb-4 sm:mb-6">
            <div className="h-[1px] w-8 sm:w-12 bg-[#B76E4A]" />
            <span className="text-[#B76E4A] text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-bold">
              {siteConfig.hero.eyebrow}
            </span>
          </div>

          {/* Headline with Artistic Flair Serif Accent - Fully Responsive */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[100px] font-light text-white tracking-tight sm:tracking-tighter leading-[1.08] sm:leading-[0.95] mb-6 sm:mb-8 break-words">
            {siteConfig.hero.headingLine1}<br />
            <span className="italic font-serif text-[#4E6B5A] dark:text-[#769b82] font-light">{siteConfig.hero.headingAccent}</span> {siteConfig.hero.headingLine2}
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200/90 font-light leading-relaxed max-w-2xl mb-8 sm:mb-10">
            {siteConfig.hero.description}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5">
            <button
              onClick={onOpenConsultation}
              id="hero-start-project-btn"
              className="w-full sm:w-auto min-h-[48px] bg-[#1C1C1C] hover:bg-[#4E6B5A] text-white px-6 sm:px-8 py-3.5 sm:py-4 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-xl border border-white/20 flex items-center justify-center gap-3 group active:scale-98 cursor-pointer"
            >
              <span>{siteConfig.hero.primaryCtaText}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <button
              onClick={handleExploreClick}
              id="hero-explore-work-btn"
              className="w-full sm:w-auto min-h-[48px] bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-6 sm:px-8 py-3.5 sm:py-4 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center justify-center gap-3 active:scale-98 cursor-pointer"
            >
              <span>{siteConfig.hero.secondaryCtaText}</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Side Rail Text */}
      <div className="hidden lg:block absolute bottom-36 right-8 origin-bottom-right -rotate-90 z-20 pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.5em] text-white/40 font-bold whitespace-nowrap">
          {siteConfig.hero.sideRailText}
        </span>
      </div>

      {/* Bottom Floating Stats & Slide Switcher */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-3 xs:px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mt-8 sm:mt-12">
        <div className="pt-6 border-t border-white/15 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Slide Indicators */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 flex-wrap">
            <span className="text-xs font-mono text-gray-400">
              0{currentSlide + 1} / 0{slides.length}
            </span>
            <div className="flex items-center gap-2">
              {slides.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    currentSlide === idx ? 'w-8 bg-[#B76E4A]' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  title={slide.title}
                />
              ))}
            </div>
            {slides[currentSlide] && (
              <span className="text-xs text-white/80 font-medium hidden sm:inline ml-2 truncate max-w-xs md:max-w-md">
                {slides[currentSlide].title} ({slides[currentSlide].location})
              </span>
            )}
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 text-white w-full lg:w-auto">
            {siteConfig.hero.stats.map((stat, idx) => {
              const Icon = STAT_ICON_MAP[stat.iconName] || Building2;
              const accentColor = idx % 2 === 0 ? 'text-[#B76E4A]' : 'text-[#4E6B5A]';
              return (
                <div key={idx} className="flex items-center gap-2.5 sm:gap-3">
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${accentColor} shrink-0`} />
                  <div className="min-w-0">
                    <div className="text-base sm:text-lg font-heading font-bold truncate">{stat.value}</div>
                    <div className="text-[10px] sm:text-[11px] text-gray-300 uppercase tracking-wider truncate">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
