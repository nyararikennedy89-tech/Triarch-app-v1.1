import React, { useState } from 'react';
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
  ChevronRight
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
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  if (!project) return null;

  const related = allProjects.filter((p) => p.id !== project.id).slice(0, 2);
  const gallery = project.galleryImages || [];

  const handleNextImage = () => {
    if (gallery.length === 0) return;
    setActiveCarouselIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrevImage = () => {
    if (gallery.length === 0) return;
    setActiveCarouselIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleLightboxNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex === null || gallery.length === 0) return;
    setSelectedImageIndex((selectedImageIndex + 1) % gallery.length);
  };

  const handleLightboxPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex === null || gallery.length === 0) return;
    setSelectedImageIndex((selectedImageIndex - 1 + gallery.length) % gallery.length);
  };

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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-lg"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-7xl 2xl:max-w-[1600px] bg-[#F8F7F4] dark:bg-[#141514] rounded-3xl z-10 border border-[#ECECEC] dark:border-white/10 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Close Floating Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all shadow-xl cursor-pointer"
            title="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header Hero Image Banner */}
          <div className="relative h-[280px] sm:h-[380px] md:h-[440px] w-full shrink-0 overflow-hidden bg-[#121312]">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F8F7F4] dark:from-[#141514] via-black/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 z-10">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#4E6B5A] text-white text-xs font-semibold uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {project.location}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium">
                  {project.area}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight drop-shadow-md">
                {project.title}
              </h1>
              <p className="text-sm sm:text-lg text-gray-200 font-light mt-1">
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Tab Navigation Ribbon */}
          <div className="bg-white dark:bg-[#1A1B1A] border-b border-[#ECECEC] dark:border-white/10 px-6 py-3 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
            {[
              { id: 'overview', label: 'Case Overview' },
              { id: 'renders', label: '3D Renders & Gallery' },
              { id: 'progress', label: 'Construction Log' },
              { id: 'materials', label: 'Material Specs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#1C1C1C] dark:bg-white text-white dark:text-[#1C1C1C]'
                    : 'text-[#555555] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Modal Tab Content */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-10">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-white dark:bg-[#1C1D1C] border border-[#ECECEC] dark:border-white/10">
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
                        <span key={`service-${project.id}-${s}-${idx}`} className="text-[10px] bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded text-[#1C1C1C] dark:text-gray-200">
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

                {/* Key Metrics */}
                {project.stats.length > 0 && (
                  <div>
                    <h3 className="text-lg font-heading font-bold text-[#1C1C1C] dark:text-white mb-4">
                      Measured Performance Indicators
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {project.stats.map((st, idx) => (
                        <div key={`stat-${project.id}-${st.label}-${idx}`} className="p-4 rounded-xl bg-white dark:bg-[#1C1D1C] border border-[#ECECEC] dark:border-white/10 text-center">
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

            {/* TAB 2: 3D RENDERS & GALLERY (WITH SWIPEABLE & ARROW BUTTONS) */}
            {activeTab === 'renders' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-[#1C1C1C] dark:text-white">
                      3D Renders & Gallery
                    </h3>
                    <p className="text-xs text-[#555555] dark:text-gray-400 mt-0.5">
                      Swipe on mobile or use arrow buttons to browse through high-resolution project captures.
                    </p>
                  </div>
                  {gallery.length > 0 && (
                    <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-[#1C1C1C] dark:text-gray-200 self-start sm:self-auto">
                      {activeCarouselIndex + 1} / {gallery.length} Images
                    </span>
                  )}
                </div>

                {gallery.length > 0 ? (
                  <div className="space-y-4">
                    {/* Featured Interactive Carousel Viewer */}
                    <div
                      className="relative h-[340px] sm:h-[440px] md:h-[520px] rounded-2xl overflow-hidden bg-black border border-[#ECECEC] dark:border-white/10 shadow-lg select-none"
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
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() => setSelectedImageIndex(activeCarouselIndex)}
                        />
                      </AnimatePresence>

                      {/* Top Overlay Actions */}
                      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                        <button
                          onClick={() => setSelectedImageIndex(activeCarouselIndex)}
                          className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all shadow-md cursor-pointer"
                          title="Fullscreen Zoom"
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
                          Slide {activeCarouselIndex + 1} of {gallery.length}
                        </span>
                        <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-gray-300 text-xs">
                          Click image to expand in full lightbox
                        </span>
                      </div>
                    </div>

                    {/* Thumbnail Strip / Gallery Grid */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                      {gallery.map((img, idx) => (
                        <button
                          key={`thumb-${project.id}-${idx}`}
                          onClick={() => setActiveCarouselIndex(idx)}
                          className={`relative h-20 w-28 sm:h-24 sm:w-36 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                            activeCarouselIndex === idx
                              ? 'border-[#B76E4A] ring-2 ring-[#B76E4A]/30 scale-105 shadow-md'
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-8 rounded-2xl bg-white dark:bg-[#1C1D1C] border border-[#ECECEC] dark:border-white/10 text-center text-gray-500">
                    High-resolution gallery images for this project will be available shortly.
                  </div>
                )}
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
                      <div key={`milestone-${project.id}-${milestone.phase}-${idx}`} className="p-6 rounded-2xl bg-white dark:bg-[#1C1D1C] border border-[#ECECEC] dark:border-white/10 flex flex-col md:flex-row gap-6 items-center">
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
                    <div key={`mat-${project.id}-${mat.name}-${idx}`} className="p-5 rounded-2xl bg-white dark:bg-[#1C1D1C] border border-[#ECECEC] dark:border-white/10 flex items-center gap-4">
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

      {/* Fullscreen Image Preview Zoom Lightbox with Swipe and Arrows */}
      {selectedImageIndex !== null && gallery[selectedImageIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 select-none"
          onClick={() => setSelectedImageIndex(null)}
        >
          <img
            src={gallery[selectedImageIndex]}
            alt="Expanded"
            className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          
          {/* Lightbox Close */}
          <button
            className="absolute top-6 right-6 text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            onClick={() => setSelectedImageIndex(null)}
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Lightbox Index Counter */}
          <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-mono">
            {selectedImageIndex + 1} / {gallery.length}
          </div>

          {/* Lightbox Previous / Next Arrow buttons */}
          {gallery.length > 1 && (
            <>
              <button
                onClick={handleLightboxPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all cursor-pointer hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={handleLightboxNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all cursor-pointer hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}
        </div>
      )}
    </AnimatePresence>
  );
};

