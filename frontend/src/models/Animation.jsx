// src/components/Animation.jsx
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber'; // Importa useFrame desde @react-three/fiber
import { useGLTF } from '@react-three/drei';
import { Vector3 } from 'three';

const Animation = () => {
  const { nodes } = useGLTF('/banorte_LiDv4.glb');
  const spheres = [
    nodes['Sphere'],
    nodes['Sphere1'],
    nodes['Sphere2'],
    nodes['Sphere3'],
    nodes['Sphere4'],
    nodes['Sphere5'],
    nodes['Sphere6'],
    nodes['Sphere7'],
    nodes['Sphere8'],
    nodes['Sphere9'],
    nodes['Sphere10'],
    nodes['Sphere11'],
    nodes['Sphere12'],
    nodes['Sphere13'],
    nodes['Sphere14'],
    nodes['Sphere15'],
    nodes['Sphere16'],
    nodes['Sphere17'],
    nodes['Sphere18'],
    nodes['Sphere19'],
    nodes['Sphere20'],
    nodes['Sphere21'],
  ];

  const moveSpeed = 0.1; // Distancia que se mueve hacia arriba y abajo
  const speed = 2; // Velocidad del movimiento

  // Usar useRef para mantener el tiempo de la animación y la posición inicial
  const animationRef = useRef({
    startTime: performance.now(),
    initialPositions: new Map() // Usar un Map para almacenar posiciones iniciales de múltiples esferas
  });

  useEffect(() => {
    // Almacenar la posición inicial de cada esfera
    spheres.forEach(sphere => {
      if (sphere) {
        animationRef.current.initialPositions.set(sphere.name, sphere.position.clone());
      }
    });
  }, [spheres]);

  useFrame(() => {
    const { startTime, initialPositions } = animationRef.current;
    const time = (performance.now() - startTime) / 1000; // Tiempo en segundos
    const yOffset = Math.sin(time * speed) * moveSpeed; // Cálculo del offset en Y

    spheres.forEach(sphere => {
      if (sphere) {
        const initialPosition = initialPositions.get(sphere.name);
        if (initialPosition) {
          // Actualizar la posición en Y de cada esfera basado en la posición inicial
          sphere.position.y = initialPosition.y + yOffset;
        }
      }
    });
  });

  return null;
};

export default Animation;
