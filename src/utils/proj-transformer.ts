import proj4 from "proj4";

const utmk =
  "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
const wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
const transformer = proj4(utmk, wgs84);

export { transformer };
