import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Building, Compass, BookOpen, Calculator, ArrowRight } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';
import { SERVICES_DATA } from '../data/services';
import { BLOG_POSTS } from '../data/blog';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: any) => void;
  onSelectService: (serviceTitle: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onSelectService
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open search triggered handled in App
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = PROJECTS_DATA.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.location.toLowerCase().includes(query.toLowerCase())
  );

  const filteredServices = SERVICES_DATA.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.shortDesc.toLowerCase().includes(query.toLowerCase())
  );

  const filteredBlogs = BLOG_POSTS.filter(b =>
    b.title.toLowerCase().includes(query.toLowerCase()) ||
    b.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#1A1B1A] rounded-2xl z-10 border border-[#ECECEC] dark:border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Search Input Bar */}
          <div className="p-4 border-b border-[#ECECEC] dark:border-white/10 flex items-center gap-3">
            <Search className="w-5 h-5 text-[#4E6B5A]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, services, construction guides..."
              className="w-full bg-transparent text-sm font-medium text-[#1C1C1C] dark:text-white focus:outline-none"
            />
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results List */}
          <div className="p-4 max-h-[60vh] overflow-y-auto space-y-6">
            
            {/* Quick Actions */}
            {!query && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                  Quick Navigation
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <a
                    href="#kenya-hub"
                    onClick={onClose}
                    className="p-3 rounded-xl bg-[#F8F7F4] dark:bg-[#121312] border border-gray-200 dark:border-white/10 flex items-center gap-2 font-medium hover:border-[#4E6B5A]"
                  >
                    <span>🇰🇪</span>
                    <span>Kenya Advisory</span>
                  </a>
                  <a
                    href="#projects"
                    onClick={onClose}
                    className="p-3 rounded-xl bg-[#F8F7F4] dark:bg-[#121312] border border-gray-200 dark:border-white/10 flex items-center gap-2 font-medium hover:border-[#4E6B5A]"
                  >
                    <Building className="w-4 h-4 text-[#B76E4A]" />
                    <span>Projects</span>
                  </a>
                  <a
                    href="#estimator"
                    onClick={onClose}
                    className="p-3 rounded-xl bg-[#F8F7F4] dark:bg-[#121312] border border-gray-200 dark:border-white/10 flex items-center gap-2 font-medium hover:border-[#4E6B5A]"
                  >
                    <Calculator className="w-4 h-4 text-[#B76E4A]" />
                    <span>Cost Estimator</span>
                  </a>
                  <a
                    href="#process"
                    onClick={onClose}
                    className="p-3 rounded-xl bg-[#F8F7F4] dark:bg-[#121312] border border-gray-200 dark:border-white/10 flex items-center gap-2 font-medium hover:border-[#4E6B5A]"
                  >
                    <Compass className="w-4 h-4 text-[#4E6B5A]" />
                    <span>Design Process</span>
                  </a>
                </div>
              </div>
            )}

            {/* Matching Projects */}
            {filteredProjects.length > 0 && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                  Projects ({filteredProjects.length})
                </span>
                <div className="space-y-1.5">
                  {filteredProjects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onClose();
                        onSelectProject(p);
                      }}
                      className="p-2.5 rounded-xl hover:bg-[#F8F7F4] dark:hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <img src={p.heroImage} alt={p.title} className="w-10 h-10 object-cover rounded-lg" />
                        <div>
                          <div className="text-xs font-bold text-[#1C1C1C] dark:text-white group-hover:text-[#4E6B5A]">
                            {p.title}
                          </div>
                          <div className="text-[10px] text-gray-400">{p.location} • {p.category}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Services */}
            {filteredServices.length > 0 && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                  Disciplines ({filteredServices.length})
                </span>
                <div className="space-y-1.5">
                  {filteredServices.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        onClose();
                        onSelectService(s.title);
                      }}
                      className="p-2.5 rounded-xl hover:bg-[#F8F7F4] dark:hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#1C1C1C] dark:text-white group-hover:text-[#B76E4A]">
                          {s.title}
                        </div>
                        <div className="text-[10px] text-gray-400 line-clamp-1">{s.shortDesc}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          <div className="p-3 bg-gray-50 dark:bg-black/30 border-t border-[#ECECEC] dark:border-white/10 text-[10px] text-gray-400 text-center">
            Press <kbd className="font-mono bg-white dark:bg-white/10 px-1 py-0.5 rounded">ESC</kbd> to close or click outside.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
