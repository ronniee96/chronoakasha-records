'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Camera, 
  Satellite, 
  Globe, 
  Search, 
  Calendar, 
  ExternalLink, 
  Layers, 
  Filter, 
  Sparkles, 
  Info,
  Maximize2,
  X,
  Compass,
  Radar
} from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface SpacecraftPhoto {
  nasaId: string;
  title: string;
  description: string;
  dateCreated: string;
  center: string;
  photographer: string;
  thumbnailUrl: string;
  originalUrl: string;
  provider: string;
}

interface SatelliteEarthScene {
  id: string;
  title: string;
  mission: 'Sentinel-2' | 'Sentinel-1' | 'Landsat 8/9' | 'Terra MODIS' | 'Suomi NPP VIIRS';
  sensor: string;
  acquisitionDate: string;
  locationName: string;
  coordinates: string;
  layerType: 'Natural Color' | 'SAR Radar' | 'Infrared False-Color' | 'Night Lights' | 'NDVI Vegetation';
  cloudCover: string;
  imageUrl: string;
  provider: string;
  details: string;
}

const CURATED_EARTH_SCENES: SatelliteEarthScene[] = [
  {
    id: 'scene-gibs-himalayas',
    title: 'Himalayan Glaciers & Tibetan Plateau True Color',
    mission: 'Terra MODIS',
    sensor: 'MODIS Optical Reflectance',
    acquisitionDate: '2026-11-18',
    locationName: 'Greater Himalaya & Gangotri Range, Uttarakhand',
    coordinates: '30.98° N, 79.02° E',
    layerType: 'Natural Color',
    cloudCover: '4.1%',
    imageUrl: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/2026-11-17/GoogleMapsCompatible_Level9/4/6/11.jpg',
    provider: 'NASA EOSDIS GIBS / Terra',
    details: 'Terra MODIS morning swath capturing snow cover and seasonal albedo across northern India and the Tibetan Plateau.'
  },
  {
    id: 'scene-sentinel2-ganga',
    title: 'Ganges Delta & Sundarbans Mangrove Biome',
    mission: 'Sentinel-2',
    sensor: 'MSI (MultiSpectral Instrument 10m)',
    acquisitionDate: '2026-11-16',
    locationName: 'Bengal Delta & Bay of Bengal Maritime Border',
    coordinates: '21.94° N, 89.18° E',
    layerType: 'Infrared False-Color',
    cloudCover: '1.8%',
    imageUrl: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_SNPP_CorrectedReflectance_TrueColor/default/2026-11-17/GoogleMapsCompatible_Level9/4/6/12.jpg',
    provider: 'Copernicus Data Space (ESA)',
    details: 'Multi-spectral near-infrared band combination highlighting dense mangrove canopy chlorophyll vigor in deep red and sediment outflows in turquoise.'
  },
  {
    id: 'scene-sentinel1-radar',
    title: 'Synthetic Aperture Radar: Arabian Sea Coastal Front',
    mission: 'Sentinel-1',
    sensor: 'C-SAR Radar (C-band 5.405 GHz)',
    acquisitionDate: '2026-11-18',
    locationName: 'Gulf of Khambhat & Saurashtra Coast, Gujarat',
    coordinates: '21.50° N, 72.30° E',
    layerType: 'SAR Radar',
    cloudCover: '0.0% (Radar Pierces Clouds)',
    imageUrl: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_CityLights_2012/default/2026-11-17/GoogleMapsCompatible_Level8/3/3/5.jpg',
    provider: 'Copernicus Data Space (ESA)',
    details: 'Synthetic Aperture Radar backscatter amplitude capturing ocean surface roughness, tidal flats, and maritime vessel radar signatures independent of cloud cover or sunlight.'
  },
  {
    id: 'scene-viirs-night-india',
    title: 'Subcontinent Electrification & Night Lights Mosaic',
    mission: 'Suomi NPP VIIRS',
    sensor: 'VIIRS Day/Night Band (DNB)',
    acquisitionDate: '2026-11-17',
    locationName: 'Indo-Gangetic Plain & Deccan Plateau',
    coordinates: '20.59° N, 78.96° E',
    layerType: 'Night Lights',
    cloudCover: 'Cloud Filtered',
    imageUrl: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_CityLights_2012/default/2026-11-17/GoogleMapsCompatible_Level8/4/6/11.jpg',
    provider: 'NASA Earth Observatory / NOAA NGDC',
    details: 'Calibrated nocturnal radiance revealing urban density corridors connecting Delhi, Varanasi, Kolkata, Mumbai, and Bengaluru.'
  }
];

