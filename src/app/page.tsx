'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '../components/Header';
import { ChakraStage, TryambakEvent } from '../components/ChakraStage';
import { CosmicGateway } from '../components/CosmicGateway';
import { FooterEras } from '../components/FooterEras';
import { SixPillarsOverviewCard } from '../components/pillars/SixPillarsOverviewCard';

// Sacred Loading Fallback for dynamically streamed modules
const SacredModuleLoader = () => (
  <div className="w-full h-full min-h-[450px] flex flex-col items-center justify-center p-8 text-center space-y-3.5 select-none">
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 border-t-amber-400 animate-spin" />
      <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
    </div>
    <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest">
      संस्कार संकलनम् • Loading Cosmic Coordinates...
    </span>
  </div>
);

// Dynamic 3D Simulations & Heavy Engines (Streamed on demand for 60fps zero-lag performance)
const DysonSimulation3D = dynamic(() => import('../components/DysonSimulation3D').then(m => m.DysonSimulation3D), {
  ssr: false,
  loading: SacredModuleLoader
});
const CosmicVoyage3D = dynamic(() => import('../components/CosmicVoyage3D').then(m => m.CosmicVoyage3D), {
  ssr: false,
  loading: SacredModuleLoader
});

// Dynamic Six Pillars Modules
const PastPillarModule = dynamic(() => import('../components/pillars/PastPillarModule').then(m => m.PastPillarModule), {
  loading: SacredModuleLoader
});
const PresentPillarModule = dynamic(() => import('../components/pillars/PresentPillarModule').then(m => m.PresentPillarModule), {
  ssr: false,
  loading: SacredModuleLoader
});
const HinduCosmologyPillarModule = dynamic(() => import('../components/pillars/HinduCosmologyPillarModule').then(m => m.HinduCosmologyPillarModule), {
  loading: SacredModuleLoader
});
const CelestialAtlasPillarModule = dynamic(() => import('../components/pillars/CelestialAtlasPillarModule').then(m => m.CelestialAtlasPillarModule), {
  loading: SacredModuleLoader
});
const FuturePillarModule = dynamic(() => import('../components/pillars/FuturePillarModule').then(m => m.FuturePillarModule), {
  loading: SacredModuleLoader
});
const FutureCivilizationsPillarModule = dynamic(() => import('../components/pillars/FutureCivilizationsPillarModule').then(m => m.FutureCivilizationsPillarModule), {
  loading: SacredModuleLoader
});

// Dynamic Specialized Systems
const JyotishModule = dynamic(() => import('../components/modules/JyotishModule').then(m => m.JyotishModule), {
  loading: SacredModuleLoader
});
const MyCosmicSpaceModule = dynamic(() => import('../components/modules/MyCosmicSpaceModule').then(m => m.MyCosmicSpaceModule), {
  loading: SacredModuleLoader
});
const KnowledgeMediaModule = dynamic(() => import('../components/modules/KnowledgeMediaModule').then(m => m.KnowledgeMediaModule), {
  loading: SacredModuleLoader
});

// Dynamic Modals (Zero impact on initial page bundle)
const KaalDarshiModal = dynamic(() => import('../components/kaaldarshi/KaalDarshiModal').then(m => m.KaalDarshiModal), { ssr: false });
const KnowledgeGraphModal = dynamic(() => import('../components/knowledge-graph/KnowledgeGraphModal').then(m => m.KnowledgeGraphModal), { ssr: false });
const RishiMuniModal = dynamic(() => import('../components/rishimuni/RishiMuniModal').then(m => m.RishiMuniModal), { ssr: false });
const EvolutionChakraModal = dynamic(() => import('../components/EvolutionChakraModal').then(m => m.EvolutionChakraModal), { ssr: false });
const FilterModal = dynamic(() => import('../components/FilterModal').then(m => m.FilterModal), { ssr: false });
const AboutModal = dynamic(() => import('../components/AboutModal').then(m => m.AboutModal), { ssr: false });
const TodayCosmicModal = dynamic(() => import('../components/TodayCosmicModal').then(m => m.TodayCosmicModal), { ssr: false });

import { MasterModuleId } from '../types/modules';
import { PillarId, PresentationMode } from '../types/sixPillars';
import { soundManager } from '../utils/audio';
import { PresentationModeProvider, usePresentationMode } from '../context/PresentationModeContext';
import tryambakData from '../data/tryambakEvents.json';
import { EventCategory, DateClassification } from '../data/timelineEvents';

const ALL_EVENTS: TryambakEvent[] = (tryambakData.events as unknown) as TryambakEvent[];

