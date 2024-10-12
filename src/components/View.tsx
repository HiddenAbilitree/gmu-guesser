import * as THREE from 'three';
import { OrbitControls, Environment } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { Suspense } from 'react';

import backgroundSphericalImageProjectionMappingPictureFilePathLocation from '../assets/IMG_4077.jpg';

function Dome() {
  const texture = useLoader(
    THREE.TextureLoader,
    backgroundSphericalImageProjectionMappingPictureFilePathLocation,
  );
  return (
    <mesh>
      <sphereBufferGeometry attach="geometry" args={[500, 60, 40]} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        side={THREE.BackSide}
      />
    </mesh>
  );
}
export const View = () => {
  return (
    <div id="canvas-container" className="w-screen h-screen bg-gray-600">
      {/* <Canvas camera={{ position: [0, 0, 0.1] }}>
        <OrbitControls />
        <Suspense fallback={null}>
          <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/evening_road_01_2k.hdr" />
        </Suspense>
      </Canvas> */}
      <Canvas camera={{ position: [0, -10, 0], fov: 60 }}>
        <hemisphereLight intensity={0.5} color="white" groundColor="black" />
        <Environment
          background
          files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/evening_road_01_2k.hdr"
        />
        <OrbitControls
          autoRotateSpeed={0.85}
          zoomSpeed={0.75}
          reverseOrbit
          rotateSpeed={0.25}
          enableDamping

          //minPolarAngle={Math.PI / 2.5}
          //maxPolarAngle={Math.PI / 2.55}
        />
      </Canvas>
    </div>
  );
};
