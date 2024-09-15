// src/components/CameraController.js
import React from 'react';
import { useThree, useFrame } from '@react-three/fiber';

const CameraController = ({ cameraState }) => {
  const { camera } = useThree();

  // Aplicar el estado de la cámara en cada frame
  useFrame(() => {
    camera.position.copy(cameraState.position);
    camera.rotation.copy(cameraState.rotation);
  });

  return null;
};

export default CameraController;
