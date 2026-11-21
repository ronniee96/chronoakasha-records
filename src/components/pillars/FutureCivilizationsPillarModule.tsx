'use client';

import React, { useState } from 'react';
import { 
  Rocket, 
  Zap, 
  Orbit, 
  Shield, 
  Sparkles, 
  ArrowRight, 
  Dna, 
  Radio, 
  ChevronDown, 
  ChevronUp, 
  Globe2, 
  Atom, 
  Compass, 
  Cpu, 
  Layers,
  Flame,
  Clock,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Sliders,
  Scale,
  Activity,
  HelpCircle,
  FileText,
  PlayCircle,
  Film,
  Video,
  Eye
} from 'lucide-react';
import { 
  KARDASHEV_SCALE, 
  KardashevType, 
  FUTURE_SCENARIOS, 
  ScenarioHorizon,
  WHAT_IF_TYPE_III_VIDEO,
  DocumentaryChapter
} from '../../data/futureCivilizationsData';
import { soundManager } from '../../utils/audio';
import { MathEquation } from '../MathEquation';
import { usePresentationMode } from '../../context/PresentationModeContext';
import { PresentationMode } from '../../types/sixPillars';

interface FutureCivilizationsPillarModuleProps {
  isLightMode?: boolean;
  onLaunchDyson3D: () => void;
}

