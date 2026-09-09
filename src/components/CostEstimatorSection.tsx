import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EstimatorInput } from '../types';
import { Calculator, Download, CheckCircle, Mail, DollarSign, Building, Sparkles, FileText, ArrowDownToLine, Send } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { generateCostEstimatePDF } from '../utils/pdfGenerator';

interface CostEstimatorSectionProps {
  onSendEstimateToConsultation: (details: string) => void;
}

export const CostEstimatorSection: React.FC<CostEstimatorSectionProps> = ({ onSendEstimateToConsultation }) => {
  const [currency, setCurrency] = useState<'KES' | 'USD'>(siteConfig.estimator.currencyDefault);
  const [inputs, setInputs] = useState<EstimatorInput>({
    projectType: 'residential_villa',
    location: siteConfig.estimator.locations[0] || 'Nairobi Prime (Kileleshwa/Karen/Westlands)',
    bedrooms: 4,
    floors: 2,
    builtAreaSqM: 450,
    qualityLevel: 'premium',
    includeLandscaping: true,
    includeInteriorDesign: true
  });

  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [estimateSent, setEstimateSent] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Rate per sq meter logic based on quality level (KES rates from siteConfig)
  const getBaseRatePerSqM = () => {
    switch (inputs.qualityLevel) {
      case 'standard':
        return siteConfig.estimator.baseRateStandard;
      case 'premium':
        return siteConfig.estimator.baseRatePremium;
      case 'ultra_luxury':
        return siteConfig.estimator.baseRateUltraLuxury;
      default:
        return siteConfig.estimator.baseRatePremium;
    }
  };

  // Calculate costs
  const baseRate = getBaseRatePerSqM();
  let totalAreaCost = inputs.builtAreaSqM * baseRate;

  // Add-ons from siteConfig
  if (inputs.includeLandscaping) totalAreaCost += inputs.builtAreaSqM * siteConfig.estimator.landscapingRatePerSqM;
  if (inputs.includeInteriorDesign) totalAreaCost += inputs.builtAreaSqM * siteConfig.estimator.interiorDesignRatePerSqM;

  // Professional fees from siteConfig
  const profFeePercentage = siteConfig.estimator.professionalFeePercentage;
  const estimatedProfFees = totalAreaCost * profFeePercentage;

  // Timeline calculation
  const monthsEstimate = Math.max(6, Math.ceil((inputs.builtAreaSqM / 40) + inputs.floors * 1.5));

  // Currency conversion rate from siteConfig
  const rateUSD = siteConfig.estimator.usdExchangeRate;
  const formatMoney = (amountKES: number) => {
    if (currency === 'USD') {
      const usd = Math.round(amountKES / rateUSD);
      return `$${usd.toLocaleString()}`;
    }
    return `KES ${(Math.round(amountKES / 1000) * 1000).toLocaleString()}`;
  };

  const handleInstantDownloadPDF = (customClientName?: string) => {
    setIsDownloading(true);
    try {
      generateCostEstimatePDF({
        inputs,
        currency,
        totalAreaCost,
        estimatedProfFees,
        monthsEstimate,
        clientName: customClientName || userName || 'Private Client',
        clientEmail: userEmail,
      });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSendEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) return;
    
    // Download the PDF immediately
    handleInstantDownloadPDF(userName);

    setEstimateSent(true);
    setTimeout(() => {
      setEmailModalOpen(false);
      setEstimateSent(false);
      const summary = `Estimated Cost: ${formatMoney(totalAreaCost + estimatedProfFees)} (${inputs.builtAreaSqM} m² ${inputs.qualityLevel} ${inputs.projectType})`;
      onSendEstimateToConsultation(summary);
    }, 2000);
  };

  return (
    <section id="estimator" className="py-24 md:py-32 bg-[#F8F7F4] dark:bg-[#121312] border-b border-[#ECECEC] dark:border-white/10">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[1px] w-12 bg-[#B76E4A]" />
              <span className="text-[#B76E4A] text-[11px] uppercase tracking-[0.3em] font-bold">
                Interactive Budget Planning
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#1C1C1C] dark:text-white tracking-tight leading-tight">
              Construction Cost & Professional Fee Estimator.
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-white dark:bg-[#1C1D1C] p-1.5 rounded-full border border-[#ECECEC] dark:border-white/10">
            <button
              onClick={() => setCurrency('KES')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-colors ${
                currency === 'KES' ? 'bg-[#4E6B5A] text-white' : 'text-gray-500'
              }`}
            >
              KES
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-colors ${
                currency === 'USD' ? 'bg-[#4E6B5A] text-white' : 'text-gray-500'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Calculator Widget Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column */}
          <div className="lg:col-span-7 bg-white dark:bg-[#1C1D1C] rounded-3xl p-6 sm:p-8 border border-[#ECECEC] dark:border-white/10 shadow-lg space-y-6">
            
            {/* 1. Project Type */}
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#1C1C1C] dark:text-white mb-2">
                1. Select Project Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'residential_villa', label: 'Luxury Villa / House' },
                  { id: 'apartment_complex', label: 'Apartment Block' },
                  { id: 'commercial_office', label: 'Commercial Office' },
                  { id: 'hospitality_boutique', label: 'Boutique Hotel' },
                  { id: 'institutional', label: 'Institutional Building' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setInputs({ ...inputs, projectType: type.id as any })}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border ${
                      inputs.projectType === type.id
                        ? 'bg-[#1C1C1C] dark:bg-white text-white dark:text-[#1C1C1C] border-transparent shadow-md'
                        : 'bg-[#F8F7F4] dark:bg-[#121312] text-[#555555] dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-[#4E6B5A]'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Construction Quality / Finish Level */}
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#1C1C1C] dark:text-white mb-2">
                2. Construction Quality & Finishes Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'standard', title: 'Standard', desc: 'Quality ceramic & aluminum' },
                  { id: 'premium', title: 'Premium', desc: 'Porcelain, hardwood, quartz' },
                  { id: 'ultra_luxury', title: 'Ultra-Luxury', desc: 'Imported travertine, automation' },
                ].map((q) => (
                  <button
                    key={q.id}
                    onClick={() => setInputs({ ...inputs, qualityLevel: q.id as any })}
                    className={`p-3 rounded-xl text-left transition-all border ${
                      inputs.qualityLevel === q.id
                        ? 'bg-[#4E6B5A] text-white border-transparent shadow-md'
                        : 'bg-[#F8F7F4] dark:bg-[#121312] text-[#555555] dark:text-gray-300 border-gray-200 dark:border-white/10'
                    }`}
                  >
                    <div className="text-xs font-bold">{q.title}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{q.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Area Size Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-[#1C1C1C] dark:text-white">
                  3. Total Built Area (Square Meters)
                </label>
                <span className="text-sm font-mono font-bold text-[#B76E4A]">
                  {inputs.builtAreaSqM} m² ({Math.round(inputs.builtAreaSqM * 10.764)} sq ft)
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="2500"
                step="25"
                value={inputs.builtAreaSqM}
                onChange={(e) => setInputs({ ...inputs, builtAreaSqM: Number(e.target.value) })}
                className="w-full accent-[#4E6B5A] cursor-pointer"
              />
            </div>

            {/* 4. Bedrooms & Floors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#1C1C1C] dark:text-white mb-1">
                  Bedrooms
                </label>
                <select
                  value={inputs.bedrooms}
                  onChange={(e) => setInputs({ ...inputs, bedrooms: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl bg-[#F8F7F4] dark:bg-[#121312] border border-gray-200 dark:border-white/10 text-xs font-medium text-[#1C1C1C] dark:text-white"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                    <option key={num} value={num}>{num} Bedrooms</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#1C1C1C] dark:text-white mb-1">
                  Number of Floors
                </label>
                <select
                  value={inputs.floors}
                  onChange={(e) => setInputs({ ...inputs, floors: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl bg-[#F8F7F4] dark:bg-[#121312] border border-gray-200 dark:border-white/10 text-xs font-medium text-[#1C1C1C] dark:text-white"
                >
                  {[1, 2, 3, 4, 5, 8, 12, 18].map((num) => (
                    <option key={num} value={num}>{num} Levels / Floors</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 5. Add-On Toggles */}
            <div className="pt-2 border-t border-gray-200 dark:border-white/10 space-y-2">
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#1C1C1C] dark:text-white mb-1">
                Optional Project Scopes
              </label>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8F7F4] dark:bg-[#121312]">
                <span className="text-xs font-medium text-[#1C1C1C] dark:text-white">
                  Bespoke Interior Joinery & Kitchen Suite
                </span>
                <input
                  type="checkbox"
                  checked={inputs.includeInteriorDesign}
                  onChange={(e) => setInputs({ ...inputs, includeInteriorDesign: e.target.checked })}
                  className="w-4 h-4 accent-[#4E6B5A]"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8F7F4] dark:bg-[#121312]">
                <span className="text-xs font-medium text-[#1C1C1C] dark:text-white">
                  Landscaping, Pool & Exterior Water Features
                </span>
                <input
                  type="checkbox"
                  checked={inputs.includeLandscaping}
                  onChange={(e) => setInputs({ ...inputs, includeLandscaping: e.target.checked })}
                  className="w-4 h-4 accent-[#4E6B5A]"
                />
              </div>
            </div>

          </div>

          {/* Live Calculation Output Card */}
          <div className="lg:col-span-5 bg-[#1C1C1C] text-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between space-y-8 border border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Estimated Budget Output</span>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider block">Estimated Construction Cost</span>
                  <div className="text-3xl sm:text-4xl font-heading font-extrabold text-white mt-1">
                    {formatMoney(totalAreaCost * 0.95)} - {formatMoney(totalAreaCost * 1.05)}
                  </div>
                  <span className="text-[11px] text-gray-400 mt-1 block">
                    Based on {inputs.builtAreaSqM} m² @ {inputs.qualityLevel} specification.
                  </span>
                </div>

                <div className="pt-4 border-t border-white/15 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">Estimated Professional Fees (~9.5%):</span>
                    <strong className="text-emerald-400 font-mono text-sm">{formatMoney(estimatedProfFees)}</strong>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">Estimated Duration:</span>
                    <strong className="text-amber-300 font-mono text-sm">{monthsEstimate} Months</strong>
                  </div>
                </div>

                {/* Professional Fee Breakdown */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-[11px] text-gray-300">
                  <span className="font-bold text-white block uppercase tracking-wider text-[10px]">
                    Includes Triarch Integrated Disciplines:
                  </span>
                  <div className="grid grid-cols-2 gap-1 text-gray-300">
                    <div>• Architectural Design</div>
                    <div>• Structural Calculations</div>
                    <div>• MEP Engineering</div>
                    <div>• Project Management</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download & Share Actions */}
            <div className="pt-6 border-t border-white/15 space-y-3">
              {/* Primary Instant Download Button */}
              <button
                onClick={() => handleInstantDownloadPDF()}
                disabled={isDownloading}
                id="instant-download-pdf-btn"
                className="w-full bg-[#B76E4A] hover:bg-[#a25c3a] active:scale-[0.99] text-white py-4 px-6 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg transition-all cursor-pointer disabled:opacity-75"
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Generating Official PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Estimate PDF</span>
                  </>
                )}
              </button>

              {/* Secondary Option: Email / Personalized Copy */}
              <button
                onClick={() => setEmailModalOpen(true)}
                className="w-full bg-white/10 hover:bg-white/15 text-gray-200 hover:text-white py-3 px-6 rounded-full font-medium text-xs tracking-wider flex items-center justify-center gap-2 border border-white/15 transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#B76E4A]" />
                <span>Personalize & Email Estimate PDF</span>
              </button>

              {/* Instant Download Success Banner */}
              <AnimatePresence>
                {downloadSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5"
                  >
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Official architectural estimate PDF has been generated and downloaded.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>

      {/* Email / Personalized PDF Modal */}
      <AnimatePresence>
        {emailModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEmailModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white dark:bg-[#1A1B1A] rounded-3xl p-8 z-10 border border-[#ECECEC] dark:border-white/10 shadow-2xl"
            >
              {estimateSent ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-[#1C1C1C] dark:text-white">
                    Estimate PDF Generated!
                  </h3>
                  <p className="text-xs text-[#555555] dark:text-gray-300">
                    Your personalized estimate has been downloaded and dispatched for <strong>{userEmail}</strong>.
                  </p>
                  <button
                    onClick={() => setEmailModalOpen(false)}
                    className="mt-4 bg-[#1C1C1C] dark:bg-white text-white dark:text-[#1C1C1C] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendEstimate} className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#4E6B5A]/10 text-[#4E6B5A] flex items-center justify-center mx-auto mb-3">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-[#1C1C1C] dark:text-white">
                      Personalized PDF Estimate
                    </h3>
                    <p className="text-xs text-[#555555] dark:text-gray-400 mt-1">
                      Enter your details below to generate an official branded PDF estimate addressed to you.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                      Full Name / Entity
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kennedy Otieno"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#F8F7F4] dark:bg-[#121312] border border-gray-200 dark:border-white/10 text-xs text-[#1C1C1C] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4E6B5A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. client@domain.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#F8F7F4] dark:bg-[#121312] border border-gray-200 dark:border-white/10 text-xs text-[#1C1C1C] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4E6B5A]"
                    />
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      className="w-full bg-[#4E6B5A] hover:bg-[#3B5344] text-white py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Personalized PDF</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmailModalOpen(false)}
                      className="w-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xs py-2 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
