"use client";

import useKakaoLoader from "@/components/use-kakao-loader";
import { api } from "@/services/api";

import { useEffect, useState } from "react";
import { Map, Polygon } from "react-kakao-maps-sdk";
import { transformer } from "@/utils/proj-transformer";
import { GeoFeature, GeoRegion } from "@/types/geo";

export default function Home() {
  useKakaoLoader();

  const [guList, setGuList] = useState<GeoFeature[]>([]);
  const [dongList, setDongList] = useState<GeoFeature[]>([]);
  const [mouseOverGeo, setMouseOverGeo] = useState<string | null>(null);
  const [isDongMode, setIsDongMode] = useState(false);

  useEffect(() => {
    const getGu = async () => {
      const { data } = await api<GeoRegion>("/data/seoul-gu.json");

      setGuList(data.features);
    };

    const getDong = async () => {
      const { data } = await api<GeoRegion>("/data/seoul-dong.json");
      const dongList = data.features.filter((item) => item.geometry?.type === "Polygon");

      setDongList(dongList);
    };

    getGu();
    getDong();
  }, []);

  return (
    <section className="h-full">
      <Map
        center={{
          lat: 37.555941820265105,
          lng: 127.00801272675048,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        level={9}
        onZoomChanged={(map) => {
          const level = map.getLevel();
          if (level <= 7) {
            setIsDongMode(true);
          } else {
            setIsDongMode(false);
          }
        }}
      >
        {(isDongMode ? dongList : guList).map((geo, i) => {
          const coordinates = geo.geometry.coordinates[0].map((coord) => {
            const [x, y] = transformer.forward(coord);
            return { lat: y, lng: x };
          });

          return (
            <Polygon
              key={i}
              path={coordinates}
              strokeWeight={3}
              strokeColor={isDongMode ? "#2A7EDE" : "#39DE2A"}
              strokeOpacity={0.8}
              strokeStyle={"solid"}
              fillColor={
                mouseOverGeo === geo.properties.KOR_NM
                  ? "#EFFFED"
                  : isDongMode
                  ? "#99CAFF"
                  : "#A2FF99"
              }
              fillOpacity={mouseOverGeo === geo.properties.KOR_NM ? 0.8 : 0.7}
              onMouseover={() => setMouseOverGeo(geo.properties.KOR_NM)}
              onMouseout={() => setMouseOverGeo(null)}
              onMousedown={(polygon, mouseEvent) => {
                console.log(mouseEvent);
                console.log(geo.properties.KOR_NM);
              }}
            />
          );
        })}
      </Map>
    </section>
  );
}
