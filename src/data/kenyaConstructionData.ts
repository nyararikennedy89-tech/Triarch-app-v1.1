import {
  CountyApprovalInfo,
  MaterialPriceBenchmark,
  SoilFoundationProfile,
  DiasporaMilestone,
} from '../types/kenyaConstruction';

export const KENYA_COUNTIES_APPROVALS: CountyApprovalInfo[] = [
  {
    countyId: 'nairobi',
    countyName: 'Nairobi City County',
    systemName: 'Nairobi Planning Portal (e-Construction)',
    typicalApprovalTimeWeeks: '3 – 6 Weeks',
    scrutinyRatePerSqM: 65,
    regulatoryBodies: [
      {
        name: 'Nairobi Planning & Urban Development',
        acronym: 'NCCG',
        role: 'Architectural & zoning compliance, plot ratio and ground coverage vetting.',
        approxFeeText: 'KES 50–80 per m² depending on building classification',
        mandatoryFor: 'All developments',
      },
      {
        name: 'National Construction Authority',
        acronym: 'NCA',
        role: 'Site registration, contractor accreditation & mandatory QC safety compliance.',
        approxFeeText: '0.5% of construction value (exempt for single family < 5M)',
        mandatoryFor: 'Projects > KES 5,000,000',
      },
      {
        name: 'National Environment Management Authority',
        acronym: 'NEMA',
        role: 'Environmental Impact Assessment (EIA) license & expert acoustic/waste audit.',
        approxFeeText: 'KES 40,000 – KES 150,000 EIA report & public participation',
        mandatoryFor: 'Multi-unit residential, commercial & sensitive zones',
      },
      {
        name: 'Water & Sewerage Corporation',
        acronym: 'NCWSC',
        role: 'Sewer connection point clearance and water reticulation adequacy.',
        approxFeeText: 'Application & inspection fee ~ KES 15,000',
        mandatoryFor: 'All urban connections',
      },
    ],
    submissionChecklists: [
      {
        category: 'Architectural Drawings',
        items: [
          'Detailed Site Plan (1:200 or 1:500) showing setbacks, road reserve & parking',
          'Floor plans, roof plan, 4 elevations & longitudinal building sections (1:100)',
          'Registered BORAQS Architect practicing license seal & signature',
          'Certified land search certificate (issued within the last 3 months)',
          'Deed plan / Registry Index Map (RIM) and Survey Beacon certificate',
        ],
      },
      {
        category: 'Structural & Geotechnical',
        items: [
          'Full structural calculations & general arrangement (GA) drawings',
          'Reinforcement bar bending schedules (BBS) for all beams/slabs/columns',
          'Registered Engineer (EBK) structural indemnity bond & stamp',
          'Geotechnical soil investigation report (for structures over 2 storeys)',
        ],
      },
      {
        category: 'Statutory Compliances',
        items: [
          'NEMA EIA summary project report & receipt',
          'Public Health and Sanitation approval letter',
          'County Fire Department approval & fire escape egress calculation',
        ],
      },
    ],
    localZoningHighlights: [
      'Zone 1 & 2 (Karen, Langata, Spring Valley): Min plot size 0.5 acres, maximum 2 storeys, ground coverage max 35%.',
      'Zone 3 (Kilimani, Kileleshwa, Lavington): High-density residential permitted with sewer clearance.',
      'Zone 4 & 5 (Parklands, Westlands, Upper Hill): Commercial FAR/Plot ratio up to 4.0 with dedicated basement parking.',
    ],
  },
  {
    countyId: 'kiambu',
    countyName: 'Kiambu County',
    systemName: 'Kiambu EDAMS (Electronic Development Application Management System)',
    typicalApprovalTimeWeeks: '2 – 4 Weeks',
    scrutinyRatePerSqM: 55,
    regulatoryBodies: [
      {
        name: 'Kiambu Directorate of Physical Planning',
        acronym: 'KCG',
        role: 'Zoning verification across Ruiru, Thika, Kikuyu, Karuri, Limuru sub-counties.',
        approxFeeText: 'KES 45–65 per m² of gross floor area',
        mandatoryFor: 'All developments',
      },
      {
        name: 'National Construction Authority',
        acronym: 'NCA',
        role: 'Site registration and project supervisor accreditation.',
        approxFeeText: '0.5% of contract value',
        mandatoryFor: 'Projects above statutory threshold',
      },
      {
        name: 'Kiambu Water and Sanitation Co.',
        acronym: 'RUWASCO / LIMWASA',
        role: 'Sub-county water supply and sewer line connection permit.',
        approxFeeText: 'KES 10,000 – KES 25,000',
        mandatoryFor: 'Urban nodes',
      },
    ],
    submissionChecklists: [
      {
        category: 'Architectural Submission',
        items: [
          'Full architectural set with BORAQS seal & QR validation',
          'Current Kiambu Lands office certified search',
          'Rates clearance certificate from Kiambu County Revenue',
          'Site beacon verification by registered surveyor',
        ],
      },
      {
        category: 'Civil & Engineering',
        items: [
          'EBK certified structural calculations',
          'Stormwater management and onsite soakaway / biodigester layout',
          'Soil bearing capacity report (mandatory in Ruiru / Juja black cotton zones)',
        ],
      },
    ],
    localZoningHighlights: [
      'Tigoni & Limuru: Strict agricultural/residential preservation (low density, tea zone aesthetics).',
      'Ruiru & Mugutha: High growth corridor; stormwater drainage and soil replacement strictly enforced.',
      'Thika Greens / Tatu City: Master-planned community architectural guidelines enforce prior developer ARC clearance.',
    ],
  },
  {
    countyId: 'nyeri',
    countyName: 'Nyeri County',
    systemName: 'Nyeri Physical Planning & Housing Directorate',
    typicalApprovalTimeWeeks: '2 – 3 Weeks',
    scrutinyRatePerSqM: 45,
    regulatoryBodies: [
      {
        name: 'Nyeri County Planning Department',
        acronym: 'NCG',
        role: 'Land use zoning, riparian buffers (Chania & Gura rivers), and topographical slope approvals.',
        approxFeeText: 'KES 35–50 per m²',
        mandatoryFor: 'All construction',
      },
      {
        name: 'Water Resources Authority',
        acronym: 'WARMA',
        role: 'Riparian reserve setback demarcation (min 30m from rivers and water bodies).',
        approxFeeText: 'KES 15,000 – KES 30,000',
        mandatoryFor: 'Riverfront or natural stream boundary properties',
      },
      {
        name: 'NYEWASCO',
        acronym: 'NYEWASCO',
        role: 'Nyeri Water and Sanitation Company municipal clearance.',
        approxFeeText: 'KES 8,000 – KES 15,000',
        mandatoryFor: 'Nyeri Municipality developments',
      },
    ],
    submissionChecklists: [
      {
        category: 'Planning & Architecture',
        items: [
          'Full architectural drawings aligned with Mount Kenya highland microclimate',
          'Topographical contour survey (essential for sloped sites)',
          'BORAQS architect license certification',
          'Land registry title deed copy and official search',
        ],
      },
      {
        category: 'Environmental & Civil',
        items: [
          'EIA Project Report by NEMA registered lead expert',
          'Rainwater harvesting system design (required by Nyeri green building bylaws)',
          'Structural drawings with anti-seismic and slope stability checks',
        ],
      },
    ],
    localZoningHighlights: [
      'Highland Terrain: Red volcanic rich soils with excellent natural bearing capacity (180–240 kN/m²).',
      'Solar & Rainwater: High annual rainfall (1,200mm) makes integrated 50,000L rainwater underground tanks highly feasible.',
      'Scenic Corridors: Orientation optimized for Mount Kenya / Aberdare Range panoramic views.',
    ],
  },
  {
    countyId: 'kajiado',
    countyName: 'Kajiado County',
    systemName: 'Kajiado County Lands & Urban Development',
    typicalApprovalTimeWeeks: '3 – 5 Weeks',
    scrutinyRatePerSqM: 50,
    regulatoryBodies: [
      {
        name: 'Kajiado County Planning',
        acronym: 'KCG',
        role: 'Zoning approvals for Kitengela, Ngong, Ongata Rongai, Kiserian, and Isinya.',
        approxFeeText: 'KES 40–60 per m²',
        mandatoryFor: 'All developments',
      },
      {
        name: 'NCA & NEMA',
        acronym: 'NCA/NEMA',
        role: 'Site registration and environmental sanitation management.',
        approxFeeText: 'Statutory tariffs apply',
        mandatoryFor: 'All active building sites',
      },
    ],
    submissionChecklists: [
      {
        category: 'Essential Checklist',
        items: [
          'Soil test report (deep black cotton profile in Kitengela/Athi River)',
          'Biodigester or septic tank engineering layout (many zones lack municipal sewer)',
          'Borehole hydrogeological survey if off-grid water is proposed',
          'BORAQS & EBK verified drawing packages',
        ],
      },
    ],
    localZoningHighlights: [
      'Kitengela & Isinya: Expansive black cotton soil requires deep excavation to firm murram or reinforced raft slabs.',
      'Ngong & Kiserian: Red volcanic slopes and rock ridges require stepped foundation levels.',
    ],
  },
  {
    countyId: 'machakos',
    countyName: 'Machakos County',
    systemName: 'Machakos Lands, Housing & Urban Planning',
    typicalApprovalTimeWeeks: '2 – 4 Weeks',
    scrutinyRatePerSqM: 48,
    regulatoryBodies: [
      {
        name: 'Machakos Planning Board',
        acronym: 'MCG',
        role: 'Development control in Mavoko/Syokimau, Machakos Town, and Kangundo Road corridor.',
        approxFeeText: 'KES 40–55 per m²',
        mandatoryFor: 'All structures',
      },
    ],
    submissionChecklists: [
      {
        category: 'Requirements',
        items: [
          'Certified architectural plans with structural drawings',
          'Mavoko Water and Sanitation Company (MAVWASCO) clearance',
          'Geotechnical foundation recommendation report',
        ],
      },
    ],
    localZoningHighlights: [
      'Syokimau & Athi River: Heavy industrial/residential mixed corridor with specific setback rules near Mombasa Road and SGR railway reserves.',
    ],
  },
];

