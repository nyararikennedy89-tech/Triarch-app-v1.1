import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Compass, Users2, CheckCircle2, Cpu, Sparkles } from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  const stats = [
    { value: '180+', label: 'Projects Completed', sub: 'Across East Africa & Region' },
    { value: '15+', label: 'Years Experience', sub: 'Established Practice' },
    { value: '99.4%', label: 'Client Satisfaction', sub: 'Verified Audit Score' },
    { value: '7', label: 'Disciplines In-House', sub: 'Zero Vendor Fragment' }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#F8F7F4] dark:bg-[#121312] border-b border-[#ECECEC] dark:border-white/10">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Animated Counters Banner */}
        <div className="bg-[#1C1C1C] text-white rounded-3xl p-8 md:p-12 mb-20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4E6B5A]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B76E4A]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((st, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="pt-4 md:pt-0 px-4"
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-stone-200 to-[#B76E4A]">
                  {st.value}
                </div>
                <div className="text-sm font-heading font-bold text-white mt-2">
                  {st.label}
                </div>
                <div className="text-[11px] text-gray-400 mt-1">
                  {st.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Choose Triarch Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[1px] w-12 bg-[#B76E4A]" />
              <span className="text-[#B76E4A] text-[11px] uppercase tracking-[0.3em] font-bold">
                Why Partner With Triarch
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#1C1C1C] dark:text-white tracking-tight leading-tight">
              A Single Studio for Your Entire Building Journey.
            </h2>

            <p className="text-base text-[#555555] dark:text-gray-300 leading-relaxed">
              Traditional development routes force clients to manage separate architectural firms, structural engineering consultants, MEP contractors, and quantity surveyors — leading to miscommunication, budget overruns, and blame shifting.
            </p>

            <p className="text-base text-[#555555] dark:text-gray-300 leading-relaxed font-medium">
              Triarch Ventures unifies all disciplines under one roof. Our integrated BIM workflow guarantees structural precision, climate efficiency, and strict financial compliance.
            </p>

            <div className="pt-4 space-y-3">
              {[
                'Full BIM Level 2 Parametric Coordination (Revit + Archicad)',
                'In-house Structural & MEP Engineering Certification',
                '100% Approval Success Rate with Statutory Authorities',
                'Dedicated Site Project Manager Assigned to Every Project'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#4E6B5A] dark:text-[#B76E4A] shrink-0" />
                  <span className="text-xs font-bold text-[#1C1C1C] dark:text-white">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#ECECEC] dark:border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
                alt="Architects and Engineers on Site"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
                <div className="text-xs font-mono font-bold text-[#B76E4A] uppercase tracking-wider mb-1">
                  Integrated Execution
                </div>
                <div className="text-lg font-heading font-bold">
                  "Zero Friction Between Render and Site Work."
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
