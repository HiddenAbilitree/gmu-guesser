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
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import {
  HiChevronDoubleRight,
  HiOutlineLocationMarker,
  HiOutlinePaperAirplane,
} from 'react-icons/hi';

export const Map = (
  props: DataumProps & {
    changeCurrentMap: () => void;
  } & { setGameData: Dispatch<SetStateAction<number[]>> },
) => {
  // create a ref of the map
  const mapRef = useRef<maplibregl.Map | null>(null);

  const markerRef = useRef<maplibregl.Marker | null>(null);
  const [markerExists, setMarkerExists] = useState(false);

  const answerRef = useRef<maplibregl.Marker | null>(null);
  const [source, setSource] = useState<GeoJSONSource | null>(null);
  const [submitted, setSubmitted] = useState(false);
  console.log('Rendered Map');
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
        [-77.31456068310384, 38.82217363377614],
        [-77.29968251510037, 38.83736941965788],
      ],
    });

    mapRef.current = map;
    map.once('load', () => {
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

  const scoreCounter = useMotionValue(0);
  const roundedScoreCounter = useTransform(scoreCounter, (latest) =>
    Math.round(latest),
  );

  const { data, changeCurrentMap, setGameData } = props;

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
      .setLngLat(data.latlong.reverse() as [number, number])
      .addTo(map);
    answerRef.current = answer;

    source.setData({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [
          userMarker.getLngLat().toArray(),
          data.latlong as [number, number],
        ],
      },
    });

    const distance = Math.max(
      0,
      1000 -
        userMarker
          .getLngLat()
          .distanceTo(new LngLat(data.latlong[0], data.latlong[1])),
    );
    setGameData((currentState) => [
      ...currentState,
      Math.round(distance > 999 ? 1000 : distance),
    ]);

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

    scoreCounter.set(0);
    animate(
      scoreCounter,
      Math.floor(
        Math.max(
          0,
          (function (x) {
            return x > 999 ? 1000 : x;
          })(
            1000 -
              markerRef
                .current!.getLngLat()
                .distanceTo(new LngLat(data.latlong[0], data.latlong[1])),
          ),
        ),
      ),
      {
        ease: 'easeOut',
        duration: 1.5,
      },
    );
  }, [submitted, source, data.latlong, setGameData, scoreCounter]);

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
  }, [parentRef, mouseEntered, mouseHolding, submitted]);

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
      className="absolute bottom-5 right-5 z-40 flex flex-col items-end transition-all ease-in-out"
    >
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{
              type: 'spring',
            }}
            className="my-4 flex max-w-[30vw] select-none flex-col rounded-lg bg-black/50 p-5 text-foreground"
          >
            <h1 className="text-xl font-medium">
              <motion.span className="font-mono">
                {roundedScoreCounter}
              </motion.span>{' '}
              points
            </h1>
            <p>{data.description}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        id="map"
        className="h-[30vh] w-[30vw] rounded-t-3xl bg-slate-200 opacity-60 shadow-md transition-all map-open:h-[50vh] map-open:w-[50vw] map-open:rounded-t-lg map-open:opacity-100"
      ></div>

      {markerExists ? (
        submitted ? (
          <button
            onClick={() => {
              setSubmitted(false);
              changeCurrentMap();
            }}
            className="z-50 flex w-full select-none items-center justify-end gap-2 rounded-b-lg bg-red-500 px-5 py-2 text-right text-foreground hover:bg-red-600"
          >
            Next
            <HiChevronDoubleRight />
          </button>
        ) : (
          <button
            onClick={() => {
              setSubmitted(true);
            }}
            className="z-50 flex w-full select-none items-center justify-end gap-2 rounded-b-lg bg-red-500 px-5 py-2 text-right text-foreground hover:bg-red-600"
          >
            Submit
            <HiOutlinePaperAirplane />
          </button>
        )
      ) : (
        <div className="z-50 flex w-full select-none items-center justify-end gap-2 rounded-b-lg bg-btn-background px-5 py-2 text-right text-foreground">
          Pick a location
          <HiOutlineLocationMarker />
        </div>
      )}
    </div>
  );
};
