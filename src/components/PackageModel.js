/*// src/components/PackageModel.js

import React from 'react';
import { useGLTF } from '@react-three/drei';

// Preload all models you might use
useGLTF.preload('/models/box.glb');
useGLTF.preload('/models/bubble_wrap_box.glb');
useGLTF.preload('/models/cushioned_box.glb');

export default function PackageModel({ recommendation }) {
  let modelPath = '/models/box.glb'; // Default model

  if (recommendation) {
    if (recommendation.toLowerCase().includes('bubble')) {
      modelPath = '/models/bubble_wrap_box.glb';
    } else if (recommendation.toLowerCase().includes('cushion')) {
      modelPath = '/models/cushioned_box.glb';
    }
    // Add more mappings if you have more models
  }

  const { scene } = useGLTF(modelPath);

  return <primitive object={scene} scale={1.5} />;
}
*/

// src/components/PackageModel.js

/*import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

// Preload all models (optional but improves performance)
useGLTF.preload('/models/box.glb');
useGLTF.preload('/models/bubble_wrap_box.glb');
useGLTF.preload('/models/cushioned_box.glb');

export default function PackageModel({ recommendation }) {
  // Default model
  let modelPath = '/models/box.glb';

  if (recommendation) {
    const rec = recommendation.toLowerCase();
    if (rec.includes('bubble')) {
      modelPath = '/models/bubble_wrap_box.glb';
    } else if (rec.includes('cushion')) {
      modelPath = '/models/cushioned_box.glb';
    }
    // Add more mappings here if you have more types
  }

  const { scene } = useGLTF(modelPath);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={0.8} />
        <primitive object={scene} scale={1.5} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}*/

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

useGLTF.preload('/models/box.glb');
useGLTF.preload('/models/bubble_wrap_box.glb');
useGLTF.preload('/models/cushioned_box.glb');

function Model({ path }) {
  const { scene } = useGLTF(path);
  scene.scale.set(1.5, 1.5, 1.5);
  scene.position.set(0, 0, 0);
  return <primitive object={scene} />;
}

function FallbackBox() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

export default function PackageModel({ recommendation }) {
  let modelPath = '/models/box.glb';

  if (recommendation) {
    const rec = recommendation.toLowerCase();
    if (rec.includes('bubble')) {
      modelPath = '/models/bubble_wrap_box.glb';
    } else if (rec.includes('cushion')) {
      modelPath = '/models/cushioned_box.glb';
    }
  }

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={0.8} />
        <Suspense fallback={<FallbackBox />}>
          <Model path={modelPath} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}


