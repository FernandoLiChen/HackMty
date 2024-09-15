import React from 'react';
import { useGLTF } from '@react-three/drei';

const Model = () => {
  const { scene } = useGLTF('/banorte_LiDv4.glb');
  return (
    <group>
      <primitive object={scene} scale={[1, 1, 1]} position={[-40, -14, 0]} />
    </group>
  );
};

export default Model;