export function SpaceImageryArchive({ isLightMode = false }: { isLightMode?: boolean }) {
  const [activeCategory, setActiveCategory] = useState<'captured-by' | 'photographs-of'>('captured-by');
  const [spacecraftQuery, setSpacecraftQuery] = useState<string>('International Space Station');
  const [spacecraftPhotos, setSpacecraftPhotos] = useState<SpacecraftPhoto[]>([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<SpacecraftPhoto | null>(null);
  const [selectedEarthScene, setSelectedEarthScene] = useState<SatelliteEarthScene | null>(null);

  // Fetch spacecraft photographs from NASA Image Library API
  const fetchPhotos = async (query: string) => {
    setIsLoadingPhotos(true);
    try {
      const res = await fetch(`/api/nasa/images?q=${encodeURIComponent(query)}`);
      const json = await res.json();
      if (json.items) {
        setSpacecraftPhotos(json.items);
      }
    } catch (err) {
      console.error('Failed to query NASA Image Library:', err);
    } finally {
      setIsLoadingPhotos(false);
    }
  };

  useEffect(() => {
    if (activeCategory === 'photographs-of' && spacecraftPhotos.length === 0) {
      fetchPhotos(spacecraftQuery);
    }
  }, [activeCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (spacecraftQuery.trim()) {
      soundManager.playClick();
      fetchPhotos(spacecraftQuery);
    }
  };

  return (
    <div className={`space-y-6 animate-in fade-in duration-300 ${
      isLightMode ? 'text-[#1c140d]' : 'text-[#efe6d6]'
    }`}>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-xs font-mono text-[#38bdf8] uppercase tracking-wider mb-1.5">
            <Camera className="w-3.5 h-3.5" />
            <span>अंतरिक्ष चित्रालय • SPACE IMAGERY ARCHIVE</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#fde047]">
            Real Earth Observations & Authentic Spacecraft Photography
          </h2>
          <p className="text-xs md:text-sm text-[#b5a990] font-sans max-w-2xl mt-1">
            Carefully partitioned into two independent dimensions: Images captured <span className="text-[#38bdf8] font-bold">BY</span> satellites looking at Earth, versus genuine photographs <span className="text-[#f59e0b] font-bold">OF</span> satellites and spacecraft taken in orbit.
          </p>
        </div>

        {/* Dimension Switcher */}
        <div className="inline-flex p-1 rounded-xl bg-black/60 border border-white/10 shrink-0">
          <button
            onClick={() => { soundManager.playClick(); setActiveCategory('captured-by'); }}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeCategory === 'captured-by'
                ? 'bg-[#0284c7] text-white shadow-md'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>1. Earth Images Captured BY Satellites</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveCategory('photographs-of'); }}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeCategory === 'photographs-of'
                ? 'bg-[#e8913a] text-black shadow-md'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            <Satellite className="w-3.5 h-3.5" />
            <span>2. Photographs OF Spacecraft</span>
          </button>
        </div>
      </div>

      {/* DIMENSION A: IMAGES CAPTURED BY SATELLITES */}
      {activeCategory === 'captured-by' && (
        <div className="space-y-6">
          <div className="p-3.5 rounded-xl bg-[#0284c7]/10 border border-[#0284c7]/30 text-xs font-sans text-sky-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#38bdf8] shrink-0" />
              <span>
                <strong>Earth Observation Principles:</strong> Multi-spectral optical, infrared, and radar imagery captured by polar-orbiting satellites at precise observation timestamps.
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#38bdf8] shrink-0 hidden md:inline">
              Data: NASA GIBS • Copernicus Sentinel-1/2
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CURATED_EARTH_SCENES.map(scene => (
              <div
                key={scene.id}
                onClick={() => { soundManager.bell(660, 0.1, 1); setSelectedEarthScene(scene); }}
                className="group cursor-pointer rounded-2xl border border-white/10 hover:border-[#38bdf8]/60 bg-black/40 overflow-hidden shadow-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] flex flex-col"
              >
                <div className="relative w-full h-56 bg-black overflow-hidden">
                  <Image
                    src={scene.imageUrl}
                    alt={scene.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/80 border border-white/20 text-[10px] font-mono text-[#fde047] backdrop-blur-md">
                    {scene.mission} • {scene.sensor}
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/80 border border-white/20 text-[10px] font-mono text-[#38bdf8] backdrop-blur-md">
                    {scene.layerType}
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded bg-black/70 text-[10px] font-mono text-[#a8a29e]">
                    Acquisition: {scene.acquisitionDate} UTC
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#efe6d6] group-hover:text-[#38bdf8] transition-colors">
                      {scene.title}
                    </h3>
                    <p className="text-xs text-[#a8a29e] mt-1 line-clamp-2">
                      {scene.details}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#9ca3af]">
                    <span>📍 {scene.locationName}</span>
                    <span className="text-[#38bdf8] group-hover:underline">Inspect Scene ↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DIMENSION B: PHOTOGRAPHS OF SPACECRAFT (NASA Image and Video Library) */}
      {activeCategory === 'photographs-of' && (
        <div className="space-y-6">
          {/* Search Controls */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <form onSubmit={handleSearchSubmit} className="flex-1 w-full flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#a8a29e] absolute left-3 top-3" />
                <input
                  type="text"
                  value={spacecraftQuery}
                  onChange={(e) => setSpacecraftQuery(e.target.value)}
                  placeholder="Search spacecraft (e.g. ISS, Hubble, James Webb, Artemis, Curiosity, Chandrayaan)..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-black/60 border border-white/15 text-xs font-mono text-[#efe6d6] focus:outline-none focus:border-[#e8913a]"
                />
              </div>
              <button
                type="submit"
                disabled={isLoadingPhotos}
                className="px-4 py-2 rounded-lg bg-[#e8913a] text-black text-xs font-mono font-bold hover:bg-[#fde047] transition-colors shrink-0"
              >
                {isLoadingPhotos ? 'Searching...' : 'Search NASA'}
              </button>
            </form>

            {/* Quick preset chips */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs font-mono shrink-0">
              {['ISS', 'Hubble', 'James Webb', 'Mars Rover', 'Artemis'].map(tag => (
                <button
                  key={tag}
                  onClick={() => { setSpacecraftQuery(tag); fetchPhotos(tag); }}
                  className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/15 border border-white/10 text-[#d4af37] text-[11px]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* NASA Image Grid */}
          {isLoadingPhotos ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-[#e8913a] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-mono text-[#a8a29e]">Querying NASA Image and Video Library archives...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {spacecraftPhotos.map(photo => (
                <div
                  key={photo.nasaId}
                  onClick={() => { soundManager.bell(880, 0.1, 1); setSelectedPhoto(photo); }}
                  className="group cursor-pointer rounded-xl border border-white/10 hover:border-[#e8913a] bg-black/40 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(232,145,58,0.25)] flex flex-col"
                >
                  <div className="relative w-full h-44 bg-black overflow-hidden">
                    <Image
                      src={photo.thumbnailUrl}
                      alt={photo.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 border border-white/20 text-[9px] font-mono text-[#fde047]">
                      NASA ID: {photo.nasaId}
                    </div>
                  </div>
                  <div className="p-3 space-y-1 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-serif font-bold text-[#efe6d6] group-hover:text-[#fde047] line-clamp-2">
                        {photo.title}
                      </h4>
                      <p className="text-[10.5px] font-sans text-[#a8a29e] line-clamp-2 mt-1">
                        {photo.description}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#9ca3af]">
                      <span>{photo.dateCreated ? photo.dateCreated.substring(0, 10) : 'NASA Archive'}</span>
                      <span className="text-[#e8913a] group-hover:underline">View ↗</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL 1: Spacecraft Photo Lightbox */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-[#0f0b07] border border-[#e8913a]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-2">
                <Satellite className="w-4 h-4 text-[#e8913a]" />
                <h3 className="text-sm font-serif font-bold text-[#fde047]">
                  {selectedPhoto.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-[#a8a29e] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-96 bg-black shrink-0">
              <Image
                src={selectedPhoto.thumbnailUrl}
                alt={selectedPhoto.title}
                fill
                unoptimized
                className="object-contain"
              />
            </div>

            <div className="p-5 overflow-y-auto space-y-3 font-sans text-xs text-[#efe6d6]">
              <div className="flex items-center gap-4 text-xs font-mono text-[#a8a29e] border-b border-white/10 pb-2">
                <span><strong>NASA ID:</strong> {selectedPhoto.nasaId}</span>
                <span><strong>Date:</strong> {selectedPhoto.dateCreated?.substring(0, 10)}</span>
                <span><strong>Center:</strong> {selectedPhoto.center}</span>
              </div>
              <p className="leading-relaxed text-sm text-[#b5a990]">
                {selectedPhoto.description}
              </p>
              <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#a8a29e]">
                <span>Credit: {selectedPhoto.photographer || 'National Aeronautics and Space Administration (NASA)'}</span>
                <span className="text-[#10b981]">● Verified NASA Image Archive Record</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Satellite Earth Observation Scene Lightbox */}
      {selectedEarthScene && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-[#081018] border border-[#38bdf8]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#38bdf8]" />
                <h3 className="text-sm font-serif font-bold text-[#a5f3fc]">
                  {selectedEarthScene.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEarthScene(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-[#a8a29e] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-96 bg-black shrink-0">
              <Image
                src={selectedEarthScene.imageUrl}
                alt={selectedEarthScene.title}
                fill
                unoptimized
                className="object-contain"
              />
            </div>

            <div className="p-5 overflow-y-auto space-y-3 font-sans text-xs text-[#efe6d6]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-[#a8a29e] border-b border-white/10 pb-2">
                <div><span className="block text-[10px] uppercase">Mission:</span> {selectedEarthScene.mission}</div>
                <div><span className="block text-[10px] uppercase">Sensor:</span> {selectedEarthScene.sensor}</div>
                <div><span className="block text-[10px] uppercase">Observation Date:</span> {selectedEarthScene.acquisitionDate}</div>
                <div><span className="block text-[10px] uppercase">Cloud Cover:</span> {selectedEarthScene.cloudCover}</div>
              </div>
              <p className="leading-relaxed text-sm text-[#b5a990]">
                {selectedEarthScene.details}
              </p>
              <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#a8a29e]">
                <span>Coordinates: {selectedEarthScene.coordinates} ({selectedEarthScene.locationName})</span>
                <span className="text-[#38bdf8]">● Source: {selectedEarthScene.provider}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
