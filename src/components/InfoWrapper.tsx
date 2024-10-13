import { maps } from '@/datum/data';
import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';

export type InfoWrapperProps = {
  title?: string;
} & React.PropsWithChildren;

export const InfoWrapper = ({ title, children }: InfoWrapperProps) => {
  const [backgroundData] = useState(
    maps[Math.floor(Math.random() * maps.length)],
  );

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  return (
    <div className="w-screen h-screen bg-zinc-800">
      <Canvas
        className="absolute blur-2xl w-screen h-screen brightness-50 top-0"
        camera={{
          position: [0, -10, 0],
          fov: 60,
        }}
      >
        <hemisphereLight intensity={0.5} color="white" groundColor="black" />
        <Environment background files={backgroundData.panorama} />
        <OrbitControls
          autoRotateSpeed={-0.5}
          autoRotate
          maxPolarAngle={0.5 * Math.PI}
          minPolarAngle={0.5 * Math.PI}
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
        />
      </Canvas>
      <div className="absolute top-0 left-0 right-0 bottom-0">{children}</div>
    </div>
  );
};
