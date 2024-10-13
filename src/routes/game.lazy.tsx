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
  const changeGame = () => {
    setRoundCounter(roundCounter + 1);
    setCurrentMap(maps[Math.floor(Math.random() * maps.length)]);
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
            gameData={gameData}
          />
          <View data={currentMap} />
        </>
      )}
    </>
  );
}
