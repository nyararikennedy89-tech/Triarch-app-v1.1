import { Project } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'nyeri-nanyuki-shell-stopover',
    title: 'Nyeri-Nanyuki Shell Service & Fuel Station',
    subtitle: 'aka "I Love Nanyuki" Highway Retail & Hospitality Stopover',
    category: 'Commercial',
    location: 'Nyeri-Nanyuki Highway (A2 Corridor), Kenya',
    area: '18,500 sq. m',
    year: '2026',
    servicesProvided: [
      'Architecture',
      'Structural & Canopy Engineering',
      'MEP & Fuel Systems Engineering',
      'Master Planning & Traffic Flow Design',
      'Retail & Interior Architecture',
      'Environmental Impact Assessment (EIA)'
    ],
    client: 'Vivo Energy / Shell Kenya & Highway Commercial Consortium',
    heroImage: '/file_00000000f9b48208a818b8e591618141.png',
    galleryImages: [
      '/file_00000000873482088472ea13c0bc4919.png',
      '/file_00000000f9b48208a818b8e591618141.png',
      'https://siligen-company-ltd.odoo.com/web/image/1853-36f3645a/WhatsApp%20Image%202026-01-20%20at%2020.13.43.webp',
      'https://siligen-company-ltd.odoo.com/web/image/1841-74f6d7c9/WhatsApp%20Image%202026-01-20%20at%2020.13.44%20%281%29.webp',
      'https://siligen-company-ltd.odoo.com/web/image/1840-84a18c0e/WhatsApp%20Image%202026-01-20%20at%2020.13.43%20%282%29.webp',
      'https://siligen-company-ltd.odoo.com/web/image/1844-c256b66e/WhatsApp%20Image%202026-01-20%20at%2020.13.44.webp',
      'https://siligen-company-ltd.odoo.com/web/image/1848-0cf2236d/WhatsApp%20Image%202026-01-20%20at%2020.13.43%20%284%29.webp'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    afterImage: '/nanyuki-shell-hero.jpg',
    overview: 'A regional benchmark in modern highway transit architecture along the bustling Nyeri-Nanyuki A2 corridor. Combining an aerodynamic cantilevered multi-pump fuel canopy, the two-story Mountain View Center housing Shell Select, Java House (24/7), and Pharmaplus, executive rest amenities, solar arrays, and an iconic Mount Kenya viewing terrace.',
    clientBrief: 'Design and engineer an iconic highway oasis that serves north-bound safari tourists, business commuters, and local logistics operators with seamless traffic flow, high-speed fueling, premium dining amenities, and full off-grid solar resilience.',
    designChallenge: 'Eliminating cross-traffic hazards between high-speed highway traffic, safari land-cruisers, passenger cars, and heavy commercial transit vehicles while adhering strictly to Energy and Petroleum Regulatory Authority (EPRA) buffer codes and stormwater hydrocarbon containment.',
    designSolution: 'We engineered a segregated dual-loop master plan with an expansive front canopy for light vehicles and a separate rear bypass lane for heavy commercial trucks. The main canopy features high-yield solar PV generation, class-1 hazardous zone vapor recovery systems, and triple-chamber oil-water separators protecting the local drainage basin.',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    floorPlanHotspots: [
      {
        id: 'hs-shell-canopy',
        x: 32,
        y: 48,
        label: 'Main Fueling Forecourt',
        roomName: 'High-Clearance Aerodynamic Canopy',
        description: '16 high-flow multi-product dispensers with LED canopy uplighting and automated vapor capture.',
        imageUrl: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hs-shell-select',
        x: 62,
        y: 36,
        label: 'Shell Select & Gourmet Cafe',
        roomName: 'Retail & Food Court Pavilion',
        description: 'Convenience mart, fresh bakeries, Mount Kenya specialty coffee bar, and grab-and-go deli counter.',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hs-shell-rest-plaza',
        x: 78,
        y: 65,
        label: '"I Love Nanyuki" Photo Terrace',
        roomName: 'Landscaped Transit Rest Plaza',
        description: 'Iconic selfie monument, outdoor shaded pergolas, children play lawn, and Mount Kenya viewing deck.',
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hs-shell-ev',
        x: 18,
        y: 72,
        label: 'Solar EV Fast-Charging Hub',
        roomName: 'Ultra-Fast DC Charging Station',
        description: '4x 150kW ultra-rapid electric vehicle charging bays powered directly by on-site solar battery arrays.',
        imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80'
      }
    ],
    constructionGallery: [
      {
        phase: 'Earthworks & Fuel Tank Pit Excavation',
        date: 'January 2024',
        status: 'Completed',
        description: 'Deep subterranean excavation and reinforced concrete containment vaults for double-wall UST fuel tanks.',
        imageUrl: 'https://siligen-company-ltd.odoo.com/web/image/1257-46d37aae/IMG-20250912-WA0181.webp'
      },
      {
        phase: 'Canopy Steel Superstructure & Forecourt Paving',
        date: 'July 2024',
        status: 'Completed',
        description: 'Erection of structural steel space-frame canopy with 24-meter clear spans and heavy-duty slab paving.',
        imageUrl: 'https://siligen-company-ltd.odoo.com/web/image/1241-85d9f72a/IMG-20250912-WA0177.webp'
      },
      {
        phase: 'Retail Fit-Out & Solar Commissioning',
        date: 'February 2025',
        status: 'Completed',
        description: 'Interior architecture for Shell Select, artisan bakery fit-out, and 65 kWp solar array interconnection.',
        imageUrl: 'https://siligen-company-ltd.odoo.com/web/image/1269-aa6faec6/IMG-20250911-WA0028.webp'
      }
    ],
    materials: [
      { name: 'Composite Aluminum Cladding', type: 'Canopy Fascia', finish: 'Shell Yellow & Red PVDF', source: 'Alucobond Architectural', colorHex: '#FFD100' },
      { name: 'Reinforced Fiber Concrete Pavement', type: 'Forecourt Slabs', finish: 'Power-Troweled Broom Finish', source: 'Bamburi Special Mix', colorHex: '#8C8D8E' },
      { name: 'Low-E Solar Glazing', type: 'Retail Storefront', finish: 'High Visible Transmittance', source: 'Saint-Gobain Glass', colorHex: '#2E4C5A' },
      { name: 'Kenyan Volcanic Basalt Stone', type: 'Landscape Walls', finish: 'Hand-Chiseled Rustic', source: 'Nanyuki Regional Quarry', colorHex: '#4A4643' }
    ],
    panoramaRooms: [
      {
        id: 'nanyuki-shell-forecourt',
        name: 'Forecourt & Cantilevered Canopy',
        category: 'Exterior & Forecourt',
        panoramaUrl: '/IMG_3089.jpg',
        thumbnailUrl: '/Enscape_2024-10-10-03-16-06.png',
        floorLevel: 'Ground Forecourt',
        areaSqM: 1450,
        description: '24-meter clear span cantilevered steel canopy with 16 multi-product fueling bays, LED luminaires, and automated fire suppression.',
        initialLookAt: { yaw: 30, pitch: -5 },
        hotspots: [
          {
            id: 'hs-forecourt-canopy',
            yaw: 40,
            pitch: 15,
            title: 'Aerodynamic Steel Space-Frame Canopy',
            description: 'Engineered to withstand high-altitude wind shear from Mount Kenya with integrated solar PV arrays.',
            specDetails: {
              material: 'Hot-Dip Galvanized Structural Steel with PVDF Fascia',
              manufacturer: 'Triarch Structural Engineering Division',
              architecturalNote: 'Houses 65 kWp solar array providing 80% daytime energy.'
            }
          },
          {
            id: 'hs-forecourt-to-select',
            yaw: 150,
            pitch: -2,
            title: 'Enter Shell Select Retail & Coffee Lounge',
            description: 'Direct step-free pedestrian pathway to the air-conditioned convenience hub.',
            targetRoomId: 'nanyuki-shell-retail'
          },
          {
            id: 'hs-forecourt-to-terrace',
            yaw: 280,
            pitch: -5,
            title: 'Walk to "I Love Nanyuki" Rest Plaza',
            description: 'Visit the landscaped Mount Kenya outdoor viewing plaza and monument.',
            targetRoomId: 'nanyuki-shell-plaza'
          }
        ]
      },
      {
        id: 'nanyuki-shell-retail',
        name: 'Shell Select & Mount Kenya Coffee Hub',
        category: 'Retail & Hospitality',
        panoramaUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2400&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
        floorLevel: 'Ground Floor Pavilion',
        areaSqM: 380,
        description: 'Contemporary highway retail store featuring Kenyan specialty coffee bar, artisan deli, premium restrooms, and traveler essentials.',
        initialLookAt: { yaw: 90, pitch: 0 },
        hotspots: [
          {
            id: 'hs-retail-coffee',
            yaw: 95,
            pitch: -10,
            title: 'Barista Specialty Coffee Bar',
            description: 'Bespoke walnut and matte black quartz counters serving single-origin Nyeri and Nanyuki coffee beans.',
            specDetails: {
              material: 'Kenyan Solid Hardwood & Silestone Quartz',
              manufacturer: 'Triarch Interior Design Studio',
              architecturalNote: 'Acoustic slatted timber ceilings for quiet dining relaxation.'
            }
          },
          {
            id: 'hs-retail-to-forecourt',
            yaw: 260,
            pitch: 0,
            title: 'Return to Main Forecourt',
            description: 'Step back to the fueling and vehicle service lanes.',
            targetRoomId: 'nanyuki-shell-forecourt'
          }
        ]
      },
      {
        id: 'nanyuki-shell-plaza',
        name: '"I Love Nanyuki" Stopover Rest Plaza',
        category: 'Outdoor & Plaza',
        panoramaUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
        floorLevel: 'Plaza Tier',
        areaSqM: 850,
        description: 'Iconic highway stopover photo landmark, shaded wooden gazebos, native botanical landscaping, and panoramic Mount Kenya viewing seats.',
        initialLookAt: { yaw: 180, pitch: -8 },
        hotspots: [
          {
            id: 'hs-plaza-monument',
            yaw: 185,
            pitch: -12,
            title: '"I Love Nanyuki" Stainless Steel Landmark',
            description: 'Architectural illuminated monument celebrating traveler journeys across the Equator and Central Highlands.',
            specDetails: {
              material: 'Laser-Cut Marine Grade 316 Stainless Steel with Corten Accents',
              manufacturer: 'Triarch Custom Metal Art Workshop',
              architecturalNote: 'Equipped with solar-powered warm LED backlight at twilight.'
            }
          },
          {
            id: 'hs-plaza-to-forecourt',
            yaw: 20,
            pitch: 2,
            title: 'Back to Forecourt & EV Charging',
            description: 'Walk toward the high-speed DC EV charging and fueling canopy.',
            targetRoomId: 'nanyuki-shell-forecourt'
          }
        ]
      }
    ],
    sustainabilityImpact: {
      standard: 'EDGE',
      certificationLevel: 'EDGE Certified Commercial Stopover',
      energySavingsPercent: 52,
      waterSavingsPercent: 44,
      embodiedCarbonReductionPercent: 28,
      solarOffsetPercent: 80,
      solarInstalledKwp: 65.0,
      annualCarbonOffsetTons: 54.2,
      annualCostSavingsKES: 2650000,
      edgeCertificationRef: 'EDGE-KE-COMM-2026-003',
      greenFeatures: [
        '65 kWp high-efficiency canopy solar array powering forecourt and Shell Select retail hub',
        'Triple-chamber oil-water hydrocarbon separators safeguarding local drainage basins',
        'Class-1 Stage-II vapor recovery systems mitigating volatile organic compounds (VOCs)',
        '4x 150kW ultra-rapid DC solar EV fast-charging bays with integrated battery buffering'
      ]
    },
    stats: [
      { label: 'Dispenser Bays', value: '16 Multi-Product' },
      { label: 'Solar Generation', value: '65 kWp Array' },
      { label: 'EV Fast Chargers', value: '4x 150kW DC' },
      { label: 'Daily Transit Traffic', value: '3,800+ Vehicles' }
    ],
    featured: true
  },
  {
    id: 'oleleshwa-shell-station',
    title: 'Shell Service & Fuel Station at Oleleshwa',
    subtitle: 'Narok-Baringo Highway Transit & Automotive Retail Hub',
    category: 'Commercial',
    location: 'Oleleshwa, Narok-Baringo Road Corridor, Rift Valley, Kenya',
    area: '14,200 sq. m',
    year: '2026',
    servicesProvided: [
      'Architecture & Master Planning',
      'Forecourt & Structural Canopy Engineering',
      'AutoXpress Service Bay & Pit Design',
      'MEP & Fuel Storage Vault Engineering',
      'Retail & Food Court Interior Architecture',
      'Environmental & Stormwater Hydrocarbon Mitigation'
    ],
    client: 'Vivo Energy / Shell Kenya & Oleleshwa Transit Consortium',
    heroImage: '/WhatsApp Image 2026-10-19 at 8.13.11 AM (1).jpeg',
    galleryImages: [
      '/WhatsApp Image 2026-10-19 at 8.13.11 AM (1).jpeg',
      '/WhatsApp Image 2026-10-19 at 8.13.11 AM.jpeg'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    afterImage: '/file_000000009448820891ad3c52e8e24f60.png',
    overview: 'Strategically positioned at Oleleshwa along the critical Narok-Baringo commercial artery, this modern Shell highway transit flagship combines an illuminated curved-wing structural canopy, a state-of-the-art AutoXpress tyre and express service centre, Shell Select Super Store, food court pavilion (featuring Java House / Chicken Inn), automated high-flow fueling forecourts, and comprehensive solar backup resilience.',
    clientBrief: 'Deliver a high-visibility, full-service automotive oasis catering to heavy agricultural logistics, safari tour operators connecting the Maasai Mara with the Great Rift Valley lakes, and local community transit with zero traffic friction and world-class forecourt retail.',
    designChallenge: 'Accommodating heavy commercial transport trucks alongside high-volume tourist passenger vehicles with safe separated turning radii, while integrating high-altitude Rift Valley crosswind engineering, EPRA forecourt buffer compliances, and localized soil filtration.',
    designSolution: 'We engineered an open dual-axis traffic layout featuring tree-form reinforced column piers supporting an expansive aerodynamic yellow-and-red canopy. The site integrates dedicated AutoXpress service bays for tyre replacement, wheel alignment, oil changes, and car washes, alongside an 8-bay multi-product electronic dispenser forecourt powered by rooftop solar PV arrays and heavy-duty broom-finished concrete slabs.',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    floorPlanHotspots: [
      {
        id: 'hs-oleleshwa-canopy',
        x: 48,
        y: 42,
        label: 'Sculptural Canopy Forecourt',
        roomName: 'High-Clearance Canopy Forecourt',
        description: 'Aerodynamic steel canopy with tree-column branches, energy-efficient recessed LED illumination, and 8 multi-product dispenser islands.',
        imageUrl: '/file_000000009448820891ad3c52e8e24f60.png'
      },
      {
        id: 'hs-oleleshwa-autoxpress',
        x: 18,
        y: 52,
        label: 'AutoXpress Service Centre',
        roomName: 'Automotive Tyre & Quick Service Centre',
        description: 'Fully equipped 3-bay AutoXpress facility providing computerized wheel alignment, tyre replacement, battery testing, suspension tuning, and automated car wash.',
        imageUrl: '/file_00000000b6b08208b1d2668f9c186ed1.png'
      },
      {
        id: 'hs-oleleshwa-select',
        x: 74,
        y: 50,
        label: 'Shell Select & Gourmet Deli',
        roomName: 'Super Store & Highway Food Court',
        description: '24-hour air-conditioned convenience super store, fresh artisan bakeries, barista coffee bar, traveler essentials, and modern clean washroom suites.',
        imageUrl: '/file_000000009448820891ad3c52e8e24f60.png'
      },
      {
        id: 'hs-oleleshwa-pylon',
        x: 90,
        y: 65,
        label: 'Digital Pylon Price Signage',
        roomName: 'High-Visibility Highway Monolith',
        description: '12-meter illuminated LED digital rate pylon guiding northbound and southbound Narok-Baringo travelers from up to 2 kilometers away.',
        imageUrl: '/file_000000009448820891ad3c52e8e24f60.png'
      }
    ],
    constructionGallery: [
      {
        phase: 'Earthworks, Grading & Fuel Tank Vaults',
        date: 'March 2025',
        status: 'Completed',
        description: 'Precision cut-and-fill grading along the Narok-Baringo highway corridor and installation of double-wall UST underground fuel reservoirs with leak detection sensors.',
        imageUrl: 'https://siligen-company-ltd.odoo.com/web/image/1257-46d37aae/IMG-20250912-WA0181.webp'
      },
      {
        phase: 'Tree-Column Canopy Superstructure & AutoXpress Bays',
        date: 'October 2025',
        status: 'Completed',
        description: 'Structural steel erection of the branching architectural canopy piers and reinforced masonry AutoXpress service bays.',
        imageUrl: 'https://siligen-company-ltd.odoo.com/web/image/1241-85d9f72a/IMG-20250912-WA0177.webp'
      },
      {
        phase: 'Forecourt Concrete Paving, Fit-Out & Solar Commissioning',
        date: 'January 2026',
        status: 'Completed',
        description: 'Power-troweled concrete slab casting, Shell Select retail interior finishes, and 50 kWp solar PV canopy array interconnection.',
        imageUrl: 'https://siligen-company-ltd.odoo.com/web/image/1269-aa6faec6/IMG-20250911-WA0028.webp'
      }
    ],
    materials: [
      { name: 'PVDF Architectural Canopy Cladding', type: 'Fascia & Roof', finish: 'Shell Yellow & Red High-Gloss', source: 'Alucobond Architectural', colorHex: '#FFD100' },
      { name: 'Fiber-Reinforced Concrete Forecourt Pavement', type: 'Traffic Slab', finish: 'Heavy-Duty Power Broomed', source: 'Bamburi Special Mix', colorHex: '#9E9E9E' },
      { name: 'Thermally Broken Low-E Storefront Glazing', type: 'Retail Facade', finish: 'Acoustic Tinted', source: 'Saint-Gobain Glass', colorHex: '#2E4C5A' },
      { name: 'Textured Charcoal Engineered Blockwork', type: 'AutoXpress Workshop', finish: 'Matte Architectural Masonry', source: 'Rift Valley Block Systems', colorHex: '#2C2D30' }
    ],
    sustainabilityImpact: {
      standard: 'EDGE',
      certificationLevel: 'EDGE Certified Commercial Stopover',
      energySavingsPercent: 49,
      waterSavingsPercent: 46,
      embodiedCarbonReductionPercent: 31,
      solarOffsetPercent: 78,
      solarInstalledKwp: 52.0,
      annualCarbonOffsetTons: 44.8,
      annualCostSavingsKES: 2180000,
      edgeCertificationRef: 'EDGE-KE-COMM-2026-009',
      greenFeatures: [
        '52.0 kWp rooftop solar PV canopy array offsetting 78% of daylight forecourt and retail power',
        'AutoXpress water reclamation system recycling 65% of car wash washdown water',
        'Triple-stage hydrocarbon fuel interceptors preventing runoff into the Narok basin',
        'Ultra-low power LED directional canopy floodlights eliminating highway light pollution'
      ]
    },
    stats: [
      { label: 'Dispenser Positions', value: '16 Multi-Product' },
      { label: 'Service Bays', value: '3x AutoXpress' },
      { label: 'Solar Generation', value: '52 kWp Array' },
      { label: 'Site Footprint', value: '14,200 m²' }
    ],
    featured: true
  },
  {
    id: '4 Bedroom Maisonette',
    title: 'The Serene Residence in Kiambu County',
    subtitle: 'Biophilic Luxury Private Maisonette',
    category: 'Residential',
    location: 'Kiambu, Kenya',
    area: '260 sq. m',
    year: '2025',
    servicesProvided: ['Architecture', 'Interior Design', 'Structural Engineering', '3D Visualization'],
    client: 'Confidential',
    heroImage: '/file_00000000444882119f8f50c71e323960.png',
    galleryImages: [
      '/file_00000000444882119f8f50c71e323960.png',
      '/file_00000000cd7c82119548acbf646af657.png',
      '/file_0000000063fc82119b53846f123d16b9.png',
      '/file_00000000444882119f8f50c71e323960.png'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    overview: 'The Serene Residence is a masterclass in modern biophilic residence design. Situated on a lush sloped plot, the home seamlessly integrates cantilevered concrete slabs, double-height Low-E curtain walls, and central courtyard waterfalls.',
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
        imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'
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
    panoramaRooms: [
      {
        id: 'nyeri-living-atrium',
        name: 'Grand Atrium & Sunken Lounge',
        category: 'Living & Atrium',
        panoramaUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=2400&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=400&q=80',
        floorLevel: 'Ground Floor',
        areaSqM: 145,
        description: '6.5m clear double-height volume with exposed post-tensioned ribs, sunken bio-ethanol hearth, and floor-to-ceiling forest view glazing.',
        initialLookAt: { yaw: 25, pitch: -5 },
        hotspots: [
          {
            id: 'hs-nyeri-glazing',
            yaw: 35,
            pitch: 8,
            title: 'Triple-Glazed Low-E Curtain Wall',
            description: 'Custom acoustic and solar control glass with motorized concealed sun baffles.',
            specDetails: {
              material: 'Saint-Gobain Planitherm Low-E',
              manufacturer: 'Saint-Gobain Facade Systems',
              architecturalNote: 'Limits solar heat gain by 68% while capturing 100% natural daylight.'
            }
          },
          {
            id: 'hs-nyeri-travertine',
            yaw: 160,
            pitch: -28,
            title: 'Honed Navona Travertine',
            description: 'Large-format continuous vein-cut Italian slabs with radiant hydronic subfloor heating.',
            specDetails: {
              material: 'Navona Classico Travertine',
              manufacturer: 'Tuscan Quarries Ltd',
              architecturalNote: 'Sealed with invisible matte impregnating sealer.'
            }
          },
          {
            id: 'hs-nyeri-to-kitchen',
            yaw: 280,
            pitch: -4,
            title: 'Transition to Culinary Suite',
            description: 'Seamless portal opening toward the gourmet quartz show kitchen.',
            targetRoomId: 'nyeri-kitchen-suite'
          },
          {
            id: 'hs-nyeri-to-pool',
            yaw: 90,
            pitch: -12,
            title: 'Walk to Infinity Plunge Deck',
            description: 'Pocketing glass sliding system opening 12 meters clear onto the basalt terrace.',
            targetRoomId: 'nyeri-infinity-deck'
          }
        ]
      },
      {
        id: 'nyeri-kitchen-suite',
        name: 'Gourmet Chef Kitchen & Wine Cellar',
        category: 'Culinary & Dining',
        panoramaUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2400&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=400&q=80',
        floorLevel: 'Ground Floor',
        areaSqM: 85,
        description: 'Monolithic Calacatta Gold waterfall island, hidden prep scullery, and climate-controlled sommelier vault.',
        initialLookAt: { yaw: 110, pitch: 0 },
        hotspots: [
          {
            id: 'hs-kitchen-island',
            yaw: 115,
            pitch: -18,
            title: 'Calacatta Gold Quartz Monolith',
            description: 'Bookmatched 3.6m seamless slab with integrated induction cooking zone.',
            specDetails: {
              material: 'Compac Calacatta Quartz (20mm)',
              manufacturer: 'Compac Surfaces Spain',
              architecturalNote: 'Zero-porosity surface impervious to citrus and wine acids.'
            }
          },
          {
            id: 'hs-kitchen-to-living',
            yaw: 300,
            pitch: 0,
            title: 'Return to Grand Living Atrium',
            description: 'Pass back into the main entertainment pavilion.',
            targetRoomId: 'nyeri-living-atrium'
          }
        ]
      },
      {
        id: 'nyeri-master-sanctuary',
        name: 'Master Penthouse Sanctuary Suite',
        category: 'Master Suite',
        panoramaUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
        floorLevel: 'Upper Level',
        areaSqM: 110,
        description: 'Suspended master suite framing panoramic views of Mount Kenya, featuring private bio-sauna and walk-in dressing lounge.',
        initialLookAt: { yaw: 210, pitch: -2 },
        hotspots: [
          {
            id: 'hs-master-timber',
            yaw: 220,
            pitch: 18,
            title: 'Acoustic Teak Slat Ceiling',
            description: 'FSC-certified plantation teak with integrated sound absorption mineral backing.',
            specDetails: {
              material: 'African Plantation Teak',
              manufacturer: 'Triarch Custom Millwork Workshop',
              architecturalNote: 'NRC rating 0.85 for intimate acoustic warmth.'
            }
          },
          {
            id: 'hs-master-to-deck',
            yaw: 40,
            pitch: -8,
            title: 'Step Out to Private Upper Terrace',
            description: 'Cantilevered balcony overlooking the forest canopy.',
            targetRoomId: 'nyeri-infinity-deck'
          }
        ]
      },
      {
        id: 'nyeri-infinity-deck',
        name: 'Infinity Pool & Sunset Cantilever Deck',
        category: 'Outdoor & Terrace',
        panoramaUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
        floorLevel: 'Exterior Garden Tier',
        areaSqM: 180,
        description: '22-meter cantilevered magnesium saltwater pool with volcanic basalt tiles and sunken firepit lounge.',
        initialLookAt: { yaw: 180, pitch: -10 },
        hotspots: [
          {
            id: 'hs-deck-basalt',
            yaw: 195,
            pitch: -32,
            title: 'Flamed Kenyan Basalt Coping',
            description: 'Locally quarried volcanic stone with natural anti-slip wet grip texture.',
            specDetails: {
              material: 'Flamed Ol Doinyo Basalt',
              manufacturer: 'Rift Valley Natural Stone',
              architecturalNote: 'Naturally thermal-retaining to warm pool edges at sunset.'
            }
          },
          {
            id: 'hs-deck-to-living',
            yaw: 10,
            pitch: 5,
            title: 'Enter Grand Living Pavilion',
            description: 'Slide through frameless pocket doors.',
            targetRoomId: 'nyeri-living-atrium'
          }
        ]
      }
    ],
    sustainabilityImpact: {
      standard: 'EDGE',
      certificationLevel: 'EDGE Advanced (Zero Carbon Ready)',
      energySavingsPercent: 54,
      waterSavingsPercent: 48,
      embodiedCarbonReductionPercent: 39,
      solarOffsetPercent: 88,
      solarInstalledKwp: 14.8,
      annualCarbonOffsetTons: 11.4,
      annualCostSavingsKES: 480000,
      edgeCertificationRef: 'EDGE-KE-RES-2025-084',
      leedScore: 78,
      greenFeatures: [
        'Passive solar orientation with north-south cross-ventilation baffles',
        'Double-glazed Low-E argon insulated curtain walls cutting cooling load by 44%',
        '14.8 kWp Tier-1 Monocrystalline solar PV with 20 kWh LiFePO4 battery storage',
        'Rainwater harvesting (45,000L underground cistern) with UV & sand filtration',
        'Locally sourced volcanic basalt & FSC-certified timber minimizing embodied transit emissions',
        'Greywater sub-surface drip irrigation for indigenous endemic landscape flora'
      ]
    },
    stats: [
      { label: 'Energy Reduction', value: '62%' },
      { label: 'Completion Time', value: '14 Months' },
      { label: 'Solar Output', value: '24 kW/h' },
      { label: 'Constructed Area', value: '820 m²' }
    ],
    featured: true
  }
];
