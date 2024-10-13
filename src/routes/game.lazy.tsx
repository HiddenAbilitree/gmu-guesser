import { createLazyFileRoute } from '@tanstack/react-router';
import { Map } from '@/components/Map';
import { View } from '@/components/View';
import { maps } from '@/datum/data';
import { useState } from 'react';
import { MapData } from '@/Types';
export const Route = createLazyFileRoute('/game')({
  component: Game,
});

function Game() {
  const [currentMap, setCurrentMap] = useState<MapData>(
    maps[Math.floor(Math.random() * maps.length)],
  );

  return (
    <>
      <Map data={currentMap} />
      <View data={currentMap} />
    </>
  );
}
