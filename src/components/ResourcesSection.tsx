import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_POSTS } from '../data/blog';
import { BlogPost } from '../types';
import { BookOpen, Clock, ArrowRight, X, User, Share2 } from 'lucide-react';

export const ResourcesSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  return (
    <section id="resources" className="py-24 md:py-32 bg-[#F8F7F4] dark:bg-[#121312] border-b border-[#ECECEC] dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[1px] w-12 bg-[#B76E4A]" />
              <span className="text-[#B76E4A] text-[11px] uppercase tracking-[0.3em] font-bold">
                Knowledge Hub & Insights
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#1C1C1C] dark:text-white tracking-tight leading-tight">
              Knowledge Hub for Developers & Homeowners.
            </h2>
          </div>
          <p className="text-base text-[#555555] dark:text-gray-300 max-w-md">
            Expert insights on construction budgets, statutory planning approvals, structural performance, and design aesthetics.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedArticle(post)}
              className="group bg-white dark:bg-[#1C1D1C] rounded-2xl overflow-hidden border border-[#ECECEC] dark:border-white/10 shadow-xs hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative h-56 w-full overflow-hidden bg-stone-900">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#1C1C1C]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#B76E4A]" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-[#1C1C1C] dark:text-white group-hover:text-[#4E6B5A] dark:group-hover:text-[#B76E4A] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#555555] dark:text-gray-300 line-clamp-2 mt-2 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#ECECEC] dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-[11px] font-medium text-[#1C1C1C] dark:text-gray-300">{post.author.name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#4E6B5A] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white dark:bg-[#1A1B1A] rounded-3xl p-6 sm:p-10 z-10 border border-[#ECECEC] dark:border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B76E4A] mb-3">
                <span>{selectedArticle.category}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#1C1C1C] dark:text-white mb-6 leading-tight">
                {selectedArticle.title}
              </h1>

              {/* Author Header */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F8F7F4] dark:bg-[#121312] border border-[#ECECEC] dark:border-white/10 mb-8">
                <img src={selectedArticle.author.avatar} alt={selectedArticle.author.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="text-xs font-bold text-[#1C1C1C] dark:text-white">{selectedArticle.author.name}</div>
                  <div className="text-[10px] text-gray-500">{selectedArticle.author.role}</div>
                </div>
              </div>

              {/* Cover Image */}
              <img src={selectedArticle.coverImage} alt={selectedArticle.title} className="w-full h-64 object-cover rounded-2xl mb-8" />

              {/* Content Body */}
              <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-[#555555] dark:text-gray-200 leading-relaxed whitespace-pre-line space-y-4">
                {selectedArticle.content}
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-[#ECECEC] dark:border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400">Published on {selectedArticle.date}</span>
                <button
                  onClick={() => alert('Article link copied to clipboard!')}
                  className="px-4 py-2 rounded-full bg-gray-100 dark:bg-white/10 text-xs font-semibold flex items-center gap-2 hover:bg-gray-200"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Article</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
