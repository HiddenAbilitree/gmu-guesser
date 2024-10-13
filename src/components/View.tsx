import { OrbitControls, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { DataumProps } from '@/Types';

export const View = (props: DataumProps) => {
  console.log('Rendered View');
  return (
    <div id="canvas-container" className="h-screen w-screen bg-black">
      {/* set default camera rotation */}
      <Canvas
        camera={{
          position: [90, 0, 0],
          rotation: [90, 0, 0],
          fov: 60,
        }}
      >
        <hemisphereLight intensity={0.5} color="white" groundColor="black" />
        <Environment background files={props.data.panorama} />
        <OrbitControls
          zoomSpeed={0.75}
          reverseOrbit
          rotateSpeed={0.25}
          enableDamping
        />
      </Canvas>
    </div>
  );
};
