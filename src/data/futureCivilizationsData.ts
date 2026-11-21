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
  videoHighlights?: {
    breakthrough: string;
    accelerator: string;
    existentialGate: string;
  };
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

export interface DocumentaryChapter {
  timestamp: string;
  seconds: number;
  title: string;
  tagline: string;
  description: string;
  keyPoints: string[];
}

export const WHAT_IF_TYPE_III_VIDEO = {
  videoId: 'VGLSPU8lprc',
  title: 'What If Earth Became a Type III Civilization?',
  creator: 'What If Science Show',
  url: 'https://youtu.be/VGLSPU8lprc',
  embedUrl: 'https://www.youtube.com/embed/VGLSPU8lprc',
  thumbnailUrl: 'https://i.ytimg.com/vi/VGLSPU8lprc/hqdefault.jpg',
  synopsis: 'From our current baseline of 0.73, humanity must conquer AI-accelerated nuclear fusion and weather engineering to reach Type I, construct Dyson Swarms and solar system thrusters to achieve Type II, and deploy self-replicating Von Neumann probe fleets across the 100,000 light-year Milky Way disc to become a Type III galactic civilization.',
  chapters: [
    {
      timestamp: '00:00',
      seconds: 0,
      title: 'Earth at 0.73: The Kardashev Baseline',
      tagline: 'Bound to One Rock in a Trillion-Planet Universe',
      description: 'Machine learning calculations place modern Earth at approximately 0.726 on the Sagan-Kardashev scale. Current trends suggest reaching only 0.75 by 2060, requiring over 300 years to attain full Type I status unless accelerated by machine intelligence.',
      keyPoints: [
        'Nikolay Kardashev (1964) proposed classifying civilizations by power consumption orders of magnitude.',
        'Humanity currently burns through ~1.8 × 10¹³ Watts, mostly from chemical fossil hydrocarbons.',
        'Despite 6,000+ confirmed exoplanets, zero technosignatures or radio signals have ever been detected.'
      ]
    },
    {
      timestamp: '01:30',
      seconds: 90,
      title: 'Type I: Weather Control & AI-Accelerated Fusion',
      tagline: 'Capturing Every Photon and Calming the Oceans',
      description: 'Reaching Type I requires harnessing ~10¹⁷ W—all solar flux striking the Earth plus global nuclear fusion. Artificial intelligence is already compressing 800 years of scientific research into days to unlock fusion containment and new superconducting crystal lattices.',
      keyPoints: [
        'DeepMind GNoME identified 2.2 million new inorganic crystal structures for next-generation energy storage.',
        'UK Atomic Energy Authority deploys AI supercomputing to predict and suppress tokamak plasma disruptions.',
        'Type I mastery grants total weather stabilization: neutralizing hurricanes, routing rainfall, and tapping geothermal vents.'
      ]
    },
    {
      timestamp: '03:15',
      seconds: 195,
      title: 'The Great Filter: Nuclear Arsenals & AI Alignment',
      tagline: 'Why the Galaxy Appears Hauntingly Silent',
      description: 'Enrico Fermi asked in 1950: "Where is everybody?" The Great Filter hypothesis suggests young civilizations inevitably hit self-destruction bottlenecks: thermonuclear exchange (Cold War peaked at 70,000 warheads, 12,000 remain) or runaway misaligned artificial agents.',
      keyPoints: [
        'Drake Equation (1961) predicts thousands of intelligent species in the Milky Way, yet the sky is silent.',
        'The Great Filter may lie right ahead: nuclear proliferation, catastrophic climate tipping, or unaligned AGI.',
        'Foresight, societal resilience, and built-in ethical guardrails are what allow a species to cross into Type I.'
      ]
    },
    {
      timestamp: '05:40',
      seconds: 340,
      title: 'Type II: Freeman Dyson & Stellar Engines',
      tagline: 'Trapping Starfire and Steering the Sun',
      description: 'First hypothesized by Freeman Dyson in 1960, a Type II species surrounds its star with millions of orbital photovoltaic collectors (Dyson Swarm) or constructs a Shkadov Thruster to physically propel the entire solar system through the galactic disc.',
      keyPoints: [
        'A Dyson Swarm captures the Sun’s entire luminosity of 3.828 × 10²⁶ Watts.',
        'Shkadov Thruster uses asymmetric parabolic mirrors to harness solar radiation pressure, moving our planetary system.',
        'Gigawatt orbital lasers zap incoming comets for freshwater and manipulate asteroid trajectories for raw ores.'
      ]
    },
    {
      timestamp: '08:00',
      seconds: 480,
      title: 'Type III: Von Neumann Fleets & Galactic Minds',
      tagline: 'Seeding 100 Billion Stars and Reaching Andromeda',
      description: 'The Milky Way is 100,000 light-years across. Traversing it requires self-replicating Von Neumann robotic probes that land on distant moons, mine local materials, fabricate replicas, and expand exponentially. Humans transition into post-biological hybrid super-beings.',
      keyPoints: [
        'Von Neumann probe fleets can traverse and colonize an entire 100,000 light-year galaxy in just a few million years.',
        'Humans will not cross the cosmos in fragile carbon-water bodies; consciousness uploads into distributed quantum substrates.',
        'Type III civilizations establish galactic-scale radio grids and launch vanguard expeditions toward the Andromeda Galaxy.'
      ]
    }
  ]
};

