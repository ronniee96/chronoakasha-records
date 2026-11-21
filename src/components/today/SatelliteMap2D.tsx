'use client';

import React, { useEffect, useRef, useState } from 'react';
import { 
  SatelliteLivePosition, 
  ObserverLocation, 
  SatelliteCategory 
} from '../../types/today';
import { Maximize2, Layers, Sun, Eye, Navigation, Globe } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface SatelliteMap2DProps {
  satellites: SatelliteLivePosition[];
  selectedNoradId: number | null;
  onSelectSatellite: (noradId: number) => void;
  observer: ObserverLocation;
  isLightMode: boolean;
}

export type BaseMapLayer = 'satellite' | 'dark' | 'streets';

const CATEGORY_COLORS: Record<SatelliteCategory, string> = {
  'space-stations': '#f59e0b',    // Amber
  'earth-observation': '#06b6d4', // Cyan
  'scientific': '#a855f7',        // Purple
  'navigation-comms': '#10b981',  // Emerald
  'weather': '#ef4444'            // Red
};

const BASEMAP_TILES: Record<BaseMapLayer, { url: string; attribution: string; maxZoom: number }> = {
  satellite: {
    // ESRI World Imagery — Authentic high-resolution satellite imagery (no watermark, Google Earth style)
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; ESRI &bull; Earthstar Geographics &bull; NASA &bull; USGS',
    maxZoom: 18
  },
  dark: {
    // ESRI Dark Gray Canvas — High-contrast deep space astronomical telemetry (no watermark)
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; ESRI &bull; HERE &bull; Garmin &bull; OpenStreetMap',
    maxZoom: 16
  },
  streets: {
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18
  }
};

