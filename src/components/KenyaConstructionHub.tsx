import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  KENYA_COUNTIES_APPROVALS,
  KENYA_MATERIAL_BENCHMARKS,
  SOIL_FOUNDATION_PROFILES,
  DIASPORA_MILESTONE_FRAMEWORK,
} from '../data/kenyaConstructionData';
import {
  FileCheck,
  Globe2,
  TrendingUp,
  Layers,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  DollarSign,
  Calculator,
  Search,
  Filter,
  Sparkles,
  Camera,
  Lock,
  Plane,
  Building,
  HardHat,
  Compass,
  FileText,
  BadgePercent,
  Calendar
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const KenyaConstructionHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'approvals' | 'diaspora' | 'materials' | 'soils'>('approvals');

  // County Approvals state
  const [selectedCountyId, setSelectedCountyId] = useState<string>('nairobi');
  const [builtAreaSqM, setBuiltAreaSqM] = useState<number>(350);
  const selectedCounty = KENYA_COUNTIES_APPROVALS.find((c) => c.countyId === selectedCountyId) || KENYA_COUNTIES_APPROVALS[0];

  // Estimated statutory fee calculation
  const estimatedCountyFee = Math.round(builtAreaSqM * selectedCounty.scrutinyRatePerSqM);
  const estimatedNcaLevy = builtAreaSqM > 250 ? Math.round(builtAreaSqM * 48000 * 0.005) : 0; // Estimated 0.5% if above threshold

  // Material benchmarks filter state
  const [materialCategory, setMaterialCategory] = useState<string>('All');
  const [materialSearch, setMaterialSearch] = useState<string>('');

  // Soil selector state
  const [selectedSoilIndex, setSelectedSoilIndex] = useState<number>(0);
  const selectedSoil = SOIL_FOUNDATION_PROFILES[selectedSoilIndex];

  // Filtered materials
  const filteredMaterials = KENYA_MATERIAL_BENCHMARKS.filter((mat) => {
    const matchesCat = materialCategory === 'All' || mat.category === materialCategory;
    const matchesQuery =
      mat.materialName.toLowerCase().includes(materialSearch.toLowerCase()) ||
      mat.commonBrandsOrSources.some((b) => b.toLowerCase().includes(materialSearch.toLowerCase())) ||
      mat.regionalNotes.toLowerCase().includes(materialSearch.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const materialCategories = ['All', 'Cement', 'Steel & Rebar', 'Masonry & Stone', 'Aggregates & Sand', 'Roofing & Timber'];

  return (
    <section id="kenya-hub" className="py-24 md:py-32 bg-[#FAF9F5] dark:bg-[#121312] text-[#1C1C1C] dark:text-[#F3F3F0] transition-colors border-b border-[#ECECEC] dark:border-white/10 relative overflow-hidden">
      
      {/* Background Decorative Graphic Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4E6B5A]/5 dark:bg-[#4E6B5A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B76E4A]/5 dark:bg-[#B76E4A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#4E6B5A]/10 dark:bg-[#4E6B5A]/20 border border-[#4E6B5A]/30 text-[#4E6B5A] dark:text-[#A3B899] text-[11px] uppercase tracking-[0.25em] font-bold flex items-center gap-1.5">
                <span>🇰🇪</span>
                Kenyan Built Environment & Advisory Hub
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight leading-tight text-[#1C1C1C] dark:text-white">
              Built for Kenya's Soil, Laws, <br className="hidden sm:inline" />
              <span className="text-[#B76E4A]">& Overseas Investors.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#555555] dark:text-gray-300 max-w-md leading-relaxed">
            Navigate county statutory permitting, real-time material BOQ rates, regional soil engineering, and transparent milestone-based escrow tracking for diaspora developers.
          </p>
        </div>

        {/* Feature Tab Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-[#ECECEC] dark:border-white/10">
          {[
            { id: 'approvals', label: 'County Approvals & Permits', icon: FileCheck, count: '5 Counties' },
            { id: 'diaspora', label: 'Diaspora Escrow & 360° Portal', icon: Globe2, highlight: 'Remote Investor' },
            { id: 'materials', label: 'Kenya Material & BOQ Rates', icon: TrendingUp, count: '10 Benchmarks' },
            { id: 'soils', label: 'Soil & Foundation Advisory', icon: Layers, count: '4 Soil Types' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2.5 cursor-pointer border ${
                  isActive
                    ? 'bg-[#1C1C1C] dark:bg-white text-white dark:text-[#1C1C1C] border-[#1C1C1C] dark:border-white shadow-lg'
                    : 'bg-white dark:bg-[#1A1B1A] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 border-[#ECECEC] dark:border-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? (activeTab === 'diaspora' ? 'text-[#B76E4A]' : 'text-emerald-400') : 'text-gray-400'}`} />
                <span>{tab.label}</span>
                {tab.count && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 dark:bg-black/20 text-white dark:text-black font-normal' : 'bg-gray-100 dark:bg-white/10 text-gray-500'}`}>
                    {tab.count}
                  </span>
                )}
                {tab.highlight && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B76E4A] text-white font-bold">
                    ★ {tab.highlight}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* TAB 1: COUNTY APPROVALS & STATUTORY PERMITS NAVIGATOR */}
        {/* ======================================================== */}
        {activeTab === 'approvals' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* County Selector & GFA Estimator */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* County Picker Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1B1A] border border-[#ECECEC] dark:border-white/10 shadow-xs">
                <label className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider flex items-center gap-1.5 mb-3">
                  <MapPin className="w-4 h-4 text-[#B76E4A]" />
                  Select Project County:
                </label>
                
                <div className="space-y-2">
                  {KENYA_COUNTIES_APPROVALS.map((county) => (
                    <button
                      key={county.countyId}
                      onClick={() => setSelectedCountyId(county.countyId)}
                      className={`w-full text-left p-3.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer border ${
                        selectedCountyId === county.countyId
                          ? 'bg-[#4E6B5A] text-white border-[#4E6B5A] shadow-md'
                          : 'bg-[#F8F7F4] dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border-transparent text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 opacity-80" />
                        <span>{county.countyName}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${selectedCountyId === county.countyId ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400'}`}>
                        {county.typicalApprovalTimeWeeks}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Built Area Slider */}
                <div className="mt-6 pt-6 border-t border-[#ECECEC] dark:border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      Proposed Gross Floor Area (GFA):
                    </label>
                    <span className="text-xs font-mono font-bold text-[#B76E4A]">
                      {builtAreaSqM} m² (~{(builtAreaSqM * 10.764).toFixed(0)} sq ft)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={80}
                    max={2500}
                    step={10}
                    value={builtAreaSqM}
                    onChange={(e) => setBuiltAreaSqM(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#B76E4A]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>80 m² (Bungalow)</span>
                    <span>500 m² (Luxury Villa)</span>
                    <span>2,500 m² (Commercial/Apts)</span>
                  </div>
                </div>

                {/* Estimated Statutory Fees Card */}
                <div className="mt-6 p-4 rounded-2xl bg-[#4E6B5A]/10 dark:bg-[#4E6B5A]/20 border border-[#4E6B5A]/30">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-[#4E6B5A] dark:text-[#A3B899] mb-1 flex items-center gap-1">
                    <Calculator className="w-3.5 h-3.5" />
                    Estimated Statutory Scrutiny Fee:
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#1C1C1C] dark:text-white">
                    KES {estimatedCountyFee.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-gray-600 dark:text-gray-400 mt-1 leading-snug">
                    Based on {selectedCounty.countyName} official rates (@ KES {selectedCounty.scrutinyRatePerSqM}/m²).
                    {estimatedNcaLevy > 0 && ` Plus approx. KES ${estimatedNcaLevy.toLocaleString()} NCA Levy (if contract > 5M).`}
                  </div>
                </div>
              </div>

              {/* County Approval Details & Timeline */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Header Summary */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1A1B1A] border border-[#ECECEC] dark:border-white/10 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#ECECEC] dark:border-white/10">
                    <div>
                      <span className="text-[11px] font-mono font-semibold text-[#B76E4A] uppercase tracking-wider">
                        {selectedCounty.systemName}
                      </span>
                      <h3 className="text-2xl font-heading font-bold text-[#1C1C1C] dark:text-white mt-0.5">
                        {selectedCounty.countyName} Statutory Approval Roadmap
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <div>
                          <div className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Target Timeline</div>
                          <div className="text-xs font-bold">{selectedCounty.typicalApprovalTimeWeeks}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Statutory Bodies Involved */}
                  <div className="mt-6">
                    <h4 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider mb-4 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#4E6B5A]" />
                      Mandatory Approvals & Regulatory Clearances:
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedCounty.regulatoryBodies.map((reg, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-[#F8F7F4] dark:bg-white/5 border border-[#ECECEC] dark:border-white/10 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="font-bold text-sm text-[#1C1C1C] dark:text-white">
                                {reg.acronym}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B76E4A]/10 text-[#B76E4A] font-semibold">
                                {reg.mandatoryFor}
                              </span>
                            </div>
                            <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                              {reg.name}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                              {reg.role}
                            </p>
                          </div>

                          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-white/10 text-[11px] font-mono text-[#4E6B5A] dark:text-[#A3B899] flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            <span>{reg.approxFeeText}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mandatory Submission Drawings Checklist */}
                  <div className="mt-8 pt-6 border-t border-[#ECECEC] dark:border-white/10">
                    <h4 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider mb-4 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#B76E4A]" />
                      Required Submission Dossier (Prepared by Triarch Ventures):
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedCounty.submissionChecklists.map((chk, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-[#F8F7F4] dark:bg-white/5 border border-[#ECECEC] dark:border-white/10">
                          <div className="text-xs font-bold text-[#1C1C1C] dark:text-white mb-2 pb-1 border-b border-gray-200 dark:border-white/10">
                            {chk.category}
                          </div>
                          <ul className="space-y-1.5">
                            {chk.items.map((item, j) => (
                              <li key={j} className="text-[11px] text-gray-600 dark:text-gray-400 flex items-start gap-1.5 leading-snug">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Local Zoning Rules & By-Laws */}
                  <div className="mt-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-500/30">
                    <div className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Key Zoning Highlights for {selectedCounty.countyName}:
                    </div>
                    <ul className="space-y-1 text-xs text-amber-900/80 dark:text-amber-200/80">
                      {selectedCounty.localZoningHighlights.map((z, k) => (
                        <li key={k} className="flex items-start gap-1.5">
                          <span className="text-[#B76E4A] font-bold">•</span>
                          <span>{z}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: DIASPORA ESCROW & 360° REMOTE INVESTOR PORTAL     */}
        {/* ======================================================== */}
        {activeTab === 'diaspora' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-10"
          >
            {/* Top Diaspora Hero Banner */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1C1E1C] via-[#242925] to-[#181918] text-white border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#B76E4A]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-3xl relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B76E4A]/30 border border-[#B76E4A]/50 text-amber-200 text-xs font-bold uppercase tracking-wider mb-4">
                  <Plane className="w-3.5 h-3.5" />
                  <span>Trusted by Kenyans in USA, UK, Canada, UAE, EU & Australia</span>
                </div>
                
                <h3 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight leading-snug">
                  Build Back Home with 100% Financial Security & Full Digital Oversight.
                </h3>

                <p className="text-sm sm:text-base text-gray-300 mt-4 leading-relaxed">
                  Never send blind wire transfers or rely on informal third-party updates. Triarch Ventures implements a legally binding, milestone-governed escrow framework with 360° VR site inspections and lab-certified engineer sign-offs.
                </p>

                {/* 3 Core Trust Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/15">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Milestone Escrow</h4>
                      <p className="text-[11px] text-gray-300 mt-0.5">Funds released only after engineer & architect verification.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">360° VR & 4K Drone</h4>
                      <p className="text-[11px] text-gray-300 mt-0.5">Bi-weekly spherical virtual site walkthroughs on your phone/PC.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#B76E4A]/30 text-[#B76E4A] flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Global Timezones</h4>
                      <p className="text-[11px] text-gray-300 mt-0.5">Evening & weekend consultations in EST, PST, GMT & GST.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step-by-Step Milestone Escrow Workflow */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B76E4A]">
                    Transparent Governance
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-[#1C1C1C] dark:text-white">
                    The 6-Stage Remote Milestone Escrow Process
                  </h3>
                </div>
                <div className="text-xs text-gray-500">
                  Every stage requires independent EBK structural engineer and BORAQS QS sign-off before drawdown.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DIASPORA_MILESTONE_FRAMEWORK.map((stage) => (
                  <div
                    key={stage.stageNumber}
                    className="p-6 rounded-3xl bg-white dark:bg-[#1A1B1A] border border-[#ECECEC] dark:border-white/10 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-8 h-8 rounded-xl bg-[#4E6B5A] text-white font-bold text-xs flex items-center justify-center">
                          0{stage.stageNumber}
                        </span>
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#B76E4A]/10 text-[#B76E4A] font-bold">
                          {stage.paymentReleaseRule}
                        </span>
                      </div>

                      <h4 className="text-base font-heading font-bold text-[#1C1C1C] dark:text-white mb-3">
                        {stage.stageName}
                      </h4>

                      <div className="space-y-2 mb-4">
                        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Key Deliverables:</div>
                        <ul className="space-y-1">
                          {stage.deliverables.map((item, idx) => (
                            <li key={idx} className="text-xs text-gray-600 dark:text-gray-300 flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-white/10 space-y-2">
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">
                        <strong className="text-gray-700 dark:text-gray-200">Verification:</strong> {stage.verificationMethod}
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                        ✓ {stage.remoteInvestorBenefit}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Diaspora Consultation Booking Callout */}
            <div className="p-8 rounded-3xl bg-[#F0EFEB] dark:bg-white/5 border border-[#ECECEC] dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-lg font-heading font-bold text-[#1C1C1C] dark:text-white">
                  Are You a Kenyan in the Diaspora Planning to Build?
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Book a confidential 1-on-1 virtual design & cost advisory session with Lead Architect Kennedy Nyarari.
                </p>
              </div>

              <a
                href="#contact"
                className="bg-[#B76E4A] hover:bg-[#a25c3a] text-white px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>Schedule Diaspora Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: KENYA MATERIAL & BOQ LIVE PRICE INDEX            */}
        {/* ======================================================== */}
        {activeTab === 'materials' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Filter Bar & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#1A1B1A] border border-[#ECECEC] dark:border-white/10">
              
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                <Filter className="w-4 h-4 text-gray-400 ml-1 mr-2 shrink-0" />
                {materialCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setMaterialCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      materialCategory === cat
                        ? 'bg-[#4E6B5A] text-white shadow-xs'
                        : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Field */}
              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search cement, steel, stone..."
                  value={materialSearch}
                  onChange={(e) => setMaterialSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-[#ECECEC] dark:border-white/10 text-xs text-[#1C1C1C] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#4E6B5A]"
                />
              </div>

            </div>

            {/* Material Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMaterials.map((mat) => (
                <div
                  key={mat.id}
                  className="p-6 rounded-3xl bg-white dark:bg-[#1A1B1A] border border-[#ECECEC] dark:border-white/10 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#B76E4A] px-2.5 py-0.5 rounded-full bg-[#B76E4A]/10">
                          {mat.category}
                        </span>
                        <h4 className="text-base font-heading font-bold text-[#1C1C1C] dark:text-white mt-1.5">
                          {mat.materialName}
                        </h4>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-gray-400">Unit: {mat.unit}</div>
                        <div className="text-lg font-mono font-bold text-[#1C1C1C] dark:text-white">
                          KES {mat.currentRangeKES.min.toLocaleString()} – {mat.currentRangeKES.max.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F8F7F4] dark:bg-white/5 border border-gray-100 dark:border-white/10 text-xs text-gray-600 dark:text-gray-300 mb-4">
                      <strong>Regional Logistics:</strong> {mat.regionalNotes}
                    </div>

                    <div className="space-y-2 mb-4 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 font-semibold">Common Brands / Sources:</span>
                        <span className="text-gray-700 dark:text-gray-200">
                          {mat.commonBrandsOrSources.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-xs">
                    <div className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{mat.qualityTip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Note on BOQ Transparency */}
            <div className="p-6 rounded-2xl bg-[#4E6B5A]/10 dark:bg-[#4E6B5A]/20 border border-[#4E6B5A]/30 flex items-start gap-4">
              <Sparkles className="w-5 h-5 text-[#4E6B5A] shrink-0 mt-0.5" />
              <div className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Triarch Ventures Quantity Surveying Standard:</strong> All of our comprehensive architectural proposals include an unpriced and priced standard Standard Method of Measurement (SMM) Bill of Quantities (BOQ). We source materials directly from primary Kenyan manufacturers (Mabati Rolling Mills, Apex Steel, Bamburi Cement) to eliminate middleman markups and pass up to 15% in material savings directly to the client.
              </div>
            </div>

          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: SOIL & FOUNDATION ENGINEERING ADVISORY ENGINE     */}
        {/* ======================================================== */}
        {activeTab === 'soils' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Soil Type Cards Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SOIL_FOUNDATION_PROFILES.map((soil, idx) => {
                const isSelected = selectedSoilIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedSoilIndex(idx)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#1C1C1C] dark:bg-white text-white dark:text-[#1C1C1C] border-[#1C1C1C] dark:border-white shadow-xl scale-[1.02]'
                        : 'bg-white dark:bg-[#1A1B1A] hover:bg-gray-50 dark:hover:bg-white/5 border-[#ECECEC] dark:border-white/10 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider opacity-70 mb-1">
                        Soil Profile 0{idx + 1}
                      </div>
                      <h4 className="text-sm font-heading font-bold leading-tight mb-2">
                        {soil.soilType}
                      </h4>
                      <p className={`text-xs ${isSelected ? 'opacity-80' : 'text-gray-500 dark:text-gray-400'}`}>
                        Found in: {soil.commonAreas.slice(0, 3).join(', ')}...
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-current/10 flex items-center justify-between text-[11px] font-semibold">
                      <span>{soil.substructureCostImpact}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Soil In-Depth Engineering Profile */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#1A1B1A] border border-[#ECECEC] dark:border-white/10 shadow-lg space-y-8">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#ECECEC] dark:border-white/10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B76E4A]">
                    Geotechnical Behavior Analysis
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-[#1C1C1C] dark:text-white mt-1">
                    {selectedSoil.soilType}
                  </h3>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Prominent in: <strong>{selectedSoil.commonAreas.join(', ')}</strong>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#B76E4A]/10 border border-[#B76E4A]/30 text-[#B76E4A] font-mono text-xs font-bold text-center">
                  <div className="text-[10px] uppercase opacity-75">Cost Impact:</div>
                  <div>{selectedSoil.substructureCostImpact}</div>
                </div>
              </div>

              {/* Behavior & Excavation Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#F8F7F4] dark:bg-white/5 border border-gray-100 dark:border-white/10 space-y-2">
                  <h4 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Structural Soil Behavior & Settlement Risk:
                  </h4>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedSoil.soilBehavior}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#F8F7F4] dark:bg-white/5 border border-gray-100 dark:border-white/10 space-y-2">
                  <h4 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider flex items-center gap-1.5">
                    <HardHat className="w-4 h-4 text-[#4E6B5A]" />
                    Site Excavation & Cart-Away Protocol:
                  </h4>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedSoil.excavationNotes}
                  </p>
                </div>
              </div>

              {/* Recommended Foundation Systems */}
              <div>
                <h4 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider mb-3 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-emerald-500" />
                  Triarch Engineered Foundation Specifications:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {selectedSoil.recommendedFoundations.map((found, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/30">
                      <div className="text-xs font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{found}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Triarch Engineering Approach */}
              <div className="p-6 rounded-2xl bg-[#4E6B5A]/10 dark:bg-[#4E6B5A]/20 border border-[#4E6B5A]/30">
                <h4 className="text-xs uppercase font-bold text-[#4E6B5A] dark:text-[#A3B899] tracking-wider mb-2">
                  The Triarch Engineering Precision Advantage:
                </h4>
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedSoil.triarchEngineeringApproach}
                </p>
              </div>

            </div>

          </motion.div>
        )}

      </div>
    </section>
  );
};
