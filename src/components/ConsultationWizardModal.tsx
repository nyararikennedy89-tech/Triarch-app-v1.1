import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ConsultationFormData } from '../types';
import {
  X,
  Building,
  MapPin,
  DollarSign,
  Landmark,
  CheckSquare,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface ConsultationWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ConsultationWizardModal: React.FC<ConsultationWizardModalProps> = ({
  isOpen,
  onClose,
  initialService
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState<ConsultationFormData>({
    projectType: 'House / Villa',
    location: 'Nairobi Prime (Kileleshwa / Karen / Westlands)',
    budgetRange: 'KES 20M - 50M ($150k - $380k)',
    ownsLand: 'Yes - Title Deed Ready',
    servicesRequired: initialService ? [initialService] : ['Architecture', 'Interior Design'],
    fullName: '',
    email: '',
    phone: '',
    projectDetails: '',
    preferredTimeline: 'Within 3 Months'
  });

  if (!isOpen) return null;

  const toggleService = (srv: string) => {
    if (formData.servicesRequired.includes(srv)) {
      setFormData({
        ...formData,
        servicesRequired: formData.servicesRequired.filter((s) => s !== srv)
      });
    } else {
      setFormData({
        ...formData,
        servicesRequired: [...formData.servicesRequired, srv]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) return;
    setIsSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const message = encodeURIComponent(
      `Hello ${siteConfig.brand.name} ${siteConfig.brand.subName},\n\nI just submitted a project briefing on your website:\n- Client: ${formData.fullName}\n- Project: ${formData.projectType} in ${formData.location}\n- Budget: ${formData.budgetRange}\n- Timeline: ${formData.preferredTimeline}`
    );
    window.open(`https://wa.me/${siteConfig.contact.whatsAppPhone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const projectTypes = ['House / Villa', 'Commercial Building', 'Apartment Complex', 'Corporate Office', 'Hospitality / Resort', 'Institutional'];
  const budgetOptions = [
    'KES 10M - 25M ($75k - $190k)',
    'KES 25M - 60M ($190k - $460k)',
    'KES 60M - 150M ($460k - $1.1M)',
    'KES 150M+ ($1.1M+ Flagship Estate)'
  ];
  const landOptions = ['Yes - Title Deed Ready', 'In Acquisition / Sale Underway', 'No - Seeking Suitable Land'];
  const allServices = ['Architecture', 'Interior Design', 'Structural Engineering', 'MEP Engineering', 'Project Management', '3D Rendering'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#1A1B1A] rounded-3xl p-6 sm:p-10 z-10 border border-[#ECECEC] dark:border-white/10 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto flex flex-col justify-between"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {isSubmitted ? (
            /* SUCCESS CONFIRMATION STATE */
            <div className="py-8 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-[#B76E4A] uppercase tracking-widest">
                  Consultation Request Received
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#1C1C1C] dark:text-white mt-1">
                  Thank You, {formData.fullName}!
                </h2>
                <p className="text-xs text-[#555555] dark:text-gray-300 mt-2 max-w-md mx-auto leading-relaxed">
                  Ref Code: <strong className="font-mono text-[#4E6B5A]">TV-{new Date().getFullYear()}-{Math.floor(1000 + Math.random() * 9000)}</strong>. Our Principal Architect has received your project briefing and will contact you within 24 hours.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8F7F4] dark:bg-[#121312] border border-[#ECECEC] dark:border-white/10 text-left space-y-2 text-xs">
                <div className="font-bold uppercase tracking-wider text-[#1C1C1C] dark:text-white mb-2">
                  Project Summary
                </div>
                <div>• <strong>Type:</strong> {formData.projectType} ({formData.location})</div>
                <div>• <strong>Budget:</strong> {formData.budgetRange}</div>
                <div>• <strong>Services:</strong> {formData.servicesRequired.join(', ')}</div>
                <div>• <strong>Land Status:</strong> {formData.ownsLand}</div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto bg-[#4E6B5A] hover:bg-[#3B5344] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto bg-[#1C1C1C] dark:bg-white text-white dark:text-[#1C1C1C] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            /* MULTI-STEP WIZARD */
            <div className="space-y-6">
              {/* Wizard Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#B76E4A] mb-2">
                  <span>Step 0{step} of 06</span>
                  <span>{Math.round((step / 6) * 100)}% Completed</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4E6B5A] transition-all duration-300"
                    style={{ width: `${(step / 6) * 100}%` }}
                  />
                </div>
              </div>

              {/* STEP 1: PROJECT TYPE */}
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-heading font-extrabold text-[#1C1C1C] dark:text-white flex items-center gap-2">
                    <Building className="w-5 h-5 text-[#4E6B5A]" />
                    <span>What type of project are you planning?</span>
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, projectType: type })}
                        className={`p-4 rounded-2xl text-left border text-xs font-bold transition-all ${
                          formData.projectType === type
                            ? 'bg-[#1C1C1C] dark:bg-white text-white dark:text-[#1C1C1C] border-transparent shadow-lg'
                            : 'bg-[#F8F7F4] dark:bg-[#121312] text-[#555555] dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-[#4E6B5A]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: LOCATION */}
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-heading font-extrabold text-[#1C1C1C] dark:text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#B76E4A]" />
                    <span>Where is the project located?</span>
                  </h2>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Kileleshwa, Karen, Mombasa Coast, Dubai, etc."
                    className="w-full p-4 rounded-2xl bg-[#F8F7F4] dark:bg-[#121312] border border-gray-200 dark:border-white/10 text-xs font-medium text-[#1C1C1C] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4E6B5A]"
                  />
                  <p className="text-[11px] text-gray-400">
                    Triarch Ventures operates across Kenya, East Africa, and internationally.
                  </p>
                </div>
              )}

              {/* STEP 3: BUDGET RANGE */}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-heading font-extrabold text-[#1C1C1C] dark:text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#4E6B5A]" />
                    <span>What is your estimated target budget?</span>
                  </h2>
                  <div className="space-y-2.5">
                    {budgetOptions.map((bg) => (
                      <button
                        key={bg}
                        type="button"
                        onClick={() => setFormData({ ...formData, budgetRange: bg })}
                        className={`w-full p-4 rounded-2xl text-left border text-xs font-bold transition-all ${
                          formData.budgetRange === bg
                            ? 'bg-[#4E6B5A] text-white border-transparent shadow-lg'
                            : 'bg-[#F8F7F4] dark:bg-[#121312] text-[#555555] dark:text-gray-300 border-gray-200 dark:border-white/10'
                        }`}
                      >
                        {bg}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: LAND STATUS */}
              {step === 4 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-heading font-extrabold text-[#1C1C1C] dark:text-white flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-[#B76E4A]" />
                    <span>Do you already own the project land?</span>
                  </h2>
                  <div className="space-y-2.5">
                    {landOptions.map((ld) => (
                      <button
                        key={ld}
                        type="button"
                        onClick={() => setFormData({ ...formData, ownsLand: ld })}
                        className={`w-full p-4 rounded-2xl text-left border text-xs font-bold transition-all ${
                          formData.ownsLand === ld
                            ? 'bg-[#1C1C1C] dark:bg-white text-white dark:text-[#1C1C1C] border-transparent shadow-lg'
                            : 'bg-[#F8F7F4] dark:bg-[#121312] text-[#555555] dark:text-gray-300 border-gray-200 dark:border-white/10'
                        }`}
                      >
                        {ld}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: SERVICES REQUIRED */}
              {step === 5 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-heading font-extrabold text-[#1C1C1C] dark:text-white flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-[#4E6B5A]" />
                    <span>Select required Triarch disciplines:</span>
                  </h2>
                  <div className="grid grid-cols-2 gap-2.5">
                    {allServices.map((srv) => {
                      const isSelected = formData.servicesRequired.includes(srv);
                      return (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => toggleService(srv)}
                          className={`p-3.5 rounded-2xl text-left border text-xs font-bold flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-[#4E6B5A] text-white border-transparent'
                              : 'bg-[#F8F7F4] dark:bg-[#121312] text-[#555555] dark:text-gray-300 border-gray-200 dark:border-white/10'
                          }`}
                        >
                          <span>{srv}</span>
                          <span>{isSelected ? '✓' : '+'}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 6: CONTACT DETAILS */}
              {step === 6 && (
                <form id="wizard-final-form" onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-xl font-heading font-extrabold text-[#1C1C1C] dark:text-white flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-[#B76E4A]" />
                    <span>Your Contact Information</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Richard Otieno"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#F8F7F4] dark:bg-[#121312] border border-gray-200 dark:border-white/10 text-xs text-[#1C1C1C] dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+254 700 000 000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#F8F7F4] dark:bg-[#121312] border border-gray-200 dark:border-white/10 text-xs text-[#1C1C1C] dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#F8F7F4] dark:bg-[#121312] border border-gray-200 dark:border-white/10 text-xs text-[#1C1C1C] dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                      Project Notes / Vision Brief
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Share key requirements, room counts, or special preferences..."
                      value={formData.projectDetails}
                      onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#F8F7F4] dark:bg-[#121312] border border-gray-200 dark:border-white/10 text-xs text-[#1C1C1C] dark:text-white"
                    />
                  </div>
                </form>
              )}

              {/* Wizard Navigation Controls */}
              <div className="pt-4 border-t border-[#ECECEC] dark:border-white/10 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border border-gray-300 dark:border-white/20 text-[#555555] dark:text-gray-300 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : <div />}

                {step < 6 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="bg-[#4E6B5A] text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:bg-[#3B5344]"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="wizard-final-form"
                    className="bg-[#B76E4A] hover:bg-[#a25c3a] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl"
                  >
                    <span>Submit Consultation Request</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
