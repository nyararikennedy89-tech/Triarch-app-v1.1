import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun,
  Leaf,
  Zap,
  Battery,
  ShieldCheck,
  Calculator,
  Sliders,
  DollarSign,
  TrendingDown,
  Info,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  HelpCircle,
  BarChart3,
  Flame,
  Award
} from 'lucide-react';
import { Project } from '../types';

interface SustainabilityImpactWidgetProps {
  projects: Project[];
  onOpenConsultation?: (message?: string) => void;
  onSelectProject?: (project: Project) => void;
}

// Preset loads for quick household/commercial calculation
export interface PresetSpace {
  id: string;
  label: string;
  subtitle: string;
  description: string;
  typicalFloorAreaSqM: number;
  occupants: number;
  typicalDailyKwh: number;
  peakKw: number;
  applianceBreakdown: Array<{ name: string; watts: number; hoursPerDay: number; qty: number }>;
}

export const PRESET_SPACES: PresetSpace[] = [
  {
    id: 'res-3bed',
    label: '3-Bed Family Villa',
    subtitle: 'Standard Suburban Household',
    description: 'Typical 3-bedroom residence in Nairobi/Kiambu with inverter fridge, LED lighting, TV/entertainment, borehole booster pump, and solar water heating assist.',
    typicalFloorAreaSqM: 180,
    occupants: 4,
    typicalDailyKwh: 12.5,
    peakKw: 3.8,
    applianceBreakdown: [
      { name: 'LED Architectural Lighting (20 fittings)', watts: 200, hoursPerDay: 5, qty: 1 },
      { name: 'Inverter Refrigerator & Freezer', watts: 140, hoursPerDay: 24, qty: 1 },
      { name: 'Water Booster Pump (0.75 HP)', watts: 550, hoursPerDay: 1.5, qty: 1 },
      { name: 'Smart TVs & Sound System', watts: 180, hoursPerDay: 4, qty: 2 },
      { name: 'Laptops & Home Office Devices', watts: 150, hoursPerDay: 8, qty: 2 },
      { name: 'Microwave & Kitchen Small Appliances', watts: 1200, hoursPerDay: 0.5, qty: 1 },
      { name: 'Washing Machine (3x/week avg)', watts: 800, hoursPerDay: 0.8, qty: 1 }
    ]
  },
  {
    id: 'res-4bed-luxury',
    label: '4/5-Bed Luxury Maisonette',
    subtitle: 'High-Demand Executive Home',
    description: 'Biophilic estate with multi-zone inverter AC/heat pumps, heated swimming pool circulation, deep well borehole pump, EV home charger trickle, and smart automation.',
    typicalFloorAreaSqM: 320,
    occupants: 6,
    typicalDailyKwh: 28.0,
    peakKw: 7.5,
    applianceBreakdown: [
      { name: 'Architectural & Cove LEDs (40 fixtures)', watts: 400, hoursPerDay: 6, qty: 1 },
      { name: 'French-Door Smart Fridge + Deep Freezer', watts: 260, hoursPerDay: 24, qty: 1 },
      { name: 'Multi-Split Inverter Aircon (Living & Master)', watts: 2200, hoursPerDay: 4, qty: 1 },
      { name: 'Pool Filtration Pump & Salt Chlorinator', watts: 1100, hoursPerDay: 3, qty: 1 },
      { name: 'Borehole Submersible Pump (2 HP)', watts: 1500, hoursPerDay: 1.5, qty: 1 },
      { name: 'EV Overnight Level-2 Trickle (partial offset)', watts: 3300, hoursPerDay: 2, qty: 1 },
      { name: 'Induction Cooktop & Convection Oven', watts: 2800, hoursPerDay: 1, qty: 1 }
    ]
  },
  {
    id: 'comm-office',
    label: 'Boutique Office / Studio',
    subtitle: 'Commercial Workspace (15-25 staff)',
    description: 'Architectural/creative firm office with workstations, CAD rendering servers, VR headsets, meeting room displays, and central kitchenette.',
    typicalFloorAreaSqM: 250,
    occupants: 20,
    typicalDailyKwh: 45.0,
    peakKw: 12.0,
    applianceBreakdown: [
      { name: 'Workstation PCs & Multi-Monitors (18 desks)', watts: 3600, hoursPerDay: 8, qty: 1 },
      { name: 'Central Server / NAS / Network Rack (24/7)', watts: 450, hoursPerDay: 24, qty: 1 },
      { name: 'Office HVAC Inverter Cassettes', watts: 3500, hoursPerDay: 8, qty: 1 },
      { name: 'LED Glare-Free Suspended Luminaires', watts: 650, hoursPerDay: 9, qty: 1 },
      { name: 'Espresso Bar & Water Dispensers', watts: 1800, hoursPerDay: 2, qty: 1 }
    ]
  },
  {
    id: 'eco-lodge',
    label: 'Eco-Hospitality Cabin',
    subtitle: 'Off-Grid Safari / Highland Chalet',
    description: 'Stand-alone hospitality villa in wilderness or high-country location requiring 100% off-grid reliability with silent solar battery storage.',
    typicalFloorAreaSqM: 140,
    occupants: 3,
    typicalDailyKwh: 16.0,
    peakKw: 4.5,
    applianceBreakdown: [
      { name: 'Efficient 12V/24V Glamping Lighting', watts: 120, hoursPerDay: 6, qty: 1 },
      { name: 'Solar Direct DC Refrigerator', watts: 85, hoursPerDay: 24, qty: 1 },
      { name: 'Pressurized Hot Water Circulation', watts: 350, hoursPerDay: 2, qty: 1 },
      { name: 'Starlink Satellite & Guest Device Charging', watts: 120, hoursPerDay: 18, qty: 1 },
      { name: 'Underfloor Radiant Warming Assist', watts: 900, hoursPerDay: 4, qty: 1 }
    ]
  }
];

