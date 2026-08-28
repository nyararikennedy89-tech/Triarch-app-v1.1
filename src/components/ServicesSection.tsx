import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES_DATA } from '../data/services';
import { Service } from '../types';
import {
  Compass,
  Palette,
  Layers,
  Cpu,
  ShieldCheck,
  Eye,
  ArrowRight,
  X,
  CheckCircle,
  Wrench
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForConsultation: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForConsultation }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6" />;
      case 'Palette':
        return <Palette className="w-6 h-6" />;
      case 'Layers':
        return <Layers className="w-6 h-6" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" />;
      case 'Eye':
        return <Eye className="w-6 h-6" />;
      default:
        return <Compass className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-[#F8F7F4] dark:bg-[#121312] border-b border-[#ECECEC] dark:border-white/10">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[1px] w-12 bg-[#B76E4A]" />
              <span className="text-[#B76E4A] text-[11px] uppercase tracking-[0.3em] font-bold">
                Integrated Disciplines
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#1C1C1C] dark:text-white tracking-tight leading-tight">
              Comprehensive Architectural & Engineering Disciplines.
            </h2>
          </div>
          <p className="text-base text-[#555555] dark:text-gray-300 max-w-md">
            From initial topographical surveying to structural handovers, we deliver end-to-end design excellence without vendor fragmentation.
          </p>
        </div>

        {/* Grid of Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedService(service)}
              className="group relative rounded-2xl overflow-hidden bg-white dark:bg-[#1C1D1C] border border-[#ECECEC] dark:border-white/10 shadow-xs hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[380px]"
            >
              {/* Card Background Image with Hover Zoom */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-20 dark:opacity-20 group-hover:opacity-30"
                  style={{ backgroundImage: `url(${service.bgImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#1C1D1C] via-white/80 dark:via-[#1C1D1C]/80 to-transparent" />
              </div>

              {/* Card Content */}
              <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#1C1C1C] dark:bg-white text-white dark:text-[#1C1C1C] flex items-center justify-center mb-6 shadow-md group-hover:bg-[#4E6B5A] dark:group-hover:bg-[#B76E4A] dark:group-hover:text-white transition-colors">
                    {getIcon(service.iconName)}
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-[#1C1C1C] dark:text-white mb-3 group-hover:text-[#4E6B5A] dark:group-hover:text-[#B76E4A] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#555555] dark:text-gray-300 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>
                </div>

                <div>
                  <div className="pt-4 border-t border-[#ECECEC] dark:border-white/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#4E6B5A] dark:text-[#B76E4A]">
                    <span>Explore Discipline</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Service Detail Drawer Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white dark:bg-[#1A1B1A] rounded-3xl p-6 sm:p-10 z-10 border border-[#ECECEC] dark:border-white/10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#B76E4A] mb-3">
                {getIcon(selectedService.iconName)}
                <span>Service Specification</span>
              </div>

              <h2 className="text-3xl font-heading font-extrabold text-[#1C1C1C] dark:text-white mb-4">
                {selectedService.title}
              </h2>

              <p className="text-base text-[#555555] dark:text-gray-300 leading-relaxed mb-8">
                {selectedService.fullDesc}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Deliverables */}
                <div className="p-6 rounded-2xl bg-[#F8F7F4] dark:bg-[#121312] border border-[#ECECEC] dark:border-white/10">
                  <h4 className="text-sm font-heading font-bold text-[#1C1C1C] dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#4E6B5A]" />
                    <span>Key Deliverables</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs text-[#555555] dark:text-gray-300">
                    {selectedService.deliverables.map((item, idx) => (
                      <li key={`srv-deliv-${selectedService.id}-${idx}`} className="flex items-start gap-2">
                        <span className="text-[#B76E4A] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech & Methodology */}
                <div className="p-6 rounded-2xl bg-[#F8F7F4] dark:bg-[#121312] border border-[#ECECEC] dark:border-white/10 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-heading font-bold text-[#1C1C1C] dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-[#B76E4A]" />
                      <span>Methodology</span>
                    </h4>
                    <p className="text-xs text-[#555555] dark:text-gray-300 leading-relaxed mb-6">
                      {selectedService.methodology}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Tools & Software
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedService.technologies.map((tech, idx) => (
                        <span
                          key={`srv-tech-${selectedService.id}-${tech}-${idx}`}
                          className="px-2.5 py-1 rounded-md bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-[11px] font-mono text-[#1C1C1C] dark:text-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#ECECEC] dark:border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Ready to engage Triarch for {selectedService.title}?
                </span>
                <button
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    onSelectServiceForConsultation(title);
                  }}
                  className="bg-[#4E6B5A] hover:bg-[#3B5344] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-md transition-colors"
                >
                  <span>Include in Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
