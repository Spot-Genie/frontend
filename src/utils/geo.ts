export const calculateCenter = (coordinates: { lat: number; lng: number }[]) => {
  const latValues = coordinates.map((coord) => coord.lat);
  const lngValues = coordinates.map((coord) => coord.lng);

  const minLat = Math.min(...latValues);
  const maxLat = Math.max(...latValues);
  const minLng = Math.min(...lngValues);
  const maxLng = Math.max(...lngValues);

  return {
    lat: (minLat + maxLat) / 2,
    lng: (minLng + maxLng) / 2,
  };
};
