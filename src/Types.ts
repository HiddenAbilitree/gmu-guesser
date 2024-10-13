export type DataumProps = {
  data: MapData;
};

export type MapData = {
  locationName: string;
  latlong: [number, number];
  panorama: string;
};