export const KENYA_MATERIAL_BENCHMARKS: MaterialPriceBenchmark[] = [
  {
    id: 'cement-32-5',
    materialName: 'Portland Cement (Grade 32.5R)',
    category: 'Cement',
    unit: '50 kg bag',
    currentRangeKES: { min: 660, max: 740, avg: 700 },
    trend: 'stable',
    trendPercent: '±1.2%',
    regionalNotes: 'Ex-factory Nairobi/Athi River ~KES 660–680; Upcountry transport adds KES 30–50/bag.',
    commonBrandsOrSources: ['Bamburi Nguvu', 'Savannah Cement', 'Simba Cement', 'Blue Triangle', 'Mombasa Cement'],
    qualityTip: 'Ideal for general masonry, bricklaying, screeding, and non-structural domestic plasters.',
  },
  {
    id: 'cement-42-5',
    materialName: 'High-Strength Structural Cement (Grade 42.5N)',
    category: 'Cement',
    unit: '50 kg bag',
    currentRangeKES: { min: 780, max: 880, avg: 830 },
    trend: 'up',
    trendPercent: '+2.5%',
    regionalNotes: 'Standard for multi-storey RC framing, columns, suspended slabs, and raft foundations.',
    commonBrandsOrSources: ['Bamburi PowerPlus 42.5', 'Savannah 42.5R', 'Blue Triangle Super Strength'],
    qualityTip: 'Achieves 28-day characteristic compressive strength of 25–35 MPa faster, reducing slab shuttering turnaround.',
  },
  {
    id: 'steel-tmt-d12',
    materialName: 'High-Yield TMT Deformed Rebar (D12 / 12mm)',
    category: 'Steel & Rebar',
    unit: '12-meter length bar',
    currentRangeKES: { min: 1450, max: 1750, avg: 1580 },
    trend: 'stable',
    trendPercent: '±0.8%',
    regionalNotes: 'Ton rate runs ~KES 130,000 – 145,000 per metric tonne for mixed sizes in industrial yards.',
    commonBrandsOrSources: ['Apex Steel (BS 4449 Grade 500)', 'Devki Steel Mills', 'Tononoka Rolling Mills', 'ASL Heavy'],
    qualityTip: 'Verify KEBS diamond mark and mill test certificates ensuring minimum yield strength of 500 N/mm².',
  },
  {
    id: 'steel-tmt-d16',
    materialName: 'High-Yield TMT Deformed Rebar (D16 / 16mm)',
    category: 'Steel & Rebar',
    unit: '12-meter length bar',
    currentRangeKES: { min: 2550, max: 2980, avg: 2750 },
    trend: 'up',
    trendPercent: '+1.8%',
    regionalNotes: 'Used for heavily loaded structural columns and main beam bottom reinforcement.',
    commonBrandsOrSources: ['Apex TMT 500D', 'Devki Rebars', 'Prime Steel'],
    qualityTip: 'Demand thermo-mechanically treated (TMT) grade with superior elongation and earthquake ductile properties.',
  },
  {
    id: 'stone-ndarugu-9x9',
    materialName: 'Ndarugu Machine-Cut Foundation Stone (9" x 9")',
    category: 'Masonry & Stone',
    unit: 'Piece / Block delivered Nairobi/Kiambu',
    currentRangeKES: { min: 40, max: 55, avg: 48 },
    trend: 'stable',
    trendPercent: '0%',
    regionalNotes: 'Quarry site price at Juja/Thika is KES 28–34; Transport to Nairobi/Kiambu adds KES 12–18/stone depending on lorry capacity (1,000–1,500 pcs).',
    commonBrandsOrSources: ['Juja Quarries', 'Ndarugu River Basin', 'Maji ya Chumvi'],
    qualityTip: 'Hard stones (blue-grey tint) have superior compressive load tolerance compared to softer yellow porous stones.',
  },
  {
    id: 'stone-ndarugu-6x9',
    materialName: 'Machine-Cut Walling Stone (6" x 9" Super Quality)',
    category: 'Masonry & Stone',
    unit: 'Piece / Block',
    currentRangeKES: { min: 32, max: 45, avg: 38 },
    trend: 'stable',
    trendPercent: '-1.0%',
    regionalNotes: 'Standard for internal partitioning and external loadbearing perimeter walls.',
    commonBrandsOrSources: ['Ndarugu Hard Rock Mines', 'Thika Stone Suppliers'],
    qualityTip: 'Machine cut ensures uniform corners, reducing mortar bed thickness from 25mm to 10mm and cutting cement costs by 30%.',
  },
  {
    id: 'sand-river-clean',
    materialName: 'Clean Coarse River Sand (Makueni / Machakos)',
    category: 'Aggregates & Sand',
    unit: '20-Tonne Tipper Lorry (approx. 14 m³)',
    currentRangeKES: { min: 32000, max: 42000, avg: 36000 },
    trend: 'up',
    trendPercent: '+4.2%',
    regionalNotes: 'County cess levies and seasonal river harvesting bans in Eastern Kenya can cause short-term price spikes.',
    commonBrandsOrSources: ['Makueni River Beds', 'Machakos Sand Harvesters Association', 'Mai Mahiu Quarry Sand'],
    qualityTip: 'Always perform field silt test in a glass jar. Silt and clay content must remain under 6% to avoid weak crumbly concrete.',
  },
  {
    id: 'ballast-aggregate',
    materialName: 'Machine-Crushed Blue Ballast (3/4" Graded Aggregate)',
    category: 'Aggregates & Sand',
    unit: '20-Tonne Tipper Lorry',
    currentRangeKES: { min: 28000, max: 36000, avg: 32000 },
    trend: 'stable',
    trendPercent: '±0.5%',
    regionalNotes: 'Quarried at Mlolongo, Stoney Athi, and Dandora crushers.',
    commonBrandsOrSources: ['Katani Crushers', 'Athi River Blue Rock', 'Aristocrats Quarries'],
    qualityTip: 'Angular, clean, dust-free aggregate ensures optimal mechanical interlock in high-strength concrete mixes.',
  },
  {
    id: 'roofing-box-profile',
    materialName: 'Pre-Painted Box Profile Charcoal Matte Sheets (Gauge 28)',
    category: 'Roofing & Timber',
    unit: 'Meter length (1m coverage)',
    currentRangeKES: { min: 720, max: 890, avg: 790 },
    trend: 'stable',
    trendPercent: '+1.0%',
    regionalNotes: 'Anti-corrosion zinc-aluminium alloy coating.',
    commonBrandsOrSources: ['Mabati Rolling Mills (Dumuzi / Versatile / Maxcover)', 'Royal Mabati', 'Imarisha Mabati'],
    qualityTip: 'Choose Gauge 28 (0.32mm) or Gauge 26 (0.40mm) for lifetime durability without buckling in heavy highland storms.',
  },
  {
    id: 'timber-cypress-treated',
    materialName: 'Pressure-Treated Structural Cypress Timber (2" x 4" / 2" x 6")',
    category: 'Roofing & Timber',
    unit: 'Linear foot (Rft)',
    currentRangeKES: { min: 55, max: 75, avg: 64 },
    trend: 'stable',
    trendPercent: '0%',
    regionalNotes: 'Sourced from Nyandarua and Rift Valley sustainable sawmills.',
    commonBrandsOrSources: ['Timsales Kenya', 'Nakuru Timber Mills', 'Kieni Forest Concessions'],
    qualityTip: 'Ensure CCA / Tanalith pressure treatment to prevent termite damage, borer insects, and dry rot.',
  },
];

