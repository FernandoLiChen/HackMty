import React, { useEffect, useState } from 'react';
import { Vector3, Euler } from 'three';
import { Canvas } from '@react-three/fiber';
import Model from './Model';
import CameraController from './CameraController';
import CameraPosition from './CameraPosition';
import Animation from './Animation';
import './Scene.css';
import Text from '../components/Text';
import Questions from '../components/Questions';

const Scene = () => {
  const [cameraState, setCameraState] = useState(CameraPosition[0]);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [popupState, setPopupState] = useState(0);
  const [transitionCount, setTransitionCount] = useState(0);
  const [showStartButton, setShowStartButton] = useState(true);
  const [resetModelPosition, setResetModelPosition] = useState(false);
  const [isRotating, setIsRotating] = useState(false); // Estado para controlar la rotación del modelo.
  const [showQuestions, setShowQuestions] = useState(false); // Estado para controlar la visibilidad del Questions popup.

  useEffect(() => {
    switch (popupState) {
      case 0:
        break;
      case 1:
        // Abre el pop-up de Questions y no hace nada más.
        setShowQuestions(true);
        break;
      case 2:
        // Cierra el pop-up de Questions y cambia la cámara a la siguiente posición.
        setShowQuestions(false);
        setTransitionCount(prevCount => prevCount + 1);
        if (transitionCount >= 2) {
          const randomIndex = Math.floor(Math.random() * 3) + (CameraPosition.length - 3);
          setCurrentPositionIndex(randomIndex);
        } else {
          setCurrentPositionIndex((prevIndex) => (prevIndex + 1) % CameraPosition.length);
        }
        setPopupState(0); // Resetea el estado del pop-up después de cerrar.
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

  const handlePlaneClick = () => {
    // Cambia entre abrir y cerrar el popup
    setPopupState(popupState === 1 ? 2 : 1);
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
          isRotating={isRotating}
        />
        <Animation />
        <CameraController cameraState={cameraState} />
      </Canvas>

      {showStartButton && (
        <button className="start-button" onClick={handleStart}>
          Comenzar
        </button>
      )}

      {/* Botón "Open Text Box" siempre visible en la escena */}
      <Text />

      {/* Renderiza el Questions popup si showQuestions es true */}
      {showQuestions && <Questions />}
    </div>
  );
};

export default Scene;
