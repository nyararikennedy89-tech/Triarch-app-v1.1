import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROJECTS_DATA } from '../data/projects';
import { Project, ProjectCategory } from '../types';
import { ProjectModal } from './ProjectModal';
import { MapPin, ArrowUpRight, Sparkles, Filter } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories: ProjectCategory[] = ['All', 'Residential', 'Commercial', 'Hospitality', 'Institutional', 'Interior'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 md:py-32 bg-[#F8F7F4] dark:bg-[#121312] border-b border-[#ECECEC] dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[1px] w-12 bg-[#B76E4A]" />
              <span className="text-[#B76E4A] text-[11px] uppercase tracking-[0.3em] font-bold">
                Portfolio & Case Studies
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#1C1C1C] dark:text-white tracking-tight leading-tight">
              Featured Built Legacy Projects.
            </h2>
          </div>
          <p className="text-base text-[#555555] dark:text-gray-300 max-w-md">
            Explore our multidisciplinary portfolio across East Africa and internationally. Each project represents a tailored architectural solution.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          <Filter className="w-4 h-4 text-gray-400 shrink-0 mr-2" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setActiveProject(project)}
              className="group relative bg-white dark:bg-[#1C1D1C] rounded-2xl overflow-hidden border border-[#ECECEC] dark:border-white/10 shadow-xs hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              {/* Card Image Banner */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-stone-900">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Category & Featured Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#1C1C1C]/80 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-3 py-1 rounded-full bg-[#B76E4A] text-white text-[11px] font-bold uppercase tracking-wider">
                      Flagship
                    </span>
                  )}
                </div>

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

                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#4E6B5A] dark:text-[#B76E4A]">
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onSelectProject={(p) => setActiveProject(p)}
        allProjects={PROJECTS_DATA}
      />
    </section>
  );
};
