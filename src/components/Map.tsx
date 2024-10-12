import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
export const Map = () => {
  // create a ref of the map
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: 'map', // container id
      style: 'https://tiles.openfreemap.org/styles/liberty', // style URL
      center: [-77.30720649743205, 38.83095313606133], // starting position [lng, lat]
      zoom: 16, // starting zoom
      minZoom: 14,
      maplibreLogo: false,
      maxBounds: [
        [-77.31206068310384, 38.824673633776136],
        [-77.30218251510037, 38.83486941965788],
      ],
    });

    mapRef.current = map;
    return () => mapRef.current?.remove();
  }, []);

  return (
    <div className="absolute z-50 transition-all w-[30vw] h-[30vh] bottom-5 hover:w-[50vw] hover:h-[50vh] right-5">
      <div
        id="map"
        className="w-full h-full shadow-md opacity-60 hover:opacity-100 rounded-3xl hover:rounded-lg"
      />
    </div>
  );
};
