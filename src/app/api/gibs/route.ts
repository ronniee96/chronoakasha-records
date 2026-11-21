import { NextResponse } from 'next/server';

interface GibsLayerInfo {
  id: string;
  name: string;
  category: 'natural' | 'night' | 'weather' | 'vegetation' | 'atmosphere' | 'ice';
  sensor: string;
  platform: string;
  format: 'jpg' | 'png';
  tileMatrixSet: string;
  maxZoom: number;
  startDate: string;
  endDate: string;
  description: string;
  attribution: string;
}

const GIBS_AVAILABLE_LAYERS: GibsLayerInfo[] = [
  {
    id: 'MODIS_Terra_CorrectedReflectance_TrueColor',
    name: 'NASA MODIS Terra Natural Color',
    category: 'natural',
    sensor: 'MODIS',
    platform: 'Terra',
    format: 'jpg',
    tileMatrixSet: 'GoogleMapsCompatible_Level9',
    maxZoom: 9,
    startDate: '2000-02-24',
    endDate: 'present',
    description: 'Natural optical true color reflectance (Bands 1, 4, 3) representing Earth surface as human eye would see it from orbit.',
    attribution: 'NASA EOSDIS Global Imagery Browse Services (GIBS)'
  },
  {
    id: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
    name: 'Suomi NPP VIIRS True Color',
    category: 'natural',
    sensor: 'VIIRS',
    platform: 'Suomi NPP',
    format: 'jpg',
    tileMatrixSet: 'GoogleMapsCompatible_Level9',
    maxZoom: 9,
    startDate: '2012-05-01',
    endDate: 'present',
    description: 'High-resolution true color imagery showing cloud formations, dust plumes, vegetation, and snow.',
    attribution: 'NASA / NOAA Suomi NPP VIIRS via NASA GIBS'
  },
  {
    id: 'VIIRS_CityLights_2012',
    name: 'NASA Black Marble Nighttime Lights',
    category: 'night',
    sensor: 'VIIRS Day/Night Band',
    platform: 'Suomi NPP',
    format: 'jpg',
    tileMatrixSet: 'GoogleMapsCompatible_Level8',
    maxZoom: 8,
    startDate: '2012-01-01',
    endDate: 'present',
    description: 'Earth at night showing human settlements, electrified cities, highways, and offshore gas flares.',
    attribution: 'NASA Earth Observatory / NOAA National Geophysical Data Center'
  },
  {
    id: 'MODIS_Terra_NDVI_16Day',
    name: 'MODIS Terra Vegetation Index (NDVI)',
    category: 'vegetation',
    sensor: 'MODIS',
    platform: 'Terra',
    format: 'png',
    tileMatrixSet: 'GoogleMapsCompatible_Level9',
    maxZoom: 9,
    startDate: '2000-02-18',
    endDate: 'present',
    description: 'Normalized Difference Vegetation Index measuring photosynthetic biomass vigor and canopy density.',
    attribution: 'NASA EOSDIS Land Processes Distributed Active Archive Center (LP DAAC)'
  },
  {
    id: 'AIRS_Prata_SO2_Index_Day',
    name: 'Atmospheric Sulfur Dioxide & Volcanic Aerosols',
    category: 'atmosphere',
    sensor: 'AIRS',
    platform: 'Aqua',
    format: 'png',
    tileMatrixSet: 'GoogleMapsCompatible_Level6',
    maxZoom: 6,
    startDate: '2002-09-01',
    endDate: 'present',
    description: 'Daily column atmospheric sulfur dioxide indicative of volcanic eruptions and heavy industrial emissions.',
    attribution: 'NASA Goddard Earth Sciences Data and Information Services Center'
  },
  {
    id: 'MODIS_Terra_Snow_Cover',
    name: 'Cryosphere: Polar Ice & Snow Cover',
    category: 'ice',
    sensor: 'MODIS',
    platform: 'Terra',
    format: 'png',
    tileMatrixSet: 'GoogleMapsCompatible_Level8',
    maxZoom: 8,
    startDate: '2000-02-24',
    endDate: 'present',
    description: 'Daily global snow and sea ice cover fraction derived from normalized difference snow index (NDSI).',
    attribution: 'National Snow and Ice Data Center (NSIDC) / NASA EOSDIS'
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const layerId = searchParams.get('layer') || 'MODIS_Terra_CorrectedReflectance_TrueColor';
    const dateParam = searchParams.get('date'); // YYYY-MM-DD (defaults to yesterday for complete daily mosaic)

    // Calculate default date (yesterday UTC) to ensure complete satellite orbital mosaic pass
    const targetDate = dateParam ? new Date(dateParam) : new Date(Date.now() - 24 * 3600 * 1000);
    const dateString = targetDate.toISOString().substring(0, 10);

    const layer = GIBS_AVAILABLE_LAYERS.find(l => l.id === layerId) || GIBS_AVAILABLE_LAYERS[0];

    // Construct standard OGC WMTS REST tile template
    const wmtsTileUrlTemplate = `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${layer.id}/default/${dateString}/${layer.tileMatrixSet}/{z}/{y}/{x}.${layer.format}`;

    // Sample overview tile URL at zoom level 1 (shows full hemisphere)
    const samplePreviewTile = `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${layer.id}/default/${dateString}/${layer.tileMatrixSet}/1/0/0.${layer.format}`;

    return NextResponse.json({
      success: true,
      provider: 'NASA Earth Observation — GIBS',
      selectedLayer: layer,
      availableLayers: GIBS_AVAILABLE_LAYERS,
      date: dateString,
      wmtsTileUrlTemplate,
      samplePreviewTile,
      capabilitiesUrl: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/1.0.0/WMTSCapabilities.xml',
      license: 'NASA Open Data Policy (Public Domain & Open Science)',
      scientificDisclaimer: 'Daily imagery represents complete polar-orbiting swath composites acquired over a 24-hour observation cycle. Not real-time live streaming video.'
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Failed to retrieve NASA GIBS layer metadata'
    }, { status: 500 });
  }
}
