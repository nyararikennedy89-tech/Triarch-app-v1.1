import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, Menu, X, ArrowUpRight, Search, PhoneCall } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenConsultation: () => void;
  onOpenSearch: () => void;
  onOpenMpesa: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onOpenConsultation,
  onOpenSearch,
  onOpenMpesa,
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
            ? 'glass-nav py-3.5 border-b border-[#ECECEC]/80 dark:border-white/10 shadow-sm backdrop-blur-md'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto px-3 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 sm:gap-3 group shrink-0"
            id="nav-logo"
          >
            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-sm flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-sm shrink-0 ${
              isScrolled
                ? 'bg-[#1C1C1C] dark:bg-white text-white dark:text-[#1C1C1C]'
                : 'bg-white text-[#1C1C1C] ring-1 ring-white/30'
            }`}>
              {/* Minimalist 3-Arch Vector Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5">
                <path d="M3 21V10a4 4 0 0 1 8 0v11" />
                <path d="M13 21V8a4 4 0 0 1 8 0v13" />
                <path d="M8 21V14a2 2 0 0 1 4 0v7" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className={`font-heading font-extrabold text-base xs:text-lg sm:text-xl tracking-wider uppercase leading-none transition-colors duration-300 truncate ${
                isScrolled
                  ? 'text-[#1C1C1C] dark:text-white'
                  : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
              }`}>
                {siteConfig.brand.name}
              </span>
              <span className={`text-[8px] xs:text-[9px] tracking-[0.18em] xs:tracking-[0.25em] font-semibold uppercase leading-tight mt-0.5 transition-colors duration-300 truncate ${
                isScrolled
                  ? 'text-[#B76E4A] dark:text-[#E08A62]'
                  : 'text-[#FFA87D] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
              }`}>
                {siteConfig.brand.subName}
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-xs font-medium uppercase tracking-widest transition-colors duration-200 relative py-1 ${
                    isScrolled
                      ? isActive
                        ? 'text-[#4E6B5A] dark:text-[#E08A62] font-bold'
                        : 'text-[#444444] dark:text-gray-200 hover:text-[#1C1C1C] dark:hover:text-white'
                      : isActive
                        ? 'text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]'
                        : 'text-white/85 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-[2px] ${
                        isScrolled
                          ? 'bg-[#4E6B5A] dark:bg-[#E08A62]'
                          : 'bg-[#FFA87D] shadow-[0_0_8px_rgba(255,168,125,0.8)]'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 shrink-0">
            {/* Quick Search */}
            {siteConfig.features.enableQuickSearch && (
              <button
                onClick={onOpenSearch}
                className={`p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                  isScrolled
                    ? 'text-[#444444] dark:text-gray-200 hover:text-[#1C1C1C] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
                    : 'text-white/90 hover:text-white hover:bg-white/15 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
                }`}
                title="Quick Search (Cmd+K)"
                id="search-trigger-btn"
                aria-label="Quick Search"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Dark Mode Toggle */}
            {siteConfig.features.enableDarkModeToggle && (
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                  isScrolled
                    ? 'text-[#444444] dark:text-gray-200 hover:text-[#1C1C1C] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
                    : 'text-white hover:bg-white/15 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
                }`}
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                id="theme-toggle-btn"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-amber-300" />
                ) : (
                  <Moon className={`w-4 h-4 ${isScrolled ? 'text-slate-800 dark:text-slate-200' : 'text-white'}`} />
                )}
              </button>
            )}

            {/* M-Pesa Retainer Quick Action Button */}
            <button
              onClick={onOpenMpesa}
              id="mpesa-quick-pay-btn"
              className={`hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold transition-all shadow-sm border cursor-pointer hover:scale-105 active:scale-95 ${
                isScrolled
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 text-[#00843D] dark:text-emerald-400 border-[#00843D]/30 hover:border-[#00843D]'
                  : 'bg-black/40 text-emerald-300 border-emerald-500/40 hover:bg-black/60 backdrop-blur-md'
              }`}
              title="Pay Retainer via Lipa Na M-Pesa"
            >
              <span className="w-2 h-2 rounded-full bg-[#00843D] animate-pulse" />
              <span>M-PESA</span>
            </button>

            {/* Consultation CTA */}
            <button
              onClick={onOpenConsultation}
              id="start-project-cta-btn"
              className={`hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-bold transition-all duration-300 shadow-sm active:scale-98 cursor-pointer shrink-0 ${
                isScrolled
                  ? 'bg-[#1C1C1C] dark:bg-white text-white dark:text-[#1C1C1C] hover:bg-[#4E6B5A] dark:hover:bg-[#B76E4A] dark:hover:text-white'
                  : 'bg-white text-[#1C1C1C] hover:bg-[#B76E4A] hover:text-white shadow-lg ring-1 ring-white/40'
              }`}
            >
              <span>{siteConfig.hero.primaryCtaText}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button with 44px minimum touch target */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl transition-colors cursor-pointer ${
                isScrolled
                  ? 'text-[#1C1C1C] dark:text-white hover:bg-black/5 dark:hover:bg-white/10'
                  : 'text-white hover:bg-white/15 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
              }`}
              id="mobile-menu-toggle-btn"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu with Backdrop and Scroll Containment */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 lg:hidden"
            />

            {/* Scrollable Drawer Content with Dynamic Viewport Height & Safe Area */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-x-0 top-[56px] xs:top-[60px] sm:top-[68px] z-40 bg-[#F8F7F4]/98 dark:bg-[#121312]/98 backdrop-blur-xl border-b border-[#ECECEC] dark:border-white/10 p-4 xs:p-5 sm:p-6 shadow-2xl lg:hidden max-h-[calc(100dvh-60px)] overflow-y-auto overscroll-contain pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))]"
            >
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm sm:text-base font-heading font-semibold text-[#1C1C1C] dark:text-white hover:text-[#4E6B5A] dark:hover:text-[#B76E4A] transition-colors py-2.5 min-h-[44px] border-b border-gray-200/40 dark:border-white/5 flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-40" />
                  </a>
                ))}
                <div className="pt-3 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenConsultation();
                    }}
                    className="w-full min-h-[46px] bg-[#4E6B5A] hover:bg-[#3d5446] text-white py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors"
                  >
                    <span>Start Your Project Consultation</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenMpesa();
                    }}
                    className="w-full min-h-[46px] bg-[#00843D] hover:bg-[#007033] text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                    <span>Lipa Na M-PESA (Retainer Deposit)</span>
                  </button>
                  <div className="flex items-center justify-center gap-2 text-xs text-[#555555] dark:text-gray-400 pt-2 pb-1">
                    <PhoneCall className="w-3.5 h-3.5 text-[#B76E4A]" />
                    <span>Direct Line: {siteConfig.contact.primaryPhone}</span>
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