export const PBS_SPACETIME_TYPE_I_VIDEO = {
  videoId: 'hRXAbMe_THw',
  title: 'How Can Humanity Become a Kardashev Type 1 Civilization?',
  creator: 'PBS Space Time',
  host: 'Dr. Matt O\'Dowd',
  url: 'https://youtu.be/hRXAbMe_THw',
  embedUrl: 'https://www.youtube.com/embed/hRXAbMe_THw',
  thumbnailUrl: 'https://i.ytimg.com/vi/hRXAbMe_THw/hqdefault.jpg',
  synopsis: 'Astrophysicist Dr. Matt O\'Dowd breaks down the rigorous physics required to reach Kardashev Type I: calculating Earth\'s exact 174-Petawatt solar constant, bypassing the Shockley-Queisser limit with Space-Based Solar Power (SBSP), tapping ocean Deuterium via Tokamak fusion, laying YBCO superconducting global grids, and surviving the existential Thermodynamic Heat Trap.',
  chapters: [
    {
      timestamp: '00:00',
      seconds: 0,
      title: 'The 1964 Kardashev Origin',
      tagline: 'Alien Broadcast Detectability & The Sagan Energy Metric',
      description: 'Soviet astrophysicist Nikolai Kardashev originally formulated his three-tier energy metric in 1964 to calculate how far an alien radio transmission could penetrate cosmic noise before decaying. Carl Sagan modernized it into a smooth logarithmic formula: K = (log10(P) - 6) / 10.',
      keyPoints: [
        'Baseline: Modern humanity commands ~1.8 × 10¹³ W (~0.726 on the Sagan scale).',
        'Type I requires mastering ~10¹⁷ W—all solar flux striking the Earth plus global artificial fusion.',
        'Kardashev\'s metric fundamentally measures a species\' command over thermodynamic degrees of freedom.'
      ]
    },
    {
      timestamp: '04:08',
      seconds: 248,
      title: 'The Solar Constant & 174 Petawatts',
      tagline: 'Earth\'s Projected Cross-Sectional Solar Allowance',
      description: 'Solar irradiance at Earth\'s orbital radius (1 AU) is 1,361 W/m². Intercepted across the circular cross-section of Earth\'s disk (π R⊕² with R⊕ ≈ 6,371 km), our planet continuously absorbs precisely 1.74 × 10¹⁷ Watts (174 Petawatts).',
      keyPoints: [
        'Earth\'s total continuous solar budget is 1.74 × 10¹⁷ W, our celestial energy allowance.',
        'Terrestrial solar is throttled by night cycles, oblique incident angles, cloud cover, and atmospheric scattering.',
        'Even covering huge land areas with silicon panels leaves modern civilizations orders of magnitude short of Type I.'
      ]
    },
    {
      timestamp: '06:09',
      seconds: 369,
      title: 'Shockley-Queisser Limit & Space Solar',
      tagline: 'Bypassing the Silicon Bottleneck via Orbital Microwave Beams',
      description: 'The fundamental Shockley-Queisser limit caps single-junction silicon solar cells at ~33.7% theoretical efficiency. To overcome night and clouds, humanity must deploy Space-Based Solar Power (SBSP) satellites in Geostationary Orbit (GEO).',
      keyPoints: [
        'Single-junction photovoltaic cells lose energy from sub-bandgap photons and thermalization.',
        'Space-based solar satellites in GEO operate in permanent 24/7 sunlight, generating 10x to 20x more energy per unit area.',
        'Power is converted to high-frequency microwaves (2.45 GHz) or infrared lasers and beamed safely to ground-based rectenna grids.'
      ]
    },
    {
      timestamp: '10:14',
      seconds: 614,
      title: 'Artificial Fusion: Building Mini-Suns',
      tagline: 'Tapping Ocean Deuterium via Tokamak Magnetic Confinement',
      description: 'Rather than passively waiting for starlight to fall onto Earth, a Type I civilization manufactures its own mini-suns. Controlled thermonuclear fusion merges hydrogen isotopes into helium, releasing millions of times more energy per gram than chemical combustion.',
      keyPoints: [
        'Deuterium-Tritium reaction: ²H + ³H → ⁴He + n + 17.6 MeV.',
        'Earth\'s oceans contain over 4 × 10¹⁶ kg of Deuterium—enough fuel to supply a full Type I civilization for billions of years.',
        'Tokamak magnetic confinement (ITER, SPARC, UKAEA) isolates 150,000,000°C plasma using superconducting magnetic bottles.'
      ]
    },
    {
      timestamp: '14:20',
      seconds: 860,
      title: 'Superconducting Global Grid & YBCO',
      tagline: 'Zero-Dissipation Continental Power Transmission',
      description: 'Tapping Petawatts of energy requires an infrastructure that will not melt under extreme current densities. High-temperature superconductors like YBCO (Yttrium Barium Copper Oxide) cooled with liquid nitrogen transmit terawatts without electrical resistance.',
      keyPoints: [
        'Conventional copper/aluminum cables suffer I²R resistive heating and huge losses over thousands of miles.',
        'Underground YBCO superconducting cables achieve zero resistance, allowing frictionless transmission of fusion and solar power globally.',
        'A globally interconnected smart grid balances diurnal load spikes across daylight and nighttime hemispheres.'
      ]
    },
    {
      timestamp: '16:20',
      seconds: 980,
      title: 'Atmospheric Mastery & The Heat Trap Paradox',
      tagline: 'Weather Engineering & The Thermodynamic Boundary',
      description: 'Commanding 10¹⁷ W gives humanity the exact energetic muscle of Earth\'s atmosphere and oceans: neutralizing hurricanes, routing rain, and preventing ice ages. But the Second Law of Thermodynamics creates the ultimate bottleneck: the Heat Trap.',
      keyPoints: [
        'Energetic parity: category 5 hurricanes release ~10¹⁴ W; a Type I civilization can easily tame atmospheric storms.',
        'The Heat Trap: All energy consumed eventually dissipates as heat. Releasing 10¹⁷ W on Earth raises surface temperatures catastrophically unless radiated into space.',
        'To survive Type I, humanity must deploy orbital solar deflectors or gigantic space-based infrared radiative cooling arrays.'
      ]
    }
  ]
};

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
    limitationsAndPhysics: 'Vulnerable to planetary extinction risks: nuclear exchange (12,000+ warheads still active), unmanaged runaway AI, and climate tipping points.',
    videoHighlights: {
      breakthrough: 'Early artificial intelligence models (LLMs, neural networks) and foundational fission.',
      accelerator: 'Transition from fossil fuels to orbital solar, AI-guided material discovery, and high-density batteries.',
      existentialGate: 'The Great Filter bottleneck: surviving mutually assured destruction and algorithmic misalignment.'
    }
  },
  {
    type: 'Type I',
    name: 'Planetary Civilization',
    sanskrit: 'समग्र भौमिक सभ्यता (Type I)',
    powerWatts: '~10¹⁶ — 10¹⁷ W (Harnessing all sunlight intercepted by Earth ~1.74 × 10¹⁷ W)',
    energyHarnessScale: 'AI-accelerated commercial nuclear fusion (DeepMind crystal discovery & UKAEA tokamak modeling), orbital solar collector arrays, and deep geothermal taps.',
    astrophysicalFootprint: 'Engineered Earth weather control grids (hurricanes deflected, rainfall steered), orbital elevator tether stations, self-sustaining permanent bases on Moon and Mars.',
    propulsionMechanism: 'Fusion magnetoplasmadynamic drives, beamed laser solar sails reaching 10-20% speed of light for interstellar scouting probes.',
    civilizationalSociology: 'Global unified governance framework, eradication of extreme poverty and disease, universal cybernetic cognitive integration.',
    limitationsAndPhysics: 'Thermal dissipation limits of planetary atmosphere requiring radiating waste heat into space; vulnerable to nearby supernovae and major asteroid impacts.',
    videoHighlights: {
      breakthrough: 'Complete planetary climate & weather control; tapping volcanic, tectonic, and solar atmospheric energy.',
      accelerator: 'Autonomous AI supercomputing discovering millions of inorganic crystal lattices (equivalent to 800 years of lab work).',
      existentialGate: 'Atmospheric thermodynamic heat traps; planetary defense against Earth-crossing bolides.'
    }
  },
  {
    type: 'Type II',
    name: 'Stellar Civilization (Dyson Swarm)',
    sanskrit: 'सौर मण्डलीय सभ्यता (Type II)',
    powerWatts: '~3.828 × 10²⁶ W (Complete luminosity of host star Sun L☉)',
    energyHarnessScale: 'Freeman Dyson (1960) Swarm: billions of thin-film photovoltaic statites orbiting the Sun, star lifting of solar hydrogen, and artificial fusion containment.',
    astrophysicalFootprint: 'Characteristic infrared excess radiation (300 K blackbody signature) detectable across exoplanet surveys; Shkadov Thrusters moving the Sun through space.',
    propulsionMechanism: 'Antimatter annihilation engines, stellar engines moving the host star system itself through interstellar space, gigawatt laser arrays zapping comets for water.',
    civilizationalSociology: 'Post-biological intelligence, digital substrate uploading, distributed consensus minds across Matrioshka megacomputers.',
    limitationsAndPhysics: 'Bounded by the speed of light for communication delays across the light-hours of the solar system; immune to planetary extinction.',
    videoHighlights: {
      breakthrough: 'Dyson Swarm megastructures and Shkadov Thruster star engines physically steering the solar system.',
      accelerator: 'Automated swarm fabrication utilizing raw material stripped from Mercury and Kuiper Belt asteroids.',
      existentialGate: 'Stellar evolution management (preventing red giant expansion in deep cosmological time).'
    }
  },
  {
    type: 'Type III',
    name: 'Galactic Civilization',
    sanskrit: 'आकाशगङ्गा सभ्यता (Type III)',
    powerWatts: '~10³⁶ — 10³⁸ W (Luminosity of entire galaxy ~100-400 billion stars)',
    energyHarnessScale: 'Harnessing energy from hundreds of billions of stars, supermassive black hole accretion disk Penrose processes, galactic center tap.',
    astrophysicalFootprint: 'Total restructuring of galactic spiral arms into networked stellar engines; engineered star formation and controlled hypernovae; expansion toward Andromeda Galaxy.',
    propulsionMechanism: 'Self-replicating Von Neumann robotic probe fleets spanning the 100,000 light-year galactic disc, Alcubierre metric spacetime warp bubbles, wormhole transits.',
    civilizationalSociology: 'Post-biological hybrid of artificial and natural intelligence: deeply interconnected galactic internet super-beings transcending single planetary bodies.',
    limitationsAndPhysics: 'Relativistic horizons across 100,000 light-year galactic diameters; coordinated action requires self-stabilizing decentralized evolutionary nodes.',
    videoHighlights: {
      breakthrough: 'Self-replicating Von Neumann machine swarms exponentially seeding all 100 billion star systems.',
      accelerator: 'Transcending organic carbon biology; consciousness becomes light and quantum lattice fabric.',
      existentialGate: 'Intergalactic transit hurdles (crossing 2.5 million light-years to the Andromeda Galaxy).'
    }
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
