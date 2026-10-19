import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROJECTS_DATA } from '../data/projects';
import { Project, ProjectCategory } from '../types';
import { ProjectModal } from './ProjectModal';
import { SustainabilityImpactWidget } from './SustainabilityImpactWidget';
import { MapPin, ArrowUpRight, Sparkles, Filter, Images, Leaf } from 'lucide-react';

interface ProjectsSectionProps {
  onOpenConsultation?: (message?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [initialModalTab, setInitialModalTab] = useState<'overview' | 'renders' | 'progress' | 'materials'>('overview');

  const categories: ProjectCategory[] = ['All', 'Residential', 'Commercial', 'Hospitality', 'Institutional', 'Interior'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" data-section="gallery" className="relative py-16 sm:py-24 md:py-32 bg-[#F8F7F4] dark:bg-[#121312] border-b border-[#ECECEC] dark:border-white/10">
      {/* Anchor for direct #gallery navigation */}
      <div id="gallery" className="absolute -top-24 left-0 w-full pointer-events-none" />

      <div className="w-full max-w-[1920px] mx-auto px-3 xs:px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[1px] w-8 sm:w-12 bg-[#B76E4A]" />
              <span className="text-[#B76E4A] text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-bold">
                Portfolio & 3D Render Gallery
              </span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#1C1C1C] dark:text-white tracking-tight leading-tight">
              Featured Built Legacy Projects.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#555555] dark:text-gray-300 max-w-md">
            Explore our multidisciplinary portfolio across East Africa and internationally. Each project features swipeable 3D render galleries, construction progress milestones, and detailed material specifications.
          </p>
        </div>

        {/* Category Filter Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 sm:mb-12 scrollbar-none -mx-3 px-3 xs:-mx-4 xs:px-4 sm:mx-0 sm:px-0 overscroll-contain">
          <Filter className="w-4 h-4 text-gray-400 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 xs:px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] xs:text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer min-h-[38px] ${
                selectedCategory === cat
                  ? 'bg-[#1C1C1C] dark:bg-white text-white dark:text-[#1C1C1C] shadow-md'
                  : 'bg-white dark:bg-[#1C1D1C] text-[#555555] dark:text-gray-300 hover:bg-gray-200/60 dark:hover:bg-white/10 border border-[#ECECEC] dark:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => {
                setInitialModalTab('overview');
                setActiveProject(project);
              }}
              className="group relative bg-white dark:bg-[#1C1D1C] rounded-2xl overflow-hidden border border-[#ECECEC] dark:border-white/10 shadow-xs hover:shadow-2xl hover:border-[#B76E4A]/30 dark:hover:border-white/20 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Card Image Banner */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-stone-900">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (project.galleryImages?.[0] && target.src !== project.galleryImages[0]) {
                      target.src = project.galleryImages[0];
                    }
                  }}
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500 ease-out transform-gpu will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Category & Featured Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#1C1C1C]/80 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-3 py-1 rounded-full bg-[#B76E4A] text-white text-[11px] font-bold uppercase tracking-wider">
                      Flagship
                    </span>
                  )}
                </div>

                {/* Direct Gallery Action Button on Image */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setInitialModalTab('renders');
                    setActiveProject(project);
                  }}
                  className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-white text-[11px] font-mono font-medium flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                  title="View 3D render gallery"
                >
                  <Images className="w-3.5 h-3.5 text-[#FFA87D]" />
                  <span>{project.galleryImages?.length || 1} Renders</span>
                </button>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-amber-200 mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-2xl font-heading font-bold leading-tight group-hover:text-amber-100 transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <p className="text-xs text-[#555555] dark:text-gray-300 line-clamp-2 leading-relaxed mb-4">
                  {project.overview}
                </p>

                <div className="space-y-4 pt-4 border-t border-[#ECECEC] dark:border-white/10">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Built Area: <strong className="text-[#1C1C1C] dark:text-white">{project.area}</strong></span>
                    <span>Year: <strong className="text-[#1C1C1C] dark:text-white">{project.year}</strong></span>
                  </div>

                  {/* Sustainability Badge on Card */}
                  {project.sustainabilityImpact && (
                    <div className="flex items-center justify-between text-[11px] px-2.5 py-1.5 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                      <span className="flex items-center gap-1.5 font-semibold">
                        <Leaf className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>{project.sustainabilityImpact.certificationLevel}</span>
                      </span>
                      <span className="font-mono text-[10px] font-bold">
                        +{project.sustainabilityImpact.energySavingsPercent}% Energy
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-[#4E6B5A] dark:text-[#B76E4A] group-hover:text-[#3e5648]">
                      <span>Case Study</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ml-1" />
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInitialModalTab('renders');
                        setActiveProject(project);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/15 text-stone-700 dark:text-stone-200 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                      title="Open full photo & 3D render gallery"
                    >
                      <Images className="w-3.5 h-3.5 text-[#B76E4A]" />
                      <span>Gallery ({project.galleryImages?.length || 1})</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Embedded Sustainability Impact & Solar Power Engineering Widget */}
        <SustainabilityImpactWidget
          projects={PROJECTS_DATA}
          onOpenConsultation={onOpenConsultation}
          onSelectProject={(p) => {
            setActiveProject(p);
            setInitialModalTab('overview');
          }}
        />

      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onSelectProject={(p) => setActiveProject(p)}
        allProjects={PROJECTS_DATA}
        initialTab={initialModalTab}
      />
    </section>
  );
};

