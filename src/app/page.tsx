"use client";

import useKakaoLoader from "@/components/use-kakao-loader";
import { api } from "@/services/api";
import { Gu } from "@/types/gu";
import { useEffect, useState } from "react";
import { Map, Polygon } from "react-kakao-maps-sdk";
import { transformer } from "@/utils/proj-transformer";

export default function Home() {
  useKakaoLoader();

  const [gu, setGu] = useState<Gu>();
  const [mouseOverGu, setMouseOverGu] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      const { data } = await api<Gu>("/data/seoul-gu.json");
      setGu(data);
    };

    getData();
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
      >
        {gu?.features.map((feature) => {
          const coordinates = feature.geometry.coordinates[0].map((coord) => {
            const [x, y] = transformer.forward(coord);
            return { lat: y, lng: x };
          });

          return (
            <Polygon
              key={feature.properties.nm}
              path={coordinates}
              strokeWeight={3}
              strokeColor={"#39DE2A"}
              strokeOpacity={0.8}
              strokeStyle={"solid"}
              fillColor={mouseOverGu === feature.properties.nm ? "#EFFFED" : "#A2FF99"}
              fillOpacity={mouseOverGu === feature.properties.nm ? 0.8 : 0.7}
              onMouseover={() => setMouseOverGu(feature.properties.nm)}
              onMouseout={() => setMouseOverGu(null)}
              onMousedown={(polygon, mouseEvent) => {
                console.log(mouseEvent);
                console.log(feature.properties.nm);
              }}
            />
          );
        })}
      </Map>
    </section>
  );
}
