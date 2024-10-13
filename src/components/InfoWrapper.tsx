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
    <div className="h-screen w-screen bg-zinc-800">
      <Canvas
        className="absolute top-0 h-screen w-screen blur-2xl brightness-50"
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
      <div className="absolute bottom-0 left-0 right-0 top-0">{children}</div>
    </div>
  );
};
