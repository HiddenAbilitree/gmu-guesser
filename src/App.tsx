import { Map } from '@/components/Map';
import { View } from '@/components/View';
import { MapData, maps } from '@/datum/data';
import { useState } from 'react';

export type DataumProps = {
  data: MapData;
};

function App() {
  const [currentMap, setCurrentMap] = useState<MapData>(
    maps[Math.floor(Math.random() * maps.length)],
  );

  return (
    <>
      <div className="flex h-10 bg-background"></div>

      <Map data={currentMap} />
      <View data={currentMap} />
    </>
  );
}

export default App;
