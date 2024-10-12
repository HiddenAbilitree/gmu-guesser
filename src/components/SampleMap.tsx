import { useEffect, useRef, useState } from 'react'
import { Map } from 'maplibre-gl'

export const SampleMap = () => {
  const [map, setMap] = useState<Map | null>(null)

  // create a ref of the map
  const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const ref = mapRef?.current
    if (!ref) return
    // set the map ref
    setMap((oldMap) => {
      //oldMap?.remove()
      return new Map({
        style: 'https://tiles.openfreemap.org/styles/liberty',
        center: [13.388, 52.517],
        zoom: 9.5,
        container: 'map',
      })
    })
  }, [mapRef])

  return (
    <>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }}>
        <div id="map" />
      </div>
    </>
  )
}
