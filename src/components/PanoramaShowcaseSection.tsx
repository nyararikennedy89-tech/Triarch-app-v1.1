import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_DATA } from '../data/projects';
import { Project, PanoramaRoom } from '../types';
import { PanoramaViewer360 } from './PanoramaViewer360';
import {
  Glasses,
  Compass,
  Sparkles,
  Layers,
  Maximize2,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Info,
  MapPin,
  Flame,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const PanoramaShowcaseSection: React.FC = () => {
  // Filter projects that have panorama rooms
  const projectsWithVR = PROJECTS_DATA.filter(
    (p) => p.panoramaRooms && p.panoramaRooms.length > 0
  );

  const [selectedProject, setSelectedProject] = useState<Project>(projectsWithVR[0] || PROJECTS_DATA[0]);
  const currentRooms = selectedProject.panoramaRooms || [];
  const [selectedRoom, setSelectedRoom] = useState<PanoramaRoom>(
    currentRooms[0] || {
      id: 'default',
      name: 'Main Atrium',
      category: 'Living',
      panoramaUrl: selectedProject.heroImage,
      thumbnailUrl: selectedProject.heroImage,
      floorLevel: 'Ground Floor',
      areaSqM: 120,
      description: 'Architectural space',
      hotspots: [],
    }
  );

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    if (project.panoramaRooms && project.panoramaRooms.length > 0) {
      setSelectedRoom(project.panoramaRooms[0]);
    }
  };

  return (
    <section
      id="vr-showcase"
      className="py-24 md:py-32 bg-[#141514] text-white relative overflow-hidden border-b border-white/10"
    >
      {/* Subtle Background Glow Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#B76E4A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#4E6B5A]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#B76E4A]/20 border border-[#B76E4A]/40 text-[#B76E4A] text-[11px] uppercase tracking-[0.25em] font-bold flex items-center gap-1.5">
                <Glasses className="w-3.5 h-3.5" />
                Virtual Reality & 360° Studio
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight leading-tight text-white">
              Step Inside in 360° VR. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#B76E4A] to-emerald-300">
                Explore Every Room Before Construction.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-gray-300 max-w-md leading-relaxed">
            Experience true spatial volumes, inspect structural finishes, and navigate seamlessly between rooms with full interactive 360° panoramic navigation and stereoscopic VR headset mode.
          </p>
        </div>

        {/* Project Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <span className="text-xs uppercase font-bold text-gray-400 tracking-wider shrink-0 mr-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#B76E4A]" />
            Select Project:
          </span>
          {projectsWithVR.map((proj) => {
            const isSelected = selectedProject.id === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => handleSelectProject(proj)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#B76E4A] text-white shadow-lg ring-2 ring-[#B76E4A]/40'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                }`}
              >
                <span>{proj.title}</span>
                <span className="text-[10px] opacity-75 font-normal">
                  ({proj.panoramaRooms?.length || 0} Rooms)
                </span>
              </button>
            );
          })}
        </div>

        {/* Room Navigation Pill Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <span className="text-xs uppercase font-bold text-gray-400 tracking-wider shrink-0 mr-2 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            Select Room:
          </span>
          {currentRooms.map((r) => {
            const isActive = selectedRoom.id === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRoom(r)}
                className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer border ${
                  isActive
                    ? 'bg-white text-[#1C1C1C] border-white font-bold shadow-xl scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isActive ? 'bg-[#B76E4A]' : 'bg-gray-500'
                  }`}
                />
                <span>{r.name}</span>
                <span className={`text-[10px] ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                  • {r.areaSqM} m²
                </span>
              </button>
            );
          })}
        </div>

        {/* Main 360° VR Viewer Window */}
        <div className="rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black relative">
          <PanoramaViewer360
            room={selectedRoom}
            allRooms={currentRooms}
            onSelectRoom={setSelectedRoom}
            projectName={selectedProject.title}
            className="h-[480px] sm:h-[580px] md:h-[650px]"
          />
        </div>

        {/* Room Thumbnails Quick-Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {currentRooms.map((r) => {
            const isActive = selectedRoom.id === r.id;
            return (
              <div
                key={r.id}
                onClick={() => setSelectedRoom(r)}
                className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer p-3 flex items-center gap-3 ${
                  isActive
                    ? 'bg-[#1C1D1C] border-[#B76E4A] ring-2 ring-[#B76E4A]/30 shadow-lg'
                    : 'bg-white/5 hover:bg-white/10 border-white/10'
                }`}
              >
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-stone-800">
                  <img
                    src={r.thumbnailUrl}
                    alt={r.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Glasses className="w-4 h-4 text-white/80" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-[10px] uppercase font-bold text-[#B76E4A] truncate">
                    {r.floorLevel}
                  </div>
                  <h4 className="text-xs font-bold text-white truncate leading-tight group-hover:text-amber-200 transition-colors">
                    {r.name}
                  </h4>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    {r.areaSqM} m² • {r.hotspots.length} Hotspots
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Value Proposition Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-white/10">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#B76E4A]/20 text-[#B76E4A] flex items-center justify-center mb-4">
                <Glasses className="w-5 h-5" />
              </div>
              <h3 className="text-base font-heading font-bold text-white mb-2">
                Cardboard & VR Headset Ready
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Click "VR Mode" on any mobile phone or Oculus/Meta Quest headset to view in dual-screen stereoscopic 3D with realistic depth perception.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-[#B76E4A]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Full Gyroscope & Motion Head-Tracking</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-heading font-bold text-white mb-2">
                Interactive Material Hotspots
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Click on glowing pins positioned in 3D space to inspect imported Italian marble specs, solar heat-gain ratings, and custom millwork details.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Connected Room Teleport Portals</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-heading font-bold text-white mb-2">
                Dynamic Architectural Lighting
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Simulate how spaces transform across the day by toggling between natural daylight, golden hour sunsets, and dusk architectural lighting scenes.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-amber-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Solar Azimuth Compass Orientation</span>
            </div>
          </div>
        </div>

        {/* Schedule Studio VR Walkthrough CTA Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#1E201E] via-[#242925] to-[#1C1E1C] border border-[#B76E4A]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Want a Custom 360° VR Walkthrough of Your Upcoming Project?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
              We render photorealistic BIM & VR walkthroughs for all client proposals prior to construction. Book a consultation at our Nairobi, Kiambu, or Nyeri chambers.
            </p>
          </div>

          <a
            href="#contact"
            className="shrink-0 bg-[#B76E4A] hover:bg-[#a25c3a] text-white px-8 py-4 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
          >
            <span>Book VR Studio Session</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
