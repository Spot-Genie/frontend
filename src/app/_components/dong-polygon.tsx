import { Polygon, CustomOverlayMap } from "react-kakao-maps-sdk";
import { transformer } from "@/utils/proj-transformer";
import { GeoFeature } from "@/types/geo";
import { calculateCenter } from "@/utils/geo";
import { DongSheet } from "./dong-sheet";

interface DongPolygonProps {
  geoList: GeoFeature[];
  setIsPolygonClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DongPolygon({ geoList, setIsPolygonClicked }: DongPolygonProps) {
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
              strokeColor="#2A7EDE"
              strokeOpacity={0.8}
              strokeStyle={"solid"}
              fillColor={"#99CAFF"}
              fillOpacity={0.7}
              onClick={() => {
                setIsPolygonClicked(true);
              }}
            />
            <CustomOverlayMap key={`marker-${i}`} position={center} clickable>
              <DongSheet geo={geo} />
            </CustomOverlayMap>
          </>
        );
      })}
    </>
  );
}
