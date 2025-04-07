"use client";

import useKakaoLoader from "@/components/use-kakao-loader";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { GeoFeature, GeoRegion } from "@/types/geo";
import GuPolygon from "./_components/gu-polygon";
import DongPolygon from "./_components/dong-polygon";

export default function Home() {
  useKakaoLoader();

  const [guList, setGuList] = useState<GeoFeature[]>([]);
  const [dongList, setDongList] = useState<GeoFeature[]>([]);
  const [isDongMode, setIsDongMode] = useState(false);

  useEffect(() => {
    const getGu = async () => {
      const { data } = await api<GeoRegion>("/data/seoul-gu.json");
      const gangnamGu = data.features.filter((item) => item.properties.KOR_NM === "강남구");

      setGuList(gangnamGu);
    };

    const getDong = async () => {
      const { data } = await api<GeoRegion>("/data/gangnam-dong.json");
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
      >
        {isDongMode ? (
          <DongPolygon geoList={dongList} />
        ) : (
          <GuPolygon geoList={guList} setIsDongMode={setIsDongMode} />
        )}
      </Map>
    </section>
  );
}
