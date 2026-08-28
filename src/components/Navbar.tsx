import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, Menu, X, ArrowUpRight, Search, PhoneCall } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenConsultation: () => void;
  onOpenSearch: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onOpenConsultation,
  onOpenSearch,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = siteConfig.navigation.mainLinks;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'glass-nav py-3.5 border-b border-[#ECECEC]/60 dark:border-white/10 shadow-xs'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group"
            id="nav-logo"
          >
            <div className="w-9 h-9 rounded-sm bg-[#1C1C1C] dark:bg-white flex items-center justify-center text-white dark:text-[#1C1C1C] transition-transform duration-300 group-hover:scale-105">
              {/* Minimalist 3-Arch Vector Icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21V10a4 4 0 0 1 8 0v11" />
                <path d="M13 21V8a4 4 0 0 1 8 0v13" />
                <path d="M8 21V14a2 2 0 0 1 4 0v7" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg tracking-wider text-[#1C1C1C] dark:text-white uppercase leading-none">
                {siteConfig.brand.name}
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#B76E4A] font-semibold uppercase leading-tight mt-0.5">
                {siteConfig.brand.subName}
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-xs font-medium uppercase tracking-widest transition-colors duration-200 relative py-1 ${
                  activeSection === link.href.substring(1)
                    ? 'text-[#4E6B5A] dark:text-[#B76E4A] font-bold'
                    : 'text-[#555555] dark:text-gray-300 hover:text-[#1C1C1C] dark:hover:text-white'
                }`}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4E6B5A] dark:bg-[#B76E4A]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Quick Search */}
            {siteConfig.features.enableQuickSearch && (
              <button
                onClick={onOpenSearch}
                className="p-2 rounded-full text-[#555555] dark:text-gray-300 hover:text-[#1C1C1C] dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title="Quick Search (Cmd+K)"
                id="search-trigger-btn"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Dark Mode Toggle */}
            {siteConfig.features.enableDarkModeToggle && (
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full text-[#555555] dark:text-gray-300 hover:text-[#1C1C1C] dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                id="theme-toggle-btn"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>
            )}

            {/* Consultation CTA */}
            <button
              onClick={onOpenConsultation}
              id="start-project-cta-btn"
              className="hidden sm:inline-flex items-center gap-2 bg-[#1C1C1C] dark:bg-white text-white dark:text-[#1C1C1C] px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#4E6B5A] dark:hover:bg-[#B76E4A] dark:hover:text-white transition-all duration-300 shadow-xs active:scale-98 cursor-pointer"
            >
              <span>{siteConfig.hero.primaryCtaText}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-[#1C1C1C] dark:text-white hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors cursor-pointer"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[65px] z-30 bg-[#F8F7F4]/98 dark:bg-[#121312]/98 backdrop-blur-xl border-b border-[#ECECEC] dark:border-white/10 p-6 shadow-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-base font-heading font-semibold text-[#1C1C1C] dark:text-white hover:text-[#4E6B5A] dark:hover:text-[#B76E4A] transition-colors py-2 border-b border-gray-200/40 dark:border-white/5 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-40" />
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full bg-[#4E6B5A] text-white py-3 rounded-xl font-semibold text-sm tracking-wide flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Start Your Project Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-2 text-xs text-[#555555] dark:text-gray-400 pt-2">
                  <PhoneCall className="w-3.5 h-3.5 text-[#B76E4A]" />
                  <span>Direct Line: {siteConfig.contact.primaryPhone}</span>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