export const SOIL_FOUNDATION_PROFILES: SoilFoundationProfile[] = [
  {
    soilType: 'Black Cotton Soil (Expansive Smectite Clay)',
    commonAreas: ['Kitengela', 'Syokimau', 'Ruiru (lower zones)', 'Athi River', 'Embakasi', 'Juja plains'],
    soilBehavior:
      'High volume shrinkage when dry (forming deep ground fissures) and violent swelling when wet, creating powerful upward heave forces that crack conventional strip footings.',
    recommendedFoundations: [
      'Engineered Raft Foundation (Mat Slab with double rebar grid)',
      'Excavation to hard firm murram/rock with stabilized backfill',
      'Short Bored Piles with Suspended Ground Beams',
    ],
    substructureCostImpact: '+18% to +28% higher substructure investment',
    excavationNotes:
      'Requires complete removal of 1.2m – 2.5m black clay layer until stable reddish-brown murram or volcanic tuff is struck. Soil replacement with compacted hardcore (250mm layers) and quarry dust blinding.',
    triarchEngineeringApproach:
      'We run full California Bearing Ratio (CBR) and Atterberg Limits laboratory testing. We design stiffened inverted-T ground beams or post-tensioned slabs that isolate the building superstructure from soil heave.',
  },
  {
    soilType: 'Red Volcanic Loam / Coffee Soil (Residual Volcanic Tuff)',
    commonAreas: ['Kiambu (Tigoni, Limuru, Karuri)', 'Nyeri County (All subcounties)', 'Karen', 'Lavington', 'Runda', 'Muthaiga'],
    soilBehavior:
      'Well-draining, non-expansive, cohesive soil with high natural bearing capacity (150 – 220 kN/m²) once natural organic topsoil (first 300–500mm) is stripped.',
    recommendedFoundations: [
      'Reinforced Continuous Strip Footing',
      'Pad Footings with Plinth Beams (for framed structures)',
      'Stepped Strip Foundations for undulating highland slopes',
    ],
    substructureCostImpact: 'Standard Baseline Substructure Cost (0% premium)',
    excavationNotes:
      'Shallow excavation depth (usually 1.0m to 1.5m to reach firm bearing stratum). Minimal soil cart-away needed, as excavated red soil can be reused for garden landscaping.',
    triarchEngineeringApproach:
      'We utilize the natural stability of the terrain, designing stepped terraces that integrate retaining walls and subsurface French drains to route highland runoff away from building envelopes.',
  },
  {
    soilType: 'Hard Volcanic Rock & Shallow Murram',
    commonAreas: ['Langata', 'Nairobi West', 'Upper Hill', 'Kitisuru rocky ridges', 'Ngong Hills'],
    soilBehavior:
      'Exceptional load-bearing capacity (>350 kN/m²). Virtually zero settlement risk; ideal for heavy multi-storey columns and structural concrete loads.',
    recommendedFoundations: [
      'Direct Rock Bearing Pads',
      'Shallow Reinforced Strip on Rock Scabbling',
      'Mass Concrete Bedding',
    ],
    substructureCostImpact: '+5% to +12% (due to pneumatic rock breaker machine excavation)',
    excavationNotes:
      'May require hydraulic rock breakers or controlled mechanical wedging. Eliminates expensive deep foundation concrete.',
    triarchEngineeringApproach:
      'We capitalize on the bedrock to support ultra-slender architectural column layouts, open cantilevered balconies, and seamless indoor-outdoor floor transitions.',
  },
  {
    soilType: 'Sandy Coastal & Coral Rag Soil',
    commonAreas: ['Mombasa', 'Diani', 'Kilifi', 'Watamu', 'Nyali', 'Malindi'],
    soilBehavior:
      'Highly permeable, low cohesion, vulnerable to marine saline groundwater erosion and coral cavities (sinkholes).',
    recommendedFoundations: [
      'Reinforced Wide Strip on Compacted Coral Hardcore',
      'Marine Grade Sulfate-Resistant Concrete Foundations',
      'Pad Foundations anchored into Sound Coral Limestone',
    ],
    substructureCostImpact: '+12% to +20% (marine-grade cement & epoxy rebar coatings)',
    excavationNotes:
      'Groundwater table often reached within 1.5m. Requires dewatering pumps and heavy-duty 1000-gauge polythene DPC membrane protection.',
    triarchEngineeringApproach:
      'We specify CEM III / Sulfate-Resisting Portland Cement and galvanised/epoxy-coated rebar to prevent salt crystallization corrosion of structural elements.',
  },
];

