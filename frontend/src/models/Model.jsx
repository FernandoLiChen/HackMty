import React from 'react';
import { useGLTF } from '@react-three/drei';

const Model = () => {
  const { scene } = useGLTF('/banorte_gigo_final.glb');
  return <primitive object={scene} scale={[1, 1, 1]} position={[0, 0, 0]} />;
};

export default Model;
