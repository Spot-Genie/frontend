import { CustomOverlayMap, Polygon } from "react-kakao-maps-sdk";
import { transformer } from "@/utils/proj-transformer";
import { GeoCoordinate, GeoFeature } from "@/types/geo";
import { calculateCenter } from "@/utils/geo";
import { Button } from "@/components/ui/button";

interface GuPolygonProps {
  geoList: GeoFeature[];
  setIsDongMode: React.Dispatch<React.SetStateAction<boolean>>;
  setMapCenter: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
  setMapLevel: React.Dispatch<React.SetStateAction<number>>;
  setIsPolygonClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GuPolygon({
  geoList,
  setIsDongMode,
  setMapCenter,
  setMapLevel,
  setIsPolygonClicked,
}: GuPolygonProps) {
  const handleClick = (center: GeoCoordinate) => {
    setMapLevel(7);
    setIsDongMode(true);
    setMapCenter(center);
    setIsPolygonClicked(true);
  };

  return (
    <>
      {geoList.map((geo, i) => {
        const coordinates = geo.geometry.coordinates[0].map((coord) => {
          const [x, y] = transformer.forward(coord);
          return { lat: y, lng: x };
        });
        const center = calculateCenter(coordinates);

        return (
          <>
            <Polygon
              key={i}
              path={coordinates}
              strokeWeight={3}
              strokeColor="#39DE2A"
              strokeOpacity={0.8}
              strokeStyle={"dashed"}
              fillColor={"#A2FF99"}
              fillOpacity={0.7}
            />
            <CustomOverlayMap key={`marker-${i}`} position={center}>
              <Button
                variant="outline"
                className="rounded bg-white p-1 text-sm"
                onClick={() => handleClick(center)}
              >
                {geo.properties.KOR_NM}
              </Button>
            </CustomOverlayMap>
          </>
        );
      })}
    </>
  );
}