export function SatelliteMap2D({
  satellites,
  selectedNoradId,
  onSelectSatellite,
  observer,
  isLightMode
}: SatelliteMap2DProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const leafletModuleRef = useRef<any>(null);
  const currentTileLayerRef = useRef<any>(null);
  const markersRef = useRef<Map<number, any>>(new Map());
  const observerMarkerRef = useRef<any>(null);
  const orbitPathLayerRef = useRef<any>(null);
  const footprintLayerRef = useRef<any>(null);
  const terminatorLayerRef = useRef<any>(null);

  const [baseMap, setBaseMap] = useState<BaseMapLayer>('satellite');
  const [showTerminator, setShowTerminator] = useState<boolean>(true);
  const [showFootprint, setShowFootprint] = useState<boolean>(true);
  const [isMapReady, setIsMapReady] = useState<boolean>(false);

  // 1. Initialize Leaflet Map
  useEffect(() => {
    let active = true;

    const initMap = async () => {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;
      const L = await import('leaflet');
      leafletModuleRef.current = L;

      if (!active || !mapContainerRef.current) return;

      // Clean up previous instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Create Leaflet map instance centered near observer
      const map = L.map(mapContainerRef.current, {
        center: [observer.latitude, observer.longitude],
        zoom: 2.8,
        minZoom: 1.5,
        maxZoom: 14,
        zoomControl: false,
        attributionControl: false,
        worldCopyJump: true
      });

      // Apply initial basemap layer (Zero-watermark ESRI World Imagery / Dark Canvas)
      const tileDef = BASEMAP_TILES[baseMap];
      const tileLayer = L.tileLayer(tileDef.url, {
        maxZoom: tileDef.maxZoom,
        attribution: tileDef.attribution
      }).addTo(map);
      currentTileLayerRef.current = tileLayer;

      // Subtle attribution bottom-right
      L.control.attribution({ position: 'bottomright', prefix: false })
        .addAttribution(tileDef.attribution)
        .addTo(map);

      mapInstanceRef.current = map;
      setIsMapReady(true);
    };

    initMap();

    return () => {
      active = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Basemap Tiles on Layer Switch
  useEffect(() => {
    const map = mapInstanceRef.current;
    const L = leafletModuleRef.current;
    if (!map || !L || !isMapReady) return;

    if (currentTileLayerRef.current) {
      map.removeLayer(currentTileLayerRef.current);
    }

    const tileDef = BASEMAP_TILES[baseMap];
    const newLayer = L.tileLayer(tileDef.url, {
      maxZoom: tileDef.maxZoom,
      attribution: tileDef.attribution
    }).addTo(map);
    newLayer.bringToBack();
    currentTileLayerRef.current = newLayer;
  }, [baseMap, isMapReady]);

  // 2. Render / Update Observer Marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    const L = leafletModuleRef.current;
    if (!map || !L || !isMapReady) return;

    if (observerMarkerRef.current) {
      map.removeLayer(observerMarkerRef.current);
      observerMarkerRef.current = null;
    }

    const observerIcon = L.divIcon({
      className: 'custom-observer-pin',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="w-8 h-8 rounded-full border border-[#fde047] animate-ping opacity-60 absolute"></div>
          <div class="w-4 h-4 rounded-full bg-[#e8913a] border-2 border-white shadow-[0_0_12px_#e8913a] flex items-center justify-center text-[8px] font-bold text-black">
            ✦
          </div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const marker = L.marker([observer.latitude, observer.longitude], {
      icon: observerIcon,
      zIndexOffset: 1000
    }).addTo(map);

    marker.bindPopup(`
      <div style="font-family: Lora, Georgia, serif; color: #1a120b; padding: 4px;">
        <b style="color: #c57922; font-size: 13px;">${observer.name}</b><br/>
        <span style="font-size: 11px; font-family: monospace;">Lat: ${observer.latitude.toFixed(4)}°, Lon: ${observer.longitude.toFixed(4)}°</span><br/>
        <span style="font-size: 10px; color: #666;">Altitude: ${observer.altitudeMeters}m MSL (Observer Reference)</span>
      </div>
    `);

    observerMarkerRef.current = marker;
  }, [observer, isMapReady]);

  // 3. Render / Update Satellite Markers & Ground Tracks
  useEffect(() => {
    const map = mapInstanceRef.current;
    const L = leafletModuleRef.current;
    if (!map || !L || !isMapReady) return;

    // A. Update Satellite Markers
    satellites.forEach((sat) => {
      const color = CATEGORY_COLORS[sat.category] || '#06b6d4';
      const isSelected = sat.noradId === selectedNoradId;

      let marker = markersRef.current.get(sat.noradId);

      const iconHtml = `
        <div class="group relative flex items-center justify-center cursor-pointer">
          ${isSelected ? `<div class="w-10 h-10 rounded-full border border-dashed border-[#fde047] animate-spin absolute" style="animation-duration: 8s;"></div>` : ''}
          <div class="w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
            isSelected 
              ? 'scale-135 shadow-[0_0_15px_#fde047] border-2 border-white' 
              : 'border border-black/80 hover:scale-120'
          }" style="background-color: ${color};">
            <span style="width: 4px; height: 4px; border-radius: 50%; background: #ffffff;"></span>
          </div>
          <span class="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold whitespace-nowrap px-1 rounded bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
            ${sat.name}
          </span>
        </div>
      `;

      const satIcon = L.divIcon({
        className: 'custom-sat-icon',
        html: iconHtml,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      if (!marker) {
        marker = L.marker([sat.latitude, sat.longitude], { icon: satIcon }).addTo(map);
        marker.on('click', () => {
          soundManager.bell(880, 0.2, 1.2);
          onSelectSatellite(sat.noradId);
        });
        markersRef.current.set(sat.noradId, marker);
      } else {
        marker.setLatLng([sat.latitude, sat.longitude]);
        marker.setIcon(satIcon);
      }

      // Bind detailed telemetry popup
      marker.bindPopup(`
        <div style="font-family: Lora, Georgia, serif; color: #1a120b; min-width: 200px;">
          <div style="font-size: 13px; font-weight: bold; color: ${color}; border-bottom: 1px solid #ddd; padding-bottom: 2px;">
            🛰️ ${sat.name}
          </div>
          <div style="font-family: monospace; font-size: 10.5px; margin-top: 6px; line-height: 1.5;">
            <b>NORAD ID:</b> ${sat.noradId}<br/>
            <b>LAT / LON:</b> ${sat.latitude.toFixed(2)}°, ${sat.longitude.toFixed(2)}°<br/>
            <b>ALTITUDE:</b> ${sat.altitudeKm} km (${sat.orbitType})<br/>
            <b>VELOCITY:</b> ${sat.velocityKmS} km/s<br/>
            <b>AZIMUTH:</b> ${sat.azimuthDeg}° &bull; <b>ELEV:</b> ${sat.elevationDeg}°<br/>
            <b>GROUND DIST:</b> ${sat.groundTrackDistanceKm} km<br/>
            <b>ILLUMINATION:</b> ${sat.isSunlit ? '☀️ Direct Sunlight' : '🌑 Earth Shadow'}
          </div>
        </div>
      `);
    });

    // B. Draw Selected Satellite Ground Track & Radio Footprint
    if (orbitPathLayerRef.current) {
      map.removeLayer(orbitPathLayerRef.current);
      orbitPathLayerRef.current = null;
    }
    if (footprintLayerRef.current) {
      map.removeLayer(footprintLayerRef.current);
      footprintLayerRef.current = null;
    }

    const selectedSat = satellites.find(s => s.noradId === selectedNoradId);
    if (selectedSat && selectedSat.orbitPath && selectedSat.orbitPath.length > 1) {
      const color = CATEGORY_COLORS[selectedSat.category] || '#f59e0b';

      // Split orbit path at international dateline (-180 / +180) to avoid horizontal wrapping streaks
      const segments: [number, number][][] = [[]];
      let curSeg = 0;
      for (let i = 0; i < selectedSat.orbitPath.length; i++) {
        const pt = selectedSat.orbitPath[i];
        if (i > 0) {
          const prev = selectedSat.orbitPath[i - 1];
          if (Math.abs(pt[1] - prev[1]) > 180) {
            curSeg++;
            segments[curSeg] = [];
          }
        }
        segments[curSeg].push(pt);
      }

      const multiPolyline = L.polyline(segments, {
        color: color,
        weight: 2.2,
        opacity: 0.85,
        dashArray: '5, 6'
      }).addTo(map);

      orbitPathLayerRef.current = multiPolyline;

      // Radio footprint coverage circle on ground
      if (showFootprint) {
        const R_EARTH = 6371;
        const h = selectedSat.altitudeKm;
        const centralAngle = Math.acos(R_EARTH / (R_EARTH + h));
        const footprintRadiusMeters = centralAngle * R_EARTH * 1000;

        const circle = L.circle([selectedSat.latitude, selectedSat.longitude], {
          radius: footprintRadiusMeters,
          color: color,
          weight: 1,
          opacity: 0.45,
          fillColor: color,
          fillOpacity: 0.08
        }).addTo(map);

        footprintLayerRef.current = circle;
      }
    }
  }, [satellites, selectedNoradId, isMapReady, onSelectSatellite, showFootprint]);

  // 4. Day / Night Solar Terminator Layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    const L = leafletModuleRef.current;
    if (!map || !L || !isMapReady) return;

    if (terminatorLayerRef.current) {
      map.removeLayer(terminatorLayerRef.current);
      terminatorLayerRef.current = null;
    }

    if (!showTerminator) return;

    // Approximate solar terminator curve
    const now = new Date();
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
    const decDeg = -23.44 * Math.cos((2 * Math.PI / 365) * (dayOfYear + 10));
    const decRad = (decDeg * Math.PI) / 180;
    const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600;
    const ghaSunDeg = (utcHours - 12) * 15;

    const latLonPoints: [number, number][] = [];
    for (let lon = -180; lon <= 180; lon += 4) {
      const haRad = ((lon + ghaSunDeg) * Math.PI) / 180;
      const tanLat = -Math.cos(haRad) / Math.tan(decRad);
      const lat = (Math.atan(tanLat) * 180) / Math.PI;
      latLonPoints.push([lat, lon]);
    }

    const nightPoleLat = decDeg >= 0 ? -90 : 90;
    latLonPoints.push([nightPoleLat, 180]);
    latLonPoints.push([nightPoleLat, -180]);

    const polygon = L.polygon(latLonPoints, {
      color: '#000000',
      weight: 1,
      fillColor: '#000000',
      fillOpacity: baseMap === 'satellite' ? 0.35 : 0.25,
      interactive: false
    }).addTo(map);

    terminatorLayerRef.current = polygon;
  }, [showTerminator, isMapReady, isLightMode, baseMap]);

  return (
    <div className="relative w-full h-full min-h-[460px] flex flex-col overflow-hidden bg-[#0d0a08]">
      {/* Top Map Toolbar Controls */}
      <div className="absolute top-3 left-3 z-[400] flex items-center gap-1.5 p-1.5 rounded-[9px] bg-[#120d09e6] border border-[#e8913a]/35 backdrop-blur-md shadow-xl select-none flex-wrap">
        {/* Basemap Switcher */}
        <div className="inline-flex rounded-md bg-black/60 p-0.5 border border-white/10 mr-1">
          <button
            onClick={() => { soundManager.playClick(); setBaseMap('satellite'); }}
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors flex items-center gap-1 ${
              baseMap === 'satellite' 
                ? 'bg-[#0284c7] text-white font-bold shadow' 
                : 'text-[#9ca3af] hover:text-white'
            }`}
            title="Google Earth / ESRI True Satellite Imagery"
          >
            <Globe className="w-3 h-3" />
            <span>Satellite</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setBaseMap('dark'); }}
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors flex items-center gap-1 ${
              baseMap === 'dark' 
                ? 'bg-[#0284c7] text-white font-bold shadow' 
                : 'text-[#9ca3af] hover:text-white'
            }`}
            title="Clean Obsidian Dark Canvas (Zero Watermark)"
          >
            <span>Dark</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setBaseMap('streets'); }}
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors flex items-center gap-1 ${
              baseMap === 'streets' 
                ? 'bg-[#0284c7] text-white font-bold shadow' 
                : 'text-[#9ca3af] hover:text-white'
            }`}
            title="Streets & Hybrid"
          >
            <span>Map</span>
          </button>
        </div>

        {/* Toggle Terminator */}
        <button
          onClick={() => setShowTerminator(!showTerminator)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-[6px] text-[10.5px] font-serif font-bold uppercase transition-all ${
            showTerminator
              ? 'bg-[#e8913a]/25 text-[#fde047] border border-[#e8913a]/40 shadow-sm'
              : 'text-[#b5a990] hover:text-white'
          }`}
          aria-label="Toggle Day Night Terminator"
        >
          <Sun className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Day / Night</span>
        </button>

        {/* Toggle Footprint */}
        <button
          onClick={() => setShowFootprint(!showFootprint)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-[6px] text-[10.5px] font-serif font-bold uppercase transition-all ${
            showFootprint
              ? 'bg-[#6fb0b2]/25 text-[#a5f3fc] border border-[#6fb0b2]/40 shadow-sm'
              : 'text-[#b5a990] hover:text-white'
          }`}
          aria-label="Toggle Sensor Footprint"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Footprint</span>
        </button>

        {/* Reset Camera to Observer */}
        <button
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.flyTo([observer.latitude, observer.longitude], 4.5, { duration: 1.2 });
            }
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-[6px] text-[10.5px] font-serif font-bold text-[#b5a990] hover:text-[#fde047] hover:bg-white/10 transition-all border border-transparent hover:border-[#e8913a]/30"
          aria-label="Focus on Observer"
        >
          <Navigation className="w-3.5 h-3.5 text-[#e8913a]" />
          <span className="hidden sm:inline">Observer View</span>
        </button>
      </div>

      {/* Map Legend Overlay (Bottom Left) */}
      <div className="absolute bottom-3 left-3 z-[400] hidden md:flex items-center gap-3 p-2 rounded-[8px] bg-[#120d09eb] border border-[#e8913a]/30 backdrop-blur-md text-[10px] font-serif text-[#b5a990] shadow-lg select-none">
        <span className="text-[#e8913a] font-bold">ORBITS:</span>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span>
          <span>Space Stations (ISS/CSS)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4]"></span>
          <span>Earth Observation (Sentinel/Landsat)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#a855f7]"></span>
          <span>Scientific (HST)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
          <span>Navigation</span>
        </div>
      </div>

      {/* The Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full flex-1" />
    </div>
  );
}
