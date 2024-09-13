import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './models/Model'; // Importa el componente Model

const App = () => {
  return (
    <div style={{ margin: 0, height: '100vh', width: '100vw' }}>
      <Canvas
        camera={{ position: [0, 2.5, 5], fov: 75 }}
        style={{ display: 'block' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={1} />
        <Model />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default App;
