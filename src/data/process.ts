import { ProcessStage } from '../types';

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: 1,
    title: 'Consultation',
    duration: '1 - 2 Weeks',
    summary: 'Initial project visioning, spatial requirements, budget alignment, and project scoping.',
    details: 'During our introductory workshop, we deep dive into your lifestyle or business goals, aesthetic preferences, budget constraints, and project expectations. We review sample precedent projects and define the project vision statement.',
    deliverables: [
      'Project Vision Document',
      'Preliminary Space Program',
      'Consultancy Proposal & Fee Breakdown',
      'Project Schedule Roadmap'
    ],
    clientInput: 'Wishlist, spatial needs, budget parameters, design inspiration images.',
    iconName: 'MessageSquare',
    accentColor: '#4E6B5A'
  },
  {
    step: 2,
    title: 'Site Visit',
    duration: '1 Week',
    summary: 'Topographical surveying, soil investigation, solar orientation, microclimate, and view corridor analysis.',
    details: 'Our team conducts a comprehensive physical site analysis. We analyze soil profiles, topographical slopes, prevailing wind directions, sun paths, existing flora, utilities access, neighborhood context, and statutory zoning set-backs.',
    deliverables: [
      'Site Analysis Report & Contour Map',
      'Climate Response Diagram',
      'Zoning & Planning By-law Verification',
      'Geotechnical Assessment Recommendations'
    ],
    clientInput: 'Land title deeds, boundary beacon survey map, utility access information.',
    iconName: 'MapPin',
    accentColor: '#B76E4A'
  },
  {
    step: 3,
    title: 'Concept Design',
    duration: '3 - 4 Weeks',
    summary: 'Translating the brief into bold spatial concepts, 3D massing options, and floor plan layouts.',
    details: 'We develop 2-3 distinct architectural concept directions exploring different spatial geometries, circulation flows, and indoor-outdoor relationships. Concepts are presented with interactive 3D massing models and mood boards.',
    deliverables: [
      '2-3 Architectural Layout Options',
      '3D Massing & Exterior Render Concept',
      'Mood Boards (Materials & Finishes)',
      'Preliminary Cost Estimate Range'
    ],
    clientInput: 'Feedback on concept layouts, selection of preferred architectural direction.',
    iconName: 'PenTool',
    accentColor: '#4E6B5A'
  },
  {
    step: 4,
    title: 'Design Development',
    duration: '4 - 6 Weeks',
    summary: 'Fleshing out selected concept into detailed 3D renders, structural coordination, and MEP schematics.',
    details: 'The chosen concept is refined into high precision. Structural and MEP engineers integrate structural grids, HVAC ducts, plumbing chases, and electrical layouts. High-resolution photorealistic 3D renders are finalized.',
    deliverables: [
      'Final Architectural Plans, Elevations & Sections',
      'Photorealistic 3D Render Package',
      'Structural Grid & Frame Coordination',
      'Preliminary Electrical & Plumbing Schematics',
      'Material Specification Schedule'
    ],
    clientInput: 'Approval of 3D interior/exterior renders and selected material finishes.',
    iconName: 'Box',
    accentColor: '#B76E4A'
  },
  {
    step: 5,
    title: 'Approvals',
    duration: '3 - 6 Weeks',
    summary: 'Submitting complete architectural, structural, and environmental documentation for county & statutory permits.',
    details: 'We compile comprehensive statutory approval packages. Our team manages liaisons with county planning departments, Environmental Management Authorities (NEMA), Water Authorities, and National Construction Authorities (NCA).',
    deliverables: [
      'County Architectural Approval Drawings',
      'Structural Engineer Calculation Certificate',
      'NEMA Environmental Impact Assessment (EIA)',
      'NCA Project Registration Seal'
    ],
    clientInput: 'Signatures on statutory application forms and payment of county submission fees.',
    iconName: 'FileCheck',
    accentColor: '#4E6B5A'
  },
  {
    step: 6,
    title: 'Construction',
    duration: '8 - 18 Months',
    summary: 'Contractor selection, site mobilization, weekly supervision, structural inspections, and quality control.',
    details: 'We issue detailed Bill of Quantities (BOQ) for contractor tendering. Once appointed, Triarch engineers conduct weekly site inspections, approve sample mock-ups, resolve site queries, and certify contractor payment valuations.',
    deliverables: [
      'Contractor Tender Package & BOQ',
      'Weekly Site Supervision Reports',
      'Structural Integrity Inspection Certificates',
      'Valuation & Payment Certificates'
    ],
    clientInput: 'Contractor appointment approval and stage payment releases based on certified valuations.',
    iconName: 'HardHat',
    accentColor: '#B76E4A'
  },
  {
    step: 7,
    title: 'Completion',
    duration: '2 - 3 Weeks',
    summary: 'Final snag list resolution, MEP testing, practical handover, as-built drawings, and warranty documentation.',
    details: 'We execute a thorough 100-point quality audit covering every fixture, finish, and system. We oversee pressure testing of plumbing, electrical load balancing, and issue as-built drawings alongside maintenance manuals.',
    deliverables: [
      'Practical Completion Certificate',
      'Snag List Clearance Certificate',
      'As-Built Architectural & Engineering Drawings',
      'Building Operation & Warranty Manual'
    ],
    clientInput: 'Final walkthrough sign-off and key handover celebration.',
    iconName: 'CheckCircle2',
    accentColor: '#4E6B5A'
  }
];
