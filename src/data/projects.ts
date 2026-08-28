import { Project } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'nyeri-nanyuki-shell-stopover',
    title: 'Nyeri-Nanyuki Shell Service & Fuel Station',
    subtitle: 'aka "I Love Nanyuki" Highway Retail & Hospitality Stopover',
    category: 'Commercial',
    location: 'Nyeri-Nanyuki Highway (A2 Corridor), Kenya',
    area: '18,500 sq. m',
    year: '2025',
    servicesProvided: [
      'Architecture',
      'Structural & Canopy Engineering',
      'MEP & Fuel Systems Engineering',
      'Master Planning & Traffic Flow Design',
      'Retail & Interior Architecture',
      'Environmental Impact Assessment (EIA)'
    ],
    client: 'Vivo Energy / Shell Kenya & Highway Commercial Consortium',
    heroImage: '/Enscape_2024-10-10-03-16-06.png',
    galleryImages: [
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
        imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80'
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
    stats: [
      { label: 'Dispenser Bays', value: '16 Multi-Product' },
      { label: 'Solar Generation', value: '65 kWp Array' },
      { label: 'EV Fast Chargers', value: '4x 150kW DC' },
      { label: 'Daily Transit Traffic', value: '3,800+ Vehicles' }
    ],
    featured: true
  },
  {
    id: 'Cavali-glass-pavilion',
    title: 'The Glass Pavilion at Nyeri County',
    subtitle: 'Biophilic Luxury Private Villa',
    category: 'Residential',
    location: 'Nyeri, Kenya',
    area: '820 sq. m',
    year: '2026',
    servicesProvided: ['Architecture', 'Interior Design', 'Structural Engineering', '3D Visualization'],
    client: 'Confidential',
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
    panoramaRooms: [
      {
        id: 'nexus-sky-atrium',
        name: 'Triple-Height Sky Atrium & Lobby',
        category: 'Commercial & Atrium',
        panoramaUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80',
        floorLevel: '14th Floor Sky Lounge',
        areaSqM: 420,
        description: 'Biophilic indoor botanical atrium connecting executive floors with bespoke floating steel staircase.',
        initialLookAt: { yaw: 45, pitch: 0 },
        hotspots: [
          {
            id: 'hs-nexus-fins',
            yaw: 60,
            pitch: 12,
            title: 'Dynamic Parametric Bronze Louvers',
            description: 'Automated sun tracking louvers optimized to reduce cooling loads by 41%.',
            specDetails: {
              material: 'Anodized Architectural Aluminum',
              manufacturer: 'Hydro Building Systems',
              architecturalNote: 'Connected to centralized BMS with BACnet protocol.'
            }
          },
          {
            id: 'hs-nexus-to-boardroom',
            yaw: 220,
            pitch: -4,
            title: 'Enter Executive Glass Boardroom',
            description: 'Acoustically isolated conference pavilion with smart switchable privacy glass.',
            targetRoomId: 'nexus-boardroom'
          }
        ]
      },
      {
        id: 'nexus-boardroom',
        name: 'Executive Panoramic Boardroom',
        category: 'Executive Suite',
        panoramaUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2400&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=400&q=80',
        floorLevel: '18th Floor Penthouse',
        areaSqM: 95,
        description: 'Commanding 270-degree skyline views of Nairobi with custom walnut conference table and integrated acoustic ceiling baffles.',
        initialLookAt: { yaw: 180, pitch: -5 },
        hotspots: [
          {
            id: 'hs-boardroom-to-atrium',
            yaw: 350,
            pitch: 0,
            title: 'Back to Sky Atrium',
            description: 'Exit to the main reception sky garden.',
            targetRoomId: 'nexus-sky-atrium'
          }
        ]
      }
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
    panoramaRooms: [
      {
        id: 'aethel-safari-suite',
        name: 'Savannah Horizon Open-Air Suite',
        category: 'Hospitality Villa',
        panoramaUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2400&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80',
        floorLevel: 'Elevated Stilt Pavilion',
        areaSqM: 160,
        description: 'Frameless 180-degree game reserve vistas, canvas draped canopies, hand-carved stone tub, and private plunge pool.',
        initialLookAt: { yaw: 90, pitch: -5 },
        hotspots: [
          {
            id: 'hs-safari-rammed',
            yaw: 120,
            pitch: 5,
            title: 'Layered Thermal Rammed Earth Wall',
            description: 'Stabilized local red clay keeping interior suites 6°C cooler during midday heat.',
            specDetails: {
              material: 'Local Mara Rammed Clay',
              manufacturer: 'On-site Triarch Soil Laboratory',
              architecturalNote: 'Zero embodied transport emissions.'
            }
          }
        ]
      }
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
    panoramaRooms: [
      {
        id: 'solarium-gallery-living',
        name: 'Curated Minimalist Living Gallery',
        category: 'Interior & Living',
        panoramaUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2400&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=400&q=80',
        floorLevel: 'Upper Duplex Level',
        areaSqM: 130,
        description: 'Micro-cement walls, concealed architectural linear lighting, and bespoke smoked oak joinery framing private art pieces.',
        initialLookAt: { yaw: 0, pitch: 0 },
        hotspots: [
          {
            id: 'hs-solarium-plaster',
            yaw: 40,
            pitch: 10,
            title: 'Continuous Micro-Cement Seamless Coating',
            description: 'Troweled Italian polymer micro-topping with silk matte protective sealer.',
            specDetails: {
              material: 'Ideal Work Microtopping 3mm',
              manufacturer: 'Ideal Work S.r.l.',
              architecturalNote: 'Eliminates all visible wall grout lines.'
            }
          }
        ]
      }
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
