/**
 * ==============================================================================
 * TRIARCH VENTURES — CENTRAL SITE & CONTENT CONFIGURATION
 * ==============================================================================
 * 
 * Edit this single file to customize studio details, brand info, office addresses,
 * contact numbers, social links, hero slides, stat counters, and cost estimator rates.
 * Everything is strongly typed with TypeScript for automatic autocomplete & safety.
 */

export interface OfficeLocation {
  id: 'Nairobi' | 'Kiambu' | 'Nyeri' | string;
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  hours?: string;
  isPrimary?: boolean;
}

export interface HeroSlide {
  image: string;
  title: string;
  location: string;
  tag?: string;
  projectId?: string;
  year?: string;
  area?: string;
  description?: string;
}

export interface StatCounter {
  value: string;
  label: string;
  iconName: 'Building2' | 'Compass' | 'ShieldCheck' | 'Award';
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
}

export interface SiteConfig {
  brand: {
    name: string;
    subName: string;
    establishedYear: number;
    tagline: string;
    shortDescription: string;
    legalName: string;
    practiceRegistration: string;
  };
  contact: {
    primaryEmail: string;
    inquiriesEmail: string;
    careersEmail: string;
    primaryPhone: string;
    whatsAppPhone: string;
    whatsAppMessage: string;
  };
  offices: Record<string, OfficeLocation>;
  socials: SocialLink[];
  navigation: {
    mainLinks: Array<{ name: string; href: string }>;
    legalLinks: Array<{ name: string; href: string }>;
  };
  hero: {
    eyebrow: string;
    headingLine1: string;
    headingAccent: string;
    headingLine2: string;
    description: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    sideRailText: string;
    slides: HeroSlide[];
    stats: StatCounter[];
  };
  estimator: {
    currencyDefault: 'KES' | 'USD';
    usdExchangeRate: number; // 1 USD in KES
    baseRateStandard: number; // KES per sq. meter
    baseRatePremium: number;
    baseRateUltraLuxury: number;
    landscapingRatePerSqM: number;
    interiorDesignRatePerSqM: number;
    professionalFeePercentage: number; // e.g. 0.095 = 9.5%
    locations: string[];
    projectTypes: Array<{ id: string; label: string; multiplier: number }>;
  };
  features: {
    enableCustomCursor: boolean;
    enableQuickSearch: boolean;
    enableDarkModeToggle: boolean;
    enableCostEstimator: boolean;
    enableNewsletter: boolean;
  };
}

