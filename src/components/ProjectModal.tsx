import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, PanoramaRoom } from '../types';
import { PanoramaViewer360 } from './PanoramaViewer360';
import {
  X,
  MapPin,
  Maximize2,
  Layers,
  Calendar,
  User,
  CheckCircle2,
  HardHat,
  Sparkles,
  ArrowRight,
  Info,
  Glasses,
  Compass
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  allProjects: Project[];
  initialTab?: 'overview' | 'blueprint' | 'renders' | 'progress' | 'materials' | 'vr-360';
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
  initialTab = 'overview'
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'blueprint' | 'renders' | 'progress' | 'materials' | 'vr-360'>(initialTab);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const panoramaRooms = project?.panoramaRooms || [];
  const [selectedVRRoom, setSelectedVRRoom] = useState<PanoramaRoom>(
    panoramaRooms[0] || {
      id: 'default',
      name: 'Main Space',
      category: 'Living',
      panoramaUrl: project?.heroImage || '',
      thumbnailUrl: project?.heroImage || '',
      floorLevel: 'Ground Floor',
      areaSqM: 100,
      description: 'Project Architectural Volume',
      hotspots: []
    }
  );

  if (!project) return null;

  const related = allProjects.filter((p) => p.id !== project.id).slice(0, 2);

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
            className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all shadow-xl"
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
              { id: 'vr-360', label: '360° VR Room Tour', isHighlight: true },
              { id: 'blueprint', label: 'Interactive Floor Plan' },
              { id: 'renders', label: '3D Renders & Gallery' },
              { id: 'progress', label: 'Construction Log' },
              { id: 'materials', label: 'Material Specs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === tab.id
                    ? tab.isHighlight
                      ? 'bg-[#B76E4A] text-white shadow-lg'
                      : 'bg-[#1C1C1C] dark:bg-white text-white dark:text-[#1C1C1C]'
                    : tab.isHighlight
                    ? 'bg-[#B76E4A]/10 text-[#B76E4A] dark:bg-[#B76E4A]/20 hover:bg-[#B76E4A]/30 border border-[#B76E4A]/30'
                    : 'text-[#555555] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
                }`}
              >
                {tab.isHighlight && <Glasses className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Modal Tab Content */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1">
            {/* TAB: 360 VR TOUR */}
            {activeTab === 'vr-360' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-[#1C1C1C] dark:text-white flex items-center gap-2">
                      <Glasses className="w-5 h-5 text-[#B76E4A]" />
                      <span>360° Virtual Reality Room Tour</span>
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Drag to rotate 360°, tap glowing markers to inspect specifications, or click "VR Mode" for stereoscopic headset viewing.
                    </p>
                  </div>

                  {/* Room Switcher Pills */}
                  {panoramaRooms.length > 0 && (
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {panoramaRooms.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => setSelectedVRRoom(r)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                            selectedVRRoom.id === r.id
                              ? 'bg-[#B76E4A] text-white shadow-md'
                              : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20'
                          }`}
                        >
                          {r.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {panoramaRooms.length > 0 ? (
                  <div className="rounded-2xl overflow-hidden border border-[#ECECEC] dark:border-white/15 bg-black shadow-xl">
                    <PanoramaViewer360
                      room={selectedVRRoom}
                      allRooms={panoramaRooms}
                      onSelectRoom={setSelectedVRRoom}
                      projectName={project.title}
                      className="h-[420px] sm:h-[500px]"
                    />
                  </div>
                ) : (
                  <div className="p-8 rounded-2xl bg-white dark:bg-[#1C1D1C] border border-[#ECECEC] dark:border-white/10 text-center">
                    <Glasses className="w-8 h-8 text-[#B76E4A] mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      Full 360° VR room capture for this project is currently being processed by our 3D visualization studio.
                    </p>
                  </div>
                )}
              </div>
            )}

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

            {/* TAB 2: INTERACTIVE BLUEPRINT */}
            {activeTab === 'blueprint' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-[#1C1C1C] dark:text-white">
                      Interactive Architectural Floor Plan
                    </h3>
                    <p className="text-xs text-[#555555] dark:text-gray-400">
                      Click room hotspots on the plan to inspect spatial layouts and interior finishes.
                    </p>
                  </div>
                </div>

                <div className="relative w-full bg-stone-900 rounded-2xl overflow-hidden border border-white/10 min-h-[400px] flex items-center justify-center p-4">
                  <img
                    src={project.floorPlanUrl}
                    alt="Floor Plan"
                    className="w-full max-h-[500px] object-contain opacity-80"
                  />

                  {/* Hotspots */}
                  {project.floorPlanHotspots.map((hs) => (
                    <div
                      key={hs.id}
                      style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                    >
                      <button
                        onClick={() => setActiveHotspot(activeHotspot === hs.id ? null : hs.id)}
                        className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#B76E4A] text-white font-bold text-xs shadow-xl animate-bounce hover:scale-125 transition-transform"
                      >
                        <span className="absolute inset-0 rounded-full bg-[#B76E4A] animate-ping opacity-75" />
                        +
                      </button>

                      {/* Tooltip Card */}
                      {activeHotspot === hs.id && (
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 p-4 rounded-xl bg-white dark:bg-[#1C1D1C] border border-[#ECECEC] dark:border-white/20 shadow-2xl z-30 text-left">
                          {hs.imageUrl && (
                            <img src={hs.imageUrl} alt={hs.roomName} className="w-full h-24 object-cover rounded-lg mb-2" />
                          )}
                          <h4 className="text-xs font-bold text-[#1C1C1C] dark:text-white uppercase tracking-wider">
                            {hs.roomName}
                          </h4>
                          <p className="text-[11px] text-[#555555] dark:text-gray-300 mt-1 leading-snug">
                            {hs.description}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: 3D RENDERS GALLERY */}
            {activeTab === 'renders' && (
              <div className="space-y-6">
                <h3 className="text-xl font-heading font-bold text-[#1C1C1C] dark:text-white">
                  3D Renders & Exterior Photography
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {project.galleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className="group relative h-64 rounded-xl overflow-hidden bg-stone-900 cursor-pointer border border-[#ECECEC] dark:border-white/10"
                    >
                      <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Maximize2 className="w-6 h-6" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: CONSTRUCTION PROGRESS */}
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

            {/* TAB 5: MATERIAL SPECS */}
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

      {/* Fullscreen Image Preview Zoom Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Expanded" className="max-w-full max-h-full rounded-xl object-contain" />
          <button className="absolute top-6 right-6 text-white p-2">
            <X className="w-8 h-8" />
          </button>
        </div>
      )}
    </AnimatePresence>
  );
};
