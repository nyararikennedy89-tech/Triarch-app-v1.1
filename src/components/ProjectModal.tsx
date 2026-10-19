import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import {
  X,
  MapPin,
  Maximize2,
  Layers,
  Calendar,
  User,
  HardHat,
  Sparkles,
  Info,
  ChevronLeft,
  ChevronRight,
  Images as ImageIcon,
  LayoutGrid,
  Film,
  ArrowUp,
  Leaf,
  Sun,
  ShieldCheck,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  allProjects: Project[];
  initialTab?: 'overview' | 'renders' | 'progress' | 'materials';
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
  initialTab = 'overview'
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'renders' | 'progress' | 'materials'>(initialTab);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState<number>(0);
  const [galleryViewMode, setGalleryViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [lightboxTouchStartX, setLightboxTouchStartX] = useState<number | null>(null);
  const [lightboxTouchEndX, setLightboxTouchEndX] = useState<number | null>(null);

  const modalContainerRef = useRef<HTMLDivElement>(null);
  const tabNavRef = useRef<HTMLDivElement>(null);

  // Fallback gallery array ensures never empty or undefined
  const gallery = useMemo(() => {
    if (!project) return [];
    if (project.galleryImages && project.galleryImages.length > 0) {
      return project.galleryImages;
    }
    return [project.heroImage];
  }, [project]);

  // Smooth scroll to gallery section so it occupies the full viewport
  const scrollToGallery = () => {
    setActiveTab('renders');
    setTimeout(() => {
      if (tabNavRef.current && modalContainerRef.current) {
        modalContainerRef.current.scrollTo({
          top: tabNavRef.current.offsetTop - 8,
          behavior: 'smooth'
        });
      }
    }, 60);
  };

  // Smooth scroll back to top of the modal
  const scrollToTop = () => {
    if (modalContainerRef.current) {
      modalContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleTabChange = (tabId: 'overview' | 'renders' | 'progress' | 'materials') => {
    setActiveTab(tabId);
    if (tabId === 'renders') {
      setTimeout(() => {
        if (tabNavRef.current && modalContainerRef.current) {
          modalContainerRef.current.scrollTo({
            top: tabNavRef.current.offsetTop - 8,
            behavior: 'smooth'
          });
        }
      }, 60);
    }
  };

  // Synchronize state when selected project or initialTab changes
  useEffect(() => {
    if (project) {
      setActiveCarouselIndex(0);
      setSelectedImageIndex(null);
      setActiveTab(initialTab);

      // If opened with renders/gallery requested, auto-scroll so the gallery is fully in view
      if (initialTab === 'renders') {
        const timer = setTimeout(() => {
          if (tabNavRef.current && modalContainerRef.current) {
            modalContainerRef.current.scrollTo({
              top: tabNavRef.current.offsetTop - 8,
              behavior: 'smooth'
            });
          }
        }, 150);
        return () => clearTimeout(timer);
      } else {
        if (modalContainerRef.current) {
          modalContainerRef.current.scrollTop = 0;
        }
      }
    }
  }, [project?.id, initialTab]);

  // Boundary check to prevent out-of-range index when project changes
  useEffect(() => {
    if (gallery.length > 0 && activeCarouselIndex >= gallery.length) {
      setActiveCarouselIndex(0);
    }
  }, [gallery.length, activeCarouselIndex]);

  const handleNextImage = () => {
    if (gallery.length <= 1) return;
    setActiveCarouselIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrevImage = () => {
    if (gallery.length <= 1) return;
    setActiveCarouselIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleLightboxNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedImageIndex === null || gallery.length <= 1) return;
    setSelectedImageIndex((selectedImageIndex + 1) % gallery.length);
  };

  const handleLightboxPrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedImageIndex === null || gallery.length <= 1) return;
    setSelectedImageIndex((selectedImageIndex - 1 + gallery.length) % gallery.length);
  };

  // Keyboard navigation for gallery & modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === 'Escape') {
          e.preventDefault();
          setSelectedImageIndex(null);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % gallery.length : 0));
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + gallery.length) % gallery.length : 0));
        }
        return;
      }

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (activeTab === 'renders' && gallery.length > 1) {
        if (e.key === 'ArrowRight') {
          handleNextImage();
        } else if (e.key === 'ArrowLeft') {
          handlePrevImage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, activeTab, gallery.length, onClose]);

  // Carousel touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      handleNextImage();
    } else if (distance < -minSwipeDistance) {
      handlePrevImage();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Lightbox touch handlers
  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    setLightboxTouchStartX(e.targetTouches[0].clientX);
  };

  const handleLightboxTouchMove = (e: React.TouchEvent) => {
    setLightboxTouchEndX(e.targetTouches[0].clientX);
  };

  const handleLightboxTouchEnd = () => {
    if (!lightboxTouchStartX || !lightboxTouchEndX) return;
    const distance = lightboxTouchStartX - lightboxTouchEndX;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance && selectedImageIndex !== null && gallery.length > 1) {
      setSelectedImageIndex((selectedImageIndex + 1) % gallery.length);
    } else if (distance < -minSwipeDistance && selectedImageIndex !== null && gallery.length > 1) {
      setSelectedImageIndex((selectedImageIndex - 1 + gallery.length) % gallery.length);
    }
    setLightboxTouchStartX(null);
    setLightboxTouchEndX(null);
  };

  if (!project) return null;

  const related = allProjects.filter((p) => p.id !== project.id).slice(0, 2);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 xs:p-2 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-lg cursor-pointer"
        />

        {/* Modal Container: Scrollable with sticky tabs so gallery can fill the screen by scrolling up */}
        <motion.div
          ref={modalContainerRef}
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-7xl 2xl:max-w-[1600px] bg-[#F8F7F4] dark:bg-[#141514] rounded-none xs:rounded-2xl sm:rounded-3xl z-10 border-0 xs:border border-[#ECECEC] dark:border-white/10 shadow-2xl overflow-y-auto max-h-[100dvh] xs:max-h-[94vh] sm:max-h-[95vh] flex flex-col scroll-smooth overscroll-contain focus:outline-none"
        >
          {/* Close Floating Button on Hero */}
          <button
            onClick={onClose}
            className="absolute top-4 xs:top-6 right-4 xs:right-6 z-20 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all shadow-xl cursor-pointer hover:scale-105 active:scale-95"
            title="Close Case Study (Esc)"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Modal Header Hero Image Banner */}
          <div className="relative h-[200px] xs:h-[240px] sm:h-[340px] md:h-[420px] w-full shrink-0 overflow-hidden bg-[#121312]">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F8F7F4] dark:from-[#141514] via-black/40 to-transparent" />

            <div className="absolute bottom-4 xs:bottom-6 left-3.5 xs:left-6 right-3.5 xs:right-6 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-1.5 xs:gap-2 mb-1.5 xs:mb-2">
                  <span className="px-2.5 xs:px-3 py-0.5 xs:py-1 rounded-full bg-[#4E6B5A] text-white text-[10px] xs:text-xs font-semibold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="px-2.5 xs:px-3 py-0.5 xs:py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] xs:text-xs font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {project.location}
                  </span>
                  <span className="px-2.5 xs:px-3 py-0.5 xs:py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] xs:text-xs font-medium">
                    {project.area}
                  </span>
                </div>

                <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight drop-shadow-md">
                  {project.title}
                </h1>
                <p className="text-xs xs:text-sm sm:text-lg text-gray-200 font-light mt-0.5 xs:mt-1 line-clamp-1 xs:line-clamp-none">
                  {project.subtitle}
                </p>
              </div>

              {/* Quick Jump to 3D Gallery Button */}
              <button
                type="button"
                onClick={scrollToGallery}
                className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full bg-white/25 hover:bg-white/40 text-white text-[10px] xs:text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer shrink-0 self-start sm:self-auto"
                title="Scroll down to 3D Render Gallery"
              >
                <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFA87D]" />
                <span>3D Gallery ({gallery.length}) ↓</span>
              </button>
            </div>
          </div>

          {/* Sticky Tab Navigation Ribbon */}
          <div
            ref={tabNavRef}
            className="sticky top-0 z-30 bg-white/95 dark:bg-[#1A1B1A]/95 border-b border-[#ECECEC] dark:border-white/10 px-3 xs:px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3 backdrop-blur-md shadow-xs"
          >
            <div className="flex items-center gap-1.5 xs:gap-2 overflow-x-auto scrollbar-none py-0.5">
              {[
                { id: 'overview', label: 'Case Overview' },
                { id: 'renders', label: `3D Renders (${gallery.length})` },
                { id: 'progress', label: 'Construction Log' },
                { id: 'materials', label: 'Material Specs' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as any)}
                  className={`px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-[10px] xs:text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#1C1C1C] dark:bg-white text-white dark:text-[#1C1C1C] shadow-sm'
                      : 'text-[#555555] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Sticky Actions: Quick Scroll to Top & Sticky Close */}
            <div className="flex items-center gap-1.5 xs:gap-2 shrink-0">
              <button
                type="button"
                onClick={scrollToTop}
                className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title="Scroll to Top of Case Study"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Top</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 xs:p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-[#1C1C1C] dark:text-white transition-all cursor-pointer"
                title="Close Modal (Esc)"
              >
                <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            </div>
          </div>

          {/* Modal Tab Content */}
          <div className="p-4 xs:p-6 sm:p-8 flex-1">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8 sm:space-y-10">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 xs:p-6 rounded-2xl bg-white dark:bg-[#1C1D1C] border border-[#ECECEC] dark:border-white/10">
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider block">Client</span>
                    <span className="text-sm font-heading font-bold text-[#1C1C1C] dark:text-white flex items-center gap-1.5 mt-1">
                      <User className="w-4 h-4 text-[#B76E4A]" />
                      {project.client}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider block">Year Completed</span>
                    <span className="text-sm font-heading font-bold text-[#1C1C1C] dark:text-white flex items-center gap-1.5 mt-1">
                      <Calendar className="w-4 h-4 text-[#4E6B5A]" />
                      {project.year}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider block">Built Area</span>
                    <span className="text-sm font-heading font-bold text-[#1C1C1C] dark:text-white flex items-center gap-1.5 mt-1">
                      <Layers className="w-4 h-4 text-[#B76E4A]" />
                      {project.area}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider block">Disciplines</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.servicesProvided.map((s, idx) => (
                        <span key={idx} className="text-[10px] bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded text-[#1C1C1C] dark:text-gray-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Narrative Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1D1C] border border-[#ECECEC] dark:border-white/10">
                    <h3 className="text-lg font-heading font-bold text-[#1C1C1C] dark:text-white mb-3 flex items-center gap-2">
                      <Info className="w-5 h-5 text-[#4E6B5A]" />
                      <span>Project Overview</span>
                    </h3>
                    <p className="text-sm text-[#555555] dark:text-gray-300 leading-relaxed">
                      {project.overview}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1D1C] border border-[#ECECEC] dark:border-white/10">
                    <h3 className="text-lg font-heading font-bold text-[#1C1C1C] dark:text-white mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#B76E4A]" />
                      <span>The Client Brief</span>
                    </h3>
                    <p className="text-sm text-[#555555] dark:text-gray-300 leading-relaxed">
                      {project.clientBrief}
                    </p>
                  </div>
                </div>

                {/* Challenge vs Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20">
                    <h3 className="text-base font-heading font-bold text-amber-900 dark:text-amber-300 mb-2">
                      ⚡ Structural & Design Challenge
                    </h3>
                    <p className="text-sm text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
                      {project.designChallenge}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20">
                    <h3 className="text-base font-heading font-bold text-emerald-900 dark:text-emerald-300 mb-2">
                      🌱 Engineered Solution
                    </h3>
                    <p className="text-sm text-emerald-900/80 dark:text-emerald-200/80 leading-relaxed">
                      {project.designSolution}
                    </p>
                  </div>
                </div>

                {/* Sustainability & Energy Efficiency Rating Card (LEED / EDGE) */}
                {project.sustainabilityImpact && (
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-stone-900/40 to-stone-900/40 border border-emerald-500/30 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-500/20">
                      <div className="flex items-center gap-2.5">
                        <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                          <Leaf className="w-5 h-5" />
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                              Certified Sustainability Rating
                            </span>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                              {project.sustainabilityImpact.standard}
                            </span>
                          </div>
                          <h4 className="text-lg font-heading font-bold text-white">
                            {project.sustainabilityImpact.certificationLevel}
                          </h4>
                        </div>
                      </div>

                      {project.sustainabilityImpact.solarInstalledKwp && (
                        <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                          <Sun className="w-4 h-4 text-amber-400" />
                          <span>{project.sustainabilityImpact.solarInstalledKwp} kWp Solar Array Installed</span>
                        </div>
                      )}
                    </div>

                    {/* Performance Benchmarks */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                        <span className="text-[10px] uppercase text-gray-400 block">Energy Savings</span>
                        <span className="text-xl font-bold font-heading text-emerald-400 mt-1 block">
                          +{project.sustainabilityImpact.energySavingsPercent}%
                        </span>
                        <span className="text-[10px] text-gray-400">vs baseline code</span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                        <span className="text-[10px] uppercase text-gray-400 block">Water Savings</span>
                        <span className="text-xl font-bold font-heading text-cyan-400 mt-1 block">
                          +{project.sustainabilityImpact.waterSavingsPercent}%
                        </span>
                        <span className="text-[10px] text-gray-400">rain & greywater</span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                        <span className="text-[10px] uppercase text-gray-400 block">Embodied Carbon</span>
                        <span className="text-xl font-bold font-heading text-amber-400 mt-1 block">
                          -{project.sustainabilityImpact.embodiedCarbonReductionPercent}%
                        </span>
                        <span className="text-[10px] text-gray-400">materials lifecycle</span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                        <span className="text-[10px] uppercase text-gray-400 block">CO₂ Offset / Yr</span>
                        <span className="text-xl font-bold font-heading text-emerald-300 mt-1 block">
                          {project.sustainabilityImpact.annualCarbonOffsetTons || 12.5} Tons
                        </span>
                        <span className="text-[10px] text-gray-400">clean solar offset</span>
                      </div>
                    </div>

                    {/* Key Green Features */}
                    {project.sustainabilityImpact.greenFeatures && project.sustainabilityImpact.greenFeatures.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                          Passive & Active Environmental Systems:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                          {project.sustainabilityImpact.greenFeatures.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2 bg-black/20 p-2 rounded-lg border border-white/5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Key Metrics */}
                {project.stats.length > 0 && (
                  <div>
                    <h3 className="text-lg font-heading font-bold text-[#1C1C1C] dark:text-white mb-4">
                      Measured Performance Indicators
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {project.stats.map((st, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white dark:bg-[#1C1D1C] border border-[#ECECEC] dark:border-white/10 text-center">
                          <div className="text-2xl font-heading font-extrabold text-[#4E6B5A] dark:text-[#B76E4A]">
                            {st.value}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">
                            {st.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: 3D RENDERS & GALLERY (FULLY SCROLLABLE & RESPONSIVE) */}
            {activeTab === 'renders' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#ECECEC] dark:border-white/10">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#1C1C1C] dark:text-white">
                      3D Renders & Architectural Visualizations
                    </h3>
                    <p className="text-xs sm:text-sm text-[#555555] dark:text-gray-400 mt-1">
                      Scroll freely to view full screen. Swipe or use arrow keys (← →) to explore perspectives.
                    </p>
                  </div>

                  {/* View Mode Controls & Slide Counter */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="inline-flex items-center p-1 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-xs">
                      <button
                        type="button"
                        onClick={() => setGalleryViewMode('carousel')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                          galleryViewMode === 'carousel'
                            ? 'bg-white dark:bg-[#1C1D1C] text-[#1C1C1C] dark:text-white shadow-xs font-semibold'
                            : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                        }`}
                        title="Interactive Carousel Viewer"
                      >
                        <Film className="w-3.5 h-3.5" />
                        <span>Cinema</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setGalleryViewMode('grid')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                          galleryViewMode === 'grid'
                            ? 'bg-white dark:bg-[#1C1D1C] text-[#1C1C1C] dark:text-white shadow-xs font-semibold'
                            : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                        }`}
                        title="All Renders Grid View"
                      >
                        <LayoutGrid className="w-3.5 h-3.5" />
                        <span>All ({gallery.length})</span>
                      </button>
                    </div>

                    {gallery.length > 0 && galleryViewMode === 'carousel' && (
                      <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 text-[#1C1C1C] dark:text-gray-200">
                        {activeCarouselIndex + 1} / {gallery.length}
                      </span>
                    )}
                  </div>
                </div>

                {gallery.length > 0 ? (
                  galleryViewMode === 'carousel' ? (
                    <div className="space-y-4">
                      {/* Featured Interactive Carousel Viewer with Responsive Viewport */}
                      <div
                        className="relative h-[260px] xs:h-[320px] sm:h-[440px] md:h-[540px] lg:h-[620px] rounded-2xl overflow-hidden bg-black border border-[#ECECEC] dark:border-white/10 shadow-xl select-none"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                      >
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={activeCarouselIndex}
                            src={gallery[activeCarouselIndex]}
                            alt={`${project.title} render ${activeCarouselIndex + 1}`}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (target.src !== project.heroImage) {
                                target.src = project.heroImage;
                              }
                            }}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => setSelectedImageIndex(activeCarouselIndex)}
                          />
                        </AnimatePresence>

                        {/* Top Overlay Actions */}
                        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                          <button
                            onClick={() => setSelectedImageIndex(activeCarouselIndex)}
                            className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                            title="Fullscreen Zoom (Esc to close)"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Navigation Arrow Buttons */}
                        {gallery.length > 1 && (
                          <>
                            <button
                              onClick={handlePrevImage}
                              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
                              aria-label="Previous Image"
                            >
                              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                            <button
                              onClick={handleNextImage}
                              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
                              aria-label="Next Image"
                            >
                              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                          </>
                        )}

                        {/* Bottom Status bar */}
                        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                          <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-mono font-medium">
                            Perspective {activeCarouselIndex + 1} of {gallery.length}
                          </span>
                          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-gray-300 text-xs">
                            Click image for fullscreen • ← → to browse
                          </span>
                        </div>
                      </div>

                      {/* Thumbnail Strip / Gallery Grid */}
                      <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                        {gallery.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveCarouselIndex(idx)}
                            className={`relative h-20 w-28 sm:h-24 sm:w-36 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                              activeCarouselIndex === idx
                                ? 'border-[#B76E4A] ring-2 ring-[#B76E4A]/30 scale-105 shadow-md'
                                : 'border-transparent opacity-60 hover:opacity-100 hover:scale-102'
                            }`}
                          >
                            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                            <span className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] font-mono">
                              #{idx + 1}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* All Renders Architectural Grid View */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {gallery.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedImageIndex(idx)}
                          className="group relative rounded-2xl overflow-hidden bg-black border border-[#ECECEC] dark:border-white/10 shadow-md hover:shadow-xl transition-all cursor-pointer aspect-4/3"
                        >
                          <img
                            src={img}
                            alt={`${project.title} perspective ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (target.src !== project.heroImage) {
                                target.src = project.heroImage;
                              }
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs font-mono font-medium">Perspective {idx + 1}</span>
                            <span className="p-1.5 rounded-full bg-white/20 backdrop-blur-md">
                              <Maximize2 className="w-3.5 h-3.5" />
                            </span>
                          </div>
                          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-mono font-bold">
                            #{idx + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  <div className="p-8 rounded-2xl bg-white dark:bg-[#1C1D1C] border border-[#ECECEC] dark:border-white/10 text-center text-gray-500">
                    High-resolution gallery images for this project will be available shortly.
                  </div>
                )}

                {/* Quick Action Navigation Bar */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={scrollToTop}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/15 text-stone-700 dark:text-stone-200 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                    <span>Scroll to Top of Project</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedImageIndex(activeCarouselIndex)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1C1C1C] hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-[#1C1C1C] text-xs font-semibold transition-all cursor-pointer shadow-md"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Expand Fullscreen Gallery</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: CONSTRUCTION PROGRESS */}
            {activeTab === 'progress' && (
              <div className="space-y-6">
                <h3 className="text-xl font-heading font-bold text-[#1C1C1C] dark:text-white flex items-center gap-2">
                  <HardHat className="w-5 h-5 text-[#B76E4A]" />
                  <span>Construction Milestone Log</span>
                </h3>

                {project.constructionGallery.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">Continuous site monitoring log available upon request.</p>
                ) : (
                  <div className="space-y-6">
                    {project.constructionGallery.map((milestone, idx) => (
                      <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-[#1C1D1C] border border-[#ECECEC] dark:border-white/10 flex flex-col md:flex-row gap-6 items-center">
                        <img src={milestone.imageUrl} alt={milestone.phase} className="w-full md:w-48 h-32 object-cover rounded-xl" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-mono text-[#B76E4A] font-bold">{milestone.date}</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 text-[10px] font-bold uppercase">
                              {milestone.status}
                            </span>
                          </div>
                          <h4 className="text-lg font-heading font-bold text-[#1C1C1C] dark:text-white">
                            {milestone.phase}
                          </h4>
                          <p className="text-xs text-[#555555] dark:text-gray-300 mt-1 leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: MATERIAL SPECS */}
            {activeTab === 'materials' && (
              <div className="space-y-6">
                <h3 className="text-xl font-heading font-bold text-[#1C1C1C] dark:text-white">
                  Architectural Material Palette & Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.materials.map((mat, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-[#1C1D1C] border border-[#ECECEC] dark:border-white/10 flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl border border-black/10 shrink-0 shadow-inner"
                        style={{ backgroundColor: mat.colorHex }}
                      />
                      <div>
                        <h4 className="text-sm font-heading font-bold text-[#1C1C1C] dark:text-white">
                          {mat.name}
                        </h4>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {mat.type} • {mat.finish}
                        </div>
                        <div className="text-[10px] font-mono text-[#4E6B5A] dark:text-[#B76E4A] mt-1">
                          Source: {mat.source}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Projects Footer */}
            <div className="mt-12 pt-8 border-t border-[#ECECEC] dark:border-white/10">
              <h4 className="text-sm font-heading font-bold text-[#1C1C1C] dark:text-white uppercase tracking-wider mb-4">
                Explore Related Case Studies
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setActiveTab('overview');
                      setActiveCarouselIndex(0);
                      onSelectProject(rel);
                    }}
                    className="p-4 rounded-xl bg-white dark:bg-[#1C1D1C] border border-[#ECECEC] dark:border-white/10 hover:border-[#4E6B5A] transition-all cursor-pointer flex items-center gap-4 group"
                  >
                    <img src={rel.heroImage} alt={rel.title} className="w-16 h-16 object-cover rounded-lg" />
                    <div>
                      <h5 className="text-sm font-heading font-bold text-[#1C1C1C] dark:text-white group-hover:text-[#4E6B5A]">
                        {rel.title}
                      </h5>
                      <span className="text-xs text-gray-400">{rel.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Image Preview Zoom Lightbox with Swipe, Arrows and Bottom Thumbnail Strip */}
      {selectedImageIndex !== null && gallery[selectedImageIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 select-none"
          onClick={() => setSelectedImageIndex(null)}
          onTouchStart={handleLightboxTouchStart}
          onTouchMove={handleLightboxTouchMove}
          onTouchEnd={handleLightboxTouchEnd}
        >
          {/* Main expanded image */}
          <div className="relative max-w-full max-h-[82vh] flex items-center justify-center">
            <img
              src={gallery[selectedImageIndex]}
              alt="Expanded view"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== project.heroImage) {
                  target.src = project.heroImage;
                }
              }}
              className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl transition-transform"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Lightbox Close */}
          <button
            className="absolute top-6 right-6 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
            onClick={() => setSelectedImageIndex(null)}
            title="Close Lightbox (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Lightbox Index Counter & Hint */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-mono font-bold">
              {selectedImageIndex + 1} / {gallery.length}
            </span>
            <span className="hidden sm:inline-block text-[11px] text-gray-400 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
              Press ← → to navigate • Esc to exit
            </span>
          </div>

          {/* Lightbox Previous / Next Arrow buttons */}
          {gallery.length > 1 && (
            <>
              <button
                onClick={handleLightboxPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all cursor-pointer hover:scale-110 active:scale-95"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={handleLightboxNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all cursor-pointer hover:scale-110 active:scale-95"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Lightbox Bottom Thumbnail Bar */}
          {gallery.length > 1 && (
            <div
              className="absolute bottom-6 left-0 right-0 z-20 flex justify-center px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 max-w-full overflow-x-auto p-2 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 scrollbar-none">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative h-14 w-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-[#FFA87D] scale-105 shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
};
