export interface Dong {
  type: string;
  features: DongFeature[];
}

export interface DongFeature {
  type: string;
  geometry: DongGeometry;
  properties: DongProperties;
}

export interface DongGeometry {
  type: string;
  coordinates: number[][][];
}

export interface DongProperties {
  EMD_CD: string;
  EMD_ENG_NM: string;
  EMD_KOR_NM: string;
}
