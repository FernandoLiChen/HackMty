import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

const Model = ({ onPlaneClick, resetModelPosition, onAnimationComplete }) => {
  const { scene } = useGLTF('/banorte_LiDv4.glb');
  const meshRef = useRef();
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const isValidSphereName = (name) => {
      const validNames = ["Sphere", "Sphere1", "Sphere2", "Sphere3", "Sphere4", "Sphere5", "Sphere6", "Sphere7"];
      return validNames.includes(name);
    };

    scene.traverse((child) => {
      if (child.isMesh && isValidSphereName(child.name)) {
        child.userData.isClickable = true;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (animating) {
      const initialPosition = [-40, -14, 0];
      const modelPosition = meshRef.current.position;
      const distance = modelPosition.distanceTo(new Vector3(...initialPosition));

      if (distance < 0.1) {
        meshRef.current.position.set(...initialPosition);
        setAnimating(false);
        if (onAnimationComplete) onAnimationComplete();
      } else {
        modelPosition.lerp(new Vector3(...initialPosition), 0.1);
      }
    }
  });

  useEffect(() => {
    if (resetModelPosition) {
      setAnimating(true);
    }
  }, [resetModelPosition]);

  const handlePointerDown = (event) => {
    if (event.object.userData.isClickable) {
      onPlaneClick();
    }
  };

  return (
    <group>
      <primitive 
        ref={meshRef}
        object={scene} 
        scale={[1, 1, 1]} 
        position={[-40, -14, 0]} 
        onPointerDown={handlePointerDown}
      />
    </group>
  );
};

export default Model;