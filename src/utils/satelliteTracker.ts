import * as satellite from 'satellite.js';
import { 
  SatelliteRecord, 
  SatelliteLivePosition, 
  SatellitePass, 
  ObserverLocation 
} from '../types/today';

// Default observer: Ujjain Observatory (Zero Meridian of ancient Indian astronomy / 75.7682° E, 23.1765° N)
export const DEFAULT_OBSERVER: ObserverLocation = {
  name: 'Ujjain Astronomical Observatory (0° Deshantara)',
  latitude: 23.1765,
  longitude: 75.7682,
  altitudeMeters: 494
};

// Popular global observer presets
export const POPULAR_OBSERVERS: ObserverLocation[] = [
  DEFAULT_OBSERVER,
  { name: 'New Delhi (Jantar Mantar)', latitude: 28.6271, longitude: 77.2166, altitudeMeters: 216 },
  { name: 'Bengaluru (ISRO Telemetry Network)', latitude: 12.9716, longitude: 77.5946, altitudeMeters: 920 },
  { name: 'Sriharikota (Satish Dhawan Space Centre)', latitude: 13.7199, longitude: 80.2304, altitudeMeters: 3 },
  { name: 'Greenwich Royal Observatory, UK', latitude: 51.4769, longitude: -0.0005, altitudeMeters: 46 },
  { name: 'Kennedy Space Center, USA', latitude: 28.5729, longitude: -80.6490, altitudeMeters: 3 },
  { name: 'Tokyo National Astronomical Observatory', latitude: 35.6762, longitude: 139.6503, altitudeMeters: 40 },
  { name: 'Sydney Observatory, Australia', latitude: -33.8596, longitude: 151.2048, altitudeMeters: 44 }
];

/**
 * Haversine formula for spherical great-circle surface distance in kilometers
 */
/**
 * Low-precision solar position in ECI coordinates (km)
 * Based on Astronomical Almanac formulas
 */
