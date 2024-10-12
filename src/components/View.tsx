import { OrbitControls, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import backgroundSphericalImageProjectionMappingPictureFilePathLocation from '@/assets/IMG_4077.jpg';

export const View = () => {
  return (
    <div id="canvas-container" className="w-screen h-screen bg-gray-600">
      <Canvas camera={{ position: [0, -10, 0], fov: 60 }}>
        <hemisphereLight intensity={0.5} color="white" groundColor="black" />
        <Environment
          background
          files={
            backgroundSphericalImageProjectionMappingPictureFilePathLocation
          }
        />
        <OrbitControls
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
