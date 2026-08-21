export type ProjectCategory = 'All' | 'Residential' | 'Commercial' | 'Hospitality' | 'Institutional' | 'Interior';

export interface FloorPlanHotspot {
  id: string;
  x: number; // percentage X
  y: number; // percentage Y
  label: string;
  roomName: string;
  description: string;
  imageUrl?: string;
}

export interface MaterialSpec {
  name: string;
  type: string;
  finish: string;
  source: string;
  colorHex: string;
}

export interface ConstructionMilestone {
  phase: string;
  date: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  description: string;
  imageUrl: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  location: string;
  area: string;
  year: string;
  servicesProvided: string[];
  client: string;
  heroImage: string;
  galleryImages: string[];
  beforeImage?: string; // For comparison slider
  afterImage?: string;
  overview: string;
  clientBrief: string;
  designChallenge: string;
  designSolution: string;
  floorPlanUrl: string;
  floorPlanHotspots: FloorPlanHotspot[];
  constructionGallery: ConstructionMilestone[];
  materials: MaterialSpec[];
  stats: {
    label: string;
    value: string;
  }[];
  featured: boolean;
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  bgImage: string;
  deliverables: string[];
  methodology: string;
  technologies: string[];
}

export interface ProcessStage {
  step: number;
  title: string;
  duration: string;
  summary: string;
  details: string;
  deliverables: string[];
  clientInput: string;
  iconName: string;
  accentColor: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  summary: string;
  coverImage: string;
  content: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  roleTitle: string;
  companyOrProject: string;
  projectLocation: string;
  avatar: string;
  quote: string;
  rating: number;
  videoThumbnail?: string;
  videoUrl?: string;
  keyMetric?: string;
}

export interface EstimatorInput {
  projectType: 'residential_villa' | 'apartment_complex' | 'commercial_office' | 'hospitality_boutique' | 'institutional';
  location: string;
  bedrooms: number;
  floors: number;
  builtAreaSqM: number;
  qualityLevel: 'standard' | 'premium' | 'ultra_luxury';
  includeLandscaping: boolean;
  includeInteriorDesign: boolean;
}

export interface ConsultationFormData {
  projectType: string;
  location: string;
  budgetRange: string;
  ownsLand: string;
  servicesRequired: string[];
  fullName: string;
  email: string;
  phone: string;
  projectDetails: string;
  preferredTimeline: string;
}
