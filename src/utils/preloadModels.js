import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

// Preload all models
useGLTF.preload('/models/bubble-wrapped-box.glb');
useGLTF.preload('/models/corrugated-box.glb');
useGLTF.preload('/models/thermal-box.glb');
useGLTF.preload('/models/plastic-wrap.glb');

function PackageModelContent({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1.5} />;
}

export default function PackageModel({ recommendation }) {
  let modelPath = '/models/corrugated-box.glb'; // default model path

  if (recommendation) {
    const rec = recommendation.toLowerCase();
    if (rec.includes('bubble')) {
      modelPath = '/models/bubble-wrapped-box.glb';
    } else if (rec.includes('thermal')) {
      modelPath = '/models/thermal-box.glb';
    } else if (rec.includes('plastic')) {
      modelPath = '/models/plastic-wrap.glb';
    } else if (rec.includes('corrugated') || rec.includes('cardboard')) {
      modelPath = '/models/corrugated-box.glb';
    }
  }

  return (
    <Suspense
      fallback={
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      }
    >
      <PackageModelContent modelPath={modelPath} />
    </Suspense>
  );
}

