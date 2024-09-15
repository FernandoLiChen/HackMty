import React, { useEffect, useState } from 'react';
import { Vector3, Euler } from 'three';
import { Canvas } from '@react-three/fiber';
import Model from './Model';
import CameraController from './CameraController';
import CameraPosition from './CameraPosition';
import Animation from './Animation';
import './Scene.css';

const Scene = () => {
  const [cameraState, setCameraState] = useState(CameraPosition[0]);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [popupState, setPopupState] = useState(0);
  const [transitionCount, setTransitionCount] = useState(0);
  const [showStartButton, setShowStartButton] = useState(true);
  const [resetModelPosition, setResetModelPosition] = useState(false);

  useEffect(() => {
    switch (popupState) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        setTransitionCount(prevCount => prevCount + 1);
        if (transitionCount >= 2) {
          const randomIndex = Math.floor(Math.random() * 3) + (CameraPosition.length - 3);
          setCurrentPositionIndex(randomIndex);
        } else {
          setCurrentPositionIndex((prevIndex) => (prevIndex + 1) % CameraPosition.length);
        }
        setPopupState(0);
        break;
      default:
        break;
    }
  }, [popupState, transitionCount]);

  useEffect(() => {
    setCameraState(CameraPosition[currentPositionIndex]);
  }, [currentPositionIndex]);

  const handleStart = () => {
    setShowStartButton(false);
    setResetModelPosition(true);
  };

  const handleAnimationComplete = () => {
    const initialCameraPosition = {
      position: new Vector3(7.61, -0.70, 1.13),
      rotation: new Euler(0, 90 * (Math.PI / 180), 0),
    };
    setCameraState(initialCameraPosition);
    
    setPopupState(2);
    setResetModelPosition(false);
  };

  const handleNext = () => {
    if (popupState === 0) {
      setPopupState(1);
    }
  };

  const handlePrevious = () => {
    if (popupState === 0) {
      setPopupState(1);
    }
  };

  const handlePlaneClick = () => {
    if (popupState === 0) {
      setPopupState(1);
    }
  };

  const closePopup = () => {
    if (popupState === 1) {
      setPopupState(2);
    }
  };

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
        <Model 
          onPlaneClick={handlePlaneClick} 
          resetModelPosition={resetModelPosition}
          onAnimationComplete={handleAnimationComplete}
        />
        <Animation />
        <CameraController cameraState={cameraState} />
      </Canvas>

      {showStartButton && (
        <button className="start-button" onClick={handleStart}>
          Comenzar
        </button>
      )}

      {popupState === 1 && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>&times;</span>
            <p>Popup content here</p>
            <button className="stop-rotation-button" onClick={() => setIsRotating(true)}>
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* Contenido específico para cada escena */}
      <div className="scene-content">
        {renderSceneSpecificContent()}
      </div>
    </div>
  );
};

export default Scene;
