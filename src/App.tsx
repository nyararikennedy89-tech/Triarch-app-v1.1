import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Introduction } from './components/Introduction';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { PanoramaShowcaseSection } from './components/PanoramaShowcaseSection';
import { DesignProcessSection } from './components/DesignProcessSection';
import { CostEstimatorSection } from './components/CostEstimatorSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ResourcesSection } from './components/ResourcesSection';
import { Footer } from './components/Footer';
import { ConsultationWizardModal } from './components/ConsultationWizardModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { ProjectModal } from './components/ProjectModal';
import { Project } from './types';
import { PROJECTS_DATA } from './data/projects';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedServiceForConsultation, setSelectedServiceForConsultation] = useState<string | undefined>(undefined);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState('home');

  // Handle dark mode class toggle on root document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Track active visible section for navbar highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'vr-showcase', 'services', 'process', 'estimator', 'resources', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenConsultationWithService = (serviceTitle: string) => {
    setSelectedServiceForConsultation(serviceTitle);
    setIsConsultationOpen(true);
  };

  const handleCostEstimatorSummaryToConsultation = (summaryDetails: string) => {
    setIsConsultationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] dark:bg-[#121312] text-[#1C1C1C] dark:text-[#F3F3F0] transition-colors duration-300 relative selection:bg-[#4E6B5A] selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenConsultation={() => {
          setSelectedServiceForConsultation(undefined);
          setIsConsultationOpen(true);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeSection={activeSection}
      />

      {/* Section 1: Hero */}
      <Hero
        onOpenConsultation={() => {
          setSelectedServiceForConsultation(undefined);
          setIsConsultationOpen(true);
        }}
      />

      {/* Section 2: Studio Introduction & Render vs Reality Slider */}
      <Introduction />

      {/* Section 3: Interactive Services Grid */}
      <ServicesSection
        onSelectServiceForConsultation={handleOpenConsultationWithService}
      />

      {/* Section 4: Featured Projects Portfolio & Case Studies */}
      <ProjectsSection />

      {/* Section 4B: 360° Virtual Reality Panoramic Room Viewer & Tour */}
      <PanoramaShowcaseSection />

      {/* Section 5: Interactive 7-Step Design Process */}
      <DesignProcessSection />

      {/* Section 6: Construction Cost Estimator Calculator */}
      <CostEstimatorSection
        onSendEstimateToConsultation={handleCostEstimatorSummaryToConsultation}
      />

      {/* Section 7: Why Choose Triarch & Counter Stats */}
      <WhyChooseSection />

      {/* Section 8: Client Testimonials & Video Interviews */}
      <TestimonialsSection />

      {/* Section 9: Architectural Knowledge Hub / Resources */}
      <ResourcesSection />

      {/* Section 10: Footer & Global Office Switcher */}
      <Footer
        onOpenConsultation={() => {
          setSelectedServiceForConsultation(undefined);
          setIsConsultationOpen(true);
        }}
      />

      {/* Multi-Step Consultation Wizard Modal */}
      <ConsultationWizardModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialService={selectedServiceForConsultation}
      />

      {/* Quick Search Cmd+K Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProject={(project) => setSelectedProjectForModal(project)}
        onSelectService={handleOpenConsultationWithService}
      />

      {/* Project Case Study Modal (when triggered via Quick Search or direct link) */}
      <ProjectModal
        project={selectedProjectForModal}
        onClose={() => setSelectedProjectForModal(null)}
        onSelectProject={(p) => setSelectedProjectForModal(p)}
        allProjects={PROJECTS_DATA}
      />
    </div>
  );
}
