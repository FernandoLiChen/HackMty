// src/components/CameraInfo.js
import React from 'react';

const CameraInfo = ({ cameraState }) => (
  <div style={{
    position: 'absolute', top: '10px', left: '10px', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '5px'
  }}>
    <p><strong>Posición:</strong></p>
    <p>X: {cameraState.position.x.toFixed(2)}</p>
    <p>Y: {cameraState.position.y.toFixed(2)}</p>
    <p>Z: {cameraState.position.z.toFixed(2)}</p>

    <p><strong>Rotación:</strong></p>
    <p>X: {(cameraState.rotation.x * (180 / Math.PI)).toFixed(2)}°</p>
    <p>Y: {(cameraState.rotation.y * (180 / Math.PI)).toFixed(2)}°</p>
    <p>Z: {(cameraState.rotation.z * (180 / Math.PI)).toFixed(2)}°</p>
  </div>
);

export default CameraInfo;