// Solar accessories recommendations
export interface SolarAccessorySpec {
  category: 'Inverter' | 'Battery Storage' | 'Solar PV Panels' | 'BOS & Protection' | 'Smart Monitoring';
  item: string;
  specification: string;
  whyNeeded: string;
  estimatedCostKES: string;
  recommendedBrand: string;
}

export const SustainabilityImpactWidget: React.FC<SustainabilityImpactWidgetProps> = ({
  projects,
  onOpenConsultation,
  onSelectProject
}) => {
  // Mode toggle: Featured Projects Rating vs Interactive Solar Calculator
  const [activeWidgetTab, setActiveWidgetTab] = useState<'ratings' | 'solar-calc'>('ratings');

  // Filter projects to those with sustainabilityImpact or residential
  const featuredSustainableProjects = useMemo(() => {
    return projects.filter(
      (p) => p.sustainabilityImpact || p.category === 'Residential'
    );
  }, [projects]);

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    featuredSustainableProjects[0]?.id || '4 Bedroom Maisonette'
  );

  const activeProject = useMemo(() => {
    return (
      featuredSustainableProjects.find((p) => p.id === selectedProjectId) ||
      featuredSustainableProjects[0]
    );
  }, [featuredSustainableProjects, selectedProjectId]);

  // ==========================================
  // SOLAR LOAD CALCULATOR STATE
  // ==========================================
  const [selectedPresetId, setSelectedPresetId] = useState<string>('res-3bed');
  const [dailyKwhInput, setDailyKwhInput] = useState<number>(14.0);
  const [sunHoursPerDay, setSunHoursPerDay] = useState<number>(5.2); // Kenya avg peak sun hours (5.0 - 5.8)
  const [backupDays, setBackupDays] = useState<number>(1.5); // Autonomy days
  const [systemType, setSystemType] = useState<'hybrid' | 'off-grid' | 'grid-tied'>('hybrid');
  const [electricityTariffKES, setElectricityTariffKES] = useState<number>(31.5); // KPLC avg tariff per kWh (KES 30-33)

  // Update daily kWh when preset changes
  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = PRESET_SPACES.find((p) => p.id === presetId);
    if (preset) {
      setDailyKwhInput(preset.typicalDailyKwh);
    }
  };

  // ==========================================
  // CALCULATIONS
  // ==========================================
  const solarCalculations = useMemo(() => {
    // 1. Solar array sizing (kWp)
    // Factoring in 20% system losses (temperature derating, inverter efficiency, cabling)
    const systemLossMultiplier = 1.25;
    const requiredKwhWithLosses = dailyKwhInput * systemLossMultiplier;
    const arraySizeKwp = Number((requiredKwhWithLosses / Math.max(1, sunHoursPerDay)).toFixed(2));
    
    // Panel specs (using modern 580W N-Type TOPCon panels)
    const panelWattage = 585; // Watts per panel
    const numberOfPanels = Math.ceil((arraySizeKwp * 1000) / panelWattage);
    const actualInstalledKwp = Number(((numberOfPanels * panelWattage) / 1000).toFixed(2));
    const roofAreaSqM = Math.ceil(numberOfPanels * 2.5); // ~2.5 sq.m per 585W panel including clearances

    // 2. Battery Storage Capacity (kWh)
    // DOD (Depth of Discharge) for Lithium Iron Phosphate (LiFePO4) is 90%
    const dod = 0.90;
    const batteryCapacityKwh = Number(((dailyKwhInput * backupDays) / dod).toFixed(1));
    const battery5kWhModules = Math.max(1, Math.ceil(batteryCapacityKwh / 5.12)); // Standard 5.12 kWh server rack modules

    // 3. Recommended Inverter Size (kVA/kW)
    // Base inverter size = peak instantaneous load + 25% surge safety headroom
    const activePreset = PRESET_SPACES.find((p) => p.id === selectedPresetId);
    const peakKw = activePreset?.peakKw || (dailyKwhInput * 0.3);
    const inverterSizeKw = Math.max(5.0, Math.ceil(peakKw * 1.3));

    // 4. Financial & Environmental Return in Kenya
    const annualGenerationKwh = Math.round(actualInstalledKwp * sunHoursPerDay * 365 * 0.82);
    const annualSavingsKES = Math.round(Math.min(dailyKwhInput * 365, annualGenerationKwh) * electricityTariffKES);
    const monthlySavingsKES = Math.round(annualSavingsKES / 12);
    
    // Estimated turnkey system installation cost in Kenya (Tier-1 hardware)
    // Inverter (~KES 18,000 - 24,000 per kW)
    // LiFePO4 Battery (~KES 45,000 per kWh)
    // Tier-1 TOPCon Panels (~KES 42,000 per kWp)
    // Balance of System, Cabling, SPD surge, ATS, Aluminum roof mounts, EPRA/NEMA compliance, commissioning (~18% of equipment)
    const equipCostPanels = actualInstalledKwp * 40000;
    const equipCostBattery = battery5kWhModules * 5.12 * 45000;
    const equipCostInverter = inverterSizeKw * 22000;
    const bosAndInstallation = (equipCostPanels + equipCostBattery + equipCostInverter) * 0.22;
    const totalEstimatedTurnkeyKES = Math.round(equipCostPanels + equipCostBattery + equipCostInverter + bosAndInstallation);

    const paybackPeriodYears = Number((totalEstimatedTurnkeyKES / Math.max(1, annualSavingsKES)).toFixed(1));
    const annualCo2OffsetTons = Number(((annualGenerationKwh * 0.65) / 1000).toFixed(1)); // 0.65 kg CO2/kWh displaced
    const equivalentTreesPlanted = Math.round(annualCo2OffsetTons * 45);

    // 5. Tailored Accessories Specifications
    const accessories: SolarAccessorySpec[] = [
      {
        category: 'Solar PV Panels',
        item: `${numberOfPanels}x Monocrystalline N-Type TOPCon Panels (${panelWattage}W)`,
        specification: `Total: ${actualInstalledKwp} kWp | Bifacial 22.4% module efficiency | Tier-1 Bloomberg rated (Jinko / Longi Solar) | 25-yr performance guarantee.`,
        whyNeeded: 'Captures solar irradiance in East Africa with superior heat tolerance (low thermal degradation under high equatorial UV).',
        estimatedCostKES: `KES ${equipCostPanels.toLocaleString()}`,
        recommendedBrand: 'Jinko Solar Tiger Neo / Longi Hi-MO 6'
      },
      {
        category: 'Inverter',
        item: `${inverterSizeKw}kW Pure Sine Wave Hybrid Solar Inverter`,
        specification: `Dual MPPT tracking | 48V / High-Voltage architecture | <10ms UPS grid transfer | Generator dry-contact auto-start | Remote Wi-Fi app monitoring.`,
        whyNeeded: 'Synchronizes rooftop solar, LiFePO4 battery discharge, KPLC grid power, and backup diesel generator seamlessly with zero flicker.',
        estimatedCostKES: `KES ${equipCostInverter.toLocaleString()}`,
        recommendedBrand: 'Deye / Victron Energy MultiPlus-II / SunSynk'
      },
      {
        category: 'Battery Storage',
        item: `${battery5kWhModules}x LiFePO4 Modular Rack Batteries (${(battery5kWhModules * 5.12).toFixed(1)} kWh Total)`,
        specification: `5.12 kWh 48V 100Ah modules | 6,000+ deep discharge cycles at 90% DoD | Built-in smart BMS cell balancing & thermal cut-off | 10-year design life.`,
        whyNeeded: 'Provides zero-blackout nocturnal power for family and guarantees emergency autonomy through multi-day overcast spells.',
        estimatedCostKES: `KES ${Math.round(battery5kWhModules * 5.12 * 45000).toLocaleString()}`,
        recommendedBrand: 'Pylontech US5000 / Dyness / Hubble Energy'
      },
      {
        category: 'BOS & Protection',
        item: 'Surge Protection Devices (SPD) & DC Isolator Kit',
        specification: 'Class II 1000V DC Surge Arresters | Double-pole DC circuit breakers | UV-resistant 6mm² solar flex cable | Heavy-duty anodized aluminum roof rail clamp kit.',
        whyNeeded: 'Guarantees structural safety against tropical lightning strikes, voltage spikes, and heavy roof wind loads.',
        estimatedCostKES: `KES ${Math.round(bosAndInstallation * 0.45).toLocaleString()}`,
        recommendedBrand: 'Schneider Electric / Suntree / Staubli MC4'
      },
      {
        category: 'Smart Monitoring',
        item: 'Smart Energy Bi-Directional Meter & Remote Gateway',
        specification: 'Real-time production, self-consumption, and battery telemetry logging with cloud-based smartphone dashboard and automated fault alerts.',
        whyNeeded: 'Enables architectural homeowners to optimize load scheduling (e.g. run pool pumps and water heaters during peak 11am-2pm solar yield).',
        estimatedCostKES: 'Included with Inverter Pack',
        recommendedBrand: 'Eastron SDM630 / Deye SolarCloud'
      }
    ];

    return {
      arraySizeKwp,
      actualInstalledKwp,
      numberOfPanels,
      panelWattage,
      roofAreaSqM,
      batteryCapacityKwh,
      battery5kWhModules,
      inverterSizeKw,
      annualGenerationKwh,
      annualSavingsKES,
      monthlySavingsKES,
      totalEstimatedTurnkeyKES,
      paybackPeriodYears,
      annualCo2OffsetTons,
      equivalentTreesPlanted,
      accessories
    };
  }, [dailyKwhInput, sunHoursPerDay, backupDays, selectedPresetId, electricityTariffKES]);

  return (
    <div
      id="sustainability-widget"
      className="mt-14 sm:mt-16 rounded-3xl bg-gradient-to-b from-stone-900 to-[#121312] text-white p-5 xs:p-6 sm:p-8 md:p-10 border border-emerald-500/30 shadow-2xl relative overflow-hidden"
    >
      {/* Background Decorative Solar & Architectural Geometry */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Header Eyebrow */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
              <Leaf className="w-3.5 h-3.5" />
              Sustainability & Energy Engineering
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-semibold border border-amber-500/30">
              <Sun className="w-3 h-3" />
              LEED & EDGE Certified
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold tracking-tight text-white">
            Sustainability Impact & Solar Power Engineering
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Verify certified energy performance ratings on our featured residential and commercial estates, 
            or calculate precise solar PV loads, battery autonomy, and turnkey accessory specifications for your project.
          </p>
        </div>

        {/* Dual Tab Switcher */}
        <div className="flex items-center p-1.5 rounded-2xl bg-black/50 border border-white/10 shrink-0 self-start lg:self-auto">
          <button
            type="button"
            onClick={() => setActiveWidgetTab('ratings')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
              activeWidgetTab === 'ratings'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-stone-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Award className="w-4 h-4 text-emerald-300" />
            <span>Project Ratings (LEED / EDGE)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveWidgetTab('solar-calc')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
              activeWidgetTab === 'solar-calc'
                ? 'bg-amber-600 text-white shadow-lg'
                : 'text-stone-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Solar Load & Spec Calculator</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: FEATURED PROJECTS SUSTAINABILITY RATINGS */}
      {/* ========================================================================= */}
      {activeWidgetTab === 'ratings' && (
        <div className="relative z-10 pt-8 space-y-8">
          {/* Project Selector Pills */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Select Project to Inspect Energy Ratings:
              </span>
              <span className="text-xs text-stone-400 hidden sm:inline-block">
                Benchmarked to IFC EDGE & USGBC LEED v4.1 criteria
              </span>
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
              {featuredSustainableProjects.map((p) => {
                const isSelected = p.id === activeProject.id;
                const impact = p.sustainabilityImpact;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProjectId(p.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all shrink-0 flex items-center gap-2.5 border cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{p.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 text-emerald-300 font-mono">
                      {impact?.standard || 'EDGE'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Project Highlight Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 5 Cols: Visual & Certification Badge */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden bg-black/40 border border-white/10 flex flex-col justify-between">
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={activeProject.heroImage}
                  alt={activeProject.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Certification Badge Overlay */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {activeProject.sustainabilityImpact?.certificationLevel || 'EDGE Advanced'}
                  </span>
                  {activeProject.sustainabilityImpact?.leedScore && (
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-amber-300 font-mono text-xs border border-amber-400/30">
                      LEED Score: {activeProject.sustainabilityImpact.leedScore}/110
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-amber-300 text-xs font-semibold uppercase tracking-wider block">
                    {activeProject.category} • {activeProject.location}
                  </span>
                  <h4 className="text-lg sm:text-xl font-heading font-bold text-white mt-0.5">
                    {activeProject.title}
                  </h4>
                  <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                    {activeProject.subtitle}
                  </p>
                </div>
              </div>

              {/* Quick Spec Row */}
              <div className="p-4 bg-white/5 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Built Area</span>
                  <span className="font-bold text-white font-heading">{activeProject.area}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Year</span>
                  <span className="font-bold text-white font-heading">{activeProject.year}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Client</span>
                  <span className="font-bold text-white font-heading truncate block">{activeProject.client}</span>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Tri-Pillar Efficiency Meters & Specs */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              {/* Three Main Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Energy */}
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-emerald-300 uppercase font-semibold tracking-wider flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" />
                      Energy
                    </span>
                    <span className="text-xs font-mono text-emerald-400">EDGE Base</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                    +{activeProject.sustainabilityImpact?.energySavingsPercent || 54}%
                  </div>
                  <span className="text-[11px] text-stone-300 block mt-1">
                    Operational energy reduction vs local code baseline
                  </span>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(100, activeProject.sustainabilityImpact?.energySavingsPercent || 54)}%` }}
                    />
                  </div>
                </div>

                {/* Water */}
                <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-cyan-300 uppercase font-semibold tracking-wider flex items-center gap-1">
                      <Leaf className="w-3.5 h-3.5" />
                      Water
                    </span>
                    <span className="text-xs font-mono text-cyan-400">Rain & Grey</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                    +{activeProject.sustainabilityImpact?.waterSavingsPercent || 48}%
                  </div>
                  <span className="text-[11px] text-stone-300 block mt-1">
                    Potable water savings through harvesting & low-flow
                  </span>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div
                      className="bg-cyan-400 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(100, activeProject.sustainabilityImpact?.waterSavingsPercent || 48)}%` }}
                    />
                  </div>
                </div>

                {/* Embodied Carbon */}
                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-amber-300 uppercase font-semibold tracking-wider flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5" />
                      Embodied
                    </span>
                    <span className="text-xs font-mono text-amber-400">Materials</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                    -{activeProject.sustainabilityImpact?.embodiedCarbonReductionPercent || 39}%
                  </div>
                  <span className="text-[11px] text-stone-300 block mt-1">
                    Lower embodied material emissions (basalt, timber)
                  </span>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(100, activeProject.sustainabilityImpact?.embodiedCarbonReductionPercent || 39)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Solar Generation & Financial ROI Sub-Panel */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span className="text-xs sm:text-sm font-bold text-white">
                      Rooftop Solar & Carbon Offsets
                    </span>
                  </div>
                  {activeProject.sustainabilityImpact?.edgeCertificationRef && (
                    <span className="text-[11px] font-mono text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      Ref: {activeProject.sustainabilityImpact.edgeCertificationRef}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                  <div>
                    <span className="text-[10px] uppercase text-stone-400 block">Solar Array</span>
                    <span className="text-sm font-bold text-white font-mono mt-0.5 block">
                      {activeProject.sustainabilityImpact?.solarInstalledKwp || 14.8} kWp
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-stone-400 block">Solar Coverage</span>
                    <span className="text-sm font-bold text-emerald-300 font-mono mt-0.5 block">
                      {activeProject.sustainabilityImpact?.solarOffsetPercent || 88}% of load
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-stone-400 block">CO₂ Abated / Yr</span>
                    <span className="text-sm font-bold text-amber-300 font-mono mt-0.5 block">
                      {activeProject.sustainabilityImpact?.annualCarbonOffsetTons || 11.4} Tons
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-stone-400 block">Annual Utility Savings</span>
                    <span className="text-sm font-bold text-white font-mono mt-0.5 block">
                      KES {(activeProject.sustainabilityImpact?.annualCostSavingsKES || 480000).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Architectural Green Strategies Checklist */}
              {activeProject.sustainabilityImpact?.greenFeatures && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                    Implemented Passive & Active Green Engineering Features:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                    {activeProject.sustainabilityImpact.greenFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-black/30 p-2.5 rounded-xl border border-white/5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Link to Full Case Study */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onSelectProject && onSelectProject(activeProject)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer group"
                >
                  <span>Explore full architectural case study & construction log</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveWidgetTab('solar-calc')}
                  className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide border border-amber-500/30 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Calculate Solar Loads For Your Space</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: INTERACTIVE SOLAR LOAD CALCULATOR & ACCESSORY SPECIFICATIONS */}
      {/* ========================================================================= */}
      {activeWidgetTab === 'solar-calc' && (
        <div className="relative z-10 pt-8 space-y-8">
          {/* Preset Space Selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                Step 1: Choose Space Type Or Household Scale
              </span>
              <span className="text-xs text-stone-400 hidden sm:inline-block">
                Configured with Kenyan appliances & equatorial sun yield
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PRESET_SPACES.map((preset) => {
                const isSelected = preset.id === selectedPresetId;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`p-4 rounded-2xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 shadow-lg text-white'
                        : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-white font-heading">{preset.label}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-amber-300">
                          {preset.typicalDailyKwh} kWh/d
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-400 block mb-2">{preset.subtitle}</span>
                      <p className="text-[11px] text-stone-400 leading-relaxed line-clamp-2">
                        {preset.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-stone-400">
                      <span>Area: ~{preset.typicalFloorAreaSqM}m²</span>
                      <span>Peak: {preset.peakKw}kW</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Sliders: Fine-Tune Daily Consumption & Solar Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 sm:p-6 rounded-2xl bg-black/40 border border-white/10">
            {/* Slider 1: Daily Energy Use */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Daily Energy Consumption
                </label>
                <span className="text-sm font-bold text-amber-300 font-mono">
                  {dailyKwhInput} kWh / day
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="80"
                step="1"
                value={dailyKwhInput}
                onChange={(e) => setDailyKwhInput(Number(e.target.value))}
                className="w-full accent-amber-500 h-2 bg-white/20 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400">
                <span>Small Flat (4 kWh)</span>
                <span>Typical Villa (14-25 kWh)</span>
                <span>Large Estate (80 kWh)</span>
              </div>
            </div>

            {/* Slider 2: Sun Hours */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  Regional Peak Sun Hours
                </label>
                <span className="text-sm font-bold text-white font-mono">
                  {sunHoursPerDay} hrs / day
                </span>
              </div>
              <input
                type="range"
                min="4.0"
                max="6.5"
                step="0.1"
                value={sunHoursPerDay}
                onChange={(e) => setSunHoursPerDay(Number(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-white/20 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400">
                <span>Nairobi/Aberdares (5.0)</span>
                <span>Central/Rift (5.3)</span>
                <span>Nanyuki/North (5.8+)</span>
              </div>
            </div>

            {/* Slider 3: Battery Autonomy Days */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                  <Battery className="w-3.5 h-3.5 text-emerald-400" />
                  Battery Autonomy Reserve
                </label>
                <span className="text-sm font-bold text-emerald-300 font-mono">
                  {backupDays} Days (at 90% DoD)
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.5"
                value={backupDays}
                onChange={(e) => setBackupDays(Number(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-white/20 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400">
                <span>0.5 Day (Peak Shaving)</span>
                <span>1.5 Days (Standard)</span>
                <span>3.0 Days (Deep Off-Grid)</span>
              </div>
            </div>
          </div>

          {/* Sizing Results Dashboard */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {/* Panels */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] uppercase text-stone-400 block">Solar Array Capacity</span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300 mt-1">
                {solarCalculations.actualInstalledKwp} kWp
              </div>
              <span className="text-[10px] text-stone-400 mt-1 block">
                {solarCalculations.numberOfPanels}x {solarCalculations.panelWattage}W Panels
              </span>
            </div>

            {/* Roof Area */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] uppercase text-stone-400 block">Required Roof Area</span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                ~{solarCalculations.roofAreaSqM} m²
              </div>
              <span className="text-[10px] text-stone-400 mt-1 block">
                Oriented 10-15° N or S
              </span>
            </div>

            {/* Inverter */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] uppercase text-stone-400 block">Inverter Rating</span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                {solarCalculations.inverterSizeKw} kW
              </div>
              <span className="text-[10px] text-stone-400 mt-1 block">
                Pure Sine Wave Hybrid
              </span>
            </div>

            {/* Battery */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] uppercase text-stone-400 block">Battery Storage</span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-1">
                {(solarCalculations.battery5kWhModules * 5.12).toFixed(1)} kWh
              </div>
              <span className="text-[10px] text-stone-400 mt-1 block">
                {solarCalculations.battery5kWhModules}x LiFePO4 Modules
              </span>
            </div>

            {/* Monthly Savings */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] uppercase text-stone-400 block">Monthly KPLC Offset</span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-300 mt-1">
                KES {solarCalculations.monthlySavingsKES.toLocaleString()}
              </div>
              <span className="text-[10px] text-stone-400 mt-1 block">
                KES {solarCalculations.annualSavingsKES.toLocaleString()} / year
              </span>
            </div>

            {/* Payback */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] uppercase text-stone-400 block">Estimated Payback</span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-300 mt-1">
                {solarCalculations.paybackPeriodYears} Years
              </div>
              <span className="text-[10px] text-stone-400 mt-1 block">
                ~{solarCalculations.annualCo2OffsetTons} T CO₂ offset/yr
              </span>
            </div>
          </div>

          {/* Turnkey Accessory Specifications Breakdown Table */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-base sm:text-lg font-heading font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-400" />
                <span>Recommended Accessories & Engineering Specifications</span>
              </h4>
              <span className="text-xs text-stone-400">
                Turnkey Estimate: ~KES {solarCalculations.totalEstimatedTurnkeyKES.toLocaleString()} (Hardware, Civil, BOS & Commissioning)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {solarCalculations.accessories.map((acc, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between hover:border-amber-400/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                        {acc.category}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {acc.estimatedCostKES}
                      </span>
                    </div>

                    <h5 className="text-sm sm:text-base font-bold text-white mb-1.5">
                      {acc.item}
                    </h5>

                    <p className="text-xs text-stone-300 leading-relaxed mb-3">
                      {acc.specification}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Brand: <strong className="text-white">{acc.recommendedBrand}</strong>
                    </span>
                    <span className="text-stone-300 italic text-[10px] max-w-[50%] truncate">
                      {acc.whyNeeded}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Appliance Load Breakdown Inspection for Current Preset */}
          {PRESET_SPACES.find((p) => p.id === selectedPresetId)?.applianceBreakdown && (
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold block">
                Typical Appliance Breakdown for "{PRESET_SPACES.find((p) => p.id === selectedPresetId)?.label}":
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                {PRESET_SPACES.find((p) => p.id === selectedPresetId)?.applianceBreakdown.map((app, i) => (
                  <div key={i} className="flex items-center justify-between bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <span className="text-stone-300 truncate mr-2">{app.name}</span>
                    <span className="text-amber-300 font-mono shrink-0">
                      {app.watts}W × {app.hoursPerDay}h
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-stone-900 to-amber-950/60 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h5 className="text-base font-bold text-white font-heading">
                Ready to Integrate Solar PV Into Your Architectural Plans?
              </h5>
              <p className="text-xs text-stone-300 mt-1 max-w-xl">
                Triarch Ventures integrates concealed solar roof orientation, conduit routing, and battery vaults 
                directly into architectural blueprints prior to foundation casting, preventing costly retrofits.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const summary = `Solar Consultation Request: System Size: ${solarCalculations.actualInstalledKwp} kWp | Daily Use: ${dailyKwhInput} kWh | Battery: ${(solarCalculations.battery5kWhModules * 5.12).toFixed(1)} kWh | Turnkey: KES ${solarCalculations.totalEstimatedTurnkeyKES.toLocaleString()}`;
                if (onOpenConsultation) {
                  onOpenConsultation(summary);
                }
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl shrink-0 cursor-pointer"
            >
              Request Engineering & Solar Blueprint Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
