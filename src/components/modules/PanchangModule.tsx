'use client';

import React, { useState, useMemo } from 'react';
import { 
  Calendar, Sun, Moon, Clock, Compass, MapPin, 
  ShieldCheck, AlertTriangle, Sparkles, Filter, ChevronRight, CheckCircle2 
} from 'lucide-react';
import { calculatePanchang, PanchangData } from '../../utils/panchangEngine';
import { soundManager } from '../../utils/audio';

const CITIES = [
  { name: 'Ujjain (उज्जयिनी • Avanti Mahakal Observatory)', lat: 23.1765, lon: 75.7682 },
  { name: 'Varanasi / Kashi (काशी • Sanctified Ganga Tirth)', lat: 25.3176, lon: 82.9739 },
  { name: 'New Delhi / Indraprastha (दिल्ली)', lat: 28.6139, lon: 77.2090 },
  { name: 'Mumbai / Bombay (मुम्बई)', lat: 19.0760, lon: 72.8777 },
  { name: 'Bengaluru (बेंगलुरु)', lat: 12.9716, lon: 77.5946 },
  { name: 'Ahmedabad (अहमदाबाद)', lat: 23.0225, lon: 72.5714 },
  { name: 'Kolkata (कोलकाता)', lat: 22.5726, lon: 88.3639 },
  { name: 'Chennai / Madurai (चेन्नई)', lat: 13.0827, lon: 80.2707 },
  { name: 'London (UK)', lat: 51.5074, lon: -0.1278 },
  { name: 'New York (USA)', lat: 40.7128, lon: -74.0060 },
];

