import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  ArrowDown, 
  ArrowUpRight, 
  Compass, 
  Building2, 
  ShieldCheck, 
  Award, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Layers, 
  Sparkles,
  MapPin,
  Calendar,
  Ruler,
  X,
  Eye
} from 'lucide-react';
import { siteConfig, HeroSlide } from '../config/siteConfig';
import { Project } from '../types';
import { PROJECTS_DATA } from '../data/projects';

interface HeroProps {
  onOpenConsultation: () => void;
  onSelectProject?: (project: Project) => void;
}

const STAT_ICON_MAP = {
  Building2,
  Compass,
  ShieldCheck,
  Award,
};

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onSelectProject }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [modalActiveIndex, setModalActiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const slides: HeroSlide[] = siteConfig.hero.slides;
  const currentSlideData = slides[currentSlide] || slides[0];

  // Desktop Scroll Tracking & Spring Physics for Buttery-Smooth Dynamics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 22,
    restDelta: 0.001,
  });

  // Parallax transformations for desktop mode
  const bgY = useTransform(smoothProgress, [0, 1], ['0%', '20%']);
  const bgScale = useTransform(smoothProgress, [0, 1], [1.02, 1.15]);
  const textY = useTransform(smoothProgress, [0, 1], [0, -65]);
  const textOpacity = useTransform(smoothProgress, [0, 0.75, 1], [1, 0.9, 0.3]);
  const galleryRailY = useTransform(smoothProgress, [0, 1], [0, -100]);
  const galleryCard2Y = useTransform(smoothProgress, [0, 1], [0, -50]);
  const galleryCard3Y = useTransform(smoothProgress, [0, 1], [0, -140]);
  const galleryTilt = useTransform(smoothProgress, [0, 1], [-2, 3]);

  // Slideshow auto-advance
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, slides.length]);

  // Keyboard navigation for gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGalleryModalOpen) {
        if (e.key === 'Escape') setIsGalleryModalOpen(false);
        if (e.key === 'ArrowRight') setModalActiveIndex((prev) => (prev + 1) % slides.length);
        if (e.key === 'ArrowLeft') setModalActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGalleryModalOpen, slides.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleExploreClick = () => {
    const section = document.querySelector('#projects');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Find matching Project data object for full case study modal trigger
  const handleInspectProject = (slide: HeroSlide) => {
    if (slide.projectId && onSelectProject) {
      const match = PROJECTS_DATA.find((p) => p.id === slide.projectId);
      if (match) {
        onSelectProject(match);
        return;
      }
    }
    // Fallback: scroll to projects
    handleExploreClick();
  };

  const openFullscreenGallery = (index: number) => {
    setModalActiveIndex(index);
    setIsGalleryModalOpen(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <>
      <section
        ref={containerRef}
        id="home"
        onMouseMove={handleMouseMove}
        className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-8 overflow-hidden bg-[#121312]"
      >
        {/* Dynamic Background Slideshow with Parallax Motion Zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={`bg-slide-${currentSlide}`}
              initial={{ opacity: 0, scale: 1.12 }}
              animate={{ opacity: 1, scale: 1.02 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                y: bgY,
                scale: bgScale,
                backgroundImage: `url(${currentSlideData.image})`,
              }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            />
          </AnimatePresence>

          {/* Luxury Architectural Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121312] via-[#121312]/60 to-[#121312]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121312] via-[#121312]/80 lg:via-[#121312]/50 to-transparent" />
          
          {/* Subtle Architectural Grid Lines */}
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* Main Hero Container */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 pt-12 sm:pt-16 md:pt-20 flex-1 flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Column: Brand Statement & Primary CTAs */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="w-full lg:max-w-2xl xl:max-w-3xl flex-1"
          >
            {/* Eyebrow badge with rust line */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-[1px] w-12 bg-[#B76E4A]" />
              <span className="text-[#B76E4A] text-[11px] uppercase tracking-[0.3em] font-bold">
                {siteConfig.hero.eyebrow}
              </span>
            </div>

            {/* Headline with Artistic Flair Serif Accent */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[96px] font-light text-white tracking-tighter leading-[0.92] mb-6 sm:mb-8">
              {siteConfig.hero.headingLine1}<br />
              <span className="italic font-serif text-[#769b82] font-light">{siteConfig.hero.headingAccent}</span> {siteConfig.hero.headingLine2}
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base md:text-lg text-gray-200/90 font-light leading-relaxed max-w-xl mb-8 sm:mb-10">
              {siteConfig.hero.description}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 mb-8">
              <button
                onClick={onOpenConsultation}
                id="hero-start-project-btn"
                className="bg-[#1C1C1C] hover:bg-[#4E6B5A] text-white px-7 py-4 text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-xl border border-white/20 flex items-center justify-center gap-3 group active:scale-98 cursor-pointer"
              >
                <span>{siteConfig.hero.primaryCtaText}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              <button
                onClick={handleExploreClick}
                id="hero-explore-work-btn"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-7 py-4 text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center justify-center gap-3 active:scale-98 cursor-pointer"
              >
                <span>{siteConfig.hero.secondaryCtaText}</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => openFullscreenGallery(currentSlide)}
                id="hero-view-gallery-btn"
                className="hidden sm:flex items-center justify-center gap-2 px-5 py-4 rounded-none bg-black/40 hover:bg-black/70 text-gray-200 hover:text-white border border-white/15 text-[11px] uppercase tracking-[0.18em] font-medium transition-all backdrop-blur-sm cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#B76E4A]" />
                <span>View Full Gallery</span>
              </button>
            </div>

            {/* Live Active Landmark Quick Tag on Mobile/Tablet */}
            <div className="lg:hidden flex items-center gap-3 p-3.5 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-[#B76E4A] animate-pulse shrink-0" />
              <div className="text-xs truncate">
                <span className="font-bold text-white block truncate">{currentSlideData.title}</span>
                <span className="text-gray-400 text-[11px]">{currentSlideData.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Desktop Dynamic Scroll-Linked Gallery Deck */}
          <div className="hidden lg:flex w-full lg:w-[460px] xl:w-[540px] 2xl:w-[600px] flex-col items-end relative">
            
            {/* Ambient Background Glow */}
            <div className="absolute -inset-4 bg-[#B76E4A]/10 rounded-3xl blur-3xl pointer-events-none" />

            {/* Desktop Dynamic Parallax Gallery Frame */}
            <motion.div
              style={{
                y: galleryRailY,
                rotateZ: galleryTilt,
                x: mousePos.x * 15,
              }}
              className="w-full relative z-10"
            >
              {/* Primary Active Showcase Card */}
              <div className="relative group rounded-2xl overflow-hidden border border-white/20 bg-[#1C1D1C]/90 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-[#B76E4A]/60">
                {/* Main Image Frame with 16:10 Ratio */}
                <div className="relative h-64 sm:h-72 xl:h-80 w-full overflow-hidden bg-black">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`hero-deck-img-${currentSlide}`}
                      src={currentSlideData.image}
                      alt={currentSlideData.title}
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7 }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </AnimatePresence>

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Top Bar Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] uppercase font-mono tracking-wider text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B76E4A] animate-ping" />
                      <span>{currentSlideData.tag || 'Architectural Showcase'}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openFullscreenGallery(currentSlide);
                      }}
                      className="pointer-events-auto w-8 h-8 rounded-full bg-black/60 hover:bg-[#B76E4A] text-white flex items-center justify-center border border-white/20 transition-all backdrop-blur-md cursor-pointer"
                      title="Expand View"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs font-mono text-[#B76E4A] font-bold mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" />
                      <span>{currentSlideData.location}</span>
                    </div>
                    <h3 className="text-xl xl:text-2xl font-serif font-light text-white leading-tight">
                      {currentSlideData.title}
                    </h3>
                  </div>
                </div>

                {/* Card Metadata & Action Strip */}
                <div className="p-4 bg-[#181918] border-t border-white/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs text-gray-300 font-mono">
                    {currentSlideData.year && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{currentSlideData.year}</span>
                      </div>
                    )}
                    {currentSlideData.area && (
                      <div className="flex items-center gap-1">
                        <Ruler className="w-3.5 h-3.5 text-gray-400" />
                        <span>{currentSlideData.area}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleInspectProject(currentSlideData)}
                      className="px-3.5 py-1.5 rounded bg-white/10 hover:bg-[#4E6B5A] text-white text-[11px] uppercase tracking-wider font-semibold border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Case Study</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Companion Floating Gallery Thumbnails (Scroll Responsive) */}
              <div className="mt-4 grid grid-cols-5 gap-2.5">
                {slides.map((slide, idx) => {
                  const isActive = currentSlide === idx;
                  return (
                    <motion.button
                      key={slide.title || idx}
                      onClick={() => {
                        setCurrentSlide(idx);
                        setIsAutoPlaying(false);
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      className={`relative h-14 xl:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${
                        isActive
                          ? 'border-[#B76E4A] ring-2 ring-[#B76E4A]/30 shadow-lg'
                          : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/40'
                      }`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                      {isActive && (
                        <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#B76E4A]" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Floating Gallery Controls & Dynamic Scroll Indicator */}
              <div className="mt-4 flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="p-1.5 rounded-md hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    title={isAutoPlaying ? 'Pause Slideshow' : 'Resume Slideshow'}
                  >
                    {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <span className="text-[11px] text-gray-400">
                    {currentSlide + 1} of {slides.length} Architectural Works
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrevSlide}
                    className="p-1.5 rounded-md hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    title="Previous Slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="p-1.5 rounded-md hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    title="Next Slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Side Rail Text */}
        <div className="hidden 2xl:block absolute bottom-36 right-8 origin-bottom-right -rotate-90 z-20 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.5em] text-white/40 font-bold whitespace-nowrap">
            {siteConfig.hero.sideRailText}
          </span>
        </div>

        {/* Bottom Floating Stats & Slide Switcher */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mt-8 sm:mt-12">
          <div className="pt-6 border-t border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Slide Indicators & Dynamic Scroll Cue */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-gray-400">
                0{currentSlide + 1} / 0{slides.length}
              </span>
              
              <div className="flex items-center gap-2">
                {slides.map((slide, idx) => (
                  <button
                    key={slide.title || idx}
                    onClick={() => {
                      setCurrentSlide(idx);
                      setIsAutoPlaying(false);
                    }}
                    className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                      currentSlide === idx ? 'w-8 bg-[#B76E4A]' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                    title={slide.title}
                  />
                ))}
              </div>

              {currentSlideData && (
                <span className="text-xs text-white/80 font-medium hidden sm:inline ml-2 truncate max-w-xs">
                  {currentSlideData.title} • {currentSlideData.location}
                </span>
              )}
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 text-white">
              {siteConfig.hero.stats.map((stat, idx) => {
                const Icon = STAT_ICON_MAP[stat.iconName] || Building2;
                const accentColor = idx % 2 === 0 ? 'text-[#B76E4A]' : 'text-[#769b82]';
                return (
                  <div key={stat.label || idx} className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${accentColor} shrink-0`} />
                    <div>
                      <div className="text-lg font-heading font-bold">{stat.value}</div>
                      <div className="text-[11px] text-gray-300 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Architectural Gallery Lightbox Modal */}
      <AnimatePresence>
        {isGalleryModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#B76E4A]" />
                <span className="text-xs font-mono uppercase tracking-widest text-gray-300">
                  Triarch Architectural Gallery • Showcase {modalActiveIndex + 1} of {slides.length}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Close Gallery (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Main Stage */}
            <div className="flex-1 my-6 flex flex-col lg:flex-row items-center justify-center gap-8 relative overflow-hidden">
              {/* Prev / Next Nav Buttons */}
              <button
                onClick={() => setModalActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-2 sm:left-6 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-[#B76E4A] text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => setModalActiveIndex((prev) => (prev + 1) % slides.length)}
                className="absolute right-2 sm:right-6 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-[#B76E4A] text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Main Image Spotlight */}
              <div className="w-full h-full max-h-[70vh] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`modal-img-${modalActiveIndex}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="relative max-h-full max-w-5xl rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black"
                  >
                    <img
                      src={slides[modalActiveIndex].image}
                      alt={slides[modalActiveIndex].title}
                      className="max-h-[65vh] w-auto object-contain mx-auto"
                    />

                    <div className="p-6 bg-[#181918] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-mono font-bold text-[#B76E4A] uppercase tracking-wider">
                            {slides[modalActiveIndex].tag || 'Masterpiece'}
                          </span>
                          <span className="text-gray-500">•</span>
                          <span className="text-xs text-gray-300">{slides[modalActiveIndex].location}</span>
                        </div>
                        <h2 className="text-2xl font-serif text-white">{slides[modalActiveIndex].title}</h2>
                        {slides[modalActiveIndex].description && (
                          <p className="text-xs text-gray-400 mt-1 max-w-xl">{slides[modalActiveIndex].description}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={() => {
                            setIsGalleryModalOpen(false);
                            handleInspectProject(slides[modalActiveIndex]);
                          }}
                          className="px-5 py-2.5 rounded-lg bg-[#4E6B5A] hover:bg-[#B76E4A] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Explore Project Details</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Modal Bottom Thumbnail Strip */}
            <div className="flex items-center justify-center gap-3 overflow-x-auto py-2">
              {slides.map((s, idx) => (
                <button
                  key={`modal-thumb-${idx}`}
                  onClick={() => setModalActiveIndex(idx)}
                  className={`relative h-16 w-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    modalActiveIndex === idx ? 'border-[#B76E4A] scale-105' : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
