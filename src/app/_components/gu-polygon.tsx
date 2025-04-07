import { Polygon } from "react-kakao-maps-sdk";
import { transformer } from "@/utils/proj-transformer";
import { GeoFeature } from "@/types/geo";
import { useState } from "react";

interface GuPolygonProps {
  geoList: GeoFeature[];
  setIsDongMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GuPolygon({ geoList, setIsDongMode }: GuPolygonProps) {
  const [mouseOverGeo, setMouseOverGeo] = useState<string | null>(null);

  const onMouseOver = (geoName: string) => {
    setMouseOverGeo(geoName);
  };

  const onMouseOut = () => {
    setMouseOverGeo(null);
  };

  return (
    <>
      {geoList.map((geo, i) => {
        const coordinates = geo.geometry.coordinates[0].map((coord) => {
          const [x, y] = transformer.forward(coord);
          return { lat: y, lng: x };
        });

        return (
          <Polygon
            key={i}
            path={coordinates}
            strokeWeight={3}
            strokeColor="#39DE2A"
            strokeOpacity={0.8}
            strokeStyle={"solid"}
            fillColor={mouseOverGeo === geo.properties.KOR_NM ? "#EFFFED" : "#A2FF99"}
            fillOpacity={mouseOverGeo === geo.properties.KOR_NM ? 0.8 : 0.7}
            onMouseover={() => onMouseOver(geo.properties.KOR_NM)}
            onMouseout={onMouseOut}
            onClick={() => setIsDongMode(true)}
          />
        );
      })}
    </>
  );
}
