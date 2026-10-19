import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  Compass,
  Building2,
  ShieldCheck,
  Award,
  Video,
  Pause,
  Play,
  VolumeX,
  Volume2,
  Sparkles,
  Layers,
  HardHat
} from 'lucide-react';
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoModeEnabled, setVideoModeEnabled] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const slides = siteConfig.hero.slides;
  const activeSlide = slides[currentSlide];

  // Slideshow auto-advance (only if video isn't being manually inspected or every 10s)
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setVideoLoaded(false);
      setVideoError(false);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Handle video element play rate (subtle, slow motion 0.7x for tranquil architectural feeling)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
      if (isVideoPlaying && videoModeEnabled) {
        videoRef.current.play().catch(() => {
          // Autoplay policy or low power mode - keep poster image fallback active
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentSlide, isVideoPlaying, videoModeEnabled]);

  const toggleVideoPlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsVideoPlaying(true);
    }
  };

  const handleExploreClick = () => {
    const section = document.querySelector('#projects');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-8 overflow-hidden select-none">
      {/* ========================================================================= */}
      {/* BACKGROUND LAYER: Architectural Video Walkthrough / Site Progress Loop     */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 bg-[#121312] overflow-hidden">
        {/* Fallback & Cross-fading Poster Image */}
        <AnimatePresence mode="sync">
          <motion.div
            key={`img-${currentSlide}`}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${activeSlide?.image || ''})` }}
          />
        </AnimatePresence>

        {/* Subtle, Slow-Motion Looping Video Layer */}
        {activeSlide?.videoUrl && videoModeEnabled && !videoError && (
          <video
            ref={videoRef}
            key={`video-${currentSlide}`}
            src={activeSlide.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-55' : 'opacity-0'
            }`}
            style={{ filter: 'brightness(0.85) contrast(1.15) saturate(0.95)' }}
          />
        )}

        {/* Architectural Scanning Overlay Lines / Blueprint Grid Effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.35) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Cinematic Gradient Overlays to preserve absolute text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121312] via-[#121312]/60 to-[#121312]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121312]/95 via-[#121312]/60 to-transparent pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* MAIN HERO CONTENT                                                         */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-3 xs:px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 pt-14 sm:pt-20 md:pt-28 flex-1 flex flex-col justify-center">
        {/* Floating Geometry for Architectural Render Feel */}
        <div className="hidden xl:block absolute top-24 right-16 w-72 h-[420px] border-[0.5px] border-white/20 transform skew-x-12 pointer-events-none" />
        <div className="hidden xl:block absolute top-40 right-36 w-56 h-80 border-[0.5px] border-[#B76E4A]/30 transform -skew-x-6 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="max-w-5xl 2xl:max-w-6xl"
        >
          {/* Eyebrow badge with rust line & Video Badge Indicator */}
          <div className="flex items-center flex-wrap gap-3 mb-4 sm:mb-6">
            <div className="h-[1px] w-8 sm:w-12 bg-[#B76E4A]" />
            <span className="text-[#B76E4A] text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-bold">
              {siteConfig.hero.eyebrow}
            </span>

            {/* Subtle Site Progress / 3D Walkthrough Indicator */}
            {activeSlide?.videoUrl && videoModeEnabled && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] text-gray-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-mono uppercase tracking-wider text-white font-semibold">
                  {activeSlide.videoType === 'construction_progress'
                    ? 'Site Progress Reel (0.75x)'
                    : activeSlide.videoType === 'walkthrough_3d'
                    ? '3D Walkthrough Drone'
                    : 'Architectural Flyover'}
                </span>
              </div>
            )}
          </div>

          {/* Headline with Artistic Flair Serif Accent */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[100px] font-light text-white tracking-tight sm:tracking-tighter leading-[1.08] sm:leading-[0.95] mb-6 sm:mb-8 break-words">
            {siteConfig.hero.headingLine1}<br />
            <span className="italic font-serif text-[#4E6B5A] dark:text-[#769b82] font-light">
              {siteConfig.hero.headingAccent}
            </span>{' '}
            {siteConfig.hero.headingLine2}
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200/90 font-light leading-relaxed max-w-2xl mb-8 sm:mb-10">
            {siteConfig.hero.description}
          </p>

          {/* Action CTAs & Interactive Video Toggle */}
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

            {/* Subtle Motion Play/Pause Control for Accessibility */}
            {activeSlide?.videoUrl && (
              <button
                type="button"
                onClick={toggleVideoPlayback}
                className="self-center sm:self-auto inline-flex items-center gap-2 px-3 py-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/15 text-white/80 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                title={isVideoPlaying ? 'Pause background site video' : 'Resume background site video'}
                aria-label={isVideoPlaying ? 'Pause background video' : 'Play background video'}
              >
                {isVideoPlaying ? <Pause className="w-3.5 h-3.5 text-[#FFA87D]" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                <span className="text-[11px] tracking-wider uppercase">
                  {isVideoPlaying ? 'Pause Loop' : 'Play Reel'}
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Side Rail Text */}
      <div className="hidden lg:block absolute bottom-36 right-8 origin-bottom-right -rotate-90 z-20 pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.5em] text-white/40 font-bold whitespace-nowrap">
          {siteConfig.hero.sideRailText}
        </span>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM FLOATING STATS & SLIDE / VIDEO CONTROLS                            */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-3 xs:px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mt-8 sm:mt-12">
        <div className="pt-6 border-t border-white/15 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Slide & Walkthrough Selection Indicators */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 flex-wrap">
            <span className="text-xs font-mono text-gray-400">
              0{currentSlide + 1} / 0{slides.length}
            </span>
            <div className="flex items-center gap-2">
              {slides.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentSlide(idx);
                    setVideoLoaded(false);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    currentSlide === idx ? 'w-8 bg-[#B76E4A]' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  title={slide.title}
                  aria-label={`Jump to slide ${idx + 1}: ${slide.title}`}
                />
              ))}
            </div>

            {/* Active Reel Name */}
            {activeSlide && (
              <div className="flex items-center gap-2 ml-1 sm:ml-2">
                <span className="text-xs text-white/90 font-medium truncate max-w-[200px] xs:max-w-xs md:max-w-md">
                  {activeSlide.title} <span className="text-stone-400 text-[11px]">({activeSlide.location})</span>
                </span>
                {activeSlide.videoUrl && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                    <Video className="w-2.5 h-2.5" />
                    <span>Walkthrough</span>
                  </span>
                )}
              </div>
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

