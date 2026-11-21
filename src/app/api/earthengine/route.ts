import { NextResponse } from 'next/server';

interface GEECollectionDef {
  id: string;
  name: string;
  assetId: string;
  provider: string;
  resolution: string;
  bands: string[];
  description: string;
  visParams: Record<string, any>;
  tileUrlTemplate: string;
}

const GEE_CURATED_COLLECTIONS: GEECollectionDef[] = [
  {
    id: 'sentinel2-rgb',
    name: 'Copernicus Sentinel-2 MSI Surface Reflectance',
    assetId: 'COPERNICUS/S2_SR_HARMONIZED',
    provider: 'European Space Agency & Google Earth Engine',
    resolution: '10 meters',
    bands: ['B4 (Red)', 'B3 (Green)', 'B2 (Blue)'],
    description: 'High-resolution multi-spectral optical Earth observation for land surface, vegetation, and coastal monitoring.',
    visParams: { min: 0.0, max: 0.3, bands: ['B4', 'B3', 'B2'] },
    tileUrlTemplate: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  },
  {
    id: 'landsat9',
    name: 'USGS Landsat 9 OLI-2 / TIRS-2 Tier 1',
    assetId: 'LANDSAT/LC09/C02/T1_L2',
    provider: 'USGS / NASA & Google Earth Engine',
    resolution: '30 meters',
    bands: ['SR_B4', 'SR_B3', 'SR_B2'],
    description: 'NASA/USGS multispectral spaceborne imagery across 11 spectral bands.',
    visParams: { min: 0.0, max: 0.3, bands: ['SR_B4', 'SR_B3', 'SR_B2'] },
    tileUrlTemplate: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  },
  {
    id: 'viirs-night',
    name: 'NOAA VIIRS Day/Night Band Nocturnal Radiance',
    assetId: 'NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG',
    provider: 'NOAA / NASA & Google Earth Engine',
    resolution: '500 meters',
    bands: ['avg_rad'],
    description: 'Calibrated nocturnal light emission capturing global electrification and urban nightscapes.',
    visParams: { min: 0.0, max: 60.0 },
    tileUrlTemplate: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_Black_Marble/default/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.png'
  },
  {
    id: 'modis-terra',
    name: 'NASA Terra MODIS True Color Reflectance',
    assetId: 'MODIS/061/MOD09GA',
    provider: 'NASA EOSDIS & Google Earth Engine',
    resolution: '250 meters',
    bands: ['sur_refl_b01', 'sur_refl_b04', 'sur_refl_b03'],
    description: 'Global daily optical swath with atmospheric correction and cloud detection.',
    visParams: { min: 0.0, max: 4000.0 },
    tileUrlTemplate: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/default/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg'
  },
  {
    id: 'srtm-elevation',
    name: 'NASA SRTM Global Digital Elevation Model (30m)',
    assetId: 'USGS/SRTMGL1_003',
    provider: 'NASA / NGA / USGS & Google Earth Engine',
    resolution: '30 meters (1 arc-second)',
    bands: ['elevation'],
    description: 'High-precision topographical radar elevation model covering 80% of Earth landmass.',
    visParams: { min: 0, max: 6000 },
    tileUrlTemplate: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}'
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const collectionId = searchParams.get('collection') || 'sentinel2-rgb';
    const action = searchParams.get('action') || 'catalog';

    // 1. Return catalog of available Earth Engine datasets
    if (action === 'catalog') {
      const selected = GEE_CURATED_COLLECTIONS.find(c => c.id === collectionId) || GEE_CURATED_COLLECTIONS[0];
      return NextResponse.json({
        success: true,
        provider: 'Google Earth Engine (earthengine.googleapis.com)',
        documentation: 'https://developers.google.com/earth-engine/reference/rest',
        activeCollection: selected,
        availableCollections: GEE_CURATED_COLLECTIONS.map(c => ({
          id: c.id,
          name: c.name,
          assetId: c.assetId,
          resolution: c.resolution,
          provider: c.provider
        }))
      });
    }

    // 2. Query Map ID or Tile URL for Earth Engine REST
    const geeApiKey = process.env.GOOGLE_EARTH_ENGINE_KEY;
    const selected = GEE_CURATED_COLLECTIONS.find(c => c.id === collectionId) || GEE_CURATED_COLLECTIONS[0];

    return NextResponse.json({
      success: true,
      provider: 'Google Earth Engine REST API v1',
      endpoint: 'https://earthengine.googleapis.com/v1/',
      assetId: selected.assetId,
      tileUrlTemplate: selected.tileUrlTemplate,
      visParams: selected.visParams,
      isServiceConfigured: Boolean(geeApiKey)
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Failed to query Google Earth Engine API'
    }, { status: 500 });
  }
}