export const DIASPORA_MILESTONE_FRAMEWORK: DiasporaMilestone[] = [
  {
    stageNumber: 1,
    stageName: 'Statutory Approvals & Site Establishment',
    deliverables: [
      'Architectural & Structural county approved stamps',
      'NEMA EIA license certificate & NCA project registration billboard',
      'Site fencing, security gate, water & electricity connections',
      'Survey beacon certificate & topographical contour map',
    ],
    verificationMethod: 'Scanned official stamped PDFs + 4K drone perimeter survey photo/video on Client Portal',
    paymentReleaseRule: '10% Mobilization Deposit in Protected Escrow Account',
    remoteInvestorBenefit: 'Zero risk of building without legal permits or facing county demolition notices.',
  },
  {
    stageNumber: 2,
    stageName: 'Substructure & Foundation to Ground Slab (DPC)',
    deliverables: [
      'Excavation down to certified bearing stratum (signed by Geotechnical Engineer)',
      'Anti-termite chemical soil treatment certificate',
      'Hardcore compaction, sand blinding, 1000-gauge DPC membrane, and BRC steel mesh A142',
      'Ground floor slab concrete pour (with 7 & 28-day concrete cube crush test lab report)',
    ],
    verificationMethod: 'High-definition digital photo audit + Independent EBK Engineer structural audit sign-off',
    paymentReleaseRule: 'Milestone 2 Escrow Release (approx. 20%)',
    remoteInvestorBenefit: 'Guaranteed foundation integrity with third-party laboratory verification of concrete strength.',
  },
  {
    stageNumber: 3,
    stageName: 'Superstructure Framing & Walling to Lintel / Suspended Slab',
    deliverables: [
      'RC columns, ring beams, and lintels poured with High-Yield D12/D16 rebar',
      'Ndarugu machine-cut stone walling with hoop iron ties every 2 courses',
      'Suspended first floor slab shuttering and casting (if multi-storey)',
      'Plumbing waste stack and electrical conduit cast-in pipework',
    ],
    verificationMethod: 'Bi-weekly live video walkthrough with Lead Architect + itemized supplier material delivery receipts',
    paymentReleaseRule: 'Milestone 3 Escrow Release (approx. 25%)',
    remoteInvestorBenefit: '100% transparent tracking of every steel bar and cement bag purchased with real supplier invoices.',
  },
  {
    stageNumber: 4,
    stageName: 'Roof Structure, Waterproofing & External Envelope',
    deliverables: [
      'Treated cypress/steel roof trusses with engineered hurricane tie-downs',
      'Mabati box profile Gauge 28 / Decra stone-coated tiles / Flat RC roof waterproofing',
      'Fascia boards, gutters, downpipes, and rainwater tank connection lines',
      'Aluminum window sub-frames and external rough-cast plastering',
    ],
    verificationMethod: 'Water-tightness flood test certificate + high-resolution drone roof inspection video',
    paymentReleaseRule: 'Milestone 4 Escrow Release (approx. 20%)',
    remoteInvestorBenefit: 'Building is fully secured, weatherproof, and locked before internal fittings begin.',
  },
  {
    stageNumber: 5,
    stageName: 'First & Second Fix Finishes, MEP & Joinery',
    deliverables: [
      'Internal wall plastering, skim coat, and primer paint',
      'Porcelain/granite floor tiling and bathroom wall tiles',
      'Kitchen cabinetry, quartz/granite countertops, and built-in bedroom wardrobes',
      'Electrical switches, architectural LED fixtures, sanitaryware, and solar water heater',
    ],
    verificationMethod: 'High-definition digital room photo audit with detailed finish inspection tags',
    paymentReleaseRule: 'Milestone 5 Escrow Release (approx. 18%)',
    remoteInvestorBenefit: 'Select and approve all finishes remotely with physical material samples shipped to your overseas address if requested.',
  },
  {
    stageNumber: 6,
    stageName: 'Practical Handover, Snagging & Occupation Certificate',
    deliverables: [
      'County Government Certificate of Practical Completion & Occupation',
      'Full architectural & MEP As-Built drawing package',
      'Complete deep cleaning, perimeter landscaping, and motorized gate commissioning',
      'Keys and warranties handover with 6-month Defect Liability Period (DLP)',
    ],
    verificationMethod: 'Formal Handover Ceremony live stream + County Occupation Certificate issuance',
    paymentReleaseRule: 'Final 7% balance (with 3% retention held until end of 6-month defect period)',
    remoteInvestorBenefit: 'Total peace of mind with legal warranties and retention security protecting your investment.',
  },
];
