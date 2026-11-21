export type SatelliteCategory = 
  | 'earth-observation' 
  | 'space-stations' 
  | 'scientific' 
  | 'navigation-comms' 
  | 'weather';

export type OrbitType = 'LEO' | 'MEO' | 'GEO' | 'HEO';

export type ScientificStatus = 
  | 'REAL OBSERVATION' 
  | 'ORBITAL PROPAGATION' 
  | 'PREDICTION' 
  | 'HISTORICAL RECORD' 
  | 'SPECULATION';

export type FeedItemStatus = 'LIVE' | 'UPCOMING' | 'HISTORICAL' | 'PREDICTED';

export interface ObserverLocation {
  name: string;
  latitude: number;   // degrees (-90 to +90)
  longitude: number;  // degrees (-180 to +180)
  altitudeMeters: number;
}

export interface SatelliteRecord {
  noradId: number;
  name: string;
  category: SatelliteCategory;
  orbitType: OrbitType;
  line1: string;
  line2: string;
  epochString: string;
  epochDate: string;
  inclinationDeg: number;
  periodMinutes: number;
  perigeeKm: number;
  apogeeKm: number;
  description: string;
  purpose: string;
  operator: string;
  launchYear: number;
  passThresholdKm?: number; // e.g. 145km for Sentinel-2, 93km for Landsat 8/9
}

export interface SatelliteLivePosition {
  noradId: number;
  name: string;
  category: SatelliteCategory;
  orbitType: OrbitType;
  timestamp: number;
  latitude: number;
  longitude: number;
  altitudeKm: number;
  velocityKmS: number;
  azimuthDeg: number;
  elevationDeg: number;
  distanceToObserverKm: number;
  groundTrackDistanceKm: number;
  isSunlit: boolean;
  isPassActive: boolean;
  orbitPath: [number, number][]; // lat, lon array for current ground track
}

export interface SatellitePass {
  id: string;
  noradId: number;
  satelliteName: string;
  category: SatelliteCategory;
  startTime: Date;
  maxElevationTime: Date;
  endTime: Date;
  durationSeconds: number;
  maxElevationDeg: number;
  startAzimuthDeg: number;
  endAzimuthDeg: number;
  closestApproachDistanceKm: number;
  groundTrackDistanceKm: number;
  passType: 'ground-track' | 'elevation';
  isOpticallyVisible: boolean; // Satellite sunlit AND observer in darkness
  isDaytimePass: boolean;
  confidence: 'HIGH (SGP4 Propagation within TLE epoch validity)' | 'MEDIUM' | 'HISTORICAL RECONSTRUCTION';
}

export interface TodayHistoricalEvent {
  id: string;
  year: number;
  yearFormatted: string;
  title: string;
  month: number; // 1-12
  day: number;   // 1-31
  period: string;
  civilization: string;
  category: 'ancient' | 'archaeology' | 'science' | 'astronomy' | 'space' | 'culture' | 'geology';
  description: string;
  historicalSignificance: string;
  primaryReferences: string[];
  datingConfidence: 'Documented Exact' | 'Astronomically Attested' | 'Epigraphically Attested' | 'Circa / Approximate';
  chakraEraIndex?: number;
  chakraEventTitle?: string;
  thumbnailUrl?: string;
}

export interface TodayActivityFeedItem {
  id: string;
  timestamp: Date;
  category: 'space-pass' | 'satellite-live' | 'astronomy' | 'history' | 'mission-update';
  title: string;
  description: string;
  source: string;
  status: FeedItemStatus;
  scientificCategory: ScientificStatus;
  satelliteNoradId?: number;
  historicalEventId?: string;
}

export interface ReplayState {
  isPlaying: boolean;
  speedMultiplier: number; // 1, 10, 60, 300, 1200
  currentTimestamp: number;
  minTimestamp: number; // 7 days ago
  maxTimestamp: number; // present
  adaptiveStepSeconds: number;
}
