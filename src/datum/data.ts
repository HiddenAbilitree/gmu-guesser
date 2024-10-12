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
    locationName: 'Corner of a Bridge behind Dominion',
    latlong: [38.833044, -77.305026],
    panorama: 'pic3.jpg',
  },
  {
    locationName: 'Table Outside The Spot',
    latlong: [38.83346881,-77.30505978],
    panorama: 'pic4.jpg',
  },
  {
    locationName: 'Disc Gold Field Behind The Hub',
    latlong: [38.83032822,-77.30418394],
    panorama: 'pic5.jpg',
  },
];
