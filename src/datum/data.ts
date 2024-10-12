export type MapData = {
  locationName: string;
  latlong: [number, number];
  panorama: string;
};

export const maps: MapData[] = [
  {
    locationName: 'MIX Lab',
    latlong: [38.8310979, -77.3076892],
    panorama: 'IMG_4077.jpg',
  },
  {
    locationName: 'Horizon Floor Four Window',
    latlong: [38.831831, -77.308017],
    panorama: 'pic1.jpg',
  },
  {
    locationName: 'Fenwick Library D-Wing Entrance',
    latlong: [38.831318, -77.306197],
    panorama: 'pic2.jpg',
  },
  {
    locationName: '',
    latlong: [38.831318, -77.306197],
    panorama: 'pic3.jpg',
  },
];
