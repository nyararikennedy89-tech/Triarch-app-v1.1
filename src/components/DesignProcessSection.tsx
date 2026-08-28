import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROCESS_STAGES } from '../data/process';
import {
  MessageSquare,
  MapPin,
  PenTool,
  Box,
  FileCheck,
  HardHat,
  CheckCircle2,
  ChevronRight,
  Clock,
  Sparkles
} from 'lucide-react';

export const DesignProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5" />;
      case 'PenTool':
        return <PenTool className="w-5 h-5" />;
      case 'Box':
        return <Box className="w-5 h-5" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5" />;
      case 'HardHat':
        return <HardHat className="w-5 h-5" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const currentStage = PROCESS_STAGES.find((s) => s.step === activeStep) || PROCESS_STAGES[0];

  return (
    <section id="process" className="relative py-24 md:py-32 bg-[#F8F7F4] dark:bg-[#121312] border-b border-[#ECECEC] dark:border-white/10 overflow-hidden">
      {/* Background Architectural Grid Overlay */}
      <div className="absolute inset-0 bg-grid-dots opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[1px] w-12 bg-[#B76E4A]" />
              <span className="text-[#B76E4A] text-[11px] uppercase tracking-[0.3em] font-bold">
                Structured Workflow
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#1C1C1C] dark:text-white tracking-tight leading-tight">
              Interactive Design & Construction Process.
            </h2>
          </div>
          <p className="text-base text-[#555555] dark:text-gray-300 max-w-md">
            Our 7-stage methodology eliminates ambiguity, ensuring full transparency on milestones, client inputs, statutory permits, and site execution.
          </p>
        </div>

        {/* Horizontal Process Steps Bar */}
        <div className="relative mb-12">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#ECECEC] dark:bg-white/10 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 relative z-10">
            {PROCESS_STAGES.map((stage) => {
              const isActive = activeStep === stage.step;
              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStep(stage.step)}
                  className={`p-4 rounded-2xl flex flex-col items-center text-center transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#1C1C1C] dark:bg-white text-white dark:text-[#1C1C1C] border-transparent shadow-xl scale-105'
                      : 'bg-white dark:bg-[#1C1D1C] text-[#555555] dark:text-gray-300 border-[#ECECEC] dark:border-white/10 hover:border-[#4E6B5A]'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 font-bold text-xs ${
                      isActive
                        ? 'bg-[#4E6B5A] text-white dark:bg-[#B76E4A]'
                        : 'bg-gray-100 dark:bg-white/10 text-[#1C1C1C] dark:text-white'
                    }`}
                  >
                    0{stage.step}
                  </div>
                  <span className="text-xs font-heading font-bold line-clamp-1">
                    {stage.title}
                  </span>
                  <span className="text-[10px] opacity-70 mt-0.5">
                    {stage.duration}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Active Stage Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-[#1C1D1C] rounded-3xl p-8 md:p-12 border border-[#ECECEC] dark:border-white/10 shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Stage Badge & Summary */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#4E6B5A] text-white flex items-center justify-center shadow-lg">
                    {getStepIcon(currentStage.iconName)}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#B76E4A] uppercase tracking-wider">
                      Stage 0{currentStage.step} of 07
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#1C1C1C] dark:text-white">
                      {currentStage.title}
                    </h3>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 dark:bg-white/10 text-xs font-semibold text-[#1C1C1C] dark:text-gray-200">
                  <Clock className="w-3.5 h-3.5 text-[#B76E4A]" />
                  <span>Estimated Duration: <strong>{currentStage.duration}</strong></span>
                </div>

                <p className="text-base text-[#555555] dark:text-gray-300 leading-relaxed font-normal">
                  {currentStage.details}
                </p>

                {/* Client Input Required */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 leading-snug">
                  <strong className="block mb-1 font-bold">Client Action Required:</strong>
                  {currentStage.clientInput}
                </div>
              </div>

              {/* Right Column: Key Deliverables Checklist */}
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#F8F7F4] dark:bg-[#121312] border border-[#ECECEC] dark:border-white/10">
                <h4 className="text-sm font-heading font-bold text-[#1C1C1C] dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4E6B5A]" />
                  <span>Stage Deliverables Checklist</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentStage.deliverables.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white dark:bg-[#1C1D1C] border border-[#ECECEC] dark:border-white/10 flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#4E6B5A]/10 text-[#4E6B5A] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span className="text-xs font-medium text-[#1C1C1C] dark:text-gray-200 leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Next Stage Teaser */}
                <div className="mt-8 pt-6 border-t border-[#ECECEC] dark:border-white/10 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Step {currentStage.step} leads directly to Step {Math.min(7, currentStage.step + 1)}
                  </span>
                  {currentStage.step < 7 && (
                    <button
                      onClick={() => setActiveStep(currentStage.step + 1)}
                      className="text-xs font-semibold uppercase tracking-wider text-[#4E6B5A] dark:text-[#B76E4A] hover:underline flex items-center gap-1"
                    >
                      <span>Next Stage</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
