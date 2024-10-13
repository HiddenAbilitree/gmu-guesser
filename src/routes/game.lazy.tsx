import { createLazyFileRoute } from '@tanstack/react-router';
import { Map } from '@/components/Map';
import { View } from '@/components/View';
import { maps } from '@/datum/data';
import { useState } from 'react';
import { MapData } from '@/Types';
import { EndGUI } from '@/components/EndGUI';
export const Route = createLazyFileRoute('/game')({
  component: Game,
});

function Game() {
  const [gameData, setGameData] = useState<number[]>([]);
  const [currentMap, setCurrentMap] = useState<MapData>(
    maps[Math.floor(Math.random() * maps.length)],
  );
  const [roundCounter, setRoundCounter] = useState(0);
  const array: MapData[] = maps;
  const changeGame = () => {
    setRoundCounter(roundCounter + 1);
    shuffle(array);
    setCurrentMap(array.pop()!);
  };
  const shuffle = (arr: MapData[]): MapData[] => {
    const out = arr.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      [out[i], out[r]] = [out[r], out[i]];
    }
    return out;
  };

  return (
    <>
      {roundCounter > 2 ? (
        <EndGUI data={gameData} />
      ) : (
        <>
          <Map
            data={currentMap}
            changeCurrentMap={changeGame}
            setGameData={setGameData}
          />
          <View data={currentMap} />
        </>
      )}
    </>
  );
}
