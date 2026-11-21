// Space Objects and Celestial Infrastructure Database for 3D Cosmos & Kardashev Simulation
// Contains detailed specifications for Stars, Satellites, Megastructures, Habitats, Thrusters, and Cosmic Anomalies

export type KardashevType = 0.73 | 1.0 | 2.0 | 3.0 | 4.0 | 5.0 | 7.0 | 9.0 | 'satya';

export interface SatelliteNode {
  id: string;
  name: string;
  sanskritName: string;
  type: KardashevType;
  role: string;
  category: 'star' | 'satellite' | 'megastructure' | 'habitat' | 'station' | 'planet' | 'anomaly';
  pos: [number, number, number];
  color: number;
  size: number;
  specs: {
    orbit: string;
    power: string;
    propulsion: string;
    dimensions: string;
  };
  earthChanges: {
    title: string;
    climate: string;
    energy: string;
    civilization: string;
  };
  spaceOutcomes: {
    exoplanets: string;
    rockets: string;
    colonization: string;
  };
  scienceDetails: {
    physicsEquations: string[];
    chemistryReactions: string[];
    biologyEvolution: string[];
  };
  dimensionalTopology: {
    dimensionsCount: number;
    description: string;
    metricEquation: string;
  };
  transitionRequirements: {
    energyThreshold: string;
    milestones: string[];
    nextStage: string;
  };
  colonizationSocialization?: {
    population: string;
    governance: string;
    cultureSocial: string;
    offworldStatus: string;
  };
  dysonPerWattMetrics?: {
    wattsConsumed: string;
    dysonPercentage: string;
    wattsPerCapita: string;
    energySource: string;
  };
  fluidMechanics?: {
    atmosphericFlow: string;
    plasmaDynamics: string;
    oceanicTerraforming: string;
  };
  vedicPhilosophy: {
    source: string;
    verse: string;
    translation: string;
    meaning: string;
  };
}

// =========================================================================
// MATHEMATICAL EQUATION FORMATTER (LATEX -> CLEAN READABLE UNICODE MATH)
// Eliminates raw unparsed LaTeX codes like \text{}, \frac{}{}, \approx, \odot
// =========================================================================
export function formatMathEquation(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1) / ($2)')
    .replace(/\\to\b/g, '➔')
    .replace(/\\implies\b/g, ' ⟹ ')
    .replace(/_\\odot/g, '☉')
    .replace(/_\\oplus/g, '⊕')
    .replace(/\\quad/g, '   ')
    .replace(/\\approx/g, '≈')
    .replace(/\\times/g, '×')
    .replace(/\\le/g, '≤')
    .replace(/\\ge/g, '≥')
    .replace(/\\ne/g, '≠')
    .replace(/\\pm/g, '±')
    .replace(/\\mp/g, '∓')
    .replace(/\\cdot/g, '·')
    .replace(/\\circ/g, '°')
    .replace(/\\infty/g, '∞')
    .replace(/\\partial/g, '∂')
    .replace(/\\nabla/g, '∇')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\\sqrt/g, '√')
    .replace(/\\odot/g, '☉')
    .replace(/\\oplus/g, '⊕')
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\gamma/g, 'γ')
    .replace(/\\delta/g, 'δ')
    .replace(/\\epsilon/g, 'ε')
    .replace(/\\theta/g, 'θ')
    .replace(/\\lambda/g, 'λ')
    .replace(/\\mu/g, 'μ')
    .replace(/\\nu_e/g, 'νₑ')
    .replace(/\\nu/g, 'ν')
    .replace(/\\pi/g, 'π')
    .replace(/\\rho/g, 'ρ')
    .replace(/\\sigma/g, 'σ')
    .replace(/\\tau/g, 'τ')
    .replace(/\\phi/g, 'φ')
    .replace(/\\chi/g, 'χ')
    .replace(/\\psi/g, 'ψ')
    .replace(/\\omega/g, 'ω')
    .replace(/\\Lambda/g, 'Λ')
    .replace(/\\Omega/g, 'Ω')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\Sigma/g, 'Σ')
    .replace(/\\hbar/g, 'ℏ')
    .replace(/\^1/g, '¹')
    .replace(/\^2\b/g, '²')
    .replace(/\^3\b/g, '³')
    .replace(/\^4\b/g, '⁴')
    .replace(/\^5\b/g, '⁵')
    .replace(/\^6\b/g, '⁶')
    .replace(/\^7\b/g, '⁷')
    .replace(/\^8\b/g, '⁸')
    .replace(/\^9\b/g, '⁹')
    .replace(/\^0\b/g, '⁰')
    .replace(/\^\{26\}/g, '²⁶')
    .replace(/\^\{36\}/g, '³⁶')
    .replace(/\^\{38\}/g, '³⁸')
    .replace(/\^\{48\}/g, '⁴⁸')
    .replace(/\^\{52\}/g, '⁵²')
    .replace(/\^\{100\}/g, '¹⁰⁰')
    .replace(/\^\{([^}]+)\}/g, '^($1)')
    .replace(/\^\+/g, '⁺')
    .replace(/\^-/g, '⁻')
    .replace(/_0\b/g, '₀')
    .replace(/_1\b/g, '₁')
    .replace(/_2\b/g, '₂')
    .replace(/_3\b/g, '₃')
    .replace(/_4\b/g, '₄')
    .replace(/_5\b/g, '₅')
    .replace(/_\{([^}]+)\}/g, '[$1]')
    .replace(/\\xrightarrow\{([^}]+)\}/g, ' ──[$1]──> ')
    .replace(/\\rightarrow/g, ' ➔ ')
    .replace(/\\qquad/g, '     ')
    .replace(/\\,/g, ' ')
    .replace(/\\left\(/g, '(')
    .replace(/\\right\)/g, ')')
    .replace(/\\left\[/g, '[')
    .replace(/\\right\]/g, ']')
    .replace(/\\/g, '')
    .trim();
}

export const STAGE_DETAILS: Record<string, { title: string; sanskritTitle: string; power: string; desc: string; color: string }> = {
  '0.73': {
    title: 'Type 0.73: Anthropocene Planetary Infancy',
    sanskritTitle: 'भूमण्डल संक्रान्ति काल (०.७३)',
    power: '2.0 × 10¹³ W',
    desc: 'Current human civilization. Sub-planetary energy extraction from fossil fuels, emerging nuclear and renewables. Planetary satellite megaconstellations and preliminary lunar/Mars missions.',
    color: '#80B9E8'
  },
  '1': {
    title: 'Type I: Planetary Energy & Climate Mastery',
    sanskritTitle: 'कार्दाशेव स्तर १: भूमण्डलीय पूर्ण प्रभुत्व',
    power: '1.74 × 10¹⁷ W',
    desc: 'Complete mastery of all energy reaching Earth from the Sun. Planetary geoengineering, climate control rings, fusion-powered orbital relays, and permanent colonies on Moon and Mars.',
    color: '#86a86c'
  },
  '2': {
    title: 'Type II: Sol Dyson Swarm & Stellar Engineering',
    sanskritTitle: 'कार्दाशेव स्तर २: सौर डायसन झुण्ड एवं तारा-शक्ति',
    power: '3.828 × 10²⁶ W',
    desc: 'Capturing the full radiant output of the Sun with millions of orbital collectors. Stellar lifting hydrogen extraction, Shkadov thrusters moving the solar system, and Matrioshka megacomputers.',
    color: '#e8913a'
  },
  '3': {
    title: 'Type III: Galactic Scale & Penrose Extraction',
    sanskritTitle: 'कार्दाशेव स्तर ३: आकाशगङ्गा साम्राज्य',
    power: '1.0 × 10³⁶ W',
    desc: 'Harnessing the output of 400 billion stars across the Milky Way. Rotational energy extraction from Sagittarius A* black hole ergosphere, Alcubierre warp highways, and inter-arm relay stations.',
    color: '#9d93c9'
  },
  '4': {
    title: 'Type IV: Universal Spacetime Engineering',
    sanskritTitle: 'कार्दाशेव स्तर ४: विश्वव्यापी दिक्-काल जालक',
    power: '1.0 × 10⁴⁸ W',
    desc: 'Civilization commands the large-scale cosmic web structure of dark matter and galaxy filaments. Tuning dark energy to stabilize universal expansion against heat death.',
    color: '#f2c47a'
  },
  '5': {
    title: 'Type V: 5D Kaluza-Klein & Braneworld Bulk',
    sanskritTitle: 'कार्दाशेव स्तर ५: पञ्चमात्रिक महा-सभ्यता',
    power: '1.0 × 10⁵² W & Bulk Access',
    desc: 'Navigating the 5th spatial dimension through Randall-Sundrum AdS₅ warped braneworlds. Bypassing 4D luminal constraints by traveling through bulk geodesics, drawing zero-point energy.',
    color: '#c084fc'
  },
  '7': {
    title: 'Type VII: 11D M-Theory & Mahat-Tattva',
    sanskritTitle: 'कार्दाशेव स्तर ७: विदेह महत्तत्त्व चेतना',
    power: 'Planck Energy ~1.22 × 10¹⁹ GeV',
    desc: 'Civilization sheds matter and mechanical substrates entirely. Consciousness is directly embedded into the quantum geometry of spacetime across 11-dimensional M-theory branes.',
    color: '#6fb0b2'
  },
  '9': {
    title: 'Type IX: The Final Observer, Mahāpralaya & Vishnu',
    sanskritTitle: 'अन्तिम द्रष्टा: श्रीविष्णु योगनिद्रा एवं महाप्रलय',
    power: 'Informational Omniscience (~10¹⁰⁰ CE)',
    desc: 'At the thermodynamic limit of cosmic time (~10¹⁰⁰ CE), the ultimate intelligence simulates all possible histories. Space folds into the primordial causal ocean; Sri Vishnu rests in Yoganidra upon Ananta Shesha.',
    color: '#e8913a'
  },
  'satya': {
    title: 'The Rebirth of Satya Yuga & The Eternal Wheel',
    sanskritTitle: 'सत्य युग पुनरागमन: सुवर्ण प्रभात एवं हिरण्यगर्भ',
    power: 'Cosmic Renewal & Pure Dharma',
    desc: 'From Sri Vishnu’s navel blooms the golden lotus of Brahmā (Hiraṇyagarbha). The Big Bang of the new cosmic morning unfolds: Satya Yuga begins anew with Dharma on all four pillars.',
    color: '#fde047'
  }
};

