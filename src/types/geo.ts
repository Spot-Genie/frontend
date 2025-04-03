export interface GeoRegion {
  type: string;
  features: GeoFeature[];
}

export interface GeoFeature {
  type: string;
  geometry: Geometry;
  properties: GeoProperties;
}

export interface Geometry {
  type?: string;
  coordinates: number[][][];
}

export interface GeoProperties {
  EMD_CD?: string;
  EMD_ENG_NM?: string;
  KOR_NM: string;
}
