'use client';

import React, { useState } from 'react';
import { Landmark, Compass, Dna, Mountain, Sparkles, Clock, Globe2, ArrowRight } from 'lucide-react';
import { ANCIENT_CIVILIZATIONS, CivilizationRecord } from '../../data/civilizationsData';
import { CivilizationsModule } from '../modules/CivilizationsModule';
import { soundManager } from '../../utils/audio';

interface PastPillarModuleProps {
  isLightMode?: boolean;
  onOpenChakraTimeline: () => void;
}

export function PastPillarModule({ isLightMode, onOpenChakraTimeline }: PastPillarModuleProps) {
  const [activeSection, setActiveSection] = useState<'civilizations' | 'cosmic' | 'geological' | 'evolution'>('civilizations');

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300 ${
      isLightMode ? 'text-[#1c140d]' : 'text-[#efe6d6]'
    }`}>
      {/* Pillar Hero Header */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8913a]/10 border border-[#e8913a]/30 text-xs font-mono text-[#e8913a] uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5" />
          <span>प्रथम स्तम्भ • PILLAR 01: THE PAST (अतीत)</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#fde047] tracking-tight">
          अतीत दर्शन • THE HISTORY OF EXISTENCE
        </h1>
        <p className="max-w-3xl mx-auto text-sm md:text-base text-[#b5a990] font-serif leading-relaxed">
          From the Big Bang and Earth’s geological epochs to hominin evolution, the Indus-Sarasvati civilization, and the comprehensive historical archive.
        </p>
      </div>

      {/* Sub-section Switcher Bar */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-black/60 border border-white/10 shadow-xl overflow-x-auto max-w-full">
          <button
            onClick={() => { soundManager.playClick(); setActiveSection('civilizations'); }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-mono font-bold whitespace-nowrap transition-all ${
              activeSection === 'civilizations'
                ? 'bg-[#e8913a] text-black shadow-lg shadow-[#e8913a]/25'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            प्राचीन सभ्यताएँ • ANCIENT CIVILIZATIONS ({ANCIENT_CIVILIZATIONS.length})
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveSection('cosmic'); }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-mono font-bold whitespace-nowrap transition-all ${
              activeSection === 'cosmic'
                ? 'bg-[#e8913a] text-black shadow-lg shadow-[#e8913a]/25'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            ब्रह्माण्डोत्पत्ति • 13.8B YR COSMIC HISTORY
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveSection('geological'); }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-mono font-bold whitespace-nowrap transition-all ${
              activeSection === 'geological'
                ? 'bg-[#e8913a] text-black shadow-lg shadow-[#e8913a]/25'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            भूगर्भीय युग • GEOLOGICAL HISTORY
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveSection('evolution'); }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-mono font-bold whitespace-nowrap transition-all ${
              activeSection === 'evolution'
                ? 'bg-[#e8913a] text-black shadow-lg shadow-[#e8913a]/25'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            मानव विकास • HUMAN EVOLUTION
          </button>
        </div>
      </div>

      {/* Historical Timeline CTA Bridge */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#20140c] via-[#140e08] to-[#0a0705] border border-[#e8913a]/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Compass className="w-6 h-6 text-[#e8913a] shrink-0" />
          <div>
            <span className="text-xs font-mono font-bold text-[#fde047] block">
              HISTORICAL TIMELINE • कालचक्र २,००६ प्रमाणित अभिलेख
            </span>
            <p className="text-xs text-[#efe6d6] font-serif">
              Explore the original circular Kalachakra wheel containing over 2,006 chronologically attested events from 1.97B years ago to the modern Anthropocene.
            </p>
          </div>
        </div>

        <button
          onClick={() => { soundManager.playClick(); onOpenChakraTimeline(); }}
          className="px-4 py-2 rounded-xl bg-[#e8913a] hover:bg-[#f2c47a] text-black text-xs font-mono font-bold transition-all shadow-lg flex items-center gap-2"
        >
          <span>OPEN CIRCULAR WHEEL</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SUB-SECTION 1: CIVILIZATIONS */}
      {activeSection === 'civilizations' && (
        <CivilizationsModule isLightMode={isLightMode} />
      )}

      {/* SUB-SECTION 2: COSMIC HISTORY */}
      {activeSection === 'cosmic' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#1c1209] to-[#0a0705] border border-[rgba(232,145,58,0.4)] shadow-2xl space-y-6">
            <h2 className="text-2xl font-serif font-bold text-[#fde047]">
              Cosmic Chronology • 13.8 Billion Years from the Big Bang
            </h2>
            <div className="space-y-4">
              {[
                { time: '13.80 Billion Yrs Ago', epoch: 'The Big Bang & Planck Epoch', desc: 'Cosmic inflation expands spacetime metric; symmetry breaking separates gravity, strong, weak, and electromagnetic forces.' },
                { time: '13.799 Billion Yrs Ago (380,000 Yrs Post Big Bang)', epoch: 'Recombination & Cosmic Microwave Background', desc: 'Electrons bind with protons to form neutral hydrogen atoms; photons decouple, generating the Cosmic Microwave Background (2.725 K).' },
                { time: '13.60 Billion Yrs Ago', epoch: 'Population III Stars & First Galaxies', desc: 'Gravitational collapse of primordial gas clouds initiates thermonuclear hydrogen fusion, producing the first massive, metal-free stars.' },
                { time: '13.51 Billion Yrs Ago', epoch: 'Formation of the Milky Way Disk', desc: 'Protogalactic fragments merge to establish the barred spiral disk of the Milky Way (Māndākinī).' },
                { time: '4.57 Billion Yrs Ago', epoch: 'Formation of the Solar System & Protoplanetary Disk', desc: 'Gravitational collapse of a molecular cloud (Solar Nebula) triggers ignition of the proto-Sun and accretion of planetesimals.' },
                { time: '4.54 Billion Yrs Ago', epoch: 'Accretion of Earth & Theia Moon Impact', desc: 'Proto-Earth collides with Mars-sized protoplanet Theia; ejected orbital debris rapidly coalesces to form Earth’s Moon.' }
              ].map((c, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#e8913a] font-bold uppercase">{c.time}</span>
                    <h3 className="text-sm font-serif font-bold text-[#efe6d6]">{c.epoch}</h3>
                    <p className="text-xs text-[#b5a990] font-serif leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 3: GEOLOGICAL HISTORY */}
      {activeSection === 'geological' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#1c1209] to-[#0a0705] border border-[rgba(232,145,58,0.4)] shadow-2xl space-y-6">
            <h2 className="text-2xl font-serif font-bold text-[#fde047]">
              Geological Eons & Earth Biosphere Evolution
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { eon: 'Hadean Eon (4.54 – 4.0 Ga)', desc: 'Molten magma oceans, heavy meteorite bombardment, formation of the first zircon crystals and primitive oceans.' },
                { eon: 'Archean Eon (4.0 – 2.5 Ga)', desc: 'Emergence of first single-celled anaerobic prokaryotes and cyanobacteria stromatolites initiating oxygenic photosynthesis.' },
                { eon: 'Proterozoic Eon (2.5 Ga – 541 Ma)', desc: 'The Great Oxidation Event, Snowball Earth glaciations, and emergence of eukaryotic multicellular life (Ediacaran biota).' },
                { eon: 'Phanerozoic: Paleozoic (541 – 252 Ma)', desc: 'Cambrian Explosion of marine life, colonization of land by vascular plants and amphibians, ending with the Permian Mass Extinction.' },
                { eon: 'Phanerozoic: Mesozoic (252 – 66 Ma)', desc: 'Age of Reptiles and Dinosaurs, breakup of supercontinent Pangea, concluded by the Chicxulub asteroid impact.' },
                { eon: 'Phanerozoic: Cenozoic (66 Ma – Present)', desc: 'Adaptive radiation of mammals and birds, quaternary ice age cycles, and rise of the genus Homo into the Anthropocene.' }
              ].map((g, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                  <span className="text-xs font-mono font-bold text-[#e8913a] uppercase">{g.eon}</span>
                  <p className="text-xs text-[#efe6d6] font-serif leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 4: HUMAN EVOLUTION */}
      {activeSection === 'evolution' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#1c1209] to-[#0a0705] border border-[rgba(232,145,58,0.4)] shadow-2xl space-y-6">
            <h2 className="text-2xl font-serif font-bold text-[#fde047]">
              Hominin Phylogeny & Migration of Homo Sapiens
            </h2>
            <div className="space-y-3">
              {[
                { stage: 'Australopithecus afarensis (~3.9 – 2.9 Ma)', desc: 'Habitual bipedalism confirmed by Laetoli footprints and "Lucy" fossil (Hadar, Ethiopia).' },
                { stage: 'Homo habilis (~2.4 – 1.4 Ma)', desc: 'Oldowan pebble tool industry; brain endocranial volume expansion to ~600 cm³.' },
                { stage: 'Homo erectus (~1.9 Ma – 110 ka)', desc: 'First hominin to expand across Afro-Eurasia (Acheulean handaxes, controlled use of fire, Dmanisi & Java finds).' },
                { stage: 'Homo neanderthalensis & Denisovans (~400 – 40 ka)', desc: 'Cold-adapted archaic humans in Eurasia with Mousterian tools, ritual burials, and interbreeding with modern Sapiens.' },
                { stage: 'Homo sapiens (300 ka – Present)', desc: 'Anatomically modern humans emerge in Africa (Jebel Irhoud); Southern Coastal Route migration into South Asia (~70–60 ka).' }
              ].map((h, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
                  <span className="text-xs font-mono font-bold text-[#fde047]">{h.stage}</span>
                  <p className="text-xs text-[#b5a990] font-serif leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