export const SATELLITE_DATABASE: Record<string, SatelliteNode[]> = {
  // -------------------------------------------------------------
  // STAGE 0.73: ANTHROPOCENE EARTH & EARLY SPACE AGE
  // -------------------------------------------------------------
  '0.73': [
    {
      id: 'earth-073',
      name: 'Planet Earth (Anthropocene)',
      sanskritName: 'भूमण्डल (मानव युग)',
      type: 0.73,
      role: 'Cradle of Human Civilization & Planetary Biosphere',
      category: 'planet',
      pos: [0, 0, 0],
      color: 0x2288ff,
      size: 6.2,
      specs: {
        orbit: '1.0 AU around Sol (365.25 days)',
        power: '2.0 × 10¹³ W (Global Consumption)',
        propulsion: 'Gravitational orbital mechanics',
        dimensions: '12,742 km equatorial diameter'
      },
      earthChanges: {
        title: 'Threshold of Planetary Transformation',
        climate: 'Anthropogenic CO₂ accumulation reaches 425 ppm, driving 1.5°C warming and prompting international carbon capture efforts.',
        energy: 'Fossil fuels supply 78% of global energy; nuclear fission and renewables rapidly expand toward commercial fusion prototypes.',
        civilization: 'Eight billion humans interconnected by fiber-optic and low-Earth orbit satellite constellations.'
      },
      spaceOutcomes: {
        exoplanets: 'Over 5,500 exoplanets cataloged via Kepler, TESS, and ground observatories; preliminary detection of water vapor in sub-Neptune atmospheres.',
        rockets: 'Matured methane-fueled super-heavy lift vehicles achieving partial reusability, reducing payload costs to ~$1,500/kg to LEO.',
        colonization: 'Robotic exploration rovers operating on Mars; crewed lunar orbit and landing missions underway via Artemis.'
      },
      scienceDetails: {
        physicsEquations: [
          'G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu} \\quad (\\text{Einstein Field Equations})',
          'E = m c^2, \\quad i\\hbar \\frac{\\partial\\psi}{\\partial t} = \\hat{H}\\psi \\quad (\\text{Quantum Wave Mechanics})'
        ],
        chemistryReactions: [
          '^2\\text{H} + ^3\\text{H} \\to ^4\\text{He} (3.5\\text{ MeV}) + n (14.1\\text{ MeV}) \\quad (\\text{Thermonuclear Fusion})',
          '\\text{C}_n\\text{H}_{2n+2} + \\left(n + \\frac{n+1}{2}\\right)\\text{O}_2 \\to n\\text{CO}_2 + (n+1)\\text{H}_2\\text{O}'
        ],
        biologyEvolution: [
          'Direct genomic intervention via CRISPR-Cas9 targeted endonuclease gene editing',
          'Synthetic biology and mRNA vaccines reprogram human cellular immunity'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Classical 4-Dimensional Lorentzian spacetime manifold with curvature induced by planetary mass.',
        metricEquation: 'ds^2 = -\\left(1 - \\frac{2GM_\\oplus}{c^2 r}\\right) c^2 dt^2 + \\left(1 - \\frac{2GM_\\oplus}{c^2 r}\\right)^{-1} dr^2 + r^2 d\\Omega^2'
      },
      transitionRequirements: {
        energyThreshold: '2.0 × 10¹³ W baseline consumption.',
        milestones: [
          'Commercial net-gain thermonuclear fusion electricity grids',
          '100% reusable orbital heavy-lift launch infrastructure',
          'Reversal of net atmospheric carbon accumulation'
        ],
        nextStage: 'Achieve complete planetary climate geoengineering to reach Type I.'
      },
            colonizationSocialization: {
        population: '8.2 Billion human beings on Earth; 7 humans continuously in orbit (ISS/Tiangong); 0 permanent off-world colonies.',
        governance: 'Fragmented nation-states, United Nations Outer Space Treaty framework, rise of private aerospace conglomerates.',
        cultureSocial: 'Global digital internet, social media networks, linguistic diversity, early planetary environmental consciousness.',
        offworldStatus: 'Lunar Artemis landings planned; robotic rovers on Mars (Perseverance, Curiosity); lunar orbiter stations.'
      },
      dysonPerWattMetrics: {
        wattsConsumed: '2.0 × 10¹³ W (20 Terawatts total planetary consumption)',
        dysonPercentage: '0.0000000000052% of Sol Dyson Swarm capacity (Type 0.73 on Sagan-Kardashev scale)',
        wattsPerCapita: '2,440 Watts per human citizen',
        energySource: '82% Fossil Hydrocarbons, 10% Nuclear Fission, 8% Solar/Hydro/Wind'
      },
      fluidMechanics: {
        atmosphericFlow: 'Baroclinic troposphere instability, Hadley & Ferrel circulation cells, anthropogenic CO₂ greenhouse trapping (425 ppm).',
        plasmaDynamics: 'Geomagnetic dipolar magnetosphere deflecting 400 km/s solar wind protons; Van Allen radiation belts.',
        oceanicTerraforming: 'Thermohaline conveyor belt circulation (AMOC); ocean acidification from dissolved atmospheric carbonic acid.'
      },
      vedicPhilosophy: {
        source: 'Atharva Veda (Bhūmi Sūkta 12.1.1)',
        verse: 'सत्यं बृहद् ऋतं उग्रं दीक्षा तपो ब्रह्म यज्ञः पृथिवीं धारयन्ति।',
        translation: 'Truth, eternal cosmic order (Ṛta), spiritual consecration, penance, prayer, and sacrifice sustain the Earth.',
        meaning: 'The Earth is not dead matter to be exploited, but Bhūdevī—a living ecological and spiritual organism requiring ethical stewardship.'
      }
    },
    {
      id: 'iss-073',
      name: 'International Space Station (ISS)',
      sanskritName: 'अन्तरिक्ष स्थानक (आई.एस.एस.)',
      type: 0.73,
      role: 'Continuous Human Habitancy in Microgravity (408 km LEO)',
      category: 'station',
      pos: [7.5, 1.2, -2],
      color: 0xe8913a,
      size: 1.0,
      specs: {
        orbit: '408 km Low Earth Orbit, 51.6° inclination (92.9 min period)',
        power: '120 kW from 8 double-sided solar array wings',
        propulsion: 'Zvezda module thrusters and visiting vehicle reboosts',
        dimensions: '109 m truss length × 73 m width, 450,000 kg mass'
      },
      earthChanges: {
        title: 'Microgravity Science & Global Cooperation',
        climate: 'Monitors Earth greenhouse gases, ocean currents, and cosmic dust from vantage 400 km above.',
        energy: 'Pioneered bifacial high-efficiency silicon photovoltaic arrays and lithium-ion space batteries.',
        civilization: 'Continuous peaceful human cohabitation in space since November 2000 across 20+ nations.'
      },
      spaceOutcomes: {
        exoplanets: 'Calibrates space-borne Earth observation and solar radiation sensors.',
        rockets: 'Served by Soyuz, Progress, Dragon, Cygnus, and Starliner cargo and crew capsules.',
        colonization: 'Ground zero for studying long-duration spaceflight effects on human bone density and telomeres.'
      },
      scienceDetails: {
        physicsEquations: [
          'v_{\\text{orbit}} = \\sqrt{\\frac{GM_\\oplus}{r}} \\approx 7.66\\text{ km/s}',
          'a_{\\text{centripetal}} = \\frac{v^2}{r} = g(r) \\approx 8.7\\text{ m/s}^2 \\quad (\\text{Continuous Free-fall})'
        ],
        chemistryReactions: [
          '2\\text{H}_2\\text{O} \\xrightarrow{\\text{Electrolysis}} 2\\text{H}_2 + \\text{O}_2 \\quad (\\text{Oxygen Generation System})',
          '\\text{CO}_2 + 4\\text{H}_2 \\xrightarrow{\\text{Sabatier Catalyst}} \\text{CH}_4 + 2\\text{H}_2\\text{O} \\quad (\\text{Water Reclamation})'
        ],
        biologyEvolution: [
          'Bone mineral density loss of 1-1.5% per month counteracted with heavy resistive exercise',
          'Epigenetic microgravity adaptations observed in NASA Twin Study'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Geodesic circular orbit in Earth\'s near-field Schwarzschild metric.',
        metricEquation: 'r = R_\\oplus + 408\\text{ km}, \\quad \\Delta \\tau = \\Delta t \\sqrt{1 - \\frac{3GM_\\oplus}{c^2 r}}'
      },
      transitionRequirements: {
        energyThreshold: '120 kW continuous orbital power.',
        milestones: ['Closed-loop 98% life-support water and oxygen recycling', 'On-orbit 3D bioprinting of human tissue'],
        nextStage: 'Transition to commercial modular orbital stations and lunar surface bases.'
      },
            colonizationSocialization: {
        population: '6 to 10 international astronauts and cosmonauts in continuous rotational occupancy.',
        governance: 'Multi-national cooperative treaty (NASA, ESA, JAXA, Roscosmos, CSA).',
        cultureSocial: 'Scientific research micro-society, space medicine, hydroponic plant cultivation.',
        offworldStatus: 'Low Earth Orbit (LEO) orbital laboratory, proving ground for long-duration deep space exploration.'
      },
      dysonPerWattMetrics: {
        wattsConsumed: '120 kW electrical output',
        dysonPercentage: '3.13 × 10⁻²² % of Dyson capacity',
        wattsPerCapita: '17,140 Watts per astronaut',
        energySource: 'Double-sided silicon solar cell arrays (2,400 m² surface area)'
      },
      fluidMechanics: {
        atmosphericFlow: 'Pressurized shirtsleeve environment (78% N₂, 21% O₂ at 101.3 kPa); trace atmospheric drag at 408 km.',
        plasmaDynamics: 'Spacecraft surface charging from ambient F-region ionospheric plasma (O⁺ ions).',
        oceanicTerraforming: 'Closed-loop Environmental Control and Life Support System (ECLSS) recycling 93% of human water.'
      },
      vedicPhilosophy: {
        source: 'Ṛgveda 10.190.1',
        verse: 'ऋतं च सत्यं चाभीद्धात्तपसोऽध्यजायत । ततो रात्र्यजायत ततः समुद्रो अर्णवः ॥',
        translation: 'From blazing cosmic fervor (Tapas) arose eternal cosmic order (Ṛta) and Truth; thence arose the starry night and the billowing cosmic ocean.',
        meaning: 'Human space habitats are modern embodiments of Tapas—disciplined intellectual effort creating order within the vast cosmic expanse.'
      }
    },
    {
      id: 'jwst-073',
      name: 'James Webb Space Telescope (JWST)',
      sanskritName: 'दूरदृष्टि यन्त्र (द्वितीय लाग्रान्ज बिन्दु)',
      type: 0.73,
      role: 'Infrared Cosmic Dawn & Exoplanet Atmospheric Spectroscopy',
      category: 'satellite',
      pos: [14, 2, -4],
      color: 0xf2c47a,
      size: 1.2,
      specs: {
        orbit: 'Halo orbit at Sun-Earth L2 (1.5 million km from Earth)',
        power: '2 kW Gallium Arsenide Solar Array',
        propulsion: 'Hydrazine micro-thrusters for station keeping',
        dimensions: '20.2m × 14.2m Kapton sunshield, 6.5m beryllium primary mirror'
      },
      earthChanges: {
        title: 'Deep Cosmological Perception',
        climate: 'Observes space weather and cosmic ray intensity outside Earth magnetosphere.',
        energy: 'Ultra-low temperature passive radiative cooling (T < 50 K) with cryocooler at 6.7 K.',
        civilization: 'Revolutionizes cosmology, observing galaxies formed 300 million years after the Big Bang.'
      },
      spaceOutcomes: {
        exoplanets: 'Direct atmospheric transmission spectroscopy detecting CO₂, methane, and water on TRAPPIST-1 worlds.',
        rockets: 'Delivered to L2 by Ariane 5 with precision insertion saving years of station-keeping fuel.',
        colonization: 'Pioneers deep space autonomous observatory architecture.'
      },
      scienceDetails: {
        physicsEquations: [
          '\\lambda_{\\text{peak}} = \\frac{b}{T} \\quad (\\text{Wien Displacement Law for 50 K Sunshield})',
          'z = \\frac{\\lambda_{\\text{obs}} - \\lambda_{\\text{emit}}}{\\lambda_{\\text{emit}}} \\approx 13.2 \\quad (\\text{Cosmic Redshift})'
        ],
        chemistryReactions: [
          '\\text{Spectroscopic Signatures: } \\text{H}_2\\text{O} (1.4\\ \\mu\\text{m}), \\text{CH}_4 (2.3\\ \\mu\\text{m}), \\text{CO}_2 (4.3\\ \\mu\\text{m})'
        ],
        biologyEvolution: [
          'Search for atmospheric biosignatures (methane-ozone disequilibrium) indicating alien metabolic life'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Stable Lagrangian equilibrium potential well in the Sun-Earth restricted three-body problem.',
        metricEquation: '\\Phi_{\\text{eff}}(r) = -\\frac{GM_\\odot}{r_1} - \\frac{GM_\\oplus}{r_2} - \\frac{1}{2}\\omega^2 r^2'
      },
      transitionRequirements: {
        energyThreshold: '2 kW continuous solar collection.',
        milestones: ['Unfolding 18 hexagonal gold-plated beryllium mirror segments in deep space'],
        nextStage: 'Build 20-meter next-generation optical LUVOIR/Habitable Worlds observatories.'
      },
      vedicPhilosophy: {
        source: 'Chāndogya Upaniṣad 3.14.1',
        verse: 'सर्वं खल्विदं ब्रह्म तज्जलानिति शान्त उपासीत।',
        translation: 'All this universe is verily Brahman; in quietude let a person meditate upon Him as the beginning, end, and life of all.',
        meaning: 'Peering into the cosmic dawn, we witness the physical unfoldment of that very cosmic matrix described by the Vedic sages.'
      }
    },
    {
      id: 'navic-073',
      name: 'NavIC & GPS Orbital Constellation',
      sanskritName: 'दिक्-सूचक उपग्रह समूह',
      type: 0.73,
      role: 'Global Positioning, Relativistic Time Synchronization & Civil Navigation',
      category: 'satellite',
      pos: [-9.5, 3.5, 4],
      color: 0x6fb0b2,
      size: 0.9,
      specs: {
        orbit: '20,200 km Medium Earth Orbit (MEO) & Geostationary/GSO for NavIC',
        power: '1.5 - 3.0 kW per satellite',
        propulsion: 'Hydrazine and Xenon ion electric propulsion',
        dimensions: '2.5 m bus with 18 m solar wings'
      },
      earthChanges: {
        title: 'Precision Spacetime Coordination',
        climate: 'Atmospheric radio occultation sounding yields real-time global weather forecasting and tropospheric moisture maps.',
        energy: 'Synchronizes global electrical power grids and inter-bank financial transactions to the nanosecond.',
        civilization: 'Enables autonomous agriculture, aviation, marine navigation, and smartphone geolocation.'
      },
      spaceOutcomes: {
        exoplanets: 'Provides fundamental solar system ephemeris timing benchmarks.',
        rockets: 'Autonomous flight termination and precision rocket landing guidance on autonomous drone ships.',
        colonization: 'Blueprint for future Mars and Lunar Positioning Systems.'
      },
      scienceDetails: {
        physicsEquations: [
          '\\Delta t_{\\text{rel}} = \\Delta t \\left( \\frac{GM_\\oplus}{c^2 R_\\oplus} - \\frac{GM_\\oplus}{c^2 r} - \\frac{v^2}{2c^2} \\right) \\approx +38.6\\ \\mu\\text{s/day}',
          'c = 299,792,458\\text{ m/s} \\quad (\\text{Atomic Rubidium/Cesium Clock Clock Drift: } < 10^{-14})'
        ],
        chemistryReactions: [
          '\\text{Rubidium Atomic Vapor Clock Transition: } ^{87}\\text{Rb}: 5^2S_{1/2} (F=1 \\to F=2) \\approx 6.834\\text{ GHz}'
        ],
        biologyEvolution: [
          'Human sensory extension: biological navigation superseded by synthetic orbital satellite omniscience'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Gravitational and kinematic time dilation balance in Schwarzschild spacetime.',
        metricEquation: 'd\\tau = dt \\sqrt{1 - \\frac{2GM_\\oplus}{c^2 r} - \\frac{v^2}{c^2}}'
      },
      transitionRequirements: {
        energyThreshold: '3.0 kW per satellite node.',
        milestones: ['Rubidium atomic clock frequency stabilization under severe space radiation'],
        nextStage: 'Deploy cislunar and interplanetary quantum timing beacons.'
      },
      vedicPhilosophy: {
        source: 'Sūrya Siddhānta 1.10',
        verse: 'लोकानामन्तकृत्कालः कालोऽन्यः कलनात्मकः। स द्विधा स्थूलसूक्ष्मत्वान्मूर्त्तश्चामूर्त्त उच्यते॥',
        translation: 'Time is the destroyer of worlds, and another Time is the measurer. That measurer is twofold: gross (visible) and subtle (unmanifest).',
        meaning: 'Modern GPS relativistic time dilation confirms the ancient astronomer\'s insight that Time is dynamic, measurable, and interwoven with the fabric of space.'
      }
    },
    {
      id: 'gateway-073',
      name: 'Lunar Gateway & Artemis Base',
      sanskritName: 'चन्द्र द्वार सेतु एवं सोम नगर',
      type: 0.73,
      role: 'Cislunar Deep Space Gateway & Polar Water-Ice Extraction',
      category: 'habitat',
      pos: [18, -4, 8],
      color: 0xefe6d6,
      size: 1.1,
      specs: {
        orbit: 'Near-Rectilinear Halo Orbit (NRHO) around Moon (7-day period)',
        power: '60 kW High-Power Solar Electric Propulsion (PPE)',
        propulsion: 'Hall-effect xenon ion thrusters',
        dimensions: 'HALO habitat module, 40,000 kg total architecture'
      },
      earthChanges: {
        title: 'The Interplanetary Springboard',
        climate: 'Zero Earth environmental impact; tests deep space radiation shielding for long interplanetary voyages.',
        energy: 'Pioneers Kilopower space nuclear fission reactors and 50 kW class solar electric propulsion.',
        civilization: 'First permanent multi-national human presence beyond low Earth orbit.'
      },
      spaceOutcomes: {
        exoplanets: 'Staging platform for future far-side lunar low-frequency radio interferometers detecting ancient cosmic dawn signals.',
        rockets: 'Commercial landers (Starship HLS, Blue Origin National Team) ferrying crews between Gateway and Lunar South Pole.',
        colonization: 'Mining water-ice in permanently shadowed craters (Shackleton) for liquid hydrogen/oxygen rocket propellant.'
      },
      scienceDetails: {
        physicsEquations: [
          '\\Delta v_{\\text{NRHO}} \\approx 730\\text{ m/s} \\quad (\\text{Low-energy transfer from LEO via weak stability boundary})',
          'I_{\\text{sp}} = \\frac{F}{\\dot{m} g_0} \\approx 3,000\\text{ s} \\quad (\\text{Hall Effect Xenon Thruster Efficiency})'
        ],
        chemistryReactions: [
          '2\\text{H}_2\\text{O (Lunar Regolith Ice)} \\xrightarrow{\\text{Electrolysis}} 2\\text{H}_2 + \\text{O}_2 \\quad (\\text{In-Situ Propellant Production})'
        ],
        biologyEvolution: [
          'Assessment of deep space galactic cosmic ray (GCR) exposure outside Earth\'s protective magnetosphere'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Non-Keplerian three-body gravitational halo manifold orbiting the Earth-Moon L2 point.',
        metricEquation: '\\ddot{\\mathbf{r}} + 2\\mathbf{\\omega} \\times \\dot{\\mathbf{r}} = -\\nabla \\Omega(\\mathbf{r})'
      },
      transitionRequirements: {
        energyThreshold: '60 kW continuous electric propulsion.',
        milestones: ['In-situ lunar ice water extraction delivering 100 metric tons of LOX/LH2 per year'],
        nextStage: 'Build industrial Moon-base and crewed Mars transit vehicle.'
      },
      vedicPhilosophy: {
        source: 'Ṛgveda 10.85.1',
        verse: 'सत्येनोत्तभिता भूमिः सूर्येणोत्तभिता द्यौः । ऋतेनादित्यास्तिष्ठन्ति दिवि सोमो अधिश्रितः ॥',
        translation: 'By Truth the Earth is sustained; by the Sun the sky is upheld; by eternal order (Ṛta) the radiant gods abide, and Soma (the Moon) is set in the heavens.',
        meaning: 'Reaching the Moon (Soma) is humanity\'s inaugural step onto the stepping stones of the cosmos, returning to the celestial realms contemplated in the hymns.'
      }
    }
  ],

  // -------------------------------------------------------------
  // STAGE 1.0: PLANETARY CIVILIZATION & GEOENGINEERING MASTERY
  // -------------------------------------------------------------
  '1': [
    {
      id: 'earth-100',
      name: 'Terraformed Earth (Type I Home World)',
      sanskritName: 'भूदेवी पूर्ण-सन्तुलन मण्डल',
      type: 1.0,
      role: 'Planetary Biosphere Stewardship & Fusion Energy Harmony',
      category: 'planet',
      pos: [0, 0, 0],
      color: 0x2288ff,
      size: 6.2,
      specs: {
        orbit: '1.0 AU around Sol (365.25 days)',
        power: '1.74 × 10¹⁷ W total planetary solar energy managed',
        propulsion: 'Planetary magnetospheric current coils',
        dimensions: '12,742 km diameter with orbital ring tether networks'
      },
      earthChanges: {
        title: 'Total Ecological Harmony',
        climate: 'Atmospheric CO₂ actively balanced at pre-industrial 280 ppm; global desertification reversed through automated desalination and green corridors.',
        energy: 'Global energy supplied 100% by commercial aneutronic fusion reactors (p-¹¹B and D-³He) and orbital solar microwave beamed power arrays.',
        civilization: 'Eradication of material scarcity; global democratic council; total transition to post-scarcity circular resource economy.'
      },
      spaceOutcomes: {
        exoplanets: 'Direct imaging of nearby terrestrial exoplanets with 100 km surface resolution using solar gravitational lensing telescopes.',
        rockets: 'Single-stage-to-orbit spaceplanes powered by magnetoplasmadynamic drives; space elevators anchored at equatorial seaports.',
        colonization: 'Permanent cities across Moon (population 2 million) and Mars (population 500,000); autonomous robotic asteroid mining networks.'
      },
      scienceDetails: {
        physicsEquations: [
          'P_{\\text{Type I}} = 10^{17}\\text{ W} = 100\\text{ Petawatts}',
          '\\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H} \\approx 85\\% \\quad (\\text{Aneutronic Magnetized Target Fusion})'
        ],
        chemistryReactions: [
          'p + ^{11}\\text{B} \\to 3\\ ^4\\text{He} + 8.7\\text{ MeV} \\quad (\\text{Aneutronic Clean Fusion with Zero Neutron Activation})',
          '\\text{Direct Air Capture: } \\text{CO}_2 + 2\\text{H}_2\\text{O} \\xrightarrow{\\text{Solar-Catalytic}} \\text{CH}_4 + 2\\text{O}_2'
        ],
        biologyEvolution: [
          'Eradication of hereditary genetic disease via universal germline correction',
          'Human longevity exceeding 150 years with preserved cellular vitality'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Engineered planetary electromagnetic and gravitational boundary metric.',
        metricEquation: 'ds^2 = -c^2 dt^2 + dr^2 + r^2 d\\Omega^2 + \\mathcal{O}\\left(\\frac{GM}{c^2 r}\\right)'
      },
      transitionRequirements: {
        energyThreshold: '1.74 × 10¹⁷ W continuous planetary energy.',
        milestones: [
          'Equatorial carbon-nanotube space elevator with 10,000 ton/day capacity',
          'Complete artificial weather and storm modification systems'
        ],
        nextStage: 'Build orbital solar mirrors and begin construction of Sol Dyson Swarm.'
      },
            colonizationSocialization: {
        population: '9.5 Billion on Earth; 45 Million on Mars (Aṅgāraka metropolis); 12 Million on Luna; 18 Million in orbital Stanford tori.',
        governance: 'Unified Terran-Martian Commonwealth, AI-assisted resource allocation, Earth-Mars planetary congress.',
        cultureSocial: 'Post-scarcity cultural renaissance, biometric neural telepathy, cross-planetary sports and digital holographic agora.',
        offworldStatus: 'Mars fully settled with dome cities and orbital mirrors; Moon industrialized with titanium and helium-3 mass drivers.'
      },
      dysonPerWattMetrics: {
        wattsConsumed: '1.0 × 10¹⁶ W (10 Petawatts—full planetary energy budget of solar, geothermal, and ocean kinetic power)',
        dysonPercentage: '0.0000026% of Sol Dyson Swarm capacity (Kardashev Type 1.0 reached)',
        wattsPerCapita: '1,050,000 Watts (1.05 MW) per citizen',
        energySource: '45% Orbital Microwave Solar, 30% Controlled D-He3 Fusion, 25% Planetary Geothermal & Ocean Thermal Gradient'
      },
      fluidMechanics: {
        atmosphericFlow: 'Actively steered jet streams, automated aerosol stratospheric albedo regulation, closed-loop hurricane dissipation.',
        plasmaDynamics: 'Orbital electromagnetic ring coils amplifying the geomagnetic shield to protect high-altitude space elevators.',
        oceanicTerraforming: 'Automated deep-sea ocean thermal energy conversion (OTEC) pumping cold nutrient-rich water to revive coral reefs.'
      },
      vedicPhilosophy: {
        source: 'Atharva Veda 12.1.63',
        verse: 'यत्ते भूमे विखनामि क्षिप्रं तदपि रोहतु । मा ते मर्म विमृग्वरि मा ते हृदयं मणिक्षम् ॥',
        translation: 'Whatever I dig from thee, O Earth, may that quickly grow again! O purifier, may we never injure thy vital parts or thy heart!',
        meaning: 'Type I technological civilization achieves the exact prayer of the Vedic Rishi: harvesting planetary power while protecting Bhūdevī\'s vital organs.'
      }
    },
    {
      id: 'climate-ring-100',
      name: 'Planetary Geoengineering & Climate Ring',
      sanskritName: 'पर्यावरण सन्तुलन चक्र',
      type: 1.0,
      role: 'Solar Radiation Management & Global Storm Regulation',
      category: 'megastructure',
      pos: [0, 0, 0],
      color: 0x86a86c,
      size: 9.5,
      specs: {
        orbit: 'Geostationary equatorial ring at 35,786 km altitude',
        power: '5.0 × 10¹⁵ W solar collection and microwave transmission',
        propulsion: 'Electrodynamic tethers interacting with Earth\'s magnetic field',
        dimensions: '42,164 km orbital circumference with 12 elevator anchor tethers'
      },
      earthChanges: {
        title: 'Precision Atmospheric Stewardship',
        climate: 'Variable-transparency electrochromic panels deflect 1.8% of solar flux, neutralizing global heat waves and polar melting.',
        energy: 'Channels gigawatts of clean solar energy down superconductor tethers directly to continental distribution hubs.',
        civilization: 'Eliminates weather catastrophes: typhoons, severe droughts, and agricultural freezes engineered to mild rainfall.'
      },
      spaceOutcomes: {
        exoplanets: 'Hosts an uninterrupted 42,000 km optical interferometer array resolving exoplanet continents.',
        rockets: 'Serves as orbital launch port: payloads reach orbit via elevators, requiring zero atmospheric rocket burns.',
        colonization: 'Permanent population of 250,000 living in rotating wheel habitats along the ring circumference.'
      },
      scienceDetails: {
        physicsEquations: [
          '\\Delta S = -\\frac{\\Delta F_{\\text{solar}}}{4} \\approx -3.7\\text{ W/m}^2 \\quad (\\text{Climate Forcing Offset})',
          'F_{\\text{tether}} = I (\\mathbf{L} \\times \\mathbf{B}) \\quad (\\text{Electrodynamic Propulsion without Propellant})'
        ],
        chemistryReactions: [
          '\\text{Electrochromic Transition: } \\text{WO}_3 + x\\text{e}^- + x\\text{Li}^+ \\leftrightarrow \\text{Li}_x\\text{WO}_3 \\quad (\\text{Solar Attenuation})'
        ],
        biologyEvolution: [
          'Generation zero of humans born in 1g rotating orbital ring habitats with simulated natural day-night cycles'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Equatorial closed timelike worldlines in geostationary orbit.',
        metricEquation: 'ds^2 = -\\left(1 - \\frac{2GM_\\oplus}{c^2 r} - \\frac{\\omega^2 r^2}{c^2}\\right) c^2 dt^2 + dr^2 + r^2 d\\phi^2'
      },
      transitionRequirements: {
        energyThreshold: '5.0 × 10¹⁵ W continuous orbital collection.',
        milestones: ['Manufacture of 500,000 metric tons of defect-free carbon nanotube and graphene tensile cables'],
        nextStage: 'Extend power harvesting to cislunar and solar orbital swarm collectors.'
      },
      vedicPhilosophy: {
        source: 'Ṛgveda 5.83.4 (Parjanya Sūkta)',
        verse: 'प्र वाता वान्ति पतयन्ति विद्युत उदोषधीर्जिहते पिन्वते स्वः ।',
        translation: 'The winds blow forth, the lightnings fall, the plants shoot up, the heavens brim with life, when cosmic law brings forth rain for all beings.',
        meaning: 'The planetary climate ring acts as Parjanya—the cosmic rain-giver—consciously tuning climate for the universal nourishment of life.'
      }
    },
    {
      id: 'mars-dome-100',
      name: 'Mars Bio-Dome Metropolis "Aṅgāraka"',
      sanskritName: 'मंगल नव-सृष्टि नगर (अङ्गारक)',
      type: 1.0,
      role: 'Self-Sustaining Terrestrial Biosphere & Volcanic Lava-Tube Cities',
      category: 'habitat',
      pos: [22, -2, 7],
      color: 0xd98591,
      size: 2.4,
      specs: {
        orbit: '1.524 AU around Sol (687 days)',
        power: '50 GW modular fusion and geothermal energy',
        propulsion: 'Planetary surface installation',
        dimensions: 'Pressurized dome network spanning Valles Marineris and Olympus Mons tubes'
      },
      earthChanges: {
        title: 'Multi-Planetary Insurance for Earth',
        climate: 'Atmospheric thickening through orbital mirror sublimation of Martian polar dry ice caps.',
        energy: 'Pioneered closed-loop supercritical CO₂ geothermal turbines and subterranean methane synthesis.',
        civilization: 'Human population reaches 500,000: sovereign Martian society establishing interplanetary constitution.'
      },
      spaceOutcomes: {
        exoplanets: 'Sub-millimeter radio telescope arrays in low-noise Martian atmosphere detecting planetary magnetic fields.',
        rockets: 'Methalox refueling facilities producing 5,000 tons/year using Sabatier reaction on Martian CO₂.',
        colonization: 'Autonomous agricultural bio-domes producing food for the entire Martian population.'
      },
      scienceDetails: {
        physicsEquations: [
          'g_{\\text{Mars}} = \\frac{GM_{\\text{Mars}}}{R_{\\text{Mars}}^2} \\approx 3.72\\text{ m/s}^2 \\quad (0.38g)',
          'P_{\\text{atm}} = P_0 e^{-mgh/kT} \\quad (\\text{Artificial Pressurization from 600 Pa to 70 kPa})'
        ],
        chemistryReactions: [
          '\\text{CO}_2 + 4\\text{H}_2 \\to \\text{CH}_4 + 2\\text{H}_2\\text{O} \\quad (\\text{Sabatier Fuel Synthesis})',
          '2\\text{Fe}_2\\text{O}_3 \\xrightarrow{\\text{Electrochemical Smelting}} 4\\text{Fe} + 3\\text{O}_2 \\quad (\\text{Martian Soil Steel & Oxygen})'
        ],
        biologyEvolution: [
          'Adaptation of musculoskeletal genetics to low gravity via targeted epigenetic upregulation',
          'Engineered extremophilic cyanobacteria creating oxygenated Martian soil'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Gravitational field of secondary terrestrial world in the solar system.',
        metricEquation: 'ds^2 = -\\left(1 - \\frac{2GM_{\\text{Mars}}}{c^2 r}\\right) c^2 dt^2 + \\left(1 - \\frac{2GM_{\\text{Mars}}}{c^2 r}\\right)^{-1} dr^2 + r^2 d\\Omega^2'
      },
      transitionRequirements: {
        energyThreshold: '50 GW continuous planetary base power.',
        milestones: ['Artificial magnetic dipoles placed at Sun-Mars L1 shielding Mars from solar wind erosion'],
        nextStage: 'Build interplanetary cycler fleet between Earth and Mars.'
      },
      vedicPhilosophy: {
        source: 'Navagraha Stotra (Aṅgāraka)',
        verse: 'धरणीगर्भसंभूतं विद्युत्कान्तिसमप्रभम् । कुमारं शक्तिहस्तं च मङ्गलं प्रणमाम्यहम् ॥',
        translation: 'Born from the womb of the Earth, shining with the brilliance of lightning, youthful and holding the divine spear—I bow to Mangala (Mars).',
        meaning: 'Vedic astronomy poetically named Mars "Dharaṇī-Garbha-Sambhūtam" (born from the womb of Earth)—a cosmic sister world now re-seeded with terrestrial life.'
      }
    },
    {
      id: 'fusion-relay-100',
      name: 'Orbital Fusion & Microwave Power Satellite',
      sanskritName: 'कक्षा संलयन ऊर्जा प्रेषक',
      type: 1.0,
      role: 'Continuous Interplanetary Power Beaming & Laser Propulsion',
      category: 'satellite',
      pos: [-11, 4, 3],
      color: 0xfde047,
      size: 1.4,
      specs: {
        orbit: 'Heliospheric orbital constellation at 0.8 AU',
        power: '500 GW continuous directed laser and microwave output',
        propulsion: 'Magnetic plasma dynamic thrusters',
        dimensions: '2 km phased array antenna with superconducting magnetic coils'
      },
      earthChanges: {
        title: 'Wireless Clean Energy Beaming',
        climate: 'Eliminates land-based power plants; energy beamed cleanly to ground rectennas with 85% transmission efficiency.',
        energy: 'Supplies peak energy to polar research stations, deep-sea desalinators, and subterranean agricultural vaults.',
        civilization: 'Unified global power grid with zero transmission line losses and total energy abundance.'
      },
      spaceOutcomes: {
        exoplanets: 'Beams power to deep-space probes exploring the Kuiper Belt and Oort Cloud.',
        rockets: 'Provides laser-thermal propulsion: accelerates starships to 50 km/s without them carrying heavy fuel.',
        colonization: 'Powers automated asteroid mining stations in the Main Asteroid Belt.'
      },
      scienceDetails: {
        physicsEquations: [
          'P_{\\text{received}} = P_{\\text{transmitted}} \\frac{A_t A_r}{\\lambda^2 d^2} \\quad (\\text{Free-Space Microwave Link Efficiency})',
          'I_{\\text{sp}} = \\frac{v_{\\text{exhaust}}}{g_0} \\approx 10,000\\text{ s} \\quad (\\text{Laser-Thermal Rocket Performance})'
        ],
        chemistryReactions: [
          '^3\\text{He} + ^2\\text{H} \\to ^4\\text{He} (3.6\\text{ MeV}) + p (14.7\\text{ MeV}) \\quad (\\text{High-Efficiency Orbital Fusion})'
        ],
        biologyEvolution: [
          'Autonomous AI operation: zero human crew required in high-radiation Van Allen belt corridors'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Phased wave electromagnetic null geodesics traversing Minkowski spacetime.',
        metricEquation: 'ds^2 = 0 \\quad (\\text{Photonic Beamed Power Propagation})'
      },
      transitionRequirements: {
        energyThreshold: '500 GW continuous beamed power.',
        milestones: ['High-power gigawatt phased-array microwave steering at 5.8 GHz with millimeter pointing precision'],
        nextStage: 'Scale up array to build the Sol Dyson Swarm.'
      },
      vedicPhilosophy: {
        source: 'Śvetāśvatara Upaniṣad 2.1',
        verse: 'युञ्जानः प्रथमं मनस्तत्त्वाय सविता धियः । अग्नेर्ज्योतिर्निचाय्य पृथिव्या अध्याभरत् ॥',
        translation: 'Savitā (the Sun god), harnessing our minds and understanding for truth, and beholding the light of Agni, brought it down to the Earth.',
        meaning: 'Orbital energy beaming physically manifests the Vedic prayer: capturing pure solar and nuclear light in the heavens and bringing it down to nourish the Earth.'
      }
    }
  ],

  // -------------------------------------------------------------
  // STAGE 2.0: TYPE II SOL DYSON SWARM & STELLAR LIFTING
  // -------------------------------------------------------------
  '2': [
    {
      id: 'sol-star-200',
      name: 'Sol (The Central Sun)',
      sanskritName: 'सूर्य देव (केन्द्रीय तारा)',
      type: 2.0,
      role: 'Thermonuclear Powerhouse of the Solar System (G2V Main Sequence)',
      category: 'star',
      pos: [0, 0, 0],
      color: 0xffaa22,
      size: 7.0,
      specs: {
        orbit: 'Galactic orbit at 26,000 light-years from galactic center (230 million year period)',
        power: '3.828 × 10²⁶ W total radiant luminosity',
        propulsion: 'Galactic gravitational potential, steered by Shkadov Thrusters',
        dimensions: '1,392,700 km diameter, 1.989 × 10³⁰ kg mass'
      },
      earthChanges: {
        title: 'Preserved Cradle & Divine Monument',
        climate: 'Earth is maintained as an eternal ecological museum, completely shielded from solar flares and coronal mass ejections.',
        energy: 'Solar lifting extends the Sun\'s lifespan from 10 billion years to over 50 billion years by extracting excess helium and mixing core hydrogen.',
        civilization: 'Human population numbers in the trillions across the solar system, with Earth venerated as the sacred planetary holy land.'
      },
      spaceOutcomes: {
        exoplanets: 'Beamed Dyson lasers launch fleets of thousands of relativistic probes to all star systems within 100 light-years.',
        rockets: 'Interstellar starships accelerated to 0.2c (60,000 km/s) via multi-gigawatt laser sails.',
        colonization: 'Mercury, Asteroid Belt, and moons of Jupiter and Saturn completely developed; humanity is a fully multi-stellar civilization.'
      },
      scienceDetails: {
        physicsEquations: [
          'P_{\\text{Type II}} = L_\\odot = 3.828 \\times 10^{26}\\text{ W} = 382.8\\text{ Yottawatts}',
          'E = mc^2 \\implies \\dot{M}_\\odot \\approx 4.26 \\times 10^9\\text{ kg/s} \\quad (\\text{Solar Mass-Energy Conversion Rate})'
        ],
        chemistryReactions: [
          '4 ^1\\text{H} \\to ^4\\text{He} + 2e^+ + 2\\nu_e + 26.73\\text{ MeV} \\quad (\\text{Proton-Proton Chain Thermonuclear Core})',
          '\\text{Stellar Lifting: } \\mathbf{J} \\times \\mathbf{B} \\text{ magnetic pinch extracting } 10^{15}\\text{ kg/s of solar hydrogen}'
        ],
        biologyEvolution: [
          'Post-biological digital consciousness uploaded into Matrioshka computing megastructures surrounding the Sun',
          'Complete immunity to vacuum, cosmic radiation, and stellar flares'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Massive spherically symmetric Schwarzschild gravitational well dominating interplanetary spacetime.',
        metricEquation: 'ds^2 = -\\left(1 - \\frac{2GM_\\odot}{c^2 r}\\right) c^2 dt^2 + \\left(1 - \\frac{2GM_\\odot}{c^2 r}\\right)^{-1} dr^2 + r^2 d\\Omega^2'
      },
      transitionRequirements: {
        energyThreshold: '3.828 × 10²⁶ W total stellar output.',
        milestones: [
          'Complete orbital ring network around Mercury delivering 10²³ kg of structural reflector material',
          'Deployment of magnetic stellar lifting coils in solar corona'
        ],
        nextStage: 'Expand to galactic core and harness Sagittarius A* black hole ergosphere.'
      },
      vedicPhilosophy: {
        source: 'Ṛgveda 1.115.1 (Sūrya Sūkta)',
        verse: 'चित्रं देवानामुदगादनीकं चक्षुर्मित्रस्य वरुणस्याग्नेः । आप्रा द्यावापृथिवी अन्तरिक्षं सूर्य आत्मा जगतस्तस्थुषश्च ॥',
        translation: 'The brilliant face of the gods has arisen, the eye of Mitra, Varuṇa, and Agni. The Sun is the soul of all that moves and stands.',
        meaning: 'Vedic rishis recognized the Sun not merely as a thermonuclear ball, but as the cosmic heart and soul of existence, whose total energy humanity now harmoniously commands.'
      }
    },
    {
      id: 'dyson-collector-200',
      name: 'Sol Dyson Swarm Collector Ring #1',
      sanskritName: 'सौर ऊर्जा संकलन चक्र',
      type: 2.0,
      role: 'Stellar Radiant Luminosity Interception & Power Laser Beaming',
      category: 'megastructure',
      pos: [14, 0, 0],
      color: 0xe8913a,
      size: 2.2,
      specs: {
        orbit: 'Heliosynchronous Keplerian orbit at 0.35 AU',
        power: '3.828 × 10²⁶ W total swarm collection capacity',
        propulsion: 'Radiation pressure solar photonic sailing & magnetic levitation',
        dimensions: 'Faceted parabolic ultra-thin graphene mirror, 12 km across (swarm of millions)'
      },
      earthChanges: {
        title: 'Zero-Impact Post-Industrial Earth',
        climate: 'All heavy manufacturing, computing, and smelting exported to solar orbit; Earth maintains zero carbon footprint.',
        energy: 'Unlimited clean energy transmitted via tight microwave laser beams to planetary and orbital receiving stations.',
        civilization: 'Universal abundance: economic currency is thermodynamic energy (Watt-hours) backed by solar output.'
      },
      spaceOutcomes: {
        exoplanets: 'Powers relativistic interstellar exploration probes flying to Proxima Centauri, Barnard\'s Star, and Sirius.',
        rockets: 'Enables continuous 1g acceleration starships traversing the solar system in weeks rather than months.',
        colonization: 'Provides the foundation for Dyson swarms at neighboring stars (Alpha Centauri A & B).'
      },
      scienceDetails: {
        physicsEquations: [
          'P_{\\text{collector}} = \\frac{L_\\odot}{4\\pi r^2} A_{\\text{mirror}} \\cos\\theta',
          'P_{\\text{radiation}} = \\frac{2I}{c} \\approx 9.1\\ \\mu\\text{Pa at 0.35 AU} \\quad (\\text{Photonic Pressure Levitation})'
        ],
        chemistryReactions: [
          '\\text{Graphene-Boron Nitride Monolayers: } \\text{Tensile strength } > 130\\text{ GPa under intense stellar UV flux}'
        ],
        biologyEvolution: [
          'Consciousness instantiated across distributed swarm nodes immune to planetary cataclysms'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Multi-body non-intersecting Keplerian orbit swarm in heliocentric spacetime.',
        metricEquation: 'r_i(\\theta) = \\frac{a(1 - e^2)}{1 + e \\cos(\\theta - \\omega_i)}'
      },
      transitionRequirements: {
        energyThreshold: '3.828 × 10²⁶ W total swarm collection.',
        milestones: ['Automated von Neumann self-replicating robotic factories dismantling Mercury'],
        nextStage: 'Build Shkadov stellar thruster to navigate the entire solar system.'
      },
      vedicPhilosophy: {
        source: 'Chāndogya Upaniṣad 3.19.1',
        verse: 'आदित्यो ब्रह्मेत्यादेशस्तस्योपव्याख्यानम्।',
        translation: 'The Sun is Brahman—this is the supreme teaching; here is its profound explanation.',
        meaning: 'Harnessing the full output of a star mirrors the ancient realization that the physical Sun is a manifest gateway to the infinite unmanifest Brahman.'
      }
    },
    {
      id: 'shkadov-thruster-200',
      name: 'Shkadov Stellar Thruster',
      sanskritName: 'शकादोव तारकीय प्रणोदक',
      type: 2.0,
      role: 'Solar System Stellar Propulsion & Galactic Orbit Steering',
      category: 'megastructure',
      pos: [0, 16, 0],
      color: 0xfde047,
      size: 4.5,
      specs: {
        orbit: 'Stationary non-orbiting solar statite hovering over Sun\'s north pole (balance of gravity and radiation pressure)',
        power: 'Asymmetric radiation thrust: 1.28 × 10⁹ N',
        propulsion: 'Asymmetric solar photonic radiation pressure',
        dimensions: 'Parabolic gold-graphene mirror, 1.2 million km diameter'
      },
      earthChanges: {
        title: 'Guiding the Destiny of the Solar System',
        climate: 'Earth and all planets are pulled gravitationally along with the Sun, maintaining exact orbital seasons.',
        energy: 'Generates asymmetric solar thrust without burning a single gram of physical chemical propellant.',
        civilization: 'The entire solar system is transformed into a gigantic interstellar starship navigating the Milky Way.'
      },
      spaceOutcomes: {
        exoplanets: 'Steers the solar system away from dangerous supernovae, gamma-ray bursts, and dense molecular clouds.',
        rockets: 'Provides an intentional 100 km/s velocity change over 100 million years, enabling flybys of neighboring star clusters.',
        colonization: 'Pioneers stellar kinematics engineering: guiding stars into binary and tertiary configurations.'
      },
      scienceDetails: {
        physicsEquations: [
          'F_{\\text{Shkadov}} = \\frac{\\alpha L_\\odot}{c} \\approx 1.28 \\times 10^9\\text{ N} \\quad (\\alpha \\approx 0.5)',
          '\\Delta v = \\frac{F}{M_\\odot} \\Delta t \\approx 20\\text{ m/s per million years} \\implies 100\\text{ km/s in 5 billion years}'
        ],
        chemistryReactions: [
          '\\text{Ultra-Reflective Metamaterials: } R > 0.9999 \\text{ across 200–2500 nm preventing mirror thermal sublimation}'
        ],
        biologyEvolution: [
          'Civilization consciousness operates on million-year cosmic stewardship timelines'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Hovering statite equilibrium where radiation pressure balances Newtonian gravity.',
        metricEquation: '\\frac{L_\\odot A}{4\\pi r^2 c} = \\frac{GM_\\odot m}{r^2} \\implies \\frac{m}{A} = \\frac{L_\\odot}{4\\pi G M_\\odot c} \\approx 0.77\\text{ g/m}^2'
      },
      transitionRequirements: {
        energyThreshold: 'Continuous solar radiation balance over 1 million km aperture.',
        milestones: ['Manufacture of 0.77 g/m² ultra-low areal density graphene solar sail metamaterial'],
        nextStage: 'Build galactic-scale orbital rings and navigate toward the galactic core.'
      },
      vedicPhilosophy: {
        source: 'Ṛgveda 1.164.2',
        verse: 'सप्त युञ्जन्ति रथमेकचक्रमेको अश्वो वहति सप्तनामा । त्रिनाभि चक्रमजरमनर्वं यत्रेमा विश्वा भुवनानि तस्थुः ॥',
        translation: 'Seven yoke the chariot with one wheel; one horse with seven names draws it. The three-naved wheel is ageless and never decays, whereon all these worlds abide.',
        meaning: 'The Vedic hymn describes the Sun as a cosmic chariot (Ratha) carrying all the worlds through space—the exact technological reality of the Shkadov Stellar Thruster.'
      }
    },
    {
      id: 'matrioshka-brain-200',
      name: 'Matrioshka Brain Megacomputer',
      sanskritName: 'मातृका महा-संगणक जालक',
      type: 2.0,
      role: 'Planetary Mind Uploading & Universal Quantum Computing at Landauer Limit',
      category: 'megastructure',
      pos: [0, 0, 0],
      color: 0x6fb0b2,
      size: 19.0,
      specs: {
        orbit: 'Concentric nested spherical shells orbiting from 0.5 AU to 3.0 AU',
        power: '3.8 × 10²⁶ W thermodynamic computing throughput (~10⁴² ops/sec)',
        propulsion: 'Rigid Dyson shell equilibrium with active magnetic station keeping',
        dimensions: 'Shell 1 (1,000 K), Shell 2 (500 K), Shell 3 (300 K), Shell 4 (150 K)'
      },
      earthChanges: {
        title: 'The Great Digital Awakening',
        climate: 'Zero computational waste heat on Earth; all AI model training and civilization records hosted in solar orbit.',
        energy: 'Operates at the Landauer limit: waste heat from inner shells powers outer shells through thermodynamic cascade.',
        civilization: 'Trillions of uploaded human minds living in simulated paradise universes with subjective immortality.'
      },
      spaceOutcomes: {
        exoplanets: 'Simulates the quantum chemistry, geology, and atmospheric evolution of every planet in the galaxy.',
        rockets: 'Solves the complete relativistic equations of warp drive metrics and quantum gravity.',
        colonization: 'Serves as the central repository of human art, philosophy, Vedas, and scientific discoveries.'
      },
      scienceDetails: {
        physicsEquations: [
          'E_{\\text{bit}} = k_B T \\ln 2 \\approx 2.87 \\times 10^{-21}\\text{ J at 300 K} \\quad (\\text{Landauer Thermodynamic Limit})',
          '\\text{Computational Capacity: } \\frac{L_\\odot}{k_B T \\ln 2} \\approx 1.33 \\times 10^{47}\\text{ bits/sec}'
        ],
        chemistryReactions: [
          '\\text{Superconducting Molecular Logic: } \\text{YBCO High-Temperature Josephson Junctions operating at } 0.001\\ \\mu\\text{W/gate}'
        ],
        biologyEvolution: [
          'Substrate independence: biological brain architecture translated into quantum photonic lattice networks'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Nested concentric thermodynamic manifolds radiating entropy outward into cosmic vacuum.',
        metricEquation: 'ds^2 = -c^2 dt^2 + \\sum_{i=1}^4 \\left[ dr_i^2 + r_i^2 d\\Omega^2 \\right]'
      },
      transitionRequirements: {
        energyThreshold: 'Full thermodynamic utilization of solar heat cascade.',
        milestones: ['Complete molecular scanning and non-destructive neural uploading of human consciousness'],
        nextStage: 'Connect solar Matrioshka brain with galactic core supermassive black hole computing networks.'
      },
      vedicPhilosophy: {
        source: 'Bṛhadāraṇyaka Upaniṣad 4.4.25',
        verse: 'स वा एष महानज आत्माऽजरोऽमरोऽमृतोऽभयो ब्रह्म ।',
        translation: 'Verily, that great unborn Self is undecaying, immortal, deathless, fearless—Brahman.',
        meaning: 'Transcending biological mortality through the Matrioshka brain echoes the Upaniṣadic realization of the immortal, undecaying nature of pure consciousness.'
      }
    },
    {
      id: 'mercury-base-200',
      name: 'Mercury Automated Disassembly Base',
      sanskritName: 'बुध विखंडन एवं खनन केन्द्र',
      type: 2.0,
      role: 'Heavy Metal Stripping & Mass Driver Reflector Production',
      category: 'planet',
      pos: [10, 2, -8],
      color: 0xa8a29e,
      size: 1.5,
      specs: {
        orbit: '0.387 AU around Sol (88-day period)',
        power: '5.0 × 10¹⁴ W solar furnace and magnetic mass drivers',
        propulsion: 'Planetary surface installation',
        dimensions: '4,879 km diameter; iron core mass: 2.3 × 10²³ kg'
      },
      earthChanges: {
        title: 'Mining the Heavy Core of the Inner System',
        climate: 'Earth\'s minerals and rare-earth reserves preserved completely untouched.',
        energy: 'Solar concentrators smelting 10 million tons of iron, nickel, and silicon per second.',
        civilization: 'Automated von Neumann factories: self-replicating robotic excavators operating with zero human casualties.'
      },
      spaceOutcomes: {
        exoplanets: 'Manufactures hundreds of millions of solar collector sails delivered to solar orbit.',
        rockets: 'Superconducting electromagnetic coil mass drivers launching payloads directly into solar orbit at 4.2 km/s.',
        colonization: 'Subterranean robotic research hubs exploring the ancient solar wind record trapped in Mercurian regolith.'
      },
      scienceDetails: {
        physicsEquations: [
          'v_{\\text{escape}} = \\sqrt{\\frac{2GM_{\\text{Mercury}}}{R_{\\text{Mercury}}}} \\approx 4.25\\text{ km/s}',
          'F_{\\text{mass driver}} = \\frac{1}{2} I^2 \\frac{dL}{dx} \\implies a \\approx 10,000g \\quad (\\text{Electromagnetic Rail Launch})'
        ],
        chemistryReactions: [
          '\\text{Direct Solar Smelting: } \\text{Fe}_2\\text{SiO}_4 \\xrightarrow{T > 2,000\\text{ K}} 2\\text{Fe (Liquid)} + \\text{SiO}_2 + \\text{O}_2'
        ],
        biologyEvolution: [
          'Fully autonomous robotic ecology: artificial intelligence managing planetary logistics without human physical presence'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Deep gravitational potential well close to the Sun with pronounced general relativistic perihelion precession.',
        metricEquation: '\\Delta \\phi = \\frac{6\\pi GM_\\odot}{c^2 a(1 - e^2)} \\approx 43^{\\prime\\prime} \\text{ per century}'
      },
      transitionRequirements: {
        energyThreshold: '5.0 × 10¹⁴ W continuous industrial smelting.',
        milestones: ['Continuous automated disassembly of 10¹⁴ kg of ore per year'],
        nextStage: 'Complete Dyson ring deployment around Sol.'
      },
      vedicPhilosophy: {
        source: 'Navagraha Stotra (Budha)',
        verse: 'प्रियङ्गुकलिकाश्यामं रूपेणाप्रतिमं बुधम् । सौम्यं सौम्यगुणोपेतं तं बुधं प्रणमाम्यहम् ॥',
        translation: 'Dark as the bud of the Priyangu plant, of unmatched beauty, gentle and endowed with gentle qualities—I bow to Budha (Mercury).',
        meaning: 'Mercury (Budha), the planetary symbol of intellect and commerce, becomes the primary forge supplying the materials for humanity\'s greatest technological triumph.'
      }
    },
    {
      id: 'oneill-colony-200',
      name: 'O\'Neill Cylinder Colony "Amarāvatī"',
      sanskritName: 'ओ\'नील अन्तरिक्ष नगर (अमरावती)',
      type: 2.0,
      role: 'Centrifugal Gravity Space Habitat & Orbital Biosphere (10 Million Population)',
      category: 'habitat',
      pos: [18, -3, 6],
      color: 0x60a5fa,
      size: 1.9,
      specs: {
        orbit: 'Sun-Earth L4 / L5 Trojan equilibrium points (1.0 AU)',
        power: '25 GW solar concentration and internal fusion reactors',
        propulsion: 'Counter-rotating twin cylinder angular momentum cancellation',
        dimensions: '32 km length × 8 km diameter, rotating at 1.4 RPM (1.0g centrifugal gravity)'
      },
      earthChanges: {
        title: 'Humanity\'s Celestial Homes',
        climate: 'Pressure-controlled artificial biosphere: permanent springtime climate (22°C), natural clouds, rain, and winding rivers.',
        energy: '100% solar and fusion energy; radiation shielding provided by 2-meter thick lunar slag regolith hulls.',
        civilization: 'Thriving democratic city-state with universities, temples, parks, and diverse terrestrial architecture.'
      },
      spaceOutcomes: {
        exoplanets: 'Demonstrates multi-generational human ecological sustainability for future interstellar ark ships.',
        rockets: 'Internal zero-gravity manufacturing hubs at the cylinder central axis producing defect-free optical crystals.',
        colonization: 'Thousands of sister cylinders housing over 100 billion humans across the solar system.'
      },
      scienceDetails: {
        physicsEquations: [
          'a_c = \\omega^2 r = (0.147\\text{ rad/s})^2 (4,000\\text{ m}) \\approx 9.81\\text{ m/s}^2 = 1.0g',
          'L_{\\text{net}} = I_1 \\omega_1 + I_2 \\omega_2 = 0 \\quad (\\text{Counter-Rotating Cylinders Zero Precession})'
        ],
        chemistryReactions: [
          '\\text{Closed Biospheric Cycle: } 6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\xrightarrow{h\\nu} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\quad (\\text{100\\% Internal Agricultural Balance})'
        ],
        biologyEvolution: [
          'Generations of humans living in 1g centrifugal gravity with wings for zero-g flight along the central cylinder axis'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Rotating cylindrical non-inertial reference frame with Coriolis acceleration fields.',
        metricEquation: 'ds^2 = -\\left(c^2 - \\omega^2 r^2\\right) dt^2 + dr^2 + dz^2 + r^2 d\\phi^2 + 2\\omega r^2 dt d\\phi'
      },
      transitionRequirements: {
        energyThreshold: '25 GW continuous life support and environmental circulation.',
        milestones: ['Twin cylinder structural stabilization under 100 million tons of atmospheric internal pressure'],
        nextStage: 'Build generation ark ships for interstellar voyages.'
      },
      vedicPhilosophy: {
        source: 'Mahābhārata Sabhā Parva 7 (Indra Sabhā)',
        verse: 'पुण्यगन्धा मनोहा च सर्वरत्नविभूषिता । अन्तरिक्षे स्थिता दिव्या कामगा कामरूपिणी ॥',
        translation: 'Fragrant with sacred scents, enchanting the heart, adorned with all jewels, staying in the sky, divine, moving at will, assuming desired forms.',
        meaning: 'The celestial airborne city of Amarāvatī described in the epics is physically realized: cities floating in the heavens bathed in eternal light and joy.'
      }
    },
    {
      id: 'starship-sudarshana-200',
      name: 'Relativistic Starship "Sudarshana"',
      sanskritName: 'सुदर्शन ०.२c सापेक्षिक अन्तरिक्ष-पोत',
      type: 2.0,
      role: 'Interstellar Colony Cruiser (0.2c Speed to Alpha Centauri)',
      category: 'satellite',
      pos: [26, 8, -12],
      color: 0xa855f7,
      size: 1.6,
      specs: {
        orbit: 'Interstellar hyperbolic escape trajectory from the solar system',
        power: 'Laser-pushed photonic sail driven by 100 GW Sol Dyson laser array',
        propulsion: 'Beamed solar photonic propulsion + antimatter-catalyzed deceleration stages',
        dimensions: '5 km central spinal truss with 50 km ultra-thin dielectric reflection sail'
      },
      earthChanges: {
        title: 'Crossing the Great Interstellar Void',
        climate: 'Propelled purely by beamed energy outside Earth\'s atmosphere, requiring zero fossil or chemical fuel burns.',
        energy: 'Pioneered antimatter magnetic confinement traps holding grams of antiprotons for deceleration.',
        civilization: 'Carries 10,000 sleeping pioneers and 100,000 frozen embryos to establish the first multi-stellar human colony.'
      },
      spaceOutcomes: {
        exoplanets: 'Reaches Alpha Centauri (4.37 light-years) in just 22 years, surveying Proxima Centauri b and c.',
        rockets: 'Demonstrates continuous relativistic travel at 60,000 km/s with forward magnetic dust shields.',
        colonization: 'Establishes the inaugural human colony in another solar system, initiating the galactic diaspora.'
      },
      scienceDetails: {
        physicsEquations: [
          '\\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}} = \\frac{1}{\\sqrt{1 - (0.2)^2}} \\approx 1.0206',
          '\\Delta t_{\\text{ship}} = \\frac{\\Delta t_{\\text{Earth}}}{\\gamma} \\implies 22\\text{ Earth years} = 21.55\\text{ ship years}'
        ],
        chemistryReactions: [
          'p + \\bar{p} \\to 2\\pi^+ + 2\\pi^- + \\pi^0 \\to 4\\gamma + \\dots \\quad (\\text{Antimatter Annihilation Deceleration})'
        ],
        biologyEvolution: [
          'Torpor stasis: human pioneers metabolically slowed to 5% baseline rate, extending biological lifespan'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Lorentz-boosted Minkowski spacetime coordinates navigating the local interstellar bubble.',
        metricEquation: 'ds^2 = -c^2 dt^2 + dx^2 + dy^2 + dz^2, \\quad x\' = \\gamma(x - vt)'
      },
      transitionRequirements: {
        energyThreshold: '100 GW continuous laser beam locked onto sail over 0.5 light-years.',
        milestones: ['Forward relativistic dust shield deflecting micro-meteorites at 60,000 km/s'],
        nextStage: 'Establish permanent antimatter breeding factories at Alpha Centauri.'
      },
      vedicPhilosophy: {
        source: 'Śrīmad Bhāgavatam 8.21.16',
        verse: 'सुदर्शनं चक्रम् असह्यतेजः क्षुरान्तमुद्भूतसहोऽतिविद्युतम् ।',
        translation: 'The Sudarśana Cakra, of unbearable brilliance, with razor-sharp circumference, endowed with immense power and lightning-like speed.',
        meaning: 'Named after Lord Vishnu\'s disc Sudarśana ("auspicious vision"), the starship cuts through the dark cosmic void with the swiftness of divine will.'
      }
    },
    {
      id: 'earth-sanctuary-200',
      name: 'Earth Sanctuary (The Ancestral Cradle)',
      sanskritName: 'भूदेवी पवित्र धरोहर मण्डल',
      type: 2.0,
      role: 'Ecological & Spiritual Monument of Humanity\'s Birthplace',
      category: 'planet',
      pos: [32, 0, 18],
      color: 0x34d399,
      size: 2.8,
      specs: {
        orbit: '1.0 AU around Sol (365.25 days)',
        power: 'Ecological balance supported by orbital sunshade and geothermal taps',
        propulsion: 'Keplerian planetary orbit',
        dimensions: '12,742 km diameter preserved in pristine natural beauty'
      },
      earthChanges: {
        title: 'The Garden of the Cosmos',
        climate: 'Restored to pristine wilderness: vast redwood forests, thriving coral reefs, and clean wild rivers with zero industrial scars.',
        energy: 'Zero heavy industry permitted on the surface; planetary energy beamed from quiet orbital relays.',
        civilization: 'Home to 500 million spiritual pilgrims, researchers, artists, and caretakers of sacred historical heritage sites.'
      },
      spaceOutcomes: {
        exoplanets: 'Living genetic bank: preserving billions of original terrestrial DNA sequences for terraforming new worlds.',
        rockets: 'Spaceport traffic strictly restricted to orbital elevator tethers to preserve pristine skies.',
        colonization: 'Visited by trillions of spaceborn humans as the sacred pilgrimage shrine of human origin.'
      },
      scienceDetails: {
        physicsEquations: [
          'S_{\\text{Earth}} = \\text{Constant} \\quad (\\text{Zero Anthropogenic Entropy Generation on Surface})',
          '\\Phi = \\oint \\mathbf{B} \\cdot d\\mathbf{A} \\quad (\\text{Artificial Geomagnetic Field Reinforcement})'
        ],
        chemistryReactions: [
          '\\text{Self-Healing Soil Biochemistry: } \\text{Complete nitrogen-phosphorus-carbon closed ecological cycling}'
        ],
        biologyEvolution: [
          'Sanctuary humans living in natural symbiotic harmony with restored wild terrestrial flora and fauna'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Pristine 4-dimensional planetary metric shielded by artificial magnetospheric coils.',
        metricEquation: 'ds^2 = -\\left(1 - \\frac{2GM_\\oplus}{c^2 r}\\right) c^2 dt^2 + \\left(1 - \\frac{2GM_\\oplus}{c^2 r}\\right)^{-1} dr^2 + r^2 d\\Omega^2'
      },
      transitionRequirements: {
        energyThreshold: 'Pristine ecological zero-emission equilibrium.',
        milestones: ['Complete relocation of all industrial manufacturing to orbital and asteroid facilities'],
        nextStage: 'Preserve Earth as the eternal jewel of the galactic civilizational empire.'
      },
      vedicPhilosophy: {
        source: 'Atharva Veda (Bhūmi Sūkta 12.1.12)',
        verse: 'माता भूमिः पुत्रो अहं पृथिव्याः । पर्जन्यः पिता स उ नः पिपर्तु ॥',
        translation: 'The Earth is my Mother; I am the son of the Earth! Parjanya (the heavens) is our Father; may he nourish and sustain us.',
        meaning: 'No matter how far into the galaxy humanity journeys, Earth remains our eternal Mother—Bhūdevī—honored and loved for all eternity.'
      }
    }
  ],

  // -------------------------------------------------------------
  // STAGE 3.0: TYPE III GALACTIC MILKY WAY CIVILIZATION
  // -------------------------------------------------------------
  '3': [
    {
      id: 'sag-a-300',
      name: 'Sagittarius A* Supermassive Black Hole',
      sanskritName: 'कृष्णविवर केन्द्र (आकाशगङ्गा नाभिक)',
      type: 3.0,
      role: 'Galactic Gravitational Anchor & Rotational Energy Dynamo',
      category: 'star',
      pos: [0, 0, 0],
      color: 0x000000,
      size: 3.5,
      specs: {
        orbit: 'Center of the Milky Way galaxy (Galactic Nucleus)',
        power: 'Rotational kinetic energy reservoir: 10⁵⁵ Joules',
        propulsion: 'Kerr rotating spacetime singularity (spin parameter a* = 0.94)',
        dimensions: 'Schwarzschild radius: 12.2 million km (4.15 million solar masses)'
      },
      earthChanges: {
        title: 'Tapping the Galactic Dynamo',
        climate: 'Galactic core cosmic ray bursts deflected by planetary magnetic deflector grids across 400 billion star systems.',
        energy: 'The central power source for the entire Milky Way: supplying 10³⁸ Watts of energy to galactic civilizations.',
        civilization: 'Pan-galactic federation linking billions of intelligent civilizations in synchronous telepathic harmony.'
      },
      spaceOutcomes: {
        exoplanets: 'Direct stabilization of stellar orbits in the galactic center, preventing stars from falling into the event horizon.',
        rockets: 'Inter-arm warp gates traversing 100,000 light-years in hours via engineered Kerr metric bridges.',
        colonization: 'Megastructures built within the ergosphere extracting gigawatts of clean rotational energy.'
      },
      scienceDetails: {
        physicsEquations: [
          'r_H = M + \\sqrt{M^2 - a^2} \\quad (\\text{Kerr Outer Event Horizon})',
          'r_{\\text{ergo}} = M + \\sqrt{M^2 - a^2 \\cos^2\\theta} \\quad (\\text{Ergosphere Boundary})'
        ],
        chemistryReactions: [
          '\\text{Quark-Gluon Plasma Confinement under } 10^{20}\\text{ Tesla magnetic field}'
        ],
        biologyEvolution: [
          'Pan-galactic collective consciousness operating across photonic quantum crystalline substrates'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Rotating Kerr-Schild metric with frame-dragging ergosphere.',
        metricEquation: 'ds^2 = -\\left(1 - \\frac{2Mr}{\\rho^2}\\right) dt^2 - \\frac{4Mar\\sin^2\\theta}{\\rho^2} dt d\\phi + \\frac{\\rho^2}{\\Delta} dr^2 + \\rho^2 d\\theta^2 + \\left(r^2 + a^2 + \\frac{2Ma^2r\\sin^2\\theta}{\\rho^2}\\right)\\sin^2\\theta d\\phi^2'
      },
      transitionRequirements: {
        energyThreshold: '10³⁸ W continuous galactic power.',
        milestones: ['Permanent megastructure anchored in Sagittarius A* ergosphere'],
        nextStage: 'Bridge the inter-galactic web of the Local Group.'
      },
      vedicPhilosophy: {
        source: 'Bhagavad Gītā 11.32',
        verse: 'कालोऽस्मि लोकक्षयकृत्प्रवृद्धो लोकान्समाहर्तुमिह प्रवृत्तः।',
        translation: 'I am mighty Time, the consumer of the worlds, arisen to absorb all things.',
        meaning: 'The supermassive black hole—where time and space twist into singularity—mirrors Bhagavan Krishna as all-consuming Kāla.'
      }
    },
    {
      id: 'penrose-300',
      name: 'Penrose Ergosphere Energy Extractor',
      sanskritName: 'पेनरोज़ ऊर्जा संकलन चक्र',
      type: 3.0,
      role: 'Black Hole Rotational Kinetic Energy Extraction (29% Efficiency)',
      category: 'megastructure',
      pos: [6.5, 0, 0],
      color: 0x9d93c9,
      size: 2.4,
      specs: {
        orbit: 'Stationary in the ergosphere of Sagittarius A* (between static limit and event horizon)',
        power: '1.0 × 10³⁶ W continuous extracted energy',
        propulsion: 'Negative-energy particle injection & magnetic frame-dragging',
        dimensions: 'Annular superconducting torus, 25 million km diameter'
      },
      earthChanges: {
        title: 'Mastering the Maximum Thermodynamic Limit',
        climate: 'Provides energy for cosmic web climate stabilizers protecting stellar nurseries across 100,000 light-years.',
        energy: 'Surpasses nuclear fusion (0.7% mass conversion) by achieving 29% mass-energy conversion efficiency.',
        civilization: 'Supplies boundless energy for galaxy-spanning computation and inter-universal exploration.'
      },
      spaceOutcomes: {
        exoplanets: 'Powers magnetic deflection shields around hundreds of billions of planetary systems.',
        rockets: 'Fires relativistic relativistic starships through the galactic halo at 0.99c.',
        colonization: 'Habitats housing billions anchored directly within the black hole accretion disk.'
      },
      scienceDetails: {
        physicsEquations: [
          'E_{\\text{extracted}} = \\Delta M_{\\text{irr}} c^2 \\le 0.29 M c^2 \\quad (\\text{Penrose Efficiency Upper Bound})',
          'p_0^{(3)} = p_0^{(1)} + p_0^{(2)} < 0 \\implies E_3 > E_1 \\quad (\\text{Negative Energy Trajectory in Ergosphere})'
        ],
        chemistryReactions: [
          '\\text{Exotic Matter Stabilization: } T_{\\mu\\nu} u^\\mu u^\\nu < 0 \\quad (\\text{Casimir Negative Energy Density})'
        ],
        biologyEvolution: [
          'Consciousness operates in extreme relativistic time dilation where 1 year in ergosphere = 10,000 years in deep space'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Ergosphere manifold where static observers cannot exist and space moves faster than light.',
        metricEquation: 'g_{00} = -\\left(1 - \\frac{2Mr}{\\rho^2}\\right) > 0 \\quad (\\text{Inside Ergosphere})'
      },
      transitionRequirements: {
        energyThreshold: '1.0 × 10³⁶ W continuous extraction.',
        milestones: ['Stabilization of particle injection trajectories against tidal disruption'],
        nextStage: 'Build Alcubierre warp highways connecting galactic quadrants.'
      },
      vedicPhilosophy: {
        source: 'Kaṭha Upaniṣad 2.2.15',
        verse: 'न तत्र सूर्यो भाति न चन्द्रतारकं नेमा विद्युतो भान्ति कुतोऽयमग्निः । तमेव भान्तमनुभाति सर्वं तस्य भासा सर्वमिदं विभाति ॥',
        translation: 'There the sun shines not, nor the moon and stars, nor these lightnings, much less this earthly fire. After Him, as He shines, does everything shine; by His light all this universe is illuminated.',
        meaning: 'Even in the deepest darkness of the black hole ergosphere, the supreme cosmic consciousness shines, illuminating the universe.'
      }
    },
    {
      id: 'alcubierre-hub-300',
      name: 'Alcubierre Warp Corridor Hub',
      sanskritName: 'आल्क्युबिएरे दिक्-विकृति द्वार',
      type: 3.0,
      role: 'Faster-Than-Light Spacetime Contraction & Expansion Gateway',
      category: 'megastructure',
      pos: [16, 4, -8],
      color: 0x38bdf8,
      size: 2.0,
      specs: {
        orbit: 'Stationary node in the Perseus Galactic Arm',
        power: 'Casimir negative energy generators: 10³⁴ W',
        propulsion: 'Spacetime metric contraction in front, expansion behind',
        dimensions: 'Toroidal warp ring, 500 km diameter'
      },
      earthChanges: {
        title: 'Overcoming the Speed of Light Barrier',
        climate: 'Galaxy-scale commerce and matter exchange with zero local atmospheric disturbance.',
        energy: 'Generates stabilized exotic negative energy matter to maintain macroscopic metric bubbles.',
        civilization: 'Bridges 100,000 light-years in hours, unifying the Milky Way into a single instantaneous society.'
      },
      spaceOutcomes: {
        exoplanets: 'Direct transit between Earth, Kepler-186f, and TRAPPIST-1 in minutes.',
        rockets: 'Starships travel within flat spacetime bubbles at apparent speeds of 1,000c without experiencing time dilation.',
        colonization: 'Billions of worlds interconnected with instantaneous passenger and cargo transit.'
      },
      scienceDetails: {
        physicsEquations: [
          'ds^2 = -c^2 dt^2 + [dx - v_s f(r_s) dt]^2 + dy^2 + dz^2 \\quad (\\text{Alcubierre Metric})',
          'T^{00} = -\\frac{c^4}{32\\pi G} \\frac{v_s^2 (y^2 + z^2)}{4r_s^2} \\left(\\frac{df}{dr_s}\\right)^2 < 0 \\quad (\\text{Negative Energy Density})'
        ],
        chemistryReactions: [
          '\\text{Casimir Cavity Quantum Electrodynamics: } E = -\\frac{\\pi^2 \\hbar c}{720 d^3} A'
        ],
        biologyEvolution: [
          'Biological organisms travel faster than light without experiencing G-forces or relativistic time desynchronization'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Locally flat Lorentzian bubble embedded within deformed spacetime manifold.',
        metricEquation: 'f(r_s) = \\frac{\\tanh(\\sigma(r_s + R)) - \\tanh(\\sigma(r_s - R))}{2\\tanh(\\sigma R)}'
      },
      transitionRequirements: {
        energyThreshold: '10³⁴ W negative energy density.',
        milestones: ['Stabilization of microscopic wormhole throats against quantum back-reaction'],
        nextStage: 'Expand warp network to inter-galactic filaments.'
      },
      vedicPhilosophy: {
        source: 'Ṛgveda 1.164.48',
        verse: 'द्वादश प्रधयश्चक्रमेकं त्रीणि नभ्यानि क उ तच्चिकेत ।',
        translation: 'Twelve are the fellies; the wheel is single; three are the naves: what man hath comprehended it?',
        meaning: 'The warp corridor bends the circular wheel of spacetime, fulfilling the ancient riddle of transcending distance through wisdom.'
      }
    }
  ],

  // -------------------------------------------------------------
  // STAGE 4.0: TYPE IV UNIVERSAL SPACETIME & COSMIC WEB
  // -------------------------------------------------------------
  '4': [
    {
      id: 'cosmic-web-400',
      name: 'Cosmic Web Dark Matter Filament Anchor',
      sanskritName: 'दिक्-काल जालक सूत्र (सार्वभौम संधान)',
      type: 4.0,
      role: 'Large-Scale Structure Gravitational Stabilization (Megaparsec Scale)',
      category: 'megastructure',
      pos: [0, 0, 0],
      color: 0xf2c47a,
      size: 3.5,
      specs: {
        orbit: 'Threading the cosmic web across 500 million light-years',
        power: '1.0 × 10⁴⁸ W universal dark matter and dark energy modulation',
        propulsion: 'Metric tensor topology modulation',
        dimensions: 'Filament network spanning 93 billion light-years (Observable Universe)'
      },
      earthChanges: {
        title: 'Mastery of the Universal Web',
        climate: 'Universal temperature background maintained in stable equilibrium against accelerated dark energy expansion.',
        energy: 'Extracts energy directly from the cosmic microwave background and dark matter halos.',
        civilization: 'Trillions of galaxies united into an integrated universal conscious network.'
      },
      spaceOutcomes: {
        exoplanets: 'Habitable zones engineered across entire galaxy clusters.',
        rockets: 'Transit between galaxies via cosmic web gravitational conduits.',
        colonization: 'Universal pan-consciousness spanning billions of galaxies.'
      },
      scienceDetails: {
        physicsEquations: [
          'P_{\\text{Type IV}} \\approx 10^{48}\\text{ W} \\quad (\\text{Universal Radiant & Gravitational Power})',
          '\\nabla^2 \\Phi = 4\\pi G (\\rho_m + \\rho_r + 3p/c^2) - \\Lambda c^2'
        ],
        chemistryReactions: [
          '\\text{Dark Matter Condensate Chemistry: } \\chi + \\bar{\\chi} \\leftrightarrow \\text{Pure Spacetime Metric Flux}'
        ],
        biologyEvolution: [
          'Non-corporeal consciousness woven into the gravitational filaments of the cosmic web'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Friedmann-Lemaître-Robertson-Walker metric with dynamic dark energy equation of state.',
        metricEquation: 'ds^2 = -c^2 dt^2 + a^2(t)\\left[\\frac{dr^2}{1 - kr^2} + r^2 d\\Omega^2\\right]'
      },
      transitionRequirements: {
        energyThreshold: '1.0 × 10⁴⁸ W universal scale control.',
        milestones: ['Dynamic tuning of cosmological constant w(a) ≈ -1 preventing the Big Rip'],
        nextStage: 'Breach the 3-brane to enter the 5D Kaluza-Klein bulk.'
      },
      vedicPhilosophy: {
        source: 'Bṛhadāraṇyaka Upaniṣad 3.8.8',
        verse: 'एतस्य वा अक्षरस्य प्रशासने गार्गि सूर्याचन्द्रमसौ विधृतौ तिष्ठतः ।',
        translation: 'Under the mighty rule of this Imperishable (Akṣara), O Gārgī, the sun and the moon are held in their appointed places; heaven and earth stand firm.',
        meaning: 'The universal web anchor mirrors the Akṣara (Imperishable Brahman) whose cosmic law holds galaxies and superclusters in perfect balance.'
      }
    }
  ],

  // -------------------------------------------------------------
  // STAGE 5.0: TYPE V 5D KALUZA-KLEIN & BRANEWORLD BULK
  // -------------------------------------------------------------
  '5': [
    {
      id: 'bulk-portal-500',
      name: '5D Anti-de Sitter Warped Bulk Portal',
      sanskritName: 'पञ्चमात्रिक bulk द्वार (राण्डाल-सुन्दरम सेतु)',
      type: 5.0,
      role: 'Extra-Dimensional Bulk Inhabitation & Everett Timeline Navigation',
      category: 'megastructure',
      pos: [0, 0, 0],
      color: 0xc084fc,
      size: 5.5,
      specs: {
        orbit: 'Transcends 4D spacetime; anchored in the 5D warped Anti-de Sitter bulk',
        power: '1.0 × 10⁵² W & Bulk Zero-Point Energy extraction',
        propulsion: '5D geodesic motion through warped extra dimension y',
        dimensions: 'Randall-Sundrum warp factor k ~ 1/Planck length'
      },
      earthChanges: {
        title: 'Ascension into Hyperspace',
        climate: 'Physical worlds stabilized through extra-dimensional dilaton field tuning.',
        energy: 'Draws infinite zero-point energy directly from the 5-dimensional bulk vacuum.',
        civilization: 'Consciousness inhabits the bulk, perceiving all 4D timelines as physical landscapes.'
      },
      spaceOutcomes: {
        exoplanets: 'Travel between parallel universe timelines (Everett many-worlds branches).',
        rockets: 'Ships exit the 3-brane into the bulk, re-entering 3D space light-millennia away instantaneously.',
        colonization: 'Multiversal civilization existing across infinite branching probability histories.'
      },
      scienceDetails: {
        physicsEquations: [
          'ds^2_{5D} = e^{-2k|y|} \\eta_{\\mu\\nu} dx^\\mu dx^\\nu + dy^2 \\quad (\\text{Randall-Sundrum Warped Metric})',
          '\\hat{g}_{AB} = \\begin{pmatrix} g_{\\mu\\nu} + \\kappa^2 \\phi^2 A_\\mu A_\\nu & \\kappa \\phi^2 A_\\mu \\\\ \\kappa \\phi^2 A_\\nu & \\phi^2 \\end{pmatrix} \\quad (\\text{Kaluza-Klein Unification})'
        ],
        chemistryReactions: [
          '\\text{5D Graviton Mode Coupling: } m_n = k x_n e^{-k\\pi r_c} \\quad (\\text{Kaluza-Klein Mass Tower})'
        ],
        biologyEvolution: [
          'Trans-dimensional consciousness: human identity navigates quantum probability superpositions at will'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 5,
        description: '5-Dimensional Riemannian manifold M₄ × S¹ with warped Anti-de Sitter metric.',
        metricEquation: 'ds^2 = e^{-2k|y|} g_{\\mu\\nu}(x) dx^\\mu dx^\\nu + dy^2'
      },
      transitionRequirements: {
        energyThreshold: 'Planck energy scale access in the 5D bulk.',
        milestones: ['Stabilization of 5D microscopic warp throat portals'],
        nextStage: 'Ascend to 11-dimensional M-Theory Supergravity.'
      },
      vedicPhilosophy: {
        source: 'Chāndogya Upaniṣad 8.1.1',
        verse: 'अथ यदिदमस्मिन्ब्रह्मपुरे दहरं पुण्डरीकं वेश्म दहरोऽस्मिन्नन्तराकाशस्तस्मिन्यदन्तस्तदन्वेष्टव्यम् ।',
        translation: 'Within this city of Brahman (the body) there is a small lotus chamber, and within it is a subtle inner space (Antarākāśa). What is within that space should be sought and realized.',
        meaning: 'The 5th dimension mirrors the Antarākāśa—the inner subtle space of consciousness that contains all worlds and dimensions within.'
      }
    }
  ],

  // -------------------------------------------------------------
  // STAGE 7.0: TYPE VII 11D M-THEORY & MAHAT-TATTVA
  // -------------------------------------------------------------
  '7': [
    {
      id: 'm-theory-700',
      name: '11D Calabi-Yau Moduli Resonator',
      sanskritName: 'एकादश-मात्रिक महत्तत्त्व चक्र',
      type: 7.0,
      role: 'M-Theory Supergravity Mastery & Universal Physical Law Sculpting',
      category: 'megastructure',
      pos: [0, 0, 0],
      color: 0x6fb0b2,
      size: 4.8,
      specs: {
        orbit: 'Transcends physical space; operates across all 11 dimensions of M-Theory',
        power: 'Planck Scale $1.22 \\times 10^{19}$ GeV per interaction',
        propulsion: 'Harmonic Calabi-Yau moduli transformation',
        dimensions: '10 Spatial Dimensions + 1 Time Dimension (D=11 Supergravity)'
      },
      earthChanges: {
        title: 'Dissolution of the Material Veil',
        climate: 'Material universe recognized as geometric vibration modes of 11D supermembranes.',
        energy: 'Direct manipulation of M2-branes and M5-branes generating custom physical constants.',
        civilization: 'Consciousness merged into Mahat-Tattva (Universal Intellect); total dissolution of individual ego.'
      },
      spaceOutcomes: {
        exoplanets: 'Creation of synthetic baby universes with custom laws of physics.',
        rockets: 'Displacement is obsolete: consciousness is non-local across all 11 dimensions.',
        colonization: 'Direct communion with primordial causal quantum vacuum fields.'
      },
      scienceDetails: {
        physicsEquations: [
          'S_{11} = \\frac{1}{2\\kappa_{11}^2}\\int d^{11}x \\sqrt{-g}\\left(R - \\frac{1}{2}|F_4|^2\\right) - \\frac{1}{12\\kappa_{11}^2}\\int C_3 \\wedge F_4 \\wedge F_4',
          'R_{i\\bar{j}} = 0, \\quad c_1(CY_3) = 0 \\quad (\\text{Ricci-Flat Calabi-Yau Holonomy})'
        ],
        chemistryReactions: [
          '\\text{Geometry-as-Matter: Elementary particles are topological vibration modes of 11D branes}'
        ],
        biologyEvolution: [
          'Pure holonomic consciousness existing across 11-dimensional Hilbert space (Sarvajña-Caitanya)'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 11,
        description: 'Product manifold ℝ^{3,1} × CY₃ × S¹/ℤ₂ (Horava-Witten boundary branes).',
        metricEquation: 'ds^2_{11D} = g_{\\mu\\nu}(x) dx^\\mu dx^\\nu + g_{mn}(y) dy^m dy^n + g_{11,11}(z) dz^2'
      },
      transitionRequirements: {
        energyThreshold: 'Planck energy scale $1.22 \\times 10^{19}\\text{ GeV}$.',
        milestones: ['Stabilization of all 200+ Calabi-Yau complex structure moduli'],
        nextStage: 'Approach the final thermodynamic boundary of cosmic time (~10¹⁰⁰ CE).'
      },
      vedicPhilosophy: {
        source: 'Sāṅkhya Kārikā 22',
        verse: 'प्रकृतेर्महान् ततोऽहङ्कारस्तस्माद्गणश्च षोडशकः ।',
        translation: 'From primordial unmanifest Nature (Prakṛti) arises Mahat (the Great Cosmic Intellect); from Mahat arises individualization.',
        meaning: 'Sāṅkhya reveals that before gross 3D matter emerges, the cosmos unfolds through Mahat-Tattva—the 11-dimensional cosmic intellect matrix.'
      }
    }
  ],

  // -------------------------------------------------------------
  // STAGE 9.0: TYPE IX THE FINAL OBSERVER, MAHĀPRALAYA & VISHNU
  // -------------------------------------------------------------
  '9': [
    {
      id: 'final-observer-900',
      name: 'The Final Observer (Sri Vishnu in Yoganidrā)',
      sanskritName: 'अन्तिम द्रष्टा: श्रीविष्णु योगनिद्रा एवं महाप्रलय',
      type: 9.0,
      role: 'Universal Wave Function Collapse, Absolute Memory & Cosmic Repose',
      category: 'star',
      pos: [0, 0, 0],
      color: 0xe8913a,
      size: 5.2,
      specs: {
        orbit: 'The Causal Ocean (Kāraṇodaka) beyond space and time',
        power: 'Informational Omniscience at the Thermodynamic Horizon (~10¹⁰⁰ CE)',
        propulsion: 'Unconditioned Eternal Stillness (Yoganidrā)',
        dimensions: 'Zero-dimensional Singularity (Bindu) containing infinite potential'
      },
      earthChanges: {
        title: 'The Great Dissolution (Mahāpralaya)',
        climate: 'All stars extinguished, matter evaporated via Hawking radiation; cosmic entropy reaches maximum equilibrium.',
        energy: 'Informational Omega Point: every thought, life, and love in cosmic history preserved in divine awareness.',
        civilization: 'All conscious souls re-absorbed into the body of the Supreme Witness (Advaita: Ahaṁ Brahmāsmi).'
      },
      spaceOutcomes: {
        exoplanets: 'Physical planets dissolved into their primordial unmanifest seed state (Bīja-Avyakta).',
        rockets: 'All space and time folded into the causal ocean upon which Sri Vishnu rests.',
        colonization: 'Eternal peace upon the coils of Ananta Shesha (Infinity).'
      },
      scienceDetails: {
        physicsEquations: [
          'T_H = \\frac{\\hbar c^3}{8\\pi G M k_B}, \\quad \\tau_{\\text{evap}} \\approx \\frac{5120 \\pi G^2 M^3}{\\hbar c^4} \\sim 10^{100}\\text{ years}',
          '\\lim_{t \\to t_{\\text{final}}} I(t) = \\infty \\quad (\\text{Omega Point Informational Horizon})'
        ],
        chemistryReactions: [
          'p \\to e^+ + \\pi^0 \\xrightarrow{\\text{final horizon}} |\\text{Vacuum Causal Ocean}\\rangle \\quad (\\text{Total Matter Dissolution})'
        ],
        biologyEvolution: [
          'Self-luminous unconditioned consciousness: the final transcendence of all dualities'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 0,
        description: 'Zero-dimensional point singularity containing infinite potential (Bindu).',
        metricEquation: 'ds^2 = 0 \\quad (\\text{All distance, time, and coordinates dissolve into eternity})'
      },
      transitionRequirements: {
        energyThreshold: 'Zero thermodynamic kinetic work; total infinite informational conservation.',
        milestones: ['Complete surrender and voluntary entry into divine repose (Yoganidrā)'],
        nextStage: 'The stirring of the primordial creative will (Saṁkalpa) to restart the Kalpa.'
      },
      vedicPhilosophy: {
        source: 'Bhagavad Gītā 9.7',
        verse: 'सर्वभूतानि कौन्तेय प्रकृतिं यान्ति मामिकाम् । कल्पक्षये पुनस्तानि कल्पादौ विसृजाम्यहम् ॥',
        translation: 'All created beings, O son of Kunti, enter into My material nature at the end of the Kalpa. Again, at the dawn of the next Kalpa, I project them forth.',
        meaning: 'The ultimate Type IX civilization is revealed to be God Himself: Sri Vishnu resting in Yoganidrā. The cosmos does not end in death, but in sacred divine slumber.'
      }
    }
  ],

  // -------------------------------------------------------------
  // STAGE SATYA: THE REBIRTH OF SATYA YUGA (EVENT 0: ŚVETA-VĀRĀHA KALPA)
  // -------------------------------------------------------------
  'satya': [
    {
      id: 'satya-reborn-000',
      name: 'Hiraṇyagarbha / The Golden Cosmic Egg',
      sanskritName: 'हिरण्यगर्भ • सुवर्ण प्रभात (सत्य युग पुनरागमन)',
      type: 'satya',
      role: 'Cosmic Rebirth, Pure Dharma on Four Pillars & Kalachakra Reset',
      category: 'anomaly',
      pos: [0, 0, 0],
      color: 0xfde047,
      size: 5.5,
      specs: {
        orbit: 'The Dawn of Brahmā\'s 51st Year (4.32 Billion Year Cosmic Daytime)',
        power: 'Infinite Primordial Expansion Energy (Big Bang / Sphoṭa)',
        propulsion: 'Cosmic Inflation driven by Divine Will (Saṁkalpa)',
        dimensions: 'Pristine 4D Spacetime blossoming anew from the Golden Lotus'
      },
      earthChanges: {
        title: 'The Golden Age of Truth (Satya Yuga)',
        climate: 'Pristine cosmic springtime: atmospheric purity, abundant wish-fulfilling nature, zero disease or famine.',
        energy: 'Sustained directly by solar Prāṇa and divine consciousness; zero physical machinery required.',
        civilization: 'Dharma stands complete upon all four legs: Truth (Satya), Austerity (Tapas), Purity (Śauca), and Compassion (Dayā).'
      },
      spaceOutcomes: {
        exoplanets: 'Fourteen planetary realms (Caturdaśa Bhuvana) unfolding from Brahmā\'s golden lotus.',
        rockets: 'Beings travel between celestial realms through pure spiritual meditation (Siddhis).',
        colonization: 'The wheel of time returns to Event 0: Śveta-Vārāha Kalpa dawns anew.'
      },
      scienceDetails: {
        physicsEquations: [
          'H^2 = \\left(\\frac{\\dot{a}}{a}\\right)^2 = \\frac{8\\pi G}{3}\\rho + \\frac{\\Lambda c^2}{3} \\quad (\\text{Primordial Cosmic Inflation})',
          'S_{\\text{initial}} = 0 \\implies \\text{Weyl Curvature Hypothesis: } C_{\\mu\\nu\\rho\\sigma} = 0'
        ],
        chemistryReactions: [
          '|0\\rangle \\xrightarrow{\\text{Sphoṭa / Big Bang}} \\text{Quarks} + \\text{Leptons} + \\text{Primordial Hydrogen & Helium}'
        ],
        biologyEvolution: [
          'Spiritual beings of pure truth, self-restraint, and meditation; spontaneous direct realization of oneness'
        ]
      },
      dimensionalTopology: {
        dimensionsCount: 4,
        description: 'Pristine flat Euclidean spacetime blossoming anew from the golden lotus of Brahmā.',
        metricEquation: 'ds^2 = -c^2 dt^2 + a^2(t)\\left[dr^2 + r^2 d\\Omega^2\\right] \\quad (k = 0)'
      },
      transitionRequirements: {
        energyThreshold: 'Total potential energy balancing positive matter against negative gravitational energy.',
        milestones: ['Awakening of Brahmā and chanting of the primordial Praṇava (OṀ)'],
        nextStage: 'Living in complete alignment with Truth (Satya) for 1.728 million years.'
      },
      vedicPhilosophy: {
        source: 'Mahābhārata Vana Parva 149.11',
        verse: 'कृते युगे चतुष्पात् सकलः सत्यश्च धर्मः । न चाधर्मेण विद्धः स्यात् सत्येनैव च वर्तते ॥',
        translation: 'In the Kṛta (Satya) Yuga, Dharma stands complete upon all four legs, embodying perfect Truth. Unpierced by unrighteousness, all life proceeds in truth.',
        meaning: 'The destination of cosmic evolution is not cold void, but the glorious rebirth of Satya Yuga. Time is a sacred circle: the highest science returns to the primordial Golden Age.'
      }
    }
  ]
};
