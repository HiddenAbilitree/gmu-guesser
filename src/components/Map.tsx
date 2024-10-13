import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import maplibregl, { GeoJSONSource, LngLat } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { DataumProps } from '@/Types';

export const Map = (
  props: DataumProps & {
    changeCurrentMap: () => void;
  } & { setGameData: Dispatch<SetStateAction<number[]>> } & {
    gameData: number[];
  },
) => {
  // create a ref of the map
  const mapRef = useRef<maplibregl.Map | null>(null);

  const markerRef = useRef<maplibregl.Marker | null>(null);
  const [markerExists, setMarkerExists] = useState(false);

  const answerRef = useRef<maplibregl.Marker | null>(null);

  const [source, setSource] = useState<GeoJSONSource | null>(null);
  const [submitted, setSubmitted] = useState(false);

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
        [-77.31456068310384,38.82217363377614],
        [-77.29968251510037,38.83736941965788],
      ],
    });

    mapRef.current = map;
    map.on('load', () => {
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [],
          },
        },
      });
      setSource(map.getSource('route') as GeoJSONSource);
    });
    return () => mapRef.current?.remove();
  }, []);

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
    const map = mapRef.current;
    if (!map) return;

    map.on('click', clickCallback);
    return () => {
      map.off('click', clickCallback);
    };
  }, [mapRef, clickCallback]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const userMarker = markerRef.current;
    if (!userMarker) return;
    if (map.getLayer('routeLine')) {
      map.removeLayer('routeLine');
    }
    if (answerRef.current) {
      answerRef.current.remove();
    }
    if (!submitted) return;
    if (!source) return;
    const answer = new maplibregl.Marker({
      color: '#0AFF00',
      draggable: false,
    })
      .setLngLat(props.data.latlong.reverse() as [number, number])
      .addTo(map);
    answerRef.current = answer;

    source.setData({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [
          userMarker.getLngLat().toArray(),
          props.data.latlong as [number, number],
        ],
      },
    });

    const distance = Math.max(
      0,
      1000 -
        userMarker
          .getLngLat()
          .distanceTo(new LngLat(props.data.latlong[0], props.data.latlong[1])),
    );
    props.setGameData([...props.gameData, Math.floor(distance)]);
    console.log(props.gameData);

    map.addLayer({
      id: 'routeLine',
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
  }, [submitted, source]);

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

  useEffect(() => {
    setMarkerExists(false);
    markerRef.current?.remove();
    markerRef.current = null;

    setSubmitted(false);
    //if (mapRef.current?.getLayer('route')) {
    //  mapRef.current?.removeSource('route');
    //  mapRef.current?.removeLayer('route');
    //}
  }, [props.data]);

  return (
    <div
      ref={parentRef}
      onMouseEnter={() => setMouseEntered(true)}
      onMouseLeave={() => setMouseEntered(false)}
      onMouseDown={() => setMouseHolding(true)}
      onMouseUp={() => setMouseHolding(false)}
      className="absolute bottom-5 right-5 z-40 flex h-[30vh] w-[30vw] flex-col transition-all ease-in-out map-open:h-[50vh] map-open:w-[50vw]"
    >
      <div
        id="map"
        className="h-full w-full rounded-t-3xl bg-slate-200 opacity-60 shadow-md transition-all map-open:rounded-t-lg map-open:opacity-100"
      ></div>
      {markerExists ? (
        submitted ? (
          <button
            onClick={() => {
              setSubmitted(false);
              props.changeCurrentMap();
            }}
            className="peer z-50 select-none rounded-b-lg bg-red-500 px-5 py-2 text-left text-foreground hover:bg-red-600"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => {
              setSubmitted(true);
            }}
            className="peer z-50 select-none rounded-b-lg bg-red-500 px-5 py-2 text-left text-foreground hover:bg-red-600"
          >
            Submit
          </button>
        )
      ) : (
        <div className="peer z-50 select-none rounded-b-lg bg-btn-background px-5 py-2 text-left text-foreground">
          Pick a location
        </div>
      )}
    </div>
  );
};
