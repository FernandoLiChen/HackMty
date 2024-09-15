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

  const renderSceneSpecificContent = () => {
    switch (currentPositionIndex) {
      case 0:
        return <button className="botones">Hola</button>;
      case 1:
        return (
          <div>
            <p>Pregunta 1: ¿Cuál es tu color favorito?</p>
            <button className="botones">Azul</button>
            <button className="botones">Rojo</button>
            <button className="botones">Verde</button>
          </div>
        );
      case 2:
        return <button className="botones">Escena 2 - Acción especial</button>;
      // Puedes agregar más casos según el índice de la escena.
      default:
        return null;
    }
  };

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

      {/* Contenido específico para cada escena */}
      <div className="scene-content">
        {renderSceneSpecificContent()}
      </div>

      {/* Botones de flecha */}
      <nav>
        <button className="botones" onClick={handlePrevious}>&#9664;</button> {/* Flecha izquierda */}
        <button className="botones" onClick={handleNext}>&#9654;</button> {/* Flecha derecha */}
      </nav>
    </div>
  );
};

export default Scene;
