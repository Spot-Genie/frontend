export interface Gu {
  type: string;
  features: GuFeature[];
}

export interface GuFeature {
  type: string;
  geometry: GuGeometry;
  properties: GuProperties;
}

export interface GuGeometry {
  type: string;
  coordinates: number[][][];
}

export interface GuProperties {
  nm: string;
}