export function PanchangModule({ isLightMode }: { isLightMode: boolean }) {
  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedCityIdx, setSelectedCityIdx] = useState<number>(0);
  const [convention, setConvention] = useState<PanchangData['regionalConvention']>(
    'North Indian (Purnimanta)'
  );

  const city = CITIES[selectedCityIdx];
  const panchang: PanchangData = useMemo(() => {
    const d = new Date(selectedDateStr + 'T12:00:00Z');
    return calculatePanchang(d, city.lat, city.lon, city.name, convention);
  }, [selectedDateStr, city, convention]);

  return (
    <div className={`w-full h-full flex flex-col overflow-y-auto ${
      isLightMode ? 'bg-[#fcf8f0] text-[#1d130a]' : 'bg-[#090B18] text-[#efe6d6]'
    }`}>
      {/* Top Banner */}
      <div className="shrink-0 px-4 sm:px-8 py-5 border-b border-[#C9A45C]/25 bg-gradient-to-r from-[#15132B]/80 via-[#090B18] to-[#15132B]/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-[#C9A45C]/20 text-[#C9A45C] border border-[#C9A45C]/40">
              MODULE 06 • पञ्चाङ्ग
            </span>
            <span className="text-xs text-[#527FAE] font-serif">The Five Sacred Astronomical Limbs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F1E9D8] mt-1" style={{ fontFamily: 'Lora, Georgia, serif' }}>
            PANCHANG — The Sacred Vedic Astronomical Calendar
          </h1>
          <p className="text-xs text-[#B8C4D5] max-w-3xl mt-0.5">
            Computes Tithi, Vara, Nakshatra, Yoga, Karana, Auspicious Abhijit & Brahma Muhurtas, Inauspicious Rahu Kaal & Yamaganda, and regional Samvat calendars calibrated by solar-lunar sidereal geometry.
          </p>
        </div>

        {/* Date & Location Pickers */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-black/50 border border-white/10 text-xs">
            <Calendar className="w-3.5 h-3.5 text-[#C9A45C]" />
            <input
              type="date"
              value={selectedDateStr}
              onChange={(e) => setSelectedDateStr(e.target.value)}
              className="bg-transparent text-xs font-mono text-[#F1E9D8] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-black/50 border border-white/10 text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#C9A45C]" />
            <select
              value={selectedCityIdx}
              onChange={(e) => setSelectedCityIdx(Number(e.target.value))}
              className="bg-transparent text-xs font-serif text-[#F1E9D8] focus:outline-none"
            >
              {CITIES.map((c, i) => (
                <option key={i} value={i} className="bg-[#101014] text-[#F1E9D8]">
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 p-4 sm:p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* Regional Calendar Convention Bar */}
        <div className="flex flex-wrap items-center justify-between p-3.5 rounded-[12px] bg-[#15132B]/60 border border-[#C9A45C]/25 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-serif font-bold text-[#F1E9D8]">Regional Convention:</span>
            <span className="text-xs text-[#B8C4D5]">
              Vikram Samvat <strong className="text-[#C9A45C]">{panchang.vikramSamvat}</strong> • Shaka Samvat <strong className="text-[#527FAE]">{panchang.shakaSamvat}</strong> • Month: <strong className="text-[#F1E9D8]">{panchang.hinduMonthSanskrit} ({panchang.hinduMonth})</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {(['North Indian (Purnimanta)', 'Maharashtra / Gujarat (Amanta)', 'South Indian (Sauramana)', 'Bengali'] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setConvention(reg)}
                className={`px-2.5 py-1 rounded-[6px] text-[11px] font-serif transition-all ${
                  convention === reg
                    ? 'bg-[#C9A45C] text-[#090B18] font-bold'
                    : 'text-[#B8C4D5] hover:bg-white/5'
                }`}
              >
                {reg.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* THE FIVE SACRED ANGAS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Anga 1: TITHI */}
          <div className="p-4 rounded-[12px] bg-gradient-to-b from-[#1c183b] to-[#101018] border border-[#C9A45C]/40 space-y-2 shadow-lg">
            <div className="flex items-center justify-between text-xs border-b border-white/10 pb-1.5">
              <span className="font-mono text-[#C9A45C] text-[10px] uppercase">1. Tithi (तिथि)</span>
              <span className="text-[10px] text-[#B8C4D5]">{panchang.paksha.split(' ')[0]}</span>
            </div>
            <h3 className="text-base font-serif font-bold text-[#F1E9D8]">
              {panchang.tithiSanskrit}
            </h3>
            <span className="text-[11px] font-serif text-[#B8C4D5] block">
              {panchang.tithiName}
            </span>
            <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden mt-2">
              <div className="bg-[#C9A45C] h-full" style={{ width: `${panchang.tithiPercentComplete}%` }} />
            </div>
            <span className="text-[9.5px] font-mono text-[#C9A45C] block">
              {panchang.tithiPercentComplete}% Complete
            </span>
          </div>

          {/* Anga 2: VARA */}
          <div className="p-4 rounded-[12px] bg-gradient-to-b from-[#1c183b] to-[#101018] border border-[#C9A45C]/40 space-y-2 shadow-lg">
            <div className="flex items-center justify-between text-xs border-b border-white/10 pb-1.5">
              <span className="font-mono text-[#C9A45C] text-[10px] uppercase">2. Vara (वासर)</span>
              <span className="text-[10px] text-[#B8C4D5]">Solar Day</span>
            </div>
            <h3 className="text-base font-serif font-bold text-[#F1E9D8]">
              {panchang.varaDaySanskrit.split(' ')[0]}
            </h3>
            <span className="text-[11px] font-serif text-[#B8C4D5] block">
              {panchang.varaName}
            </span>
            <span className="text-[10px] font-serif text-[#527FAE] block pt-2">
              Ruler: {panchang.grahaLord}
            </span>
          </div>

          {/* Anga 3: NAKSHATRA */}
          <div className="p-4 rounded-[12px] bg-gradient-to-b from-[#1c183b] to-[#101018] border border-[#C9A45C]/40 space-y-2 shadow-lg">
            <div className="flex items-center justify-between text-xs border-b border-white/10 pb-1.5">
              <span className="font-mono text-[#C9A45C] text-[10px] uppercase">3. Nakshatra (नक्षत्र)</span>
              <span className="text-[10px] text-[#B8C4D5]">Moon Asterism</span>
            </div>
            <h3 className="text-base font-serif font-bold text-[#F1E9D8]">
              {panchang.nakshatraSanskrit}
            </h3>
            <span className="text-[11px] font-serif text-[#B8C4D5] block">
              Pada {panchang.nakshatraPada}
            </span>
            <span className="text-[10px] font-serif text-[#527FAE] block pt-2">
              Deity: {panchang.nakshatraDeity}
            </span>
          </div>

          {/* Anga 4: YOGA */}
          <div className="p-4 rounded-[12px] bg-gradient-to-b from-[#1c183b] to-[#101018] border border-[#C9A45C]/40 space-y-2 shadow-lg">
            <div className="flex items-center justify-between text-xs border-b border-white/10 pb-1.5">
              <span className="font-mono text-[#C9A45C] text-[10px] uppercase">4. Yoga (योग)</span>
              <span className={`text-[10px] ${panchang.yogaNature === 'Auspicious' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {panchang.yogaNature}
              </span>
            </div>
            <h3 className="text-base font-serif font-bold text-[#F1E9D8]">
              {panchang.yogaSanskrit}
            </h3>
            <span className="text-[11px] font-serif text-[#B8C4D5] block">
              Yoga #{panchang.yogaNumber} of 27
            </span>
            <span className="text-[10px] font-serif text-[#B8C4D5] block pt-2">
              (Sun + Moon) Longitude Sum
            </span>
          </div>

          {/* Anga 5: KARANA */}
          <div className="p-4 rounded-[12px] bg-gradient-to-b from-[#1c183b] to-[#101018] border border-[#C9A45C]/40 space-y-2 shadow-lg">
            <div className="flex items-center justify-between text-xs border-b border-white/10 pb-1.5">
              <span className="font-mono text-[#C9A45C] text-[10px] uppercase">5. Karana (करण)</span>
              <span className="text-[10px] text-[#B8C4D5]">Half Tithi</span>
            </div>
            <h3 className="text-base font-serif font-bold text-[#F1E9D8]">
              {panchang.karanaSanskrit.split(' ')[0]}
            </h3>
            <span className="text-[11px] font-serif text-[#B8C4D5] block">
              {panchang.karanaName}
            </span>
            <span className="text-[10px] font-serif text-[#B8C4D5] block pt-2">
              Karana #{panchang.karanaNumber} of 60
            </span>
          </div>

        </div>

        {/* SOLAR TIMES & MUHURTAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Auspicious Muhurtas (शुभ मुहूर्त) */}
          <div className="p-5 rounded-[14px] bg-[#15132B]/60 border border-emerald-500/30 space-y-3 shadow-xl">
            <span className="text-xs font-serif font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Auspicious Muhurtas (शुभ काल)
            </span>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-[8px] bg-black/40 border border-white/5">
                <span className="text-[10px] text-[#B8C4D5] block">Brahma Muhurta (ब्रह्म मुहूर्त)</span>
                <span className="font-mono font-bold text-emerald-300">{panchang.brahmaMuhurta.start} — {panchang.brahmaMuhurta.end}</span>
                <span className="text-[9.5px] text-gray-400 block mt-0.5">Ideal for meditation and study</span>
              </div>
              <div className="p-3 rounded-[8px] bg-black/40 border border-white/5">
                <span className="text-[10px] text-[#B8C4D5] block">Abhijit Muhurta (अभिजीत मुहूर्त)</span>
                <span className="font-mono font-bold text-emerald-300">{panchang.abhijitMuhurta.start} — {panchang.abhijitMuhurta.end}</span>
                <span className="text-[9.5px] text-gray-400 block mt-0.5">Auspicious for all positive initiatives</span>
              </div>
              <div className="p-3 rounded-[8px] bg-black/40 border border-white/5">
                <span className="text-[10px] text-[#B8C4D5] block">Sunrise (सूर्योदय)</span>
                <span className="font-mono font-bold text-[#F1E9D8]">{panchang.sunrise}</span>
              </div>
              <div className="p-3 rounded-[8px] bg-black/40 border border-white/5">
                <span className="text-[10px] text-[#B8C4D5] block">Sunset (सूर्यास्त)</span>
                <span className="font-mono font-bold text-[#F1E9D8]">{panchang.sunset}</span>
                <span className="text-[9.5px] text-gray-400 block mt-0.5">Day Length: {panchang.dayLengthHours}h</span>
              </div>
            </div>
          </div>

          {/* Inauspicious Periods (अशुभ काल) */}
          <div className="p-5 rounded-[14px] bg-[#15132B]/60 border border-red-500/30 space-y-3 shadow-xl">
            <span className="text-xs font-serif font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              Inauspicious Periods to Avoid for New Undertakings (वर्ज्य काल)
            </span>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-3 rounded-[8px] bg-black/40 border border-white/5">
                <span className="text-[10px] text-[#B8C4D5] block">Rahu Kaal (राहु काल)</span>
                <span className="font-mono font-bold text-red-300">{panchang.rahuKaal.start}</span>
                <span className="font-mono text-[10px] text-gray-400 block">to {panchang.rahuKaal.end}</span>
              </div>
              <div className="p-3 rounded-[8px] bg-black/40 border border-white/5">
                <span className="text-[10px] text-[#B8C4D5] block">Yamaganda (यमगण्ड)</span>
                <span className="font-mono font-bold text-red-300">{panchang.yamaganda.start}</span>
                <span className="font-mono text-[10px] text-gray-400 block">to {panchang.yamaganda.end}</span>
              </div>
              <div className="p-3 rounded-[8px] bg-black/40 border border-white/5">
                <span className="text-[10px] text-[#B8C4D5] block">Gulika Kaal (गुलिक काल)</span>
                <span className="font-mono font-bold text-amber-300">{panchang.gulikaKaal.start}</span>
                <span className="font-mono text-[10px] text-gray-400 block">to {panchang.gulikaKaal.end}</span>
              </div>
            </div>

            {/* Daily Festivals / Observances */}
            <div className="pt-2 border-t border-white/10">
              <span className="text-[10.5px] font-serif font-bold text-[#C9A45C] block mb-1">
                Tithi Festivals & Observances for Today:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {panchang.festivals.map((fest, fIdx) => (
                  <span
                    key={fIdx}
                    className="px-2.5 py-0.5 rounded text-[10.5px] font-serif bg-[#C9A45C]/15 border border-[#C9A45C]/40 text-[#F1E9D8]"
                  >
                    ✦ {fest}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
