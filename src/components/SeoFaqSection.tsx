import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  ExternalLink,
  Copy,
  Check,
  Building,
  ArrowRight
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'Approvals & Permits' | 'Costs & Rates' | 'Diaspora Building' | 'Structural & Foundations' | 'Process & Timeline';
  question: string;
  shortAnswer: string;
  detailedPoints?: string[];
  statutoryBody?: string;
  relatedLink?: { text: string; href: string };
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'county-approval-requirements',
    category: 'Approvals & Permits',
    question: 'What statutory approvals are required before commencing building construction in Kenya?',
    shortAnswer: 'Every lawful construction in Kenya requires a mandatory 5-step statutory approval sequence before groundbreaking to avoid demolition or site shutdowns by county inspectors.',
    detailedPoints: [
      'Architectural & Urban Planning Approval from the respective County Government (e.g. Nairobi e-Construction portal, Kiambu, Machakos) stamped by a BORAQS registered Architect.',
      'Structural Engineering Approval stamped by an Engineers Board of Kenya (EBK) registered Structural Engineer with calculation sheets.',
      'NEMA Environmental Impact Assessment (EIA) License or EIA Exemption Certificate.',
      'National Construction Authority (NCA) Site Registration & Compliance Certificate (mandatory for projects exceeding KES 5M).',
      'Water & Sewerage Reticulation Clearance (NCWSC in Nairobi / RUJWASCO in Ruiru-Juja) plus Public Health Approval.'
    ],
    statutoryBody: 'BORAQS / NCA / NEMA / County Governments',
    relatedLink: { text: 'Explore County Regulatory Matrix', href: '#kenya-hub' }
  },
  {
    id: 'building-cost-per-square-meter-kenya',
    category: 'Costs & Rates',
    question: 'How much does it cost to build a luxury home or commercial project in Kenya per square meter?',
    shortAnswer: 'Construction rates in 2025/2026 vary based on architectural complexity, finishes, and geotechnical ground conditions.',
    detailedPoints: [
      'Standard Finishes (KES 45,000 – KES 60,000 / m²): Machine-cut stone masonry, ceramic tiling, standard aluminum windows, and basic pitched corrugated roofing.',
      'Premium Contemporary (KES 65,000 – KES 90,000 / m²): High-grade porcelain tiling, engineered timber, powder-coated double glazing, custom quartz kitchen joinery, and imported sanitaryware.',
      'Ultra-Luxury Bespoke (KES 95,000 – KES 150,000+ / m²): Cast-in-place board-formed architectural concrete, natural travertine cladding, floor-to-ceiling motorized curtain walls, full home automation, and solar microgrid integration.'
    ],
    statutoryBody: 'Kenya Joint Building Council (KJBC) & Triarch Benchmarks',
    relatedLink: { text: 'Open Construction Cost Calculator', href: '#estimator' }
  },
  {
    id: 'diaspora-construction-protection',
    category: 'Diaspora Building',
    question: 'How does Triarch Ventures protect Kenyans in the diaspora from construction fraud and fund diversion?',
    shortAnswer: 'We eliminate the risks of relying on informal relatives or unvetted contractors through institutional fiduciary controls and 100% transparent visual verification.',
    detailedPoints: [
      'Milestone-Based Escrow Accounts: Funds are ring-fenced in a dedicated project account and only disbursed upon certified Quantity Surveyor (QS) inspection.',
      '360° Virtual Reality & High-Res Drone Audits: Receive weekly interactive walkthrough links to inspect columns, conduits, and tiling work from anywhere in the world.',
      'Direct Manufacturer & Quarry Trade Accounts: Cement, steel, and stone are procured straight from certified factories at wholesale rates, eliminating middleman inflation.',
      'Firm-Backed Professional Indemnity: All architectural and structural work is insured with full civil liability protection.'
    ],
    statutoryBody: 'Triarch Diaspora Advisory & BORAQS Code of Conduct',
    relatedLink: { text: 'View Diaspora Milestone Framework', href: '#kenya-hub' }
  },
  {
    id: 'black-cotton-soil-foundations',
    category: 'Structural & Foundations',
    question: 'What foundation systems are recommended for black cotton soils in Nairobi satellite towns (Kitengela, Ruiru, Athi River)?',
    shortAnswer: 'Black cotton soil has high plasticity, expanding drastically when wet and shrinking during dry seasons, which causes severe wall cracking if standard strip foundations are used.',
    detailedPoints: [
      'Complete Excavation & Mass Rock Fill: Excavating the entire black cotton layer down to stable hard murram or rock (ideal when the cotton layer is under 1.8m deep).',
      'Engineered Raft Foundation: A continuous reinforced concrete mat slab that floats evenly over the sub-base, distributing structural loads across the whole building footprint.',
      'Bored Cast-in-Situ Mini Piles: Drilling deep cylindrical shafts down to solid rock bedrock, connected by heavy reinforced ground beams (for deep soil profiles > 2.5m).'
    ],
    statutoryBody: 'Engineers Board of Kenya (EBK) Structural Standards',
    relatedLink: { text: 'Check Kenyan Soil Foundation Profiles', href: '#kenya-hub' }
  },
  {
    id: 'architect-vs-contractor-difference',
    category: 'Process & Timeline',
    question: 'Why must I hire a registered architect (BORAQS) before contracting a building contractor?',
    shortAnswer: 'An architect is your independent professional fiduciary and design lead who prepares the contract drawings, specifies materials, and supervises the contractor to prevent substandard construction and cost inflation.',
    detailedPoints: [
      'Legal Compliance: Only BORAQS registered architects and EBK registered engineers can legally stamp plans for statutory county building permits in Kenya.',
      'Cost Control: A detailed Bill of Quantities (BQ) derived from architectural drawings prevents contractors from issuing arbitrary variations or hidden charges.',
      'Independent Site Supervision: The architect serves as the contract administrator, certifying work before any payment stage is released to the builder.'
    ],
    statutoryBody: 'Board of Registration of Architects and Quantity Surveyors (BORAQS)',
    relatedLink: { text: 'Review 7-Step Design Process', href: '#process' }
  },
  {
    id: 'project-timeline-turnaround',
    category: 'Process & Timeline',
    question: 'How long does it take from concept design to breaking ground and handover in Kenya?',
    shortAnswer: 'A typical luxury residential or boutique commercial project takes 3 to 6 months for design and permitting, followed by 9 to 18 months for turnkey construction depending on scale.',
    detailedPoints: [
      'Phase 1: Concept & Spatial Programming (3–4 weeks)',
      'Phase 2: Detailed BIM Architectural & Engineering Documentation (4–6 weeks)',
      'Phase 3: County Planning, NEMA & NCA Statutory Approvals (4–8 weeks concurrently)',
      'Phase 4: Contractor Tendering & Substructure Construction (Month 1–3)',
      'Phase 5: Superstructure, MEP Services & Interior Finishes (Month 4–14)'
    ],
    statutoryBody: 'Triarch Project Delivery Standard',
    relatedLink: { text: 'Book a Project Timeline Consultation', href: '#contact' }
  }
];

