import { Polygon } from "react-kakao-maps-sdk";
import { transformer } from "@/utils/proj-transformer";
import { GeoFeature } from "@/types/geo";
import { useState } from "react";

interface DongPolygonProps {
  geoList: GeoFeature[];
}

export default function DongPolygon({ geoList }: DongPolygonProps) {
  const [mouseOverGeo, setMouseOverGeo] = useState<string | null>(null);

  const handleMouseOver = (name: string) => {
    setMouseOverGeo(name);
  };

  const handleMouseOut = () => {
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
            strokeColor="#2A7EDE"
            strokeOpacity={0.8}
            strokeStyle={"solid"}
            fillColor={mouseOverGeo === geo.properties.KOR_NM ? "#EFFFED" : "#99CAFF"}
            fillOpacity={mouseOverGeo === geo.properties.KOR_NM ? 0.8 : 0.7}
            onMouseover={() => handleMouseOver(geo.properties.KOR_NM)}
            onMouseout={handleMouseOut}
            onClick={() => console.log(geo.properties.KOR_NM)}
          />
        );
      })}
    </>
  );
}
