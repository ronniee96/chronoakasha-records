declare module 'satellite.js' {
  export interface SatRec {
    satnum: string;
    epochyr: number;
    epochdays: number;
    ndot: number;
    nddot: number;
    bstar: number;
    inclo: number;
    nodeo: number;
    ecco: number;
    argpo: number;
    mo: number;
    no: number;
    error: number;
    [key: string]: any;
  }

  export interface Vector3D {
    x: number;
    y: number;
    z: number;
  }

  export interface PositionAndVelocity {
    position: Vector3D | false;
    velocity: Vector3D | false;
  }

  export interface GeodeticLocation {
    longitude: number;
    latitude: number;
    height: number;
  }

  export interface LookAngles {
    azimuth: number;
    elevation: number;
    rangeSat: number;
  }

  export function twoline2satrec(line1: string, line2: string): SatRec;
  export function propagate(satrec: SatRec, date: Date): PositionAndVelocity;
  export function gstime(date: Date): number;
  export function eciToGeodetic(eciCoords: Vector3D, gmst: number): GeodeticLocation;
  export function geodeticToEcf(geodetic: GeodeticLocation): Vector3D;
  export function ecfToLookAngles(observerGeodetic: GeodeticLocation, satelliteEcf: Vector3D): LookAngles;
  export function degreesLat(radians: number): number;
  export function degreesLong(radians: number): number;
  export function radiansLat(degrees: number): number;
  export function radiansLong(degrees: number): number;
  export function degreesToRadians(degrees: number): number;
  export function radiansToDegrees(radians: number): number;
  export function shadowFraction(positionEci: Vector3D, sunPositionEci: Vector3D): number;
  export function sunPos(date: Date): { x: number; y: number; z: number };
}
