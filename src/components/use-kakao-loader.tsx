import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";

/**
 * @ref https://apis.map.kakao.com/web/guide/
 */
export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: process.env.KAKAO_MAP_KEY,
    libraries: ["clusterer", "drawing", "services"],
  });
}