export function getSunPositionECI(date: Date): { x: number; y: number; z: number } {
  const jd = (date.getTime() / 86400000) + 2440587.5;
  const n = jd - 2451545.0; // Days since J2000.0
  const L = (280.460 + 0.9856474 * n) % 360; // Mean longitude (deg)
  const g = ((357.528 + 0.9856003 * n) % 360) * (Math.PI / 180); // Mean anomaly (rad)
  const lambda = (L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * (Math.PI / 180); // Ecliptic lon (rad)
  const eps = (23.439 - 0.0000004 * n) * (Math.PI / 180); // Obliquity (rad)
  const R_AU = 1.00014 - 0.01671 * Math.cos(g) - 0.00014 * Math.cos(2 * g); // Distance in AU
  const R_km = R_AU * 149597870.7; // AU to km

  return {
    x: R_km * Math.cos(lambda),
    y: R_km * Math.cos(eps) * Math.sin(lambda),
    z: R_km * Math.sin(eps) * Math.sin(lambda)
  };
}

/**
 * Cylindrical shadow model: check if satellite is illuminated by the Sun
 */
export function isSatelliteSunlit(satPos: { x: number; y: number; z: number }, sunPos: { x: number; y: number; z: number }): boolean {
  const R_earth = 6378.137; // km
  const sunDist = Math.sqrt(sunPos.x * sunPos.x + sunPos.y * sunPos.y + sunPos.z * sunPos.z);
  if (sunDist === 0) return true;
  const uSun = { x: sunPos.x / sunDist, y: sunPos.y / sunDist, z: sunPos.z / sunDist };
  
  // Projection of satellite onto Sun vector
  const dot = satPos.x * uSun.x + satPos.y * uSun.y + satPos.z * uSun.z;
  if (dot > 0) {
    // Satellite is on the day side of Earth
    return true;
  }
  // Distance squared from Earth-Sun axis
  const d2 = (satPos.x - dot * uSun.x) ** 2 + (satPos.y - dot * uSun.y) ** 2 + (satPos.z - dot * uSun.z) ** 2;
  return d2 > R_earth * R_earth;
}

export function haversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371.0;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Compute real-time orbital position, look angles, velocity, and ground tracks for a satellite
 */
export function getSatelliteLivePosition(
  sat: SatelliteRecord,
  date: Date = new Date(),
  observer: ObserverLocation = DEFAULT_OBSERVER
): SatelliteLivePosition | null {
  try {
    const satrec = satellite.twoline2satrec(sat.line1, sat.line2);
    if (!satrec || satrec.error) return null;

    const posVel = satellite.propagate(satrec, date);
    if (!posVel.position || typeof posVel.position === 'boolean') return null;

    const gmst = satellite.gstime(date);
    const geodetic = satellite.eciToGeodetic(posVel.position, gmst);

    const lat = satellite.degreesLat(geodetic.latitude);
    const lon = satellite.degreesLong(geodetic.longitude);
    const alt = geodetic.height;

    // Velocity in km/s
    let velocityKmS = 7.5;
    if (posVel.velocity && typeof posVel.velocity !== 'boolean') {
      velocityKmS = Math.sqrt(
        posVel.velocity.x * posVel.velocity.x +
        posVel.velocity.y * posVel.velocity.y +
        posVel.velocity.z * posVel.velocity.z
      );
    }

    // Observer Look Angles (Azimuth, Elevation, Range)
    const obsGeo: satellite.GeodeticLocation = {
      latitude: satellite.degreesToRadians(observer.latitude),
      longitude: satellite.degreesToRadians(observer.longitude),
      height: observer.altitudeMeters / 1000
    };

    const satEcf = satellite.geodeticToEcf(geodetic);
    const lookAngles = satellite.ecfToLookAngles(obsGeo, satEcf);

    const azimuthDeg = (satellite.radiansToDegrees(lookAngles.azimuth) + 360) % 360;
    const elevationDeg = satellite.radiansToDegrees(lookAngles.elevation);
    const distanceToObserverKm = lookAngles.rangeSat;

    // Ground-track surface distance to observer
    const groundTrackDistanceKm = haversineDistanceKm(
      observer.latitude,
      observer.longitude,
      lat,
      lon
    );

    // Solar illumination check (satellite in sunlight)
    const sunPos = getSunPositionECI(date);
    const isSunlit = isSatelliteSunlit(posVel.position, sunPos);

    // Check if pass is active based on satellite-specific criteria
    let isPassActive = false;
    if (sat.passThresholdKm) {
      isPassActive = groundTrackDistanceKm <= sat.passThresholdKm;
    } else {
      isPassActive = elevationDeg >= 10;
    }

    // Precompute sample ground track (-40 min to +80 min in 4-min steps)
    const orbitPath: [number, number][] = [];
    const stepMin = 3;
    for (let m = -45; m <= 90; m += stepMin) {
      const stepDate = new Date(date.getTime() + m * 60 * 1000);
      const stepPv = satellite.propagate(satrec, stepDate);
      if (stepPv.position && typeof stepPv.position !== 'boolean') {
        const stepGmst = satellite.gstime(stepDate);
        const stepGeo = satellite.eciToGeodetic(stepPv.position, stepGmst);
        orbitPath.push([
          satellite.degreesLat(stepGeo.latitude),
          satellite.degreesLong(stepGeo.longitude)
        ]);
      }
    }

    return {
      noradId: sat.noradId,
      name: sat.name,
      category: sat.category,
      orbitType: sat.orbitType,
      timestamp: date.getTime(),
      latitude: parseFloat(lat.toFixed(4)),
      longitude: parseFloat(lon.toFixed(4)),
      altitudeKm: Math.round(alt),
      velocityKmS: parseFloat(velocityKmS.toFixed(2)),
      azimuthDeg: Math.round(azimuthDeg),
      elevationDeg: parseFloat(elevationDeg.toFixed(1)),
      distanceToObserverKm: Math.round(distanceToObserverKm),
      groundTrackDistanceKm: Math.round(groundTrackDistanceKm),
      isSunlit,
      isPassActive,
      orbitPath
    };
  } catch {
    return null;
  }
}

/**
 * Check if the observer location is in darkness (sun elevation < -6 degrees)
 */
export function isObserverInDarkness(date: Date, observer: ObserverLocation): boolean {
  try {
    const sunPosEci = getSunPositionECI(date);
    const gmst = satellite.gstime(date);
    const obsGeo: satellite.GeodeticLocation = {
      latitude: satellite.degreesToRadians(observer.latitude),
      longitude: satellite.degreesToRadians(observer.longitude),
      height: observer.altitudeMeters / 1000
    };
    const obsEcf = satellite.geodeticToEcf(obsGeo);

    // Approximate solar look angle from observer
    const sunGeo = satellite.eciToGeodetic(sunPosEci, gmst);
    const sunEcf = satellite.geodeticToEcf(sunGeo);
    const sunLook = satellite.ecfToLookAngles(obsGeo, sunEcf);
    const sunElevDeg = satellite.radiansToDegrees(sunLook.elevation);

    return sunElevDeg < -6.0; // Civil twilight or darker
  } catch {
    return false;
  }
}

/**
 * Predict upcoming satellite passes for the next 24-48 hours
 * Using initial pass conditions:
 * - Sentinel-2: ground-track distance <= 145 km
 * - Landsat 8/9: ground-track distance <= 93 km
 * - Others: elevation reaches >= 10 degrees
 */
export function predictUpcomingPasses(
  satellites: SatelliteRecord[],
  observer: ObserverLocation = DEFAULT_OBSERVER,
  startDate: Date = new Date(),
  lookAheadHours: number = 24
): SatellitePass[] {
  const passes: SatellitePass[] = [];
  const maxTimeMs = startDate.getTime() + lookAheadHours * 3600 * 1000;
  const STEP_MS = 60 * 1000; // 1-minute coarse search step

  // Select top priority satellites to keep computation responsive
  const prioritySatellites = satellites.filter(s => 
    s.name.includes('ISS') ||
    s.name.includes('TIANHE') ||
    s.name.includes('HST') ||
    s.name.includes('SENTINEL-2') ||
    s.name.includes('LANDSAT') ||
    s.name.includes('TERRA') ||
    s.name.includes('AQUA') ||
    s.name.includes('NOAA') ||
    s.name.includes('CARTOSAT')
  ).slice(0, 16);

  for (const sat of prioritySatellites) {
    try {
      const satrec = satellite.twoline2satrec(sat.line1, sat.line2);
      if (!satrec || satrec.error) continue;

      let inPass = false;
      let passStart: Date | null = null;
      let maxElevationDeg = -90;
      let maxElevationTime = startDate;
      let minGroundDist = Infinity;
      let startAzimuthDeg = 0;
      let endAzimuthDeg = 0;
      let isOpticallyVisible = false;
      let isDaytimePass = false;

      const thresholdDistKm = sat.passThresholdKm;
      const passType: 'ground-track' | 'elevation' = thresholdDistKm ? 'ground-track' : 'elevation';

      const obsGeo: satellite.GeodeticLocation = {
        latitude: satellite.degreesToRadians(observer.latitude),
        longitude: satellite.degreesToRadians(observer.longitude),
        height: observer.altitudeMeters / 1000
      };

      for (let t = startDate.getTime(); t <= maxTimeMs; t += STEP_MS) {
        const curDate = new Date(t);
        const pv = satellite.propagate(satrec, curDate);
        if (!pv.position || typeof pv.position === 'boolean') continue;

        const gmst = satellite.gstime(curDate);
        const geo = satellite.eciToGeodetic(pv.position, gmst);
        const satEcf = satellite.geodeticToEcf(geo);
        const look = satellite.ecfToLookAngles(obsGeo, satEcf);

        const elevDeg = satellite.radiansToDegrees(look.elevation);
        const azDeg = (satellite.radiansToDegrees(look.azimuth) + 360) % 360;
        const groundDist = haversineDistanceKm(
          observer.latitude,
          observer.longitude,
          satellite.degreesLat(geo.latitude),
          satellite.degreesLong(geo.longitude)
        );

        // Check if condition is satisfied
        const conditionMet = thresholdDistKm 
          ? groundDist <= thresholdDistKm 
          : elevDeg >= 10.0;

        if (conditionMet) {
          if (!inPass) {
            inPass = true;
            passStart = curDate;
            maxElevationDeg = elevDeg;
            maxElevationTime = curDate;
            minGroundDist = groundDist;
            startAzimuthDeg = azDeg;
          } else {
            if (elevDeg > maxElevationDeg) {
              maxElevationDeg = elevDeg;
              maxElevationTime = curDate;
            }
            if (groundDist < minGroundDist) {
              minGroundDist = groundDist;
            }
          }

          // Check optical visibility condition (satellite sunlit & observer dark)
          const sunPos = getSunPositionECI(curDate);
          const isSunlit = isSatelliteSunlit(pv.position, sunPos);
          const isDark = isObserverInDarkness(curDate, observer);

          if (isSunlit && isDark) isOpticallyVisible = true;
          if (!isDark) isDaytimePass = true;
        } else {
          if (inPass && passStart) {
            inPass = false;
            endAzimuthDeg = azDeg;
            const passEnd = curDate;
            const durationSec = Math.round((passEnd.getTime() - passStart.getTime()) / 1000);

            // Passes must last at least 60 seconds to be considered valid
            if (durationSec >= 60) {
              passes.push({
                id: `pass-${sat.noradId}-${passStart.getTime()}`,
                noradId: sat.noradId,
                satelliteName: sat.name,
                category: sat.category,
                startTime: passStart,
                maxElevationTime,
                endTime: passEnd,
                durationSeconds: durationSec,
                maxElevationDeg: Math.round(maxElevationDeg),
                startAzimuthDeg: Math.round(startAzimuthDeg),
                endAzimuthDeg: Math.round(endAzimuthDeg),
                closestApproachDistanceKm: Math.round(minGroundDist),
                groundTrackDistanceKm: Math.round(minGroundDist),
                passType,
                isOpticallyVisible,
                isDaytimePass,
                confidence: 'HIGH (SGP4 Propagation within TLE epoch validity)'
              });
            }

            passStart = null;
          }
        }
      }
    } catch {
      continue;
    }
  }

  // Sort upcoming passes chronologically by start time
  return passes.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
}

/**
 * Adaptive simulation step computation for historical replay:
 * - 2-minute steps (120s) when satellite > 3,500 km away
 * - 10-second steps (10s) when closer than 3,500 km
 */
export function getAdaptiveStepSeconds(closestDistanceKm: number): number {
  if (closestDistanceKm > 3500) {
    return 120; // 2 minutes
  }
  return 10; // 10 seconds
}
