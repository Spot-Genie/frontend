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
  const [mapCenter, setMapCenter] = useState({
    lat: 37.555941820265105,
    lng: 127.00801272675048,
  });
  const [mapLevel, setMapLevel] = useState(9);
  const [isPolygonClicked, setIsPolygonClicked] = useState(false);

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
        center={mapCenter}
        style={{
          width: "100%",
          height: "100%",
        }}
        level={mapLevel}
        onZoomChanged={(map) => {
          const mapLevel = map.getLevel();

          if (mapLevel > 7) {
            setIsDongMode(false);
          }
        }}
        onClick={() => {
          if (!isPolygonClicked && isDongMode) {
            setIsDongMode(false);
          }
          setIsPolygonClicked(false);
        }}
      >
        {isDongMode ? (
          <DongPolygon geoList={dongList} setIsPolygonClicked={setIsPolygonClicked} />
        ) : (
          <GuPolygon
            geoList={guList}
            setIsDongMode={setIsDongMode}
            setMapCenter={setMapCenter}
            setMapLevel={setMapLevel}
            setIsPolygonClicked={setIsPolygonClicked}
          />
        )}
      </Map>
    </section>
  );
}
