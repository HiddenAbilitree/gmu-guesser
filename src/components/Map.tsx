import { useCallback, useEffect, useRef, useState } from 'react';
import maplibregl, { LngLat } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { DataumProps } from '@/Types';

export const Map = (props: DataumProps) => {
  // create a ref of the map
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [mapAnimating, setMapAnimating] = useState(false);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const [markerExists, setMarkerExists] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const clickCallback = useCallback(
    (e: maplibregl.MapMouseEvent) => {
      if (submitted) return;
      markerRef.current?.remove();

      const marker = new maplibregl.Marker({
        color: '#FF0000',
        draggable: false,
      })
        .setLngLat(e.lngLat)
        .addTo(e.target);
      markerRef.current = marker;
      setMarkerExists(true);
    },
    [submitted],
  );

  useEffect(() => {
    const map = new maplibregl.Map({
      container: 'map', // container id
      style: 'https://tiles.openfreemap.org/styles/liberty', // style URL
      center: [-77.30720649743205, 38.83095313606133], // starting position [lng, lat]
      zoom: 16, // starting zoom
      minZoom: 14,
      maplibreLogo: false,
      attributionControl: {
        compact: true,
      },
      maxBounds: [
        [-77.31206068310384, 38.824673633776136],
        [-77.30218251510037, 38.83486941965788],
      ],
    });

    mapRef.current = map;

    return () => mapRef.current?.remove();
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.on('click', clickCallback);
    return () => {
      map.off('click', clickCallback);
    };
  }, [mapRef, clickCallback]);

  useEffect(() => {
    const frame = () => {
      const ref = mapRef.current;
      if (!mapAnimating || !ref) return;

      ref.resize();
      requestAnimationFrame(frame);
    };

    const animator = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animator);
  }, [mapAnimating]);
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    new maplibregl.Marker({
      color: '#0AFF00',
      draggable: false,
    })
      .setLngLat(props.data.latlong.reverse() as [number, number])
      .addTo(map);
    const userMarker = markerRef.current;
    if (!userMarker) return;
    map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [
            userMarker.getLngLat().toArray(),
            props.data.latlong as [number, number],
          ],
        },
      },
    });
    const distance = Math.max(
      0,
      1000 -
        userMarker
          .getLngLat()
          .distanceTo(new LngLat(props.data.latlong[0], props.data.latlong[1])),
    );

    console.log(distance);
    map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#888',
        'line-width': 8,
      },
    });
  }, [submitted, props.data.latlong]);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [mouseEntered, setMouseEntered] = useState(false);
  const [mouseHolding, setMouseHolding] = useState(false);

  useEffect(() => {
    const ref = parentRef.current;
    if (!ref) return;
    if (mouseHolding || mouseEntered) {
      ref.setAttribute('data-map-open', 'true');
      return;
    }

    ref.removeAttribute('data-map-open');
  }, [parentRef, mouseEntered, mouseHolding]);

  return (
    <div
      ref={parentRef}
      onMouseEnter={() => setMouseEntered(true)}
      onMouseLeave={() => setMouseEntered(false)}
      onMouseDown={() => setMouseHolding(true)}
      onMouseUp={() => setMouseHolding(false)}
      className="absolute flex flex-col z-40 transition-all ease-in-out w-[30vw] h-[30vh] bottom-5 map-open:w-[50vw] map-open:h-[50vh] right-5"
    >
      <div
        id="map"
        className="w-full h-full transition-all shadow-md opacity-60 map-open:opacity-100 rounded-t-3xl map-open:rounded-t-lg bg-slate-200"
        onAnimationStart={() => setMapAnimating(true)}
        onAnimationEnd={() => setMapAnimating(false)}
      ></div>
      {markerExists ? (
        <button
          onClick={() => {
            setSubmitted(true);
          }}
          className="z-50 px-5 py-2 text-left bg-red-500 rounded-b-lg select-none hover:bg-red-600 peer text-foreground"
        >
          {submitted ? 'Next' : 'Submit'}
        </button>
      ) : (
        <div className="z-50 px-5 py-2 text-left rounded-b-lg select-none peer bg-btn-background text-foreground">
          Pick a location
        </div>
      )}
    </div>
  );
};