export const siteConfig: SiteConfig = {
  brand: {
    name: 'TRIARCH',
    subName: 'VENTURES',
    establishedYear: 2022,
    tagline: 'Design Spaces. Build Legacies.',
    shortDescription:
      'Multidisciplinary architecture, interior design, structural & MEP engineering, and construction consultancy studio delivering transformative built environments.',
    legalName: 'Triarch Ventures Ltd.',
    practiceRegistration: 'Registered Architectural & Structural Engineering Practice (BORAQS / EBK Registered)',
  },

  contact: {
    primaryEmail: 'info@triarchventures.com',
    inquiriesEmail: 'projects@triarchventures.com',
    careersEmail: 'careers@triarchventures.com',
    primaryPhone: '+254 (0) 714 965 505',
    whatsAppPhone: '+254714965505',
    whatsAppMessage: 'Hello Triarch Ventures, I would like to inquire about a new architectural and engineering project.',
  },

  offices: {
    Nairobi: {
      id: 'Nairobi',
      city: 'Nairobi, Kenya',
      country: 'Kenya',
      address: 'Pinetree Plaza, 4th Floor, Dr Kaburu',
      phone: '+254 (0) 714 965 505',
      email: 'nairobi@triarchventures.com',
      hours: 'Mon - Fri: 8:00 AM – 5:00 PM EAT',
      isPrimary: true,
    },
    Kiambu: {
      id: 'Kiambu',
      city: 'Kiambu County',
      country: 'Kenya',
      address: '12 Mayfair Architectural Chambers, Curzon St',
      phone: '+254 (0) 714 965 505',
      email: 'kiambu@triarchventures.com',
      hours: 'Mon - Fri: 9:00 AM – 5:30 PM GMT',
    },
    Nyeri: {
      id: 'Nyeri',
      city: 'Nyeri County',
      country: 'Kenya',
      address: 'DIFC Gate Precinct Building 4, Level 5',
      phone: '+254 (0) 714 965 505',
      email: 'nyeri@triarchventures.com',
      hours: 'Mon - Fri: 9:00 AM – 6:00 PM GST',
    },
  },

  socials: [
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/triarch-ventures', handle: '@triarchventures' },
    { platform: 'Instagram', url: 'https://instagram.com/triarchventures', handle: '@triarch.architecture' },
    { platform: 'X', url: 'https://x.com/triarchventures', handle: '@TriarchStudio' },
    { platform: 'Behance', url: 'https://behance.net/triarchventures', handle: 'triarchventures' },
  ],

  navigation: {
    mainLinks: [
      { name: 'Home', href: '#home' },
      { name: 'Projects', href: '#projects' },
      { name: 'Kenya Hub', href: '#kenya-hub' },
      { name: 'Services', href: '#services' },
      { name: 'Design Process', href: '#process' },
      { name: 'Cost Estimator', href: '#estimator' },
      { name: 'Resources', href: '#resources' },
      { name: 'FAQ', href: '#faq' },
      { name: 'About', href: '#about' },
      { name: 'Contact', href: '#contact' },
    ],
    legalLinks: [
      { name: 'Privacy Policy', href: '#home' },
      { name: 'Terms of Practice', href: '#home' },
      { name: 'Statutory Approvals & Compliance', href: '#home' },
    ],
  },

  hero: {
    eyebrow: 'Est. 2014 — Multidisciplinary Studio',
    headingLine1: 'Design Spaces.',
    headingAccent: 'Build',
    headingLine2: 'Legacies.',
    description:
      'Architecture, Interior Design, and Engineering thoughtfully crafted for the modern visionary and enduring structural performance.',
    primaryCtaText: 'Start Your Project',
    secondaryCtaText: 'Explore Portfolio',
    sideRailText: 'AUTHENTICITY — SYMMETRY — FUNCTION — PRECISION',
    slides: [
      {
        image: '/Enscape_2024-10-10-03-16-06.png',
        title: 'Nyeri-Nanyuki Shell Stopover',
        location: 'Mount Kenya Corridor • A2 Highway',
        tag: 'Commercial Highway Oasis',
        projectId: 'nyeri-nanyuki-shell-stopover',
        year: '2025',
        area: '18,500 sq. m',
        description: 'Iconic cantilevered fueling canopy with Mount Kenya panoramic terrace & retail hub.'
      },
      {
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
        title: 'The Glass Pavilion Villa',
        location: 'Kileleshwa • Nairobi',
        tag: 'Residential Luxury',
        projectId: 'Cavali-glass-pavilion',
        year: '2024',
        area: '850 sq. m',
        description: 'Double-height frameless glass walls with basalt finishes and infinity water courtyard.'
      },
      {
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85',
        title: 'Nexus Financial HQ Tower',
        location: 'Westlands • Nairobi',
        tag: 'Commercial Landmark',
        projectId: 'nexus-financial-tower',
        year: '2025',
        area: '24,000 sq. m',
        description: 'Biophilic 18-floor curtain-wall corporate headquarters with automated solar shading fins.'
      },
      {
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85',
        title: 'Aethel Eco Safari Lodge',
        location: 'Maasai Mara • Narok',
        tag: 'Sustainable Hospitality',
        projectId: 'serengeti-safari-lodge',
        year: '2023',
        area: '3,200 sq. m',
        description: 'Rammed earth luxury suites seamlessly integrated into the savannah conservancy.'
      },
      {
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
        title: 'Lavington Solarium Penthouse',
        location: 'Lavington • Nairobi',
        tag: 'Bespoke Interior & Living',
        projectId: 'lavington-penthouse-suite',
        year: '2024',
        area: '420 sq. m',
        description: 'Curved Venetian plaster with integrated smart ambient lighting and custom joinery.'
      },
    ],
    stats: [
      { value: '180+', label: 'Projects Built', iconName: 'Building2' },
      { value: '15+ Yrs', label: 'Practice', iconName: 'Compass' },
      { value: '7 Disciplines', label: 'Under One Roof', iconName: 'ShieldCheck' },
      { value: '100%', label: 'On-Time Approvals', iconName: 'Award' },
    ],
  },

  estimator: {
    currencyDefault: 'KES',
    usdExchangeRate: 130, // 1 USD = 130 KES
    baseRateStandard: 55000, // KES / sq. meter
    baseRatePremium: 82000,
    baseRateUltraLuxury: 125000,
    landscapingRatePerSqM: 6500,
    interiorDesignRatePerSqM: 9000,
    professionalFeePercentage: 0.095, // 9.5%
    locations: [
      'Nairobi Prime (Kileleshwa/Karen/Westlands/Runda)',
      'Nairobi Urban (Kilimani/Lavington/Parklands)',
      'Mombasa & Coastal Strip (Nyali/Diani/Watamu)',
      'Upcountry & Rift Valley (Naivasha/Nanyuki/Nakuru)',
      'International / East Africa Regional',
    ],
    projectTypes: [
      { id: 'residential_villa', label: 'Luxury Private Villa / Residential Estate', multiplier: 1.0 },
      { id: 'apartment_complex', label: 'Multi-Unit Residential Apartment Building', multiplier: 0.92 },
      { id: 'commercial_office', label: 'Commercial Corporate Office & Mixed Use', multiplier: 1.15 },
      { id: 'hospitality_boutique', label: 'Boutique Hotel / Luxury Safari Lodge', multiplier: 1.25 },
      { id: 'institutional', label: 'Institutional / Educational / Civic', multiplier: 1.05 },
    ],
  },

  features: {
    enableCustomCursor: true,
    enableQuickSearch: true,
    enableDarkModeToggle: true,
    enableCostEstimator: true,
    enableNewsletter: true,
  },
};