const CATEGORIES = [
  'All',
  'Approvals & Permits',
  'Costs & Rates',
  'Diaspora Building',
  'Structural & Foundations',
  'Process & Timeline'
] as const;

interface SeoFaqSectionProps {
  onOpenConsultation: () => void;
}

export const SeoFaqSection: React.FC<SeoFaqSectionProps> = ({ onOpenConsultation }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('county-approval-requirements');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.detailedPoints && item.detailedPoints.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const handleCopyLink = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const url = `${window.location.origin}/#faq-${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section 
      id="faq" 
      aria-labelledby="faq-heading"
      className="py-24 md:py-32 bg-[#FFFFFF] dark:bg-[#0D0E0D] border-b border-[#ECECEC] dark:border-white/10 relative overflow-hidden"
      itemScope 
      itemType="https://schema.org/FAQPage"
    >
      {/* Background Architectural Watermark */}
      <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-[#B76E4A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-[#4E6B5A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="w-8 h-[2px] bg-[#B76E4A]" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B76E4A]">
                Architectural Knowledge &amp; Regulatory Hub
              </span>
            </div>
            <h2 
              id="faq-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-syne font-bold tracking-tight text-[#1C1C1C] dark:text-white"
            >
              Frequently Asked Questions &amp; <br />
              <span className="italic font-normal font-serif text-[#4E6B5A] dark:text-[#7EA08B]">
                Kenyan Construction Advisory
              </span>
            </h2>
          </div>

          <p className="text-[#555555] dark:text-gray-400 max-w-xl text-base sm:text-lg leading-relaxed">
            Essential statutory guidelines, cost benchmarks, soil foundation engineering, and diaspora safeguards directly answered by our licensed BORAQS architects.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="bg-[#F8F7F4] dark:bg-[#161716] p-4 sm:p-6 rounded-2xl border border-[#ECECEC] dark:border-white/10 mb-12 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-[#888888] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search permit steps, black cotton soil, rates..."
                className="w-full bg-white dark:bg-[#202120] text-[#1C1C1C] dark:text-white text-sm pl-11 pr-4 py-3 rounded-xl border border-[#ECECEC] dark:border-white/10 focus:outline-none focus:border-[#4E6B5A] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#888888] hover:text-[#1C1C1C] dark:hover:text-white px-1.5 py-0.5 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs px-3.5 py-2 rounded-full whitespace-nowrap transition-all font-medium ${
                      isSelected
                        ? 'bg-[#1C1C1C] text-white dark:bg-white dark:text-[#1C1C1C] shadow-sm'
                        : 'bg-white/80 dark:bg-white/5 text-[#666666] dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 border border-[#ECECEC] dark:border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Accordion Column */}
          <div className="lg:col-span-8 space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-16 bg-[#F8F7F4] dark:bg-[#161716] rounded-2xl border border-dashed border-[#ECECEC] dark:border-white/10">
                <HelpCircle className="w-10 h-10 text-[#888888] mx-auto mb-3 opacity-50" />
                <p className="text-[#1C1C1C] dark:text-white font-medium">No direct matching questions found</p>
                <p className="text-xs text-[#777777] mt-1">Try changing your search terms or ask our lead architect directly.</p>
                <button
                  onClick={onOpenConsultation}
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-[#4E6B5A] text-white text-xs uppercase tracking-wider font-semibold rounded-full hover:bg-[#3D5547] transition-colors"
                >
                  Ask An Architect
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = expandedId === faq.id;
                return (
                  <div
                    key={faq.id}
                    id={`faq-${faq.id}`}
                    itemScope
                    itemProp="mainEntity"
                    itemType="https://schema.org/Question"
                    className={`rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#F8F7F4] dark:bg-[#161716] border-[#4E6B5A]/40 dark:border-[#4E6B5A]/50 shadow-md'
                        : 'bg-white dark:bg-[#121312] border-[#ECECEC] dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                    }`}
                  >
                    {/* Accordion Trigger Header */}
                    <div
                      onClick={() => toggleExpand(faq.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 select-none cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-expanded={isOpen}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleExpand(faq.id);
                        }
                      }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#B76E4A]/10 text-[#B76E4A]">
                            {faq.category}
                          </span>
                          {faq.statutoryBody && (
                            <span className="text-[11px] text-[#888888] dark:text-gray-400">
                              • {faq.statutoryBody}
                            </span>
                          )}
                        </div>
                        <h3 
                          itemProp="name"
                          className="text-base sm:text-lg font-syne font-bold text-[#1C1C1C] dark:text-white leading-snug"
                        >
                          {faq.question}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={(e) => handleCopyLink(e, faq.id)}
                          title="Copy direct link to this answer"
                          aria-label="Copy link to this question"
                          className="p-1.5 rounded-lg text-[#888888] hover:text-[#1C1C1C] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        >
                          {copiedId === faq.id ? (
                            <Check className="w-4 h-4 text-[#4E6B5A]" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        <div className={`p-1.5 rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#4E6B5A] text-white' : 'bg-black/5 dark:bg-white/10 text-[#666666] dark:text-gray-300'}`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Accordion Content Body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div 
                            itemScope 
                            itemProp="acceptedAnswer" 
                            itemType="https://schema.org/Answer"
                            className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#ECECEC] dark:border-white/10"
                          >
                            <div itemProp="text" className="space-y-4">
                              <p className="text-sm sm:text-base text-[#333333] dark:text-gray-200 leading-relaxed font-normal">
                                {faq.shortAnswer}
                              </p>

                              {faq.detailedPoints && faq.detailedPoints.length > 0 && (
                                <ul className="space-y-2.5 pt-2">
                                  {faq.detailedPoints.map((pt, idx) => (
                                    <li key={`faq-${faq.id}-pt-${idx}`} className="flex items-start gap-3 text-xs sm:text-sm text-[#555555] dark:text-gray-300 leading-relaxed">
                                      <CheckCircle2 className="w-4 h-4 text-[#4E6B5A] shrink-0 mt-0.5" />
                                      <span>{pt}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>

                            {faq.relatedLink && (
                              <div className="mt-5 pt-4 border-t border-dashed border-[#ECECEC] dark:border-white/10 flex items-center justify-between">
                                <a
                                  href={faq.relatedLink.href}
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B76E4A] hover:text-[#9A5A3C] transition-colors"
                                >
                                  <span>{faq.relatedLink.text}</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </a>
                                <span className="text-[11px] text-[#888888] font-mono">
                                  BORAQS Ref: KE/CAP/525
                                </span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>

          {/* Side Advisory Card & Direct Inquiry Widget */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Registered Practice Assurance Card */}
            <div className="bg-[#1C1C1C] text-white p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#4E6B5A]/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-[#4E6B5A]/30 text-[#7EA08B] border border-[#4E6B5A]/40">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-syne font-bold text-base text-white">BORAQS &amp; NCA Accredited</h4>
                  <p className="text-xs text-gray-400">Board Registered Architectural Practice</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                Avoid costly project delays, contractor disputes, or county demolition orders. Engage fully registered architectural fiduciaries with verified practicing licenses in Kenya.
              </p>

              <div className="space-y-3 pb-6 border-b border-white/10 text-xs text-gray-300 font-medium">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Firm Registration:</span>
                  <span className="text-white font-mono">BORAQS #A892/2016</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">NCA Contractor Tier:</span>
                  <span className="text-white font-mono">NCA-1 Supervised</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Geotechnical Compliance:</span>
                  <span className="text-white font-mono">EBK Certified</span>
                </div>
              </div>

              <button
                onClick={onOpenConsultation}
                className="w-full mt-6 py-3.5 bg-[#B76E4A] hover:bg-[#9A5A3C] text-white text-xs uppercase tracking-widest font-semibold rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <span>Book Direct Case Evaluation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick SEO Topic Links */}
            <div className="bg-[#F8F7F4] dark:bg-[#161716] p-6 rounded-3xl border border-[#ECECEC] dark:border-white/10">
              <h4 className="font-syne font-bold text-sm text-[#1C1C1C] dark:text-white mb-4 flex items-center gap-2">
                <Building className="w-4 h-4 text-[#B76E4A]" />
                <span>Quick Kenyan Built Guides</span>
              </h4>

              <div className="space-y-2.5 text-xs">
                <a 
                  href="#kenya-hub" 
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white dark:hover:bg-white/5 text-[#555555] dark:text-gray-300 transition-colors group"
                >
                  <span className="group-hover:text-[#B76E4A] transition-colors">Nairobi e-Construction Approval Steps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </a>
                <a 
                  href="#estimator" 
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white dark:hover:bg-white/5 text-[#555555] dark:text-gray-300 transition-colors group"
                >
                  <span className="group-hover:text-[#B76E4A] transition-colors">2025/2026 Material Price Benchmarks</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </a>
                <a 
                  href="#projects" 
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white dark:hover:bg-white/5 text-[#555555] dark:text-gray-300 transition-colors group"
                >
                  <span className="group-hover:text-[#B76E4A] transition-colors">Architectural Portfolio & Case Studies</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </a>
                <a 
                  href="#resources" 
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white dark:hover:bg-white/5 text-[#555555] dark:text-gray-300 transition-colors group"
                >
                  <span className="group-hover:text-[#B76E4A] transition-colors">Black Cotton Soil Foundation Whitepaper</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
