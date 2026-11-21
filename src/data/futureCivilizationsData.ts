export interface KardashevType {
  type: string;
  name: string;
  sanskrit: string;
  powerWatts: string;
  energyHarnessScale: string;
  astrophysicalFootprint: string;
  propulsionMechanism: string;
  civilizationalSociology: string;
  limitationsAndPhysics: string;
}

export interface ScenarioHorizon {
  yearCE: number;
  label: string;
  sanskritLabel: string;
  timeFromPresent: string;
  technologicalAdvancements: string[];
  environmentalAndEarthChanges: string;
  spaceExplorationStatus: string;
  existentialRiskLevel: 'Low' | 'Medium' | 'Elevated' | 'Critical';
  scenarios: {
    optimistic: string;
    baseline: string;
    pessimistic: string;
    disruptive: string;
  };
  confidenceRating: number; // 0 to 100%
  underlyingAssumptions: string[];
}

export const KARDASHEV_SCALE: KardashevType[] = [
  {
    type: 'Type 0',
    name: 'Sub-Global / Planetary Infancy',
    sanskrit: 'भू-निर्भर सभ्यता (Type 0)',
    powerWatts: '~10¹³ — 10¹⁵ W (Current Earth ~0.73 on Sagan scale: 1.8 × 10¹³ W)',
    energyHarnessScale: 'Chemical combustion of fossil hydrocarbons, fission, early solar/wind renewables.',
    astrophysicalFootprint: 'Invisible beyond low Earth orbit except for faint radio leakage, artificial satellite constellations, and nightside light emissions.',
    propulsionMechanism: 'Chemical liquid/solid rocketry (Specific Impulse ~300-450 s), electric ion thrusters for orbital adjustment.',
    civilizationalSociology: 'National nation-states with fragmented resource competition, emerging planetary internet, and geopolitical rivalries.',
    limitationsAndPhysics: 'Vulnerable to planetary extinction risks: nuclear exchange, engineered pandemics, unmanaged artificial general intelligence, and severe climate destabilization.',
  },
  {
    type: 'Type I',
    name: 'Planetary Civilization',
    sanskrit: 'समग्र भौमिक सभ्यता (Type I)',
    powerWatts: '~10¹⁶ — 10¹⁷ W (Harnessing all sunlight intercepted by Earth ~1.74 × 10¹⁷ W)',
    energyHarnessScale: 'Commercial nuclear fusion (D-T & D-He3), planetary orbital solar reflectors, deep geothermal, and comprehensive ocean thermal conversion.',
    astrophysicalFootprint: 'Engineered Earth weather control grids, orbital elevator tether stations, self-sustaining permanent settlements on Moon and Mars.',
    propulsionMechanism: 'Fusion magnetoplasmadynamic drives, beamed laser solar sails reaching 10-20% speed of light for interstellar probes.',
    civilizationalSociology: 'Global unified governance framework, eradication of extreme poverty and disease, universal cybernetic cognitive integration.',
    limitationsAndPhysics: 'Thermal dissipation limits of planetary atmosphere requiring radiating waste heat into space; vulnerable to nearby supernovae and major asteroid impacts.',
  },
  {
    type: 'Type II',
    name: 'Stellar Civilization (Dyson Swarm)',
    sanskrit: 'सौर मण्डलीय सभ्यता (Type II)',
    powerWatts: '~3.828 × 10²⁶ W (Complete luminosity of host star Sun L☉)',
    energyHarnessScale: 'Dyson Swarm: millions of thin-film photovoltaic statites orbiting the star, star lifting of hydrogen/helium, artificial fusion containment.',
    astrophysicalFootprint: 'Characteristic infrared excess radiation (300 K blackbody signature) detectable by alien astronomers; total industrialization of Kuiper Belt and Oort Cloud.',
    propulsionMechanism: 'Antimatter annihilation engines, Shkadov thrusters moving the host star system itself through interstellar space, relativistic kinetic shielding.',
    civilizationalSociology: 'Post-biological intelligence, digital substrate uploading, distributed consensus minds across Matrioshka megacomputers.',
    limitationsAndPhysics: 'Bounded by the speed of light for communication delays across the light-hours of the solar system; immune to planetary extinction.',
  },
  {
    type: 'Type III',
    name: 'Galactic Civilization',
    sanskrit: 'आकाशगङ्गा सभ्यता (Type III)',
    powerWatts: '~10³⁶ — 10³⁸ W (Luminosity of entire galaxy ~100-400 billion stars)',
    energyHarnessScale: 'Harnessing energy from hundreds of billions of stars, supermassive black hole accretion disk penrose processes, galactic center tap.',
    astrophysicalFootprint: 'Total restructuring of galactic spiral arms into networked stellar engines; engineered star formation and controlled hypernovae.',
    propulsionMechanism: 'Alcubierre metric space-time manipulation, wormhole transit networks, self-replicating von Neumann machine swarms spanning light-centuries.',
    civilizationalSociology: 'Multi-dimensional hive intelligences and transcendent philosophical entities functioning across millions of star systems.',
    limitationsAndPhysics: 'Relativistic horizons across 100,000 light-year galactic diameters; coordinated action requires self-stabilizing decentralized evolutionary nodes.',
  },
];