export default function Home() {
  return (
    <PresentationModeProvider>
      <HomeContent />
    </PresentationModeProvider>
  );
}

function HomeContent() {
  const [hasEnteredGateway, setHasEnteredGateway] = useState<boolean>(true);
  const [currentMode, setCurrentMode] = useState<PillarId | MasterModuleId>('chakra');
  const { mode: presentationMode, setMode: setPresentationMode } = usePresentationMode();
  const [selectedEvent, setSelectedEvent] = useState<TryambakEvent>(ALL_EVENTS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([]);
  const [selectedClassifications, setSelectedClassifications] = useState<DateClassification[]>([]);
  const [selectedEraIndex, setSelectedEraIndex] = useState<number | null>(null);
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false); // Sound ON by default
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isTodayModalOpen, setIsTodayModalOpen] = useState<boolean>(false);
  const [isEvolutionModalOpen, setIsEvolutionModalOpen] = useState<boolean>(false);

  // Six Pillars Modals
  const [isKaalDarshiOpen, setIsKaalDarshiOpen] = useState<boolean>(false);
  const [isKnowledgeGraphOpen, setIsKnowledgeGraphOpen] = useState<boolean>(false);
  const [isRishiMuniOpen, setIsRishiMuniOpen] = useState<boolean>(false);

  // Sync mute state with soundManager
  const handleSoundToggle = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  // Handle Domain Mode Switch with Dynamic Musical Tone Transition
  const handleModeChange = (mode: PillarId | MasterModuleId) => {
    if (['chakra', 'voyage3d', 'cinematic', 'present', 'today'].includes(mode)) {
      soundManager.setMode(mode as 'chakra' | 'voyage3d' | 'cinematic' | 'today');
    } else {
      soundManager.playTempleBell(528);
    }
    setCurrentMode(mode);
  };

  // Filtered Events Calculation
  const filteredEvents = useMemo(() => {
    return ALL_EVENTS.filter((evt) => {
      // Category filter
      if (selectedCategories.length > 0) {
        const matchesCategory = selectedCategories.some((cat) => 
          evt.categoryName.toLowerCase().includes(cat.toLowerCase().split(' ')[0]) ||
          evt.tags.some((t) => t.toLowerCase().includes(cat.toLowerCase().split(' ')[0]))
        );
        if (!matchesCategory) return false;
      }
      // Classification filter
      if (selectedClassifications.length > 0) {
        const matchesClass = selectedClassifications.some((cls) =>
          evt.trustedSource.toLowerCase().includes(cls.toLowerCase().split(' ')[0])
        );
        if (!matchesClass) return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = evt.title.toLowerCase().includes(q);
        const inDesc = evt.description.toLowerCase().includes(q);
        const inRegion = evt.region.toLowerCase().includes(q);
        const inTags = evt.tags.some((t) => t.toLowerCase().includes(q));
        const inSource = evt.trustedSource.toLowerCase().includes(q);
        return inTitle || inDesc || inRegion || inTags || inSource;
      }
      return true;
    });
  }, [selectedCategories, selectedClassifications, searchQuery]);

  // Handle Event Selection
  const handleSelectEvent = useCallback((event: TryambakEvent) => {
    setSelectedEvent(event);
  }, []);

  // Quick Action: First (Dawn of Sveta-Varaha Kalpa)
  const handleFirstClick = () => {
    const firstEvt = ALL_EVENTS[0];
    handleSelectEvent(firstEvt);
    handleModeChange('chakra');
  };

  // Quick Action: Today (The Living Timeline)
  const handleTodayClick = () => {
    handleModeChange('present');
  };

  // Quick Action: Last (Mahapralaya & Foretold Future)
  const handleLastClick = () => {
    const lastEvt = ALL_EVENTS[ALL_EVENTS.length - 1];
    handleSelectEvent(lastEvt);
    handleModeChange('chakra');
  };

  // Quick Action: Surprise Me
  const handleSurpriseClick = () => {
    if (filteredEvents.length === 0) return;
    const randomIdx = Math.floor(Math.random() * filteredEvents.length);
    const chosen = filteredEvents[randomIdx];
    handleSelectEvent(chosen);
  };

  // Jump to specific year on the Chakra wheel from the Evolution Modal
  const handleSelectYearOnWheel = (numericYear: number) => {
    let closest = ALL_EVENTS[0];
    let minDiff = Infinity;
    for (const ev of ALL_EVENTS) {
      const diff = Math.abs(ev.numericYear - numericYear);
      if (diff < minDiff) {
        minDiff = diff;
        closest = ev;
      }
    }
    handleSelectEvent(closest);
    handleModeChange('chakra');
    setIsEvolutionModalOpen(false);
  };

  // Jump to specific era from the Footer
  const handleSelectEra = (eraId: string | number) => {
    const idx = typeof eraId === 'number' ? eraId : parseInt(eraId, 10);
    setSelectedEraIndex(idx);
    const eraEvent = ALL_EVENTS.find((e) => e.eraIndex === idx);
    if (eraEvent) {
      handleSelectEvent(eraEvent);
    }
    handleModeChange('chakra');
  };

  // Filter Toggles
  const handleToggleCategory = (category: EventCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleToggleClassification = (classification: DateClassification) => {
    setSelectedClassifications((prev) =>
      prev.includes(classification)
        ? prev.filter((c) => c !== classification)
        : [...prev, classification]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedClassifications([]);
    setSelectedEraIndex(null);
    setSearchQuery('');
  };

  return (
    <div className={`w-screen h-screen flex flex-col overflow-hidden select-none transition-colors duration-200 ${
      isLightMode 
        ? 'bg-[#f4ebd9] text-[#1d130a]' 
        : 'bg-[#08090D] text-[#efe6d6]'
    } ${
      presentationMode === 'reading' ? 'font-serif' : ''
    }`}>
      {/* 1. Optional Cosmic Gateway Entrance Modal */}
      {!hasEnteredGateway && (
        <CosmicGateway onEnter={() => setHasEnteredGateway(true)} />
      )}

      {/* 2. Top Header Bar (68px tall) with Master Six Pillars Navigation */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFirstClick={handleFirstClick}
        onTodayClick={handleTodayClick}
        onLastClick={handleLastClick}
        onSurpriseClick={handleSurpriseClick}
        onFilterToggle={() => setIsFilterOpen(true)}
        onAboutToggle={() => setIsAboutOpen(true)}
        onEvolutionClick={() => setIsEvolutionModalOpen(true)}
        activeFilterCount={selectedCategories.length + selectedClassifications.length + (selectedEraIndex !== null ? 1 : 0)}
        currentMode={currentMode}
        onModeChange={handleModeChange}
        isLightMode={isLightMode}
        onThemeToggle={() => setIsLightMode(!isLightMode)}
        isMuted={isMuted}
        onSoundToggle={handleSoundToggle}
        onOpenKaalDarshi={() => setIsKaalDarshiOpen(true)}
        onOpenKnowledgeGraph={() => setIsKnowledgeGraphOpen(true)}
        onOpenRishiMuni={() => setIsRishiMuniOpen(true)}
        presentationMode={presentationMode}
        onChangePresentationMode={setPresentationMode}
      />

      {/* 3. Main Stage Experience (Switchable Six Pillars & Core Views) */}
      <main className={`flex-1 w-full min-h-0 relative ${
        ['chakra', 'voyage3d', 'cinematic'].includes(currentMode) ? 'overflow-hidden' : 'overflow-y-auto'
      }`}>
        {/* MASTER ARCHITECTURAL GATEWAY: SIX PILLARS BLUEPRINT OVERVIEW */}
        {currentMode === 'overview' && (
          <SixPillarsOverviewCard
            isLightMode={isLightMode}
            onSelectPillar={(pillar) => handleModeChange(pillar)}
            onOpenKaalDarshi={() => setIsKaalDarshiOpen(true)}
            onExploreTimeline={() => handleModeChange('chakra')}
            activeYear={selectedEvent.numericYear}
            activeEventTitle={selectedEvent.title}
          />
        )}

        {/* CORE MODE A: Interactive 3-Column Kalachakra Wheel, Rail & Detail Panel */}
        {currentMode === 'chakra' && (
          <ChakraStage
            events={filteredEvents.length > 0 ? filteredEvents : ALL_EVENTS}
            selectedEvent={selectedEvent}
            onSelectEvent={handleSelectEvent}
            isLightMode={isLightMode}
            onTagClick={(t) => setSearchQuery(t)}
            onOpenEvolution={() => setIsEvolutionModalOpen(true)}
          />
        )}

        {/* CORE MODE B: 3D Dyson Swarm & Kardashev Civilization Evolution */}
        {currentMode === 'voyage3d' && (
          <DysonSimulation3D 
            isLightMode={isLightMode} 
            onExploreObserver={() => handleModeChange('cinematic')}
          />
        )}

        {/* CORE MODE C: Continuous Cinematic Odyssey (Scenes 01 to 08 Loop) */}
        {currentMode === 'cinematic' && (
          <CosmicVoyage3D isLightMode={isLightMode} />
        )}

        {/* ==================== THE SIX PILLARS ==================== */}

        {/* PILLAR 01: THE PAST (अतीत) */}
        {currentMode === 'past' && (
          <PastPillarModule
            isLightMode={isLightMode}
            onOpenChakraTimeline={() => handleModeChange('chakra')}
          />
        )}

        {/* PILLAR 02: THE PRESENT (वर्तमान) */}
        {(currentMode === 'present' || currentMode === 'today') && (
          <PresentPillarModule
            isLightMode={isLightMode}
            onJumpToChakraEra={handleSelectEra}
          />
        )}

        {/* PILLAR 03: HINDU COSMOLOGY (सनातन ब्रह्माण्ड) */}
        {currentMode === 'hinduCosmology' && (
          <HinduCosmologyPillarModule
            isLightMode={isLightMode}
          />
        )}

        {/* PILLAR 04: THE CELESTIAL ATLAS (ब्रह्माण्ड दर्शन) */}
        {currentMode === 'celestialAtlas' && (
          <CelestialAtlasPillarModule
            isLightMode={isLightMode}
          />
        )}

        {/* PILLAR 05: THE FUTURE (भविष्य) */}
        {currentMode === 'future' && (
          <FuturePillarModule
            isLightMode={isLightMode}
          />
        )}

        {/* PILLAR 06: FUTURE CIVILIZATIONS (भविष्य सभ्यता) */}
        {currentMode === 'civilizations' && (
          <FutureCivilizationsPillarModule
            isLightMode={isLightMode}
            onLaunchDyson3D={() => handleModeChange('voyage3d')}
          />
        )}

        {/* SPECIALIZED SYSTEM: JYOTISHAM (ज्योतिषम् & कुण्डली) */}
        {currentMode === 'jyotisham' && (
          <JyotishModule isLightMode={isLightMode} />
        )}

        {/* SPECIALIZED SYSTEM: MY COSMIC SPACE (मेरा आकाश) */}
        {currentMode === 'mycosmos' && (
          <MyCosmicSpaceModule 
            isLightMode={isLightMode} 
            onNavigateToModule={(mod) => handleModeChange(mod as PillarId | MasterModuleId)}
          />
        )}
      </main>

      {/* 4. Bottom Era Rail (46px tall) with Temple Copperplate Tabs - Active in Chakra mode */}
      {currentMode === 'chakra' && (
        <FooterEras
          selectedEraId={String(selectedEvent.eraIndex)}
          onSelectEra={handleSelectEra}
          isLightMode={isLightMode}
        />
      )}

      {/* 5. Filter Modal with Authentic Indian Styling */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
        selectedClassifications={selectedClassifications}
        onToggleClassification={handleToggleClassification}
        onResetFilters={handleResetFilters}
        isLightMode={isLightMode}
      />

      {/* 6. Methodology / About Modal with Epistemic Architecture */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        isLightMode={isLightMode}
      />

      {/* 7. On This Cosmic Day Across the Yugas Modal */}
      <TodayCosmicModal
        isOpen={isTodayModalOpen}
        onClose={() => setIsTodayModalOpen(false)}
        isLightMode={isLightMode}
        onJumpToEra={(eraIdx) => handleSelectEra(String(eraIdx))}
      />

      {/* 8. Scientific Human Evolution, 4D/5D/11D Spacetime & Satya Yuga Rebirth Modal */}
      <EvolutionChakraModal
        isOpen={isEvolutionModalOpen}
        onClose={() => setIsEvolutionModalOpen(false)}
        isLightMode={isLightMode}
        onSelectYearOnWheel={handleSelectYearOnWheel}
      />

      {/* 9. KAALDARSHI AI Research Assistant Modal */}
      <KaalDarshiModal
        isOpen={isKaalDarshiOpen}
        onClose={() => setIsKaalDarshiOpen(false)}
        onNavigatePillar={(p) => handleModeChange(p)}
        isLightMode={isLightMode}
      />

      {/* 10. Global Knowledge Graph Network Modal */}
      <KnowledgeGraphModal
        isOpen={isKnowledgeGraphOpen}
        onClose={() => setIsKnowledgeGraphOpen(false)}
        onNavigatePillar={(p) => handleModeChange(p)}
        isLightMode={isLightMode}
      />

      {/* 11. RISHI MUNI AI Vedic Astrological Oracle Modal */}
      <RishiMuniModal
        isOpen={isRishiMuniOpen}
        onClose={() => setIsRishiMuniOpen(false)}
        isLightMode={isLightMode}
      />
    </div>
  );
}