export function FutureCivilizationsPillarModule({
  isLightMode,
  onLaunchDyson3D
}: FutureCivilizationsPillarModuleProps) {
  const { mode: presentationMode, setMode: setPresentationMode, isCinematic, isResearch, isReading } = usePresentationMode();

  const [activeTab, setActiveTab] = useState<'kardashev' | 'documentary' | 'fermi' | 'transhumanism' | 'horizons'>('kardashev');
  const [selectedKType, setSelectedKType] = useState<string>('Type II');
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number>(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const activeKardashev = KARDASHEV_SCALE.find(k => k.type === selectedKType) || KARDASHEV_SCALE[2];

  const toggleFaq = (id: string) => {
    soundManager.playClick();
    setExpandedFaq(prev => prev === id ? null : id);
  };

  return (
    <div className={`w-full min-h-screen pb-24 ${
      isLightMode 
        ? 'bg-[#fcf8f2] text-[#1c140d]' 
        : 'bg-[#08090c] text-[#efe6d6]'
    }`}>
      {/* 1. Header with Mode Banner */}
      <section className="pt-8 pb-6 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto space-y-4">
        {/* Sanskrit Pillar Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8913a]/15 border border-[#e8913a]/30 text-xs font-mono font-bold text-[#e8913a] uppercase tracking-wider">
            <Rocket className="w-3.5 h-3.5" />
            <span>षष्ठ स्तम्भ • PILLAR 06: FUTURE CIVILIZATIONS (भविष्य सभ्यता)</span>
          </div>

          {/* Quick-switch Presentation Mode Bar */}
          <div className="inline-flex p-1 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md shadow-lg">
            {(['cinematic', 'research', 'reading'] as PresentationMode[]).map((m) => {
              const active = presentationMode === m;
              return (
                <button
                  key={m}
                  onClick={() => { soundManager.playClick(); setPresentationMode(m); }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                    active
                      ? m === 'cinematic' 
                        ? 'bg-amber-500 text-black shadow-md'
                        : m === 'research'
                        ? 'bg-cyan-500 text-black shadow-md'
                        : 'bg-emerald-500 text-black shadow-md'
                      : 'text-[#9ca3af] hover:text-[#efe6d6]'
                  }`}
                >
                  <span>{m === 'cinematic' ? '⚡' : m === 'research' ? '🔬' : '📖'}</span>
                  <span className="capitalize">{m}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Title based on Mode */}
        {isCinematic && (
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-[#fde047] tracking-tight leading-none drop-shadow-md">
              THE SCALE OF IMMORTALITY
            </h1>
            <p className="text-lg sm:text-xl text-[#38bdf8] font-mono font-medium">
              ⚡ Key Points & Milestones: How intelligence masters fire, planets, suns, and galaxies.
            </p>
          </div>
        )}

        {isResearch && (
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#a5f3fc] uppercase tracking-widest">
              PEER-REVIEWED ASTROPHYSICS & SANSKRIT COSMOLOGICAL FORMULATIONS
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#fde047] tracking-tight">
              भविष्य सभ्यता • ENERGETIC & METRIC TENSORS
            </h1>
            <p className="text-sm sm:text-base text-[#94a3b8] font-sans max-w-4xl leading-relaxed">
              Quantitative derivation of civilization energy scaling, Dyson sphere infrared excess thermodynamic flux, Drake equation stochastic factors, and Vedic cosmic time cycles.
            </p>
          </div>
        )}

        {isReading && (
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#f59e0b]">
              स्वाध्याय • A Quiet Journey into Tomorrow
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-medium text-[#fde047] leading-tight">
              Awakening to the Stars
            </h1>
            <p className="text-base sm:text-lg text-[#d1d5db] font-serif leading-relaxed">
              A comfortable story of how humanity climbs from lighting campfires in caves to dancing with starlight across the galaxy, told in plain language with thoughtful analogies.
            </p>
          </div>
        )}

        {/* Dyson Swarm Launch Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#20150d] via-[#15100a] to-[#0c0d12] border border-[#e8913a]/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#e8913a] flex items-center gap-1.5">
              <Orbit className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '24s' }} />
              <span>Interactive 3D Dyson Observatory</span>
            </span>
            <p className="text-xs sm:text-sm text-[#efe6d6] font-sans">
              Interact directly with the revolving 3D Sun, orbital solar collector swarms, and mathematical KaTeX metric tensor equations.
            </p>
          </div>

          <button
            onClick={() => { soundManager.bell(880, 0.2, 1.5); onLaunchDyson3D(); }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e8913a] to-[#d97706] hover:from-[#f59e0b] hover:to-[#ea580c] text-black text-xs font-mono font-extrabold transition-all shadow-md flex items-center justify-center gap-2 shrink-0 group-hover:scale-105"
          >
            <span>LAUNCH 3D DYSON SIMULATION</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 2. Spacious Segmented Navigation (NO OVERLAPPING TEXT) */}
      <section className="px-4 max-w-5xl mx-auto mb-8">
        <div className="flex items-center justify-center">
          <div className="p-1.5 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'kardashev', label: 'Kardashev Scale', icon: <Zap className="w-4 h-4 text-amber-400" /> },
              { id: 'documentary', label: 'Type I–III Video Theater', icon: <PlayCircle className="w-4 h-4 text-rose-400" /> },
              { id: 'fermi', label: 'Fermi Paradox & Filter', icon: <Radio className="w-4 h-4 text-cyan-400" /> },
              { id: 'transhumanism', label: 'Post-Biological Minds', icon: <Dna className="w-4 h-4 text-emerald-400" /> },
              { id: 'horizons', label: 'Future Horizons (2030–2300)', icon: <Clock className="w-4 h-4 text-purple-400" /> }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { soundManager.playClick(); setActiveTab(tab.id as any); }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#e8913a] to-[#b8621b] text-black shadow-lg shadow-[#e8913a]/30'
                      : 'text-[#9ca3af] hover:text-[#efe6d6] hover:bg-white/5'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Main Stage Content Area */}
      <main className="px-4 sm:px-6 md:px-12 max-w-6xl mx-auto">
        {/* ================= TAB 1: KARDASHEV SCALE ================= */}
        {activeTab === 'kardashev' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Apple-Style Tier Selector Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {KARDASHEV_SCALE.map(k => {
                const isSelected = k.type === activeKardashev.type;
                return (
                  <button
                    key={k.type}
                    onClick={() => { soundManager.playClick(); setSelectedKType(k.type); }}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 relative flex flex-col justify-between min-h-[120px] ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#2a1a10] to-[#120d09] border-[#e8913a] shadow-xl shadow-[#e8913a]/20 scale-[1.02]'
                        : 'bg-black/40 border-white/10 hover:border-white/25 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono font-bold text-[#e8913a] uppercase">
                          {k.type}
                        </span>
                        {k.type === 'Type 0' && (
                          <span className="px-2 py-0.5 rounded text-[9.5px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            EARTH ~0.73
                          </span>
                        )}
                        {k.type === 'Type II' && (
                          <span className="px-2 py-0.5 rounded text-[9.5px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            DYSON
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-serif font-bold text-[#efe6d6] leading-snug">
                        {k.name}
                      </h3>
                    </div>
                    <span className="text-xs font-serif text-[#8a7f6c] block mt-2">
                      {k.sanskrit.split('(')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ================= CINEMATIC MODE VIEW ================= */}
            {isCinematic && (
              <div className="space-y-6">
                <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#1c1209] via-[#100b06] to-[#08090c] border border-[#e8913a]/50 shadow-2xl space-y-8">
                  {/* Big Hero Number & Takeaway */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#e8913a] uppercase tracking-widest block mb-2">
                        {activeKardashev.sanskrit}
                      </span>
                      <h2 className="text-4xl sm:text-6xl font-serif font-black text-[#fde047] tracking-tight">
                        {activeKardashev.name}
                      </h2>
                    </div>

                    <div className="p-6 rounded-2xl bg-black/70 border border-amber-500/30 text-left md:text-right">
                      <span className="text-xs font-mono text-gray-400 block uppercase">
                        Power Output Benchmark
                      </span>
                      <span className="text-2xl sm:text-4xl font-mono font-black text-cyan-300 drop-shadow">
                        {activeKardashev.powerWatts.split('(')[0].trim()}
                      </span>
                    </div>
                  </div>

                  {/* 4 Punchy Key Takeaways — Only Key Points, No Fluff */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-black/50 border border-amber-500/20 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
                        <Zap className="w-4 h-4" />
                        <span>Key Energy Source</span>
                      </div>
                      <p className="text-base text-white font-medium">
                        {activeKardashev.type === 'Type 0' && 'Fossil fuels & nuclear fission (~1.8 × 10¹³ W). Bound to one rock.'}
                        {activeKardashev.type === 'Type I' && 'Total sunlight intercept & commercial fusion (1.74 × 10¹⁷ W). Climate-immune.'}
                        {activeKardashev.type === 'Type II' && 'Dyson Swarm trapping 100% star output (3.8 × 10²⁶ W). Infinite starlight.'}
                        {activeKardashev.type === 'Type III' && 'Black hole ergosphere taps & 100B star networks (10³⁸ W). Galactic command.'}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-black/50 border border-cyan-500/20 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase">
                        <Rocket className="w-4 h-4" />
                        <span>Speed & Propulsion</span>
                      </div>
                      <p className="text-base text-white font-medium">
                        {activeKardashev.type === 'Type 0' && 'Chemical rockets (11 km/s escape). Decades to cross solar space.'}
                        {activeKardashev.type === 'Type I' && 'Laser-pushed light sails & fusion torches reaching 20% speed of light.'}
                        {activeKardashev.type === 'Type II' && 'Antimatter annihilation engines & Shkadov star-moving thrusters.'}
                        {activeKardashev.type === 'Type III' && 'Alcubierre warp bubbles, wormhole transits & self-replicating von Neumann fleets.'}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-black/50 border border-purple-500/20 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase">
                        <Cpu className="w-4 h-4" />
                        <span>Civilization Mind</span>
                      </div>
                      <p className="text-base text-white font-medium">
                        {activeKardashev.type === 'Type 0' && 'Fragmented nation-states, organic carbon brains, geopolitical friction.'}
                        {activeKardashev.type === 'Type I' && 'Planetary consensus network, eradication of poverty, human-AI cybernetics.'}
                        {activeKardashev.type === 'Type II' && 'Post-biological intelligence uploaded into Matrioshka megacomputers.'}
                        {activeKardashev.type === 'Type III' && 'Transcendent galactic hive consciousnesses communicating across light-centuries.'}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-black/50 border border-rose-500/20 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase">
                        <Shield className="w-4 h-4" />
                        <span>Survival Horizon</span>
                      </div>
                      <p className="text-base text-white font-medium">
                        {activeKardashev.type === 'Type 0' && 'High extinction risk: nuclear winter, climate tipping points, runaway AI.'}
                        {activeKardashev.type === 'Type I' && 'Immune to planetary collapse. Settlements on Moon & Mars provide backups.'}
                        {activeKardashev.type === 'Type II' && 'Immune to planetary and asteroid extinction. Stellar lifetime: billions of years.'}
                        {activeKardashev.type === 'Type III' && 'Eternal civilizational persistence across cosmic heat death eras.'}
                      </p>
                    </div>
                  </div>

                  {/* What If Documentary Highlights for this Tier */}
                  {activeKardashev.videoHighlights && (
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1c1209] via-black to-[#130b06] border border-amber-500/40 space-y-4 shadow-xl">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                          <Film className="w-4 h-4 text-rose-400" />
                          <span>What If Documentary Insights • {activeKardashev.type}</span>
                        </div>
                        <button
                          onClick={() => {
                            soundManager.playClick();
                            setActiveTab('documentary');
                          }}
                          className="px-3 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5 transition-all active:scale-95"
                        >
                          <PlayCircle className="w-3.5 h-3.5 text-rose-400" />
                          <span>Watch Type I–III Video Theater</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                        <div className="p-4 rounded-xl bg-black/60 border border-amber-500/20 space-y-1.5">
                          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                            Core Breakthrough
                          </span>
                          <p className="text-xs text-gray-200 font-serif leading-relaxed">
                            {activeKardashev.videoHighlights.breakthrough}
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/20 space-y-1.5">
                          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                            AI & Computational Catalyst
                          </span>
                          <p className="text-xs text-gray-200 font-serif leading-relaxed">
                            {activeKardashev.videoHighlights.accelerator}
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-black/60 border border-rose-500/20 space-y-1.5">
                          <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider block">
                            The Existential Gate / Filter
                          </span>
                          <p className="text-xs text-gray-200 font-serif leading-relaxed">
                            {activeKardashev.videoHighlights.existentialGate}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ================= RESEARCH MODE VIEW ================= */}
            {isResearch && (
              <div className="space-y-6">
                <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#14100c] via-[#0d0b08] to-[#08090c] border border-cyan-500/30 shadow-2xl space-y-8">
                  {/* Research Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 font-bold">
                        <span>ASTROPHYSICS FORMULATION & RIGOROUS DATA MATRIX</span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#fde047]">
                        {activeKardashev.name} ({activeKardashev.type})
                      </h2>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/60 border border-cyan-500/20 font-mono text-xs text-right">
                      <span className="text-gray-400 block">Exact Power Formulation</span>
                      <span className="text-cyan-300 font-bold text-sm">{activeKardashev.powerWatts}</span>
                    </div>
                  </div>

                  {/* KaTeX Mathematical Formulas */}
                  <div className="p-6 rounded-2xl bg-black/60 border border-cyan-500/30 space-y-4">
                    <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                      <Atom className="w-4 h-4 text-cyan-400" />
                      <span>Mathematical Equations & Governing Laws</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Kardashev Log Equation */}
                      <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                        <span className="text-[11px] font-mono text-gray-300 font-bold block">
                          Nikolay Kardashev (1964) & Sagan Scaling:
                        </span>
                        <div className="text-amber-300 py-2">
                          <MathEquation equation="K = \frac{\log_{10} P - 6}{10}" displayMode={true} />
                        </div>
                        <p className="text-[11px] font-mono text-gray-400">
                          Where P is power consumption in Watts. For modern Earth: P ≈ 1.8 × 10¹³ W ⟹ K = 0.726.
                        </p>
                      </div>

                      {/* Dyson Flux Equilibrium Equation */}
                      <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                        <span className="text-[11px] font-mono text-gray-300 font-bold block">
                          Dyson Sphere Blackbody Flux (Dyson 1960):
                        </span>
                        <div className="text-cyan-300 py-2">
                          <MathEquation equation="L_{\text{waste}} = 4\pi R^2 \sigma T^4 \quad (\lambda_{\text{peak}} \approx 9.66\,\mu\text{m})" displayMode={true} />
                        </div>
                        <p className="text-[11px] font-mono text-gray-400">
                          Total star luminosity re-emitted as mid-infrared waste radiation at 300 K blackbody equilibrium.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Rigorous Specifications Data Table */}
                  <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-white/5 border-b border-white/10 text-gray-300 uppercase">
                        <tr>
                          <th className="p-4">Dimension</th>
                          <th className="p-4">Quantitative Value / Engineering Architecture</th>
                          <th className="p-4">Epistemic Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10 text-gray-300">
                        <tr>
                          <td className="p-4 font-bold text-amber-400">Power Magnitude</td>
                          <td className="p-4">{activeKardashev.powerWatts}</td>
                          <td className="p-4"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">Fact (Physics)</span></td>
                        </tr>
                        <tr>
                          <td className="p-4 font-bold text-cyan-400">Energy Harnessing</td>
                          <td className="p-4">{activeKardashev.energyHarnessScale}</td>
                          <td className="p-4"><span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 font-bold border border-sky-500/30">Engineering Design</span></td>
                        </tr>
                        <tr>
                          <td className="p-4 font-bold text-purple-400">Propulsion & Transit</td>
                          <td className="p-4">{activeKardashev.propulsionMechanism}</td>
                          <td className="p-4"><span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-bold border border-purple-500/30">Theoretical Metric</span></td>
                        </tr>
                        <tr>
                          <td className="p-4 font-bold text-emerald-400">Technosignatures</td>
                          <td className="p-4">{activeKardashev.astrophysicalFootprint}</td>
                          <td className="p-4"><span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-bold border border-indigo-500/30">Observable Proxy</span></td>
                        </tr>
                        <tr>
                          <td className="p-4 font-bold text-rose-400">Physical Limitations</td>
                          <td className="p-4">{activeKardashev.limitationsAndPhysics}</td>
                          <td className="p-4"><span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30">Thermodynamic Law</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Sanskrit Scriptural Proofs & Epistemic Alignment */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1f150c] to-[#0f0b07] border border-[#e8913a]/30 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#fde047] uppercase">
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      <span>प्रमाण • Authentic Sanskrit Scriptural Proofs</span>
                    </div>
                    <div className="space-y-2 text-sm text-[#efe6d6] font-serif leading-relaxed">
                      <p>
                        <b>ऋग्वेद (Rigveda 10.129.2 — नासदीय सूक्त):</b> <span className="text-amber-200">“आनीदवातं स्वधया तदेकं तस्माद्धान्यन्न परः किञ्चनास”</span> — (That One breathed, windless, by its own self-sustaining power; besides it there was nothing whatsoever beyond).
                      </p>
                      <p className="text-xs text-[#b5a990] pt-1">
                        <b>विष्णु पुराण (Vishnu Purana 1.3.15):</b> Brahma&apos;s day is calibrated to exactly 1,000 Mahayugas (4.32 × 10⁹ solar years), acknowledging that material civilizations expand and dissolve in cosmic cycles bounded by universal entropy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= READING MODE VIEW ================= */}
            {isReading && (
              <div className="space-y-8 max-w-3xl mx-auto py-4">
                <article className="prose prose-invert lg:prose-xl space-y-6 text-[#dcd6cc] font-serif leading-loose text-lg">
                  <div className="border-b border-white/10 pb-6 mb-8">
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-2">
                      Chapter 1 • The Four Bonfires of Civilization
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#fde047] leading-tight">
                      {activeKardashev.name}: Learning to Catch the Stars
                    </h2>
                  </div>

                  <p>
                    Imagine human history as learning to build bigger and bigger campfires. Ten thousand years ago, during cold glacial nights, our ancestors gathered around crackling twigs to push back the dark and roast food. That tiny spark was our first step on the cosmic ladder.
                  </p>

                  <div className="p-6 rounded-2xl bg-[#1c140d]/60 border-l-4 border-amber-500 my-6">
                    <p className="text-base text-amber-200 font-serif italic mb-0">
                      &ldquo;Today, on Earth, we are still children playing with buried embers. Carl Sagan estimated our civilization at Type 0.73—burning the ancient, crushed remains of prehistoric ferns and microscopic sea life to power our phones and airplanes.&rdquo;
                    </p>
                  </div>

                  <p>
                    {activeKardashev.type === 'Type 0' && (
                      <>
                        Being a <b>Type 0 civilization</b> means we are tethered to the cradle. If a rogue asteroid enters our orbital path or our climate swings violently, all our art, libraries, and memories could vanish in an afternoon. Our challenge today is not just technological—it is growing wise enough to survive our own machines.
                      </>
                    )}

                    {activeKardashev.type === 'Type I' && (
                      <>
                        Reaching <b>Type I</b> is like a teenager learning to ride a bicycle without training wheels. A planetary civilization does not destroy its weather; it harmonizes with it. By capturing the sunlight hitting our globe and mastering fusion—the gentle power that lights the Sun—we ensure no child on Earth ever experiences energy scarcity again.
                      </>
                    )}

                    {activeKardashev.type === 'Type II' && (
                      <>
                        Now close your eyes and picture a <b>Dyson Swarm</b>. Forget science fiction movies showing giant, hollow glass shells that would shatter under gravity. Picture instead a swirling, shimmering dance of millions of feather-light solar mirrors. Like golden fireflies orbiting the Sun, they catch starlight and beam warmth across billions of miles of silent space. At this stage, humanity can never go extinct from an asteroid strike.
                      </>
                    )}

                    {activeKardashev.type === 'Type III' && (
                      <>
                        At <b>Type III</b>, intelligence embraces the entire Milky Way. Hundreds of billions of suns become connected like beads on a single glowing necklace. Time itself begins to feel different: across a galaxy that takes a hundred thousand years for light to cross, intelligence moves with the patience of mountain ranges, perfectly at peace with the cosmos.
                      </>
                    )}
                  </p>

                  <div className="pt-6 border-t border-white/10 text-sm text-[#9ca3af] font-sans flex items-center justify-between">
                    <span>Ponder this: Which type will humanity reach first before your grandchildren grow old?</span>
                    <span className="text-amber-400 font-mono">Pillar 06</span>
                  </div>
                </article>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: TYPE I–III VIDEO DOCUMENTARY THEATER ================= */}
        {activeTab === 'documentary' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            {/* Video Theater Hero Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs uppercase tracking-widest shadow-sm">
                <Film className="w-3.5 h-3.5" />
                <span>WHAT IF SCIENCE SHOW • FULL TYPE I–III SCIENTIFIC EXPEDITION</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#fde047] tracking-tight">
                What If Earth Became a Type III Civilization?
              </h2>
              <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed">
                Trace humanity&apos;s ascent across the Kardashev boundary: from our fragile 0.73 planetary baseline, to AI-accelerated nuclear fusion, Freeman Dyson&apos;s stellar engines, and self-replicating robotic fleets colonizing all 100 billion stars of the Milky Way.
              </p>
            </div>

            {/* Responsive 16:9 YouTube Video Embed Player */}
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.25)] bg-black max-w-5xl mx-auto">
              <div className="aspect-video w-full bg-black">
                <iframe
                  src="https://www.youtube.com/embed/VGLSPU8lprc?rel=0"
                  title="What If Earth Became a Type III Civilization?"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Floating Meta Bar under Video */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#18110a] via-[#0f0c08] to-[#18110a] border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                    <PlayCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-bold text-white">
                      {WHAT_IF_TYPE_III_VIDEO.title}
                    </h4>
                    <span className="text-xs font-mono text-gray-400">
                      Channel: {WHAT_IF_TYPE_III_VIDEO.creator} • Kardashev Type 0.73 to Type III Trajectory
                    </span>
                  </div>
                </div>

                <a
                  href={WHAT_IF_TYPE_III_VIDEO.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-amber-300 border border-white/15 transition-all flex items-center gap-2 active:scale-95"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Interactive Chapter Timestamps */}
            <div className="space-y-4 max-w-5xl mx-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Documentary Chapters & Scientific Proofs</span>
                </span>
                <span className="text-xs font-mono text-gray-400">
                  Click any chapter to inspect quantitative proofs
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
                {WHAT_IF_TYPE_III_VIDEO.chapters.map((chapter, idx) => {
                  const isSelected = selectedChapterIndex === idx;
                  return (
                    <button
                      key={chapter.timestamp}
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedChapterIndex(idx);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/10'
                          : 'bg-black/50 border-white/10 hover:border-white/25 hover:bg-white/5 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-extrabold bg-black/60 border border-amber-500/30 text-amber-400">
                          {chapter.timestamp}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">
                          Part 0{idx + 1}
                        </span>
                      </div>
                      <h5 className="text-xs font-serif font-bold text-white line-clamp-1">
                        {chapter.title.split(':')[0]}
                      </h5>
                      <p className="text-[10.5px] font-mono text-gray-400 line-clamp-1 mt-0.5">
                        {chapter.tagline}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Selected Chapter Detail Card */}
              {WHAT_IF_TYPE_III_VIDEO.chapters[selectedChapterIndex] && (
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1c130c] via-[#110c07] to-black border border-amber-500/40 shadow-xl space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
                        Chapter 0{selectedChapterIndex + 1} • {WHAT_IF_TYPE_III_VIDEO.chapters[selectedChapterIndex].timestamp}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-black text-[#fde047] mt-0.5">
                        {WHAT_IF_TYPE_III_VIDEO.chapters[selectedChapterIndex].title}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-cyan-300 mt-1">
                        {WHAT_IF_TYPE_III_VIDEO.chapters[selectedChapterIndex].tagline}
                      </p>
                    </div>

                    <a
                      href={`${WHAT_IF_TYPE_III_VIDEO.url}&t=${WHAT_IF_TYPE_III_VIDEO.chapters[selectedChapterIndex].seconds}s`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-mono font-bold flex items-center gap-2 self-start md:self-auto shrink-0 transition-all active:scale-95"
                    >
                      <PlayCircle className="w-4 h-4 text-amber-400" />
                      <span>Jump to {WHAT_IF_TYPE_III_VIDEO.chapters[selectedChapterIndex].timestamp} in Video</span>
                    </a>
                  </div>

                  <p className="text-sm sm:text-base text-gray-200 font-sans leading-relaxed">
                    {WHAT_IF_TYPE_III_VIDEO.chapters[selectedChapterIndex].description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider block">
                      Core Scientific Proofs & Quantitative Facts:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {WHAT_IF_TYPE_III_VIDEO.chapters[selectedChapterIndex].keyPoints.map((pt, pIdx) => (
                        <div key={pIdx} className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                            {pIdx + 1}
                          </span>
                          <span className="text-xs text-gray-300 font-serif leading-relaxed">
                            {pt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3 High-Resolution Concept Cards & Infographics */}
            <div className="space-y-6 max-w-5xl mx-auto pt-6">
              <div className="text-center space-y-1.5">
                <span className="text-xs font-mono font-bold text-[#e8913a] uppercase tracking-widest">
                  ARCHITECTURAL INFOGRAPHICS • THREE TIERS OF ASCENT
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif font-black text-[#efe6d6]">
                  The Evolutionary Leaps of Kardashev Civilizations
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Tier 1 Infographic Card */}
                <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-b from-[#0a1824] via-[#071018] to-black p-6 space-y-4 shadow-xl flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-md">
                      <Atom className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10.5px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                        TIER I: PLANETARY HARNESS (~10¹⁷ W)
                      </span>
                      <h4 className="text-lg font-serif font-bold text-white mt-0.5">
                        AI Tokamaks & Weather Control
                      </h4>
                    </div>
                    <p className="text-xs text-gray-300 font-serif leading-relaxed">
                      Accelerated by Google DeepMind&apos;s GNoME (identifying 2.2M crystal structures in days) and UKAEA supercomputing tokamak plasma stabilization, humanity taps clean fusion while mastering planetary atmosphere and thermal dissipation.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-cyan-500/20 text-[11px] font-mono text-cyan-300 space-y-1">
                    <div className="flex justify-between"><span>Baseline Earth:</span><span className="font-bold text-white">0.726 (2026)</span></div>
                    <div className="flex justify-between"><span>Target Power:</span><span className="font-bold text-white">1.74 × 10¹⁷ W</span></div>
                    <div className="flex justify-between"><span>Key Filter:</span><span className="font-bold text-white">Heat dissipation</span></div>
                  </div>
                </div>

                {/* Tier 2 Infographic Card */}
                <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-b from-[#24170a] via-[#150f07] to-black p-6 space-y-4 shadow-xl flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-md">
                      <Orbit className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10.5px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                        TIER II: STELLAR SWARM (~3.8 × 10²⁶ W)
                      </span>
                      <h4 className="text-lg font-serif font-bold text-white mt-0.5">
                        Dyson Swarms & Shkadov Thrusters
                      </h4>
                    </div>
                    <p className="text-xs text-gray-300 font-serif leading-relaxed">
                      Freeman Dyson&apos;s 1960 thesis realized: billions of orbital photovoltaic statites trap 100% of the Sun&apos;s photons. Asymmetric radiation pressure creates a Shkadov Thruster—steering the entire solar system through space while laser arrays harvest water from comets.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-amber-500/20 text-[11px] font-mono text-amber-300 space-y-1">
                    <div className="flex justify-between"><span>Solar Luminosity:</span><span className="font-bold text-white">3.828 × 10²⁶ W</span></div>
                    <div className="flex justify-between"><span>Stellar Engine:</span><span className="font-bold text-white">Shkadov Thruster</span></div>
                    <div className="flex justify-between"><span>Resource Base:</span><span className="font-bold text-white">Mercury + Asteroids</span></div>
                  </div>
                </div>

                {/* Tier 3 Infographic Card */}
                <div className="rounded-2xl border border-purple-500/40 bg-gradient-to-b from-[#1c0d24] via-[#110717] to-black p-6 space-y-4 shadow-xl flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-md">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10.5px] font-mono font-bold text-purple-400 uppercase tracking-wider">
                        TIER III: GALACTIC NET (~10³⁸ W)
                      </span>
                      <h4 className="text-lg font-serif font-bold text-white mt-0.5">
                        Von Neumann Fleets & Hive-Minds
                      </h4>
                    </div>
                    <p className="text-xs text-gray-300 font-serif leading-relaxed">
                      Self-replicating Von Neumann robotic probe swarms land on dead moons, duplicate exponentially, and sweep across the 100,000 light-year Milky Way disc. Organic life gives way to post-biological minds acting as one integrated cosmic entity reaching toward Andromeda.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-purple-500/20 text-[11px] font-mono text-purple-300 space-y-1">
                    <div className="flex justify-between"><span>Milky Way Stars:</span><span className="font-bold text-white">100–400 Billion</span></div>
                    <div className="flex justify-between"><span>Traversal Span:</span><span className="font-bold text-white">100,000 Light-Years</span></div>
                    <div className="flex justify-between"><span>Next Horizon:</span><span className="font-bold text-white">Andromeda Galaxy</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vedic-Cosmology Harmonization */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#20150d] via-[#140e09] to-[#0d0906] border border-amber-500/30 shadow-2xl max-w-5xl mx-auto space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🕉️</span>
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                    RIGVEDA & PURANIC SYNTHESIS • ब्रह्मज्ञान
                  </span>
                  <h4 className="text-xl font-serif font-bold text-[#fde047]">
                    From Nasadiya Sukta to Galactic Super-Beings
                  </h4>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 font-serif leading-relaxed">
                Thousands of years before Kardashev or Freeman Dyson, the <em>Rigveda</em> (Nasadiya Sukta 10.129) questioned: <em>&ldquo;Who really knows? Who will here proclaim it? Whence was it produced? Whence is this creation?&rdquo;</em> Similarly, the <em>Bhagavata Purana (3.11)</em> envisioned millions of distinct cosmic eggs (Brahmandas) drifting like microscopic specks of dust within the breath of Maha-Vishnu. A Type III civilization realizes in physical engineering what ancient rishis grasped through direct contemplative vision: that intelligence and the universe are an inseparable, self-unfolding continuum.
              </p>
            </div>
          </div>
        )}

        {/* ================= TAB 3: FERMI PARADOX & DRAKE EQUATION ================= */}
        {activeTab === 'fermi' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* ================= CINEMATIC FERMI ================= */}
            {isCinematic && (
              <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#101426] via-[#0b0e1b] to-[#07080b] border border-[#38bdf8]/50 shadow-2xl space-y-8">
                <div className="border-b border-white/10 pb-6">
                  <span className="text-xs font-mono font-bold text-[#38bdf8] uppercase tracking-widest block mb-2">
                    THE GREAT COSMIC QUESTION
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-serif font-black text-white">
                    100 BILLION STARS. ZERO WHISPERS.
                  </h2>
                  <p className="text-lg text-cyan-300 font-mono mt-2">
                    If intelligent life is natural, the Milky Way should be saturated with radio beacons. Why the silence?
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-black/60 border border-amber-500/30 space-y-3">
                    <span className="text-3xl font-mono font-black text-amber-400">01</span>
                    <h3 className="text-xl font-serif font-bold text-[#fde047]">The Great Filter</h3>
                    <p className="text-sm text-gray-200">
                      Either life is nearly impossible to start (we won the cosmic lottery), or technology inevitably destroys itself before reaching the stars.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-black/60 border border-cyan-500/30 space-y-3">
                    <span className="text-3xl font-mono font-black text-cyan-400">02</span>
                    <h3 className="text-xl font-serif font-bold text-cyan-300">The Zoo Sanctuary</h3>
                    <p className="text-sm text-gray-200">
                      Super-civilizations already know we are here, but enforce a strict quarantine protocol to let our species evolve undisturbed.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-3">
                    <span className="text-3xl font-mono font-black text-emerald-400">03</span>
                    <h3 className="text-xl font-serif font-bold text-emerald-300">Substrate Migration</h3>
                    <p className="text-sm text-gray-200">
                      Civilizations don&apos;t travel in noisy metal ships. They move inwards into quantum computational matrices at absolute zero.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ================= RESEARCH FERMI ================= */}
            {isResearch && (
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#121624] via-[#0d101a] to-[#07080b] border border-[#38bdf8]/35 shadow-2xl space-y-8">
                <div className="space-y-2 border-b border-white/10 pb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38bdf8]/15 text-xs font-mono font-bold text-[#a5f3fc]">
                    <span>फर्मी विरोधाभास • DRAKE EQUATION & PERCOLATION MODELS</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                    The Mathematical Formulations of Cosmic Silence
                  </h2>
                </div>

                {/* Drake Equation in KaTeX */}
                <div className="p-6 rounded-2xl bg-black/60 border border-cyan-500/30 space-y-4">
                  <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    Frank Drake Equation (1961)
                  </div>
                  <div className="text-amber-300 py-2">
                    <MathEquation equation="N = R_* \cdot f_p \cdot n_e \cdot f_l \cdot f_i \cdot f_c \cdot L" displayMode={true} />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-gray-300 pt-2 border-t border-white/10">
                    <div><b>R*</b> = 1.5–3 stars/yr</div>
                    <div><b>f_p</b> ≈ 1.0 (Kepler)</div>
                    <div><b>n_e</b> ≈ 0.4 Earths/system</div>
                    <div><b>L</b> = Lifetime (unknown)</div>
                  </div>
                </div>

                {/* Hart-Tipler Conjecture */}
                <div className="p-6 rounded-2xl bg-black/50 border border-white/10 space-y-3">
                  <h3 className="text-lg font-serif font-bold text-cyan-300">Hart-Tipler Spatial Percolation Velocity</h3>
                  <div className="text-cyan-200 py-1">
                    <MathEquation equation="T_{\text{percolate}} = \frac{D_{\text{galaxy}}}{v_{\text{probe}}} \approx \frac{100{,}000\,\text{ly}}{0.01\,c} = 10^7\,\text{years}" displayMode={true} />
                  </div>
                  <p className="text-xs font-mono text-gray-300">
                    Even at a modest 1% the speed of light, self-replicating von Neumann probes would traverse and colonize every stellar system in the Milky Way in only 10 million years—less than 0.1% of the galaxy&apos;s age.
                  </p>
                </div>

                {/* Vedic Reference */}
                <div className="p-5 rounded-2xl bg-[#191512] border border-[#e8913a]/30 space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase block">
                    भागवत पुराण (Bhagavata Purana 6.16.37 — अनन्त ब्रह्माण्ड):
                  </span>
                  <p className="text-sm text-[#efe6d6] font-serif leading-relaxed">
                    “In You, the supreme unlimited truth, countless universes (*ananta-koti-brahmanda*) move like specks of dust in the wind.” Vedic ontology anticipated infinite parallel inhabited realms without requiring physical radio contact between them.
                  </p>
                </div>
              </div>
            )}

            {/* ================= READING FERMI ================= */}
            {isReading && (
              <div className="space-y-8 max-w-3xl mx-auto py-4">
                <article className="prose prose-invert lg:prose-xl space-y-6 text-[#dcd6cc] font-serif leading-loose text-lg">
                  <div className="border-b border-white/10 pb-6 mb-8">
                    <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
                      Chapter 2 • The Whispering Forest
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                      Why the Night Sky is Quiet
                    </h2>
                  </div>

                  <p>
                    On a warm summer afternoon in 1950, a group of scientists was walking to lunch at Los Alamos, New Mexico. Among them was Enrico Fermi, a Nobel-prize-winning physicist known for solving colossal problems in his head with simple calculations. They had been chuckling about a cartoon in <i>The New Yorker</i> showing aliens stealing trash cans.
                  </p>

                  <p>
                    Over soup, Fermi suddenly blurted out: <b>&ldquo;Where is everybody?&rdquo;</b>
                  </p>

                  <p>
                    His companions understood immediately. Our galaxy has been spinning for thirteen billion years. Our Sun is a latecomer—billions of stars had already formed, matured, and given birth to planets long before Earth even cooled into rock. If life is natural, travelers should have crossed the starry sea thousands of times over.
                  </p>

                  <div className="p-6 rounded-2xl bg-[#121624]/70 border-l-4 border-cyan-400 my-6">
                    <p className="text-base text-cyan-200 font-serif italic mb-0">
                      &ldquo;Think of stepping into a deep forest at midnight. If you hear no birds singing, it doesn&apos;t mean the woods are empty. It might simply mean the creatures know the night belongs to quiet watchers.&rdquo;
                    </p>
                  </div>

                  <p>
                    Perhaps advanced civilizations don&apos;t shout into the sky with noisy radio waves, just as we no longer send smoke signals. Perhaps they whisper with light, or have turned their attention inward to exploring the infinite landscapes of consciousness. The cosmic silence is not an empty room—it is an invitation to listen more gently.
                  </p>
                </article>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: POST-BIOLOGICAL MINDS ================= */}
        {activeTab === 'transhumanism' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* ================= CINEMATIC MINDS ================= */}
            {isCinematic && (
              <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#1a1124] via-[#100a18] to-[#07080b] border border-purple-500/50 shadow-2xl space-y-8">
                <div className="border-b border-white/10 pb-6">
                  <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-widest block mb-2">
                    BEYOND CARBON CELLS
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-serif font-black text-white">
                    CONSCIOUSNESS UNBOUND
                  </h2>
                  <p className="text-lg text-purple-200 font-mono mt-2">
                    Carbon chemistry lasts 100 years. Substrate-independent minds endure for trillions.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-black/60 border border-amber-500/30 space-y-2">
                    <Dna className="w-8 h-8 text-amber-400 mb-2" />
                    <h3 className="text-xl font-serif font-bold text-[#fde047]">Radiation Armor</h3>
                    <p className="text-sm text-gray-200">
                      Deinococcus radiodurans enzymes integrated into human DNA, neutralizing solar flares and deep-space cosmic rays.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-black/60 border border-cyan-500/30 space-y-2">
                    <Cpu className="w-8 h-8 text-cyan-400 mb-2" />
                    <h3 className="text-xl font-serif font-bold text-cyan-300">Quantum Neural Fabric</h3>
                    <p className="text-sm text-gray-200">
                      Connectome uploaded to molecular lattice matrices operating at zero-kelvin cosmic sinks without thermal noise.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
                    <Sparkles className="w-8 h-8 text-emerald-400 mb-2" />
                    <h3 className="text-xl font-serif font-bold text-emerald-300">Star Lifespans</h3>
                    <p className="text-sm text-gray-200">
                      Liberated from biological decay. Consciousness survives the death of planets and navigates stellar epochs.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ================= RESEARCH MINDS ================= */}
            {isResearch && (
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#18111e] via-[#110c17] to-[#07080b] border border-purple-500/35 shadow-2xl space-y-8">
                <div className="space-y-2 border-b border-white/10 pb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 text-xs font-mono font-bold text-purple-300">
                    <span>मानवेत्तर विकास • THERMODYNAMIC LIMITS & SUBSTRATE ENGINEERING</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                    Thermodynamics of Post-Biological Cognition
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Landauer's Principle */}
                  <div className="p-6 rounded-2xl bg-black/50 border border-purple-500/30 space-y-3">
                    <span className="text-xs font-mono font-bold text-purple-300 uppercase block">
                      Landauer&apos;s Erasure Limit (Landauer 1961):
                    </span>
                    <div className="text-purple-200 py-2">
                      <MathEquation equation="E_{\min} = k_B T \ln 2 \approx 2.87 \times 10^{-21}\,\text{J at 300 K}" displayMode={true} />
                    </div>
                    <p className="text-xs font-mono text-gray-400">
                      Any irreversible computation dissipates thermodynamic heat. In deep space (T ≈ 2.7 K), computing efficiency jumps by orders of magnitude.
                    </p>
                  </div>

                  {/* Bremermann's Limit */}
                  <div className="p-6 rounded-2xl bg-black/50 border border-purple-500/30 space-y-3">
                    <span className="text-xs font-mono font-bold text-purple-300 uppercase block">
                      Bremermann&apos;s Quantum Computational Bound:
                    </span>
                    <div className="text-purple-200 py-2">
                      <MathEquation equation="\dot{I}_{\max} = \frac{m c^2}{\pi \hbar} \approx 1.36 \times 10^{50}\,\text{bits/s/kg}" displayMode={true} />
                    </div>
                    <p className="text-xs font-mono text-gray-400">
                      The maximum computational capacity of matter governed by Einstein&apos;s mass-energy equivalence and Heisenberg&apos;s uncertainty principle.
                    </p>
                  </div>
                </div>

                {/* Katha Upanishad Isomorphism */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-[#2a1a10] to-[#120d09] border border-[#e8913a]/30 space-y-3">
                  <span className="text-xs font-mono font-bold text-[#fde047] uppercase block">
                    कठोपनिषद् (Katha Upanishad 1.3.3–4):
                  </span>
                  <p className="text-base text-amber-200 font-serif leading-relaxed">
                    “आत्मानं रथिनं विद्धि शरीरं रथमेव तु । बुद्धिं तु सारथिं विद्धि मनः प्रग्रहमेव च ॥”
                  </p>
                  <p className="text-xs text-[#b5a990] font-serif leading-relaxed">
                    (Know the Self as the rider of the chariot, and the body as merely the vehicle. Know the intellect as the charioteer, and the mind as the reins). Ancient Vedic thought established thousands of years ago that the conscious observer is fundamentally independent of the material chariot.
                  </p>
                </div>
              </div>
            )}

            {/* ================= READING MINDS ================= */}
            {isReading && (
              <div className="space-y-8 max-w-3xl mx-auto py-4">
                <article className="prose prose-invert lg:prose-xl space-y-6 text-[#dcd6cc] font-serif leading-loose text-lg">
                  <div className="border-b border-white/10 pb-6 mb-8">
                    <span className="text-xs font-mono uppercase tracking-widest text-purple-400 block mb-2">
                      Chapter 3 • Stepping Out of the Chariot
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                      The Mind Beyond Meat and Bone
                    </h2>
                  </div>

                  <p>
                    Everything we have ever loved—our favorite songs, the laughter of old friends, the feeling of rain on our skin—is processed inside a small, dark bone bowl called the skull, using three pounds of wet carbon cells that run on water and glucose.
                  </p>

                  <p>
                    It is a wonderful, miraculous machine. But it is fragile. It cannot survive the freezing vacuum of space, it cannot endure the radiation of a solar flare, and after roughly eighty or ninety orbits around our Sun, its cellular gears wear down and cease.
                  </p>

                  <div className="p-6 rounded-2xl bg-[#1a1124]/70 border-l-4 border-purple-400 my-6">
                    <p className="text-base text-purple-200 font-serif italic mb-0">
                      &ldquo;In the ancient Katha Upanishad, the sage Yamaraja explains to the young seeker Nachiketa that the body is just a wooden chariot. The true consciousness—the Atman—is the rider inside. If the wooden chariot breaks down, the rider does not die.&rdquo;
                    </p>
                  </div>

                  <p>
                    Modern scientists are now exploring this very same truth. Just as you can move a piece of music from an old vinyl record to a cassette tape, and then to a phone, our memories and minds may eventually transition into light, silicon, and quantum fields. We will not be leaving our humanity behind; we will be giving our minds the wings they need to touch the stars.
                  </p>
                </article>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: FUTURE HORIZONS (2030 – 2300) ================= */}
        {activeTab === 'horizons' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Header */}
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#fde047]">
                Milestone Horizons: 2030 to 2300 CE
              </h2>
              <p className="text-xs sm:text-sm text-[#9ca3af] font-sans">
                {isCinematic && '⚡ Immediate Key Breakthroughs & Existential Risk Levels.'}
                {isResearch && '🔬 Statistical Confidence Ratings, Climate Matrices & Risk Scenarios.'}
                {isReading && '📖 A Gentle Timeline: What Life Might Feel Like in Each Era.'}
              </p>
            </div>

            <div className="space-y-4">
              {FUTURE_SCENARIOS.map((sc) => (
                <div 
                  key={sc.yearCE}
                  className="p-6 rounded-2xl bg-black/50 border border-white/10 hover:border-[#e8913a]/40 transition-all space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-xl bg-[#e8913a]/20 border border-[#e8913a]/40 text-[#fde047] font-mono font-bold text-sm">
                        {sc.yearCE} CE
                      </span>
                      <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                        {sc.label.split(':')[1]?.trim() || sc.label}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold ${
                        sc.existentialRiskLevel === 'Low' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                        sc.existentialRiskLevel === 'Medium' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' :
                        sc.existentialRiskLevel === 'Elevated' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}>
                        Risk: {sc.existentialRiskLevel}
                      </span>
                      {isResearch && (
                        <span className="text-xs font-mono text-gray-400">
                          Confidence: {sc.confidenceRating}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Cinematic view: only 1 punchy advancement */}
                  {isCinematic && (
                    <div className="text-sm font-medium text-amber-200">
                      ⭐ <b>Primary Breakthrough:</b> {sc.technologicalAdvancements[0]}
                    </div>
                  )}

                  {/* Research view: full breakdown */}
                  {isResearch && (
                    <div className="space-y-3 text-xs font-mono">
                      <div>
                        <span className="text-gray-400 block mb-1">Technological Advancements:</span>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                          {sc.technologicalAdvancements.map((tech, tIdx) => (
                            <li key={tIdx}>{tech}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-2 border-t border-white/5 flex flex-wrap gap-4 text-gray-400">
                        <span><b>Environment:</b> {sc.environmentalAndEarthChanges}</span>
                        <span><b>Space Status:</b> {sc.spaceExplorationStatus}</span>
                      </div>
                    </div>
                  )}

                  {/* Reading view: story snippet */}
                  {isReading && (
                    <p className="text-base text-gray-300 font-serif leading-relaxed italic">
                      &ldquo;{sc.scenarios.optimistic}&rdquo;
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
