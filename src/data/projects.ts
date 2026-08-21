import { Project } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'kileleshwa-glass-pavilion',
    title: 'The Glass Pavilion at Kileleshwa',
    subtitle: 'Biophilic Luxury Private Residence',
    category: 'Residential',
    location: 'Nairobi, Kenya',
    area: '820 sq. m',
    year: '2025',
    servicesProvided: ['Architecture', 'Interior Design', 'Structural Engineering', '3D Visualization'],
    client: 'Private Estate Owner',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    overview: 'The Glass Pavilion is a masterclass in modern biophilic residence design. Situated on a lush sloped plot, the home seamlessly integrates cantilevered concrete slabs, double-height Low-E curtain walls, and central courtyard waterfalls.',
    clientBrief: 'The client requested a subterranean light-filled estate that felt like an oasis within the bustling city, prioritizing private family wellness spaces, energy self-sufficiency, and seamless indoor-outdoor hosting capabilities.',
    designChallenge: 'The main structural challenge was negotiating a steep 18-meter gradient on red volcanic soil while protecting surrounding indigenous teak trees and managing storm water runoff naturally.',
    designSolution: 'We engineered a suspended rib-vault foundation anchored by post-tensioned concrete beams. Double-glazed thermal break assemblies allow 360-degree canopy views without heat gain.',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    floorPlanHotspots: [
      {
        id: 'hs-1',
        x: 28,
        y: 42,
        label: 'Floating Living Room',
        roomName: 'Grand Atrium Living Area',
        description: 'Double height lounge with 6.5m ceiling height, sunken fire pit, and direct views to pool.',
        imageUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hs-2',
        x: 65,
        y: 35,
        label: 'Chef Kitchen & Pantry',
        roomName: 'Italian Quartz Kitchen Suite',
        description: 'Bespoke walnut cabinetry, hidden prep kitchen, and integrated Sub-Zero wine room.',
        imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hs-3',
        x: 75,
        y: 70,
        label: 'Infinity Deck & Pavilion',
        roomName: 'Natural Stone Infinity Pool',
        description: 'Saltwater overflow pool with volcanic basalt tiles and cantilevered lounge pergolas.',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
      }
    ],
    constructionGallery: [
      {
        phase: 'Excavation & Terracing',
        date: 'March 2024',
        status: 'Completed',
        description: 'Deep foundation drilling and soil stabilization using soil nailing techniques.',
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80'
      },
      {
        phase: 'Post-Tensioned Superstructure',
        date: 'August 2024',
        status: 'Completed',
        description: 'Pouring cantilevered concrete floor plates with integrated thermal insulation.',
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
      },
      {
        phase: 'Facade & Glazing',
        date: 'January 2025',
        status: 'Completed',
        description: 'Installation of structural glass panels imported from Germany and automated motorized louvers.',
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
      }
    ],
    materials: [
      { name: 'Board-Formed Concrete', type: 'Structural', finish: 'Exposed Matte', source: 'Local Cement + Custom Formwork', colorHex: '#9E9E9E' },
      { name: 'Italian Travertine', type: 'Cladding & Flooring', finish: 'Honed & Filled', source: 'Tuscany, Italy', colorHex: '#E5D3B3' },
      { name: 'Low-E Acoustic Glass', type: 'Glazing', finish: 'Anti-Reflective', source: 'Saint-Gobain', colorHex: '#2B4C59' },
      { name: 'Charred Yakisugi Cedar', type: 'Exterior Accents', finish: 'Carbonized Flame', source: 'Sustainable Plantation', colorHex: '#252525' }
    ],
    stats: [
      { label: 'Energy Reduction', value: '62%' },
      { label: 'Completion Time', value: '14 Months' },
      { label: 'Solar Output', value: '24 kW/h' },
      { label: 'Constructed Area', value: '820 m²' }
    ],
    featured: true
  },
  {
    id: 'nexus-financial-tower',
    title: 'Nexus Financial HQ Tower',
    subtitle: 'Sustainable Grade-A Commercial Landmark',
    category: 'Commercial',
    location: 'Westlands, Nairobi',
    area: '14,500 sq. m',
    year: '2024',
    servicesProvided: ['Architecture', 'Structural Engineering', 'MEP Engineering', 'Project Management'],
    client: 'Nexus Global Holdings',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    overview: 'Nexus Financial HQ is an 18-storey flagship commercial tower engineered to achieve LEED Platinum certification. Featuring a responsive parametric double skin facade that dynamically adjusts shading angles based on sun position.',
    clientBrief: 'Create a iconic corporate headquarters that promotes employee wellness through biophilic sky gardens, flexible open-plan floorplates, and zero-carbon operations.',
    designChallenge: 'Mitigating intense tropical solar radiation on eastern and western facades while maintaining full floor-to-ceiling panoramic city views.',
    designSolution: 'We developed custom vertical aluminum fins and automated micro-perforated blinds integrated into the building management system, cutting cooling load by 41%.',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    floorPlanHotspots: [],
    constructionGallery: [],
    materials: [
      { name: 'Anodized Bronze Aluminum', type: 'Facade Fins', finish: 'Satin Anodized', source: 'Hydro Extrusions', colorHex: '#7C5E43' },
      { name: 'Ultra-Clear Triple Glazing', type: 'Curtain Wall', finish: 'Solar Control Coating', source: 'AGC Glass', colorHex: '#3A5F6F' }
    ],
    stats: [
      { label: 'LEED Rating', value: 'Platinum' },
      { label: 'Water Recycling', value: '88%' },
      { label: 'Building Height', value: '78 m' }
    ],
    featured: true
  },
  {
    id: 'serengeti-safari-lodge',
    title: 'Aethel Sanctuary Lodge',
    subtitle: 'Ultra-Luxury Eco-Hospitality Resort',
    category: 'Hospitality',
    location: 'Maasai Mara / Serengeti Fringe',
    area: '4,200 sq. m',
    year: '2025',
    servicesProvided: ['Architecture', 'Interior Design', 'MEP Engineering'],
    client: 'Aethel Luxury Resorts',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Aethel Sanctuary Lodge comprises 14 luxury tented villas floated above delicate savannah terrain on timber stilts, ensuring zero footprint on wildlife migration paths.',
    clientBrief: 'Deliver an uncompromised 6-star safari retreat using locally harvested rammed earth, timber framing, and off-grid solar microgrid technology.',
    designChallenge: 'Building in a remote ecosystem with strict zero-waste mandates and extreme seasonal temperature swings.',
    designSolution: 'Off-site timber modular prefabrication assembled on screw-piles without heavy wet concrete pours.',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    floorPlanHotspots: [],
    constructionGallery: [],
    materials: [
      { name: 'Stabilized Rammed Earth', type: 'Thermal Mass Walls', finish: 'Natural Layered Earth', source: 'On-site Excavated Clay', colorHex: '#B76E4A' },
      { name: 'FSC Teak & Eucalyptus', type: 'Decking & Trusses', finish: 'Natural Oil', source: 'Certified Sustainable Forests', colorHex: '#5C3A21' }
    ],
    stats: [
      { label: 'Off-Grid Power', value: '100%' },
      { label: 'Site Disturbance', value: '<3%' },
      { label: 'Guest Suites', value: '14 Villas' }
    ],
    featured: true
  },
  {
    id: 'lavington-penthouse-suite',
    title: 'The Solarium Penthouse',
    subtitle: 'Minimalist Interior Renovation',
    category: 'Interior',
    location: 'Lavington, Nairobi',
    area: '480 sq. m',
    year: '2024',
    servicesProvided: ['Interior Design', '3D Visualization', 'Custom Furniture Fabrication'],
    client: 'Private Tech Investor',
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'A high-end interior transformation converting a dark duplex penthouse into an airy gallery-like living space featuring micro-cement plaster walls, dark smoked oak joinery, and custom architectural brass accents.',
    clientBrief: 'A quiet, introspective home sanctuary for an art collector featuring concealed smart home automation and tactile natural materials.',
    designChallenge: 'Removing load-bearing interior brick partitions to create a unified 18-meter clear span living room.',
    designSolution: 'Concealed steel structural portal frames integrated flush into ceiling bulkheads with recessed perimeter LED cove lighting.',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    floorPlanHotspots: [],
    constructionGallery: [],
    materials: [
      { name: 'Warm Micro-Cement', type: 'Plaster Wall Finish', finish: 'Hand-Troweled Silk', source: 'Ideal Work Italy', colorHex: '#D3CCC1' },
      { name: 'Smoked European Oak', type: 'Millwork & Panels', finish: 'Matte Lacquer', source: 'Hormann', colorHex: '#3D3128' }
    ],
    stats: [
      { label: 'Ceiling Height', value: '3.8 m' },
      { label: 'Custom Joinery', value: '100% Bespoke' },
      { label: 'Project Duration', value: '5 Months' }
    ],
    featured: true
  },
  {
    id: 'karen-creative-campus',
    title: 'The Horizon Innovation Hub',
    subtitle: 'Institutional & Research Campus',
    category: 'Institutional',
    location: 'Karen, Nairobi',
    area: '9,800 sq. m',
    year: '2025',
    servicesProvided: ['Architecture', 'Master Planning', 'Structural Engineering', 'Project Management'],
    client: 'East Africa Science Foundation',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'A forward-looking research campus anchored around a central amphitheater, housing robotics labs, design incubators, and collaborative auditoriums wrapped in solar-kinetic louvers.',
    clientBrief: 'Foster interdisciplinary collaboration between researchers and industry leaders while honoring the historic forested landscape of Karen.',
    designChallenge: 'Balancing high-precision cleanroom acoustic isolation requirements with open fluid communal spaces.',
    designSolution: 'Isolated acoustic box-in-box structural wings connected via lightweight glazed skybridges.',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    floorPlanHotspots: [],
    constructionGallery: [],
    materials: [
      { name: 'Recycled Fiber Cement Panels', type: 'Rainscreen Facade', finish: 'Textured Grey', source: 'Equitone', colorHex: '#818589' }
    ],
    stats: [
      { label: 'Student Capacity', value: '1,200+' },
      { label: 'Lab Spaces', value: '24 Wings' }
    ],
    featured: false
  },
  {
    id: 'gigiri-embassy-residence',
    title: 'Diplomatic Residence Villa',
    subtitle: 'High-Security Luxury Villa',
    category: 'Residential',
    location: 'Gigiri Diplomatic Zone',
    area: '1,100 sq. m',
    year: '2024',
    servicesProvided: ['Architecture', 'Interior Design', 'MEP', 'Security Engineering'],
    client: 'International Delegation',
    heroImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'An uncompromising diplomatic residence combining stringent perimeter ballistics and blast mitigation with light-filled contemporary Kenyan craftsmanship.',
    clientBrief: 'Create a state residence capable of hosting international dignitaries with discrete multi-tiered security zones.',
    designChallenge: 'Ensuring total security without making the home feel like a fortress.',
    designSolution: 'Concealed reinforced steel shear cores layered behind architectural travertine cascading water walls.',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    floorPlanHotspots: [],
    constructionGallery: [],
    materials: [
      { name: 'Reinforced Travertine & Steel', type: 'Structure', finish: 'Fine Chiseled', source: 'Kenyan Volcanic Stone', colorHex: '#A39382' }
    ],
    stats: [
      { label: 'Ballistic Rating', value: 'BR7 Certified' },
      { label: 'Banquet Hall', value: '120 Guests' }
    ],
    featured: false
  }
];
