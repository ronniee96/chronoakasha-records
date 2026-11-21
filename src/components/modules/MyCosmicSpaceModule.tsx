'use client';

import React, { useState, useEffect } from 'react';
import { User, Bookmark, Award, Calendar, Compass, Save, Trash2, Download, Upload, Sparkles } from 'lucide-react';
import { soundManager } from '../../utils/audio';

import { MasterModuleId } from '../../types/modules';

interface MyCosmicSpaceProps {
  isLightMode?: boolean;
  onNavigateToModule?: (moduleId: MasterModuleId) => void;
}

interface SavedProfile {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  latitude: number;
  longitude: number;
  timezone: number;
}

export function MyCosmicSpaceModule({ isLightMode, onNavigateToModule }: MyCosmicSpaceProps) {
  const [profile, setProfile] = useState<SavedProfile>({
    name: 'Seeker',
    birthDate: '1995-01-01',
    birthTime: '12:00',
    birthPlace: 'Ujjain, India (Avanti)',
    latitude: 23.1765,
    longitude: 75.7885,
    timezone: 5.5
  });

  const [savedBookmarks, setSavedBookmarks] = useState<string[]>([
    'Nasadiya Sukta — Hymn of Creation (Rigveda 10.129)',
    'Śveta-Vārāha Kalpa & 51st Year of Brahma',
    'Indus-Sarasvati Dholavira Hydraulic Reservoirs',
    'Chandrayaan-3 Shiv Shakti Point Soft Landing'
  ]);

  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem('chronoakasha_profile');
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
      const storedBookmarks = localStorage.getItem('chronoakasha_bookmarks');
      if (storedBookmarks) {
        setSavedBookmarks(JSON.parse(storedBookmarks));
      }
    } catch {
      // LocalStorage not available or parse error
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();
    try {
      localStorage.setItem('chronoakasha_profile', JSON.stringify(profile));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } catch {
      // Ignore
    }
  };

  const handleRemoveBookmark = (bm: string) => {
    soundManager.playClick();
    const next = savedBookmarks.filter(b => b !== bm);
    setSavedBookmarks(next);
    try {
      localStorage.setItem('chronoakasha_bookmarks', JSON.stringify(next));
    } catch {
      // Ignore
    }
  };

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300 ${
      isLightMode ? 'text-[#1c140d]' : 'text-[#efe6d6]'
    }`}>
      {/* Header Plaque */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8913a]/10 border border-[#e8913a]/30 text-xs font-mono text-[#e8913a] uppercase tracking-wider">
          <User className="w-3.5 h-3.5" />
          <span>निजी अंतरिक्ष एवं कुण्डली संचय • Private Offline Cosmic Vault</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#fde047] tracking-tight">
          मेरा आकाश • MY COSMIC SPACE
        </h1>
        <p className="max-w-3xl mx-auto text-sm md:text-base text-[#b5a990] font-serif leading-relaxed">
          Your personal offline sanctuary. Store your birth coordinates for instant Janma Kundli calculation, curate research bookmarks, and track your cosmological progress.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Birth Profile Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#1c1209] to-[#0a0705] border border-[rgba(232,145,58,0.4)] shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#e8913a] uppercase block">
                  जन्म विवरण • Cosmic Identity
                </span>
                <h2 className="text-xl font-serif font-bold text-[#fde047]">
                  Birth Coordinates & Ephemeris
                </h2>
              </div>
              <Compass className="w-5 h-5 text-[#e8913a]" />
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-[#b5a990] block mb-1">Full Name / Alias</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-[#efe6d6] focus:border-[#e8913a] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#b5a990] block mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={profile.birthDate}
                    onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-[#efe6d6] focus:border-[#e8913a] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#b5a990] block mb-1">Exact Time of Birth</label>
                  <input
                    type="time"
                    value={profile.birthTime}
                    onChange={(e) => setProfile({ ...profile, birthTime: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-[#efe6d6] focus:border-[#e8913a] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#b5a990] block mb-1">Birthplace City / Region</label>
                <input
                  type="text"
                  value={profile.birthPlace}
                  onChange={(e) => setProfile({ ...profile, birthPlace: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-[#efe6d6] focus:border-[#e8913a] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[#b5a990] block mb-1">Latitude (°N)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={profile.latitude}
                    onChange={(e) => setProfile({ ...profile, latitude: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 rounded-lg bg-black/50 border border-white/10 text-[#efe6d6] focus:border-[#e8913a] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#b5a990] block mb-1">Longitude (°E)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={profile.longitude}
                    onChange={(e) => setProfile({ ...profile, longitude: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 rounded-lg bg-black/50 border border-white/10 text-[#efe6d6] focus:border-[#e8913a] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#b5a990] block mb-1">Timezone (UTC)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={profile.timezone}
                    onChange={(e) => setProfile({ ...profile, timezone: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 rounded-lg bg-black/50 border border-white/10 text-[#efe6d6] focus:border-[#e8913a] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#e8913a] hover:bg-[#f2c47a] text-black font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#e8913a]/20"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaved ? 'SAVED TO LOCAL VAULT' : 'SAVE BIRTH DETAILS'}</span>
                </button>

                {onNavigateToModule && (
                  <button
                    type="button"
                    onClick={() => onNavigateToModule('rashi')}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#fde047] font-bold"
                  >
                    CALCULATE KUNDLI ➔
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Bookmarks & Learning Progress */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#1c1209] to-[#0a0705] border border-[rgba(232,145,58,0.4)] shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#e8913a] uppercase block">
                  संचित अभिलेख • Bookmarked Archives
                </span>
                <h2 className="text-xl font-serif font-bold text-[#fde047]">
                  Curated Research Notebook ({savedBookmarks.length})
                </h2>
              </div>
              <Bookmark className="w-5 h-5 text-[#e8913a]" />
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {savedBookmarks.map((bm, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-3 text-xs font-serif"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[#e8913a] font-bold">✦</span>
                    <span className="text-[#efe6d6] truncate">{bm}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveBookmark(bm)}
                    className="text-[#b5a990] hover:text-rose-400 p-1 transition-colors shrink-0"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Privacy Guarantee Note */}
            <div className="p-3 rounded-xl bg-black/50 border border-white/5 text-[11px] font-mono text-[#b5a990] space-y-1">
              <span className="text-[#e8913a] font-bold block uppercase">
                Privacy Guarantee (शून्य डेटा संकलन)
              </span>
              <p>
                All birth details and bookmarks are retained purely inside your browser’s isolated local storage. No data is transmitted to external servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
