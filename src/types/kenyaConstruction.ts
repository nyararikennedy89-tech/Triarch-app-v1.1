export interface CountyApprovalInfo {
  countyId: string;
  countyName: string;
  systemName: string; // e.g. "e-Construction / Nairobi Urban Planning" or "Kiambu EDAMS"
  typicalApprovalTimeWeeks: string;
  scrutinyRatePerSqM: number; // KES per sq meter
  regulatoryBodies: {
    name: string;
    acronym: string;
    role: string;
    approxFeeText: string;
    mandatoryFor: string;
  }[];
  submissionChecklists: {
    category: string;
    items: string[];
  }[];
  localZoningHighlights: string[];
}

export interface MaterialPriceBenchmark {
  id: string;
  materialName: string;
  category: 'Cement' | 'Steel & Rebar' | 'Masonry & Stone' | 'Aggregates & Sand' | 'Roofing & Timber' | 'Finishes';
  unit: string;
  currentRangeKES: { min: number; max: number; avg: number };
  trend: 'up' | 'stable' | 'down';
  trendPercent: string;
  regionalNotes: string;
  commonBrandsOrSources: string[];
  qualityTip: string;
}

export interface SoilFoundationProfile {
  soilType: string;
  commonAreas: string[];
  soilBehavior: string;
  recommendedFoundations: string[];
  substructureCostImpact: string; // e.g. "+15% to +25%"
  excavationNotes: string;
  triarchEngineeringApproach: string;
}

export interface DiasporaMilestone {
  stageNumber: number;
  stageName: string;
  deliverables: string[];
  verificationMethod: string;
  paymentReleaseRule: string;
  remoteInvestorBenefit: string;
}