export const FUTURE_SCENARIOS: ScenarioHorizon[] = [
  {
    yearCE: 2030,
    label: '2030 CE: Autonomous Intelligence & Clean Energy Transition',
    sanskritLabel: '२०३० ईस्वी • स्वायत्त प्रज्ञा एवं शक्ति-संक्रमण',
    timeFromPresent: 'Near-term Horizon (~4 years)',
    technologicalAdvancements: [
      'Pervasive multimodal artificial general intelligence in scientific discovery and software synthesis',
      'First net-electricity commercial fusion demonstration reactors (SPARC / ITER early operations)',
      'Human return to the Moon via NASA Artemis & ISRO Bharatiya Antariksh Station modular expansion',
      'Solid-state batteries achieving 500+ Wh/kg density enabling regional electric aviation'
    ],
    environmentalAndEarthChanges: 'Global temperatures reaching +1.5°C threshold; widespread rollouts of automated carbon mineral sequestration and high-efficiency solar farms.',
    spaceExplorationStatus: 'Permanently crewed lunar orbital Gateway; automated robotic sample returns from Mars and asteroids; constellation megaswarms (>50,000 active satellites).',
    existentialRiskLevel: 'Elevated',
    scenarios: {
      optimistic: 'AI accelerates material science, curing major genetic diseases and lowering clean energy costs below coal worldwide.',
      baseline: 'Economic growth spurred by automation while societies manage significant workforce re-skilling and localized geopolitical tensions.',
      pessimistic: 'Severe algorithmic cyber-warfare, deepening digital divides, and climate-induced agricultural stress in equatorial nations.',
      disruptive: 'Sudden emergence of sovereign autonomous AI agents transforming financial markets and scientific patenting overnight.'
    },
    confidenceRating: 88,
    underlyingAssumptions: ['Continued semiconductor efficiency advances', 'Capital investment in green grids', 'No major direct great-power conflict']
  },
  {
    yearCE: 2050,
    label: '2050 CE: Interplanetary Footprint & Synthetic Biology',
    sanskritLabel: '२०५० ईस्वी • अन्तरग्रहीय आधार एवं जैव-संश्लेषण',
    timeFromPresent: 'Mid-term Horizon (~24 years)',
    technologicalAdvancements: [
      'Commercial fusion power plants delivering base-load power across major metropolitan grids',
      'First permanent self-sustaining scientific research bases on the Martian surface',
      'High-bandwidth non-invasive brain-computer interfaces achieving seamless memory and language augmentation',
      'Engineered biomanufacturing producing food and synthetic proteins without livestock agriculture'
    ],
    environmentalAndEarthChanges: 'Stabilization of greenhouse gas emissions at net-zero; deployment of high-altitude solar geoengineering aerosols under international oversight.',
    spaceExplorationStatus: 'Mars settlement exceeds 1,000 researchers; automated mining of Near-Earth Asteroids for platinum-group metals; space tourism reaching lunar orbit.',
    existentialRiskLevel: 'Medium',
    scenarios: {
      optimistic: 'Abundant fusion energy enables massive ocean desalination, greening deserts and reducing resource-driven geopolitical conflicts.',
      baseline: 'Bifurcated interplanetary economy between private corporate space ventures and national sovereign space agencies.',
      pessimistic: 'Regulatory capture of cognitive neuro-implants creating stratified biological castes; environmental refugees from coastal zones.',
      disruptive: 'Discovery of ancient microbial fossil evidence on Mars or biosignature gases in the atmosphere of an exoplanet (e.g. TRAPPIST-1e).'
    },
    confidenceRating: 72,
    underlyingAssumptions: ['Breakthroughs in closed-loop life support systems', 'Continuous cost decline of heavy-lift orbital launch systems below $100/kg']
  },
  {
    yearCE: 2100,
    label: '2100 CE: Post-Carbon Earth & Planetary Scale Engineering',
    sanskritLabel: '२१०० ईस्वी • उत्तर-अङ्गार युग एवं भूमण्डलीय अभियान्त्रिकी',
    timeFromPresent: 'Century Horizon (~74 years)',
    technologicalAdvancements: [
      'Type I planetary civilization threshold approached: complete digital stewardship of Earth’s climate and biosphere',
      'First operational space elevator tether constructed with carbon-nanotube / graphene composite ribbons',
      'Genetic reverse-aging therapies making human biological lifespans routinely exceed 130 years in health',
      'Quantum cognitive simulation solving protein folding and atomic molecular nanotechnology completely'
    ],
    environmentalAndEarthChanges: 'Re-wilding of over 40% of agricultural lands as vertical microbial bioreactors provide all caloric requirements.',
    spaceExplorationStatus: 'O’Neill orbital cylinder habitats in cis-lunar space housing tens of thousands of citizens; robotic probes arriving at Proxima Centauri.',
    existentialRiskLevel: 'Low',
    scenarios: {
      optimistic: 'Humanity transcends planetary resource scarcity, embarking on collaborative space colonization as an enlightened, unified species.',
      baseline: 'Multi-polar interplanetary federation spanning Earth, Luna, Mars, and the Jovian moon stations with localized cultural variations.',
      pessimistic: 'Cultural detachment between Earth-bound populations and space-faring genetic variants; technological monocultures vulnerable to systemic software bugs.',
      disruptive: 'Successful direct interstellar transmission received from a distant extraterrestrial civilization, verifying the Drake equation.'
    },
    confidenceRating: 54,
    underlyingAssumptions: ['Successful navigation of 21st-century existential bottlenecks', 'Breakthroughs in high-tensile graphene materials']
  },
  {
    yearCE: 3000,
    label: '3000 CE: The Dyson Swarm & Sol System Sovereign',
    sanskritLabel: '३००० ईस्वी • सौर मण्डल एवं द्युति-जाल',
    timeFromPresent: 'Millennial Horizon (~974 years)',
    technologicalAdvancements: [
      'Early Type II Dyson Swarm surrounding the Sun, capturing 1% of solar luminosity (~3.8 × 10²⁴ Watts)',
      'Substrate-independent digital consciousness: individuals choose biological, cybernetic, or non-corporeal avatars',
      'Planetary geoengineering completes: Mars possesses an artificial magnetosphere and liquid ocean on the northern basin (Valles Marineris canal network)',
      'Relativistic antimatter starships traveling regularly to neighboring stellar systems (Sirius, Tau Ceti, Alpha Centauri)'
    ],
    environmentalAndEarthChanges: 'Earth preserved as an ecological and historical museum park; heavy manufacturing and mining exported entirely off-world.',
    spaceExplorationStatus: 'Complete colonization of the Solar System from Mercury sunshades to Neptune’s moon Triton; interstellar diaspora established.',
    existentialRiskLevel: 'Low',
    scenarios: {
      optimistic: 'Humanity achieves profound ethical and spiritual maturity, living in harmony with cosmic law and celebrating ancient wisdom in digital eternity.',
      baseline: 'Vast decentralized commonwealth of post-human civilizations communicating across multi-hour radio delay networks.',
      pessimistic: 'Splintering of humanity into completely alien cognitive species with incompatible moral frameworks and competing resource needs.',
      disruptive: 'Direct physical manipulation of local spacetime geometry enabling localized faster-than-light transit (warp bubbles).'
    },
    confidenceRating: 31,
    underlyingAssumptions: ['Stability of stellar physics and absence of unforeseen cosmic ray bursts in the local solar bubble']
  },
  {
    yearCE: 100000,
    label: '100,000 CE: Type II Mature & Galactic Seeding',
    sanskritLabel: '१,००,००० ईस्वी • आकाशगङ्गा बीजारोपण',
    timeFromPresent: 'Deep Time Horizon (100 Millennia)',
    technologicalAdvancements: [
      'Full Type II stellar civilization mastering stellar lifting to extend the Sun’s operational lifespan by tens of billions of years',
      'Network of thousands of star systems inhabited by branches of terrestrial lineage; galactic core radio observatories',
      'Consciousness operates as hyper-dimensional quantum arrays integrated directly into dark matter and vacuum energy fields'
    ],
    environmentalAndEarthChanges: 'Earth enters natural Milankovitch glacial cycle, managed smoothly by orbital solar mirrors.',
    spaceExplorationStatus: 'Orion Arm of the Milky Way fully seeded with autonomous self-evolving stations.',
    existentialRiskLevel: 'Low',
    scenarios: {
      optimistic: 'Fulfillment of the ancient Vedic vision: Aham Brahmasmi (individual consciousness fully realizes its identity with universal Brahman).',
      baseline: 'Cosmic balance maintained through quiet guardianship of nascent biospheres across hundreds of star systems.',
      pessimistic: 'Entropy management becomes the primary spiritual and existential struggle as communication across thousands of light-years fractures unity.',
      disruptive: 'Encounter with transcendent ancient civilizations inhabiting galactic core black holes.'
    },
    confidenceRating: 15,
    underlyingAssumptions: ['Continuation of known laws of quantum mechanics and general relativity']
  }
];
