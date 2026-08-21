import { Service } from '../types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'architecture',
    title: 'Architecture',
    shortDesc: 'Conceptual master planning, parametric design, and detailed construction documentation tailored to climate and context.',
    fullDesc: 'Our architectural practice synthesizes bold aesthetic vision with rigorous spatial geometry and structural integrity. From ultra-luxury residential compounds to high-rise commercial towers, every Triarch project begins with a deep site climate analysis and contextual response.',
    iconName: 'Compass',
    bgImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Site Master Planning & Feasibility Analysis',
      'Conceptual & Schematic Design Options',
      'Parametric 3D Massing & Solar Studies',
      'Statutory & Municipal Approval Documentation',
      'Detailed Construction & Working Drawings',
      'BIM Level 2 Coordination (Revit / Archicad)'
    ],
    methodology: 'Integrated Design Process (IDP) unifying structural, environmental, and spatial parameters from Day 1.',
    technologies: ['Autodesk Revit', 'Rhino 3D + Grasshopper', 'Archicad 27', 'Twinmotion', 'Lumion Pro']
  },
  {
    id: 'interior-design',
    title: 'Interior Design',
    shortDesc: 'Bespoke spatial layouts, tactile material palettes, lighting choreography, and custom furniture curation.',
    fullDesc: 'We view interior design as the intimate scale of architecture. Our team crafts interior environments that elevate the human experience through rich natural material palettes, custom millwork, integrated acoustic solutions, and circadian lighting design.',
    iconName: 'Palette',
    bgImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Spatial Zoning & FF&E Selection',
      'Custom Joinery & Millwork Fabrication Drawings',
      'Lighting Layouts & Architectural Hardware Specs',
      'Material Board Curation & Physical Samples',
      'Acoustic Paneling & Ceiling Choreography',
      'Art & Decor Curation'
    ],
    methodology: 'Human-centric ergonomics paired with sustainable, low-VOC material sourcing.',
    technologies: ['3ds Max + V-Ray', 'Sketchup Pro', 'Adobe Creative Cloud', 'Physical Sample Library']
  },
  {
    id: 'structural-engineering',
    title: 'Structural Engineering',
    shortDesc: 'Innovative structural systems optimizing concrete, timber, and steel for safety, longevity, and cost efficiency.',
    fullDesc: 'Our in-house structural engineering team works alongside our architects to ensure structural elements enhance the spatial vision rather than hinder it. We specialize in post-tensioned slabs, long-span steel trusses, rammed earth walls, and deep foundation engineering.',
    iconName: 'Layers',
    bgImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Geotechnical & Soil Load Analysis',
      'Structural Calculation Reports & Calculations',
      'Reinforced Concrete & Steel Detailing',
      'Seismic & Wind Load Finite Element Analysis',
      'Value Engineering & Steel Tonnage Optimization',
      'Site Structural Inspection & Concrete Testing'
    ],
    methodology: 'Finite Element Modeling (FEM) to eliminate over-design and reduce embodied carbon in concrete structures.',
    technologies: ['ETABS', 'Prokon', 'Tekla Structures', 'Safe', 'Autodesk Robot']
  },
  {
    id: 'mep-engineering',
    title: 'MEP Engineering',
    shortDesc: 'Energy-efficient mechanical, electrical, plumbing, HVAC, and smart building automation systems.',
    fullDesc: 'Modern buildings are living organisms requiring smart mechanical, electrical, and plumbing engineering. We design energy-efficient HVAC, solar microgrids, rainwater harvesting, greywater recycling, and high-security smart automation infrastructure.',
    iconName: 'Cpu',
    bgImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'HVAC & VRF Air Conditioning Load Calculations',
      'Electrical Distribution & Backup Power Sizing',
      'Plumbing, Stormwater & Greywater Recycling Plans',
      'Solar Photovoltaic & Battery Storage Design',
      'Smart Home Automation & KNX/Crestron Schematics',
      'Fire Protection & Life Safety Systems'
    ],
    methodology: 'Passivhaus principles and energy simulation modeling for minimal lifecycle running costs.',
    technologies: ['Revit MEP', 'Trace 700', 'Dialux evo', 'HAP (Hourly Analysis Program)']
  },
  {
    id: 'project-management',
    title: 'Project Management',
    shortDesc: 'End-to-end site supervision, contract management, cost auditing, and rigorous quality assurance.',
    fullDesc: 'A flawless design requires execution with military precision. Our project managers serve as the single point of accountability on site, managing main contractors, sub-consultants, procurement schedules, budget variations, and quality controls.',
    iconName: 'ShieldCheck',
    bgImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Bill of Quantities (BOQ) & Tender Management',
      'Master Construction Schedule & Critical Path Method',
      'Contractor Prequalification & Subcontractor Audits',
      'On-site Weekly Quality Control Inspections',
      'Valuation & Payment Certificate Authorization',
      'Practical Completion & Handover Certification'
    ],
    methodology: 'Agile Construction Framework combined with FIDIC/JBCC contract administration.',
    technologies: ['MS Project', 'Primavera P6', 'Procore', 'Autodesk Construction Cloud']
  },
  {
    id: '3d-visualization',
    title: '3D Visualization',
    shortDesc: 'Photorealistic architectural rendering, virtual reality walkthroughs, and cinematic animation production.',
    fullDesc: 'Experience your project before ground is broken. We produce hyper-realistic 3D exterior/interior renders, cinematic 4K video animations, interactive 360-degree panoramas, and immersive VR simulations for decision making and marketing.',
    iconName: 'Eye',
    bgImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Photorealistic Exterior & Interior Renders',
      'Cinematic Architectural Fly-Through Animations',
      'Interactive Web 360-Degree Virtual Tours',
      'Unreal Engine 5 Real-Time Walkthroughs',
      'Sun Study & Shadow Analysis Animations',
      'Marketing Brochure & Sales Render Packages'
    ],
    methodology: 'Unreal Engine 5 path tracing combined with V-Ray for true-to-life lighting, textures, and foliage.',
    technologies: ['Unreal Engine 5.4', '3ds Max', 'V-Ray 6', 'Corona Renderer', 'DaVinci Resolve']
  }
];
