import { OrbitControls, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { DataumProps } from '@/Types';
import { Euler } from 'three';

export const View = (props: DataumProps) => {
  return (
    <div id="canvas-container" className="h-screen w-screen bg-gray-600">
      {/* set default camera rotation */}
      <Canvas
        camera={{
          position: [0, -10, 0],
          rotation: new Euler(-180, -180, -180, 'XZY'),
          fov: 60,
        }}
      >
        <hemisphereLight intensity={0.5} color="white" groundColor="black" />
        <Environment background files={props.data.panorama} />
        <OrbitControls
          autoRotate={false}
          autoRotateSpeed={0.85}
          zoomSpeed={0.75}
          reverseOrbit
          rotateSpeed={0.25}
          enableDamping
        />
      </Canvas>
    </div>
  );
};
