import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Model from './Model';
import CameraController from './CameraController';
import CameraInfo from './CameraInfo';
import cameraPositions from './CameraPosition';
import Animation from './Animation';
import './Scene.css';

const Scene = () => {
  const [cameraState, setCameraState] = useState(cameraPositions[0]);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);

  const handleNext = () => {
    setCurrentPositionIndex((prevIndex) => (prevIndex + 1) % cameraPositions.length);
  };

  const handlePrevious = () => {
    setCurrentPositionIndex((prevIndex) => (prevIndex - 1 + cameraPositions.length) % cameraPositions.length);
  };

  useEffect(() => {
    setCameraState(cameraPositions[currentPositionIndex]);
  }, [currentPositionIndex]);

  return (
    <div className="-z-40" style={{ margin: 0, height: '100vh', width: '100vw', position: 'absolute' }}>
      <Canvas style={{ display: 'block' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={1} />
        <Model />
        <Animation />
        <CameraController cameraState={cameraState} />
      </Canvas>

      <CameraInfo cameraState={cameraState} />

      {/* Botones de flecha */}
      <nav>
        <button class="botones" onClick={handlePrevious}>&#9664;</button> {/* Flecha izquierda */}
        <button class="botones" onClick={handleNext}>&#9654;</button> {/* Flecha derecha */}
      </nav>
    </div>  
  );
};

export default Scene;
