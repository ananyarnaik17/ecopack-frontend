import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

const recommendations = [
  'Bubble-Wrapped Box',
  'Corrugated Box',
  'Thermal Box',
  'Plastic Wrap',
];

const modelMap = {
  'Bubble-Wrapped Box': '/models/bubble-wrapped-box.glb',
  'Corrugated Box': '/models/corrugated-box.glb',
  'Thermal Box': '/models/thermal-box.glb',
  'Plastic Wrap': '/models/plastic-wrap.glb',
};

const sustainabilityScores = {
  'Corrugated Box': 80,
  'Bubble-Wrapped Box': 50,
  'Thermal Box': 40,
  'Plastic Wrap': 20,
};

function Box({ color }) {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Model({ path }) {
  const { scene } = useGLTF(path);
  scene.scale.set(2, 2, 2);
  scene.position.set(0, 0, 0);
  return <primitive object={scene} />;
}

function SustainabilityBar({ score }) {
  const color = score > 60 ? '#4caf50' : score > 30 ? '#ff9800' : '#f44336';

  return (
    <div
      style={{
        background: '#ddd',
        borderRadius: '8px',
        height: '20px',
        width: '100%',
        maxWidth: '300px',
        overflow: 'hidden',
        marginTop: '8px',
        boxShadow: 'inset 0 0 5px #aaa',
      }}
      aria-label={`Sustainability score: ${score} out of 100`}
      title={`Sustainability score: ${score} / 100`}
    >
      <div
        style={{
          width: `${score}%`,
          height: '100%',
          backgroundColor: color,
          transition: 'width 0.5s ease',
        }}
      />
    </div>
  );
}

export default function ThreeDView() {
  const [selectedRecommendation, setSelectedRecommendation] = useState('');
  const navigate = useNavigate();

  const selectedModelPath = modelMap[selectedRecommendation];
  const sustainabilityScore = sustainabilityScores[selectedRecommendation];

  return (
    <div
      style={{
        maxWidth: 900,
        margin: '40px auto',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#222',
        backgroundColor: '#e8f5e9',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 8px 30px rgba(76, 83, 175, 0.2)',
      }}
    >
      {/* Home Button */}
      <button
        onClick={() => navigate('/landing')}
        style={{
          backgroundColor: '#4caf50',
          color: 'white',
          padding: '10px 16px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600',
          marginBottom: '20px',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#388e3c')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#4caf50')}
      >
        Go to Home
      </button>

      <h1
        style={{
          textAlign: 'center',
          marginBottom: 20,
          color: '#2e7d32',
          fontWeight: '700',
        }}
      >
        Packaging Type Viewer
      </h1>

      <div
        style={{
          display: 'flex',
          gap: '30px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        {/* Controls and info */}
        <div
          style={{
            flex: '1 1 280px',
            minWidth: 280,
            background: '#f7f7f7',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          <label
            htmlFor="packaging-select"
            style={{ fontWeight: '600', fontSize: '18px' }}
          >
            Select a Packaging Type:
          </label>

          <select
            id="packaging-select"
            value={selectedRecommendation}
            onChange={(e) => setSelectedRecommendation(e.target.value)}
            style={{
              width: '100%',
              marginTop: '12px',
              padding: '10px 12px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '2px solidrgb(76, 175, 127)',
              outline: 'none',
              transition: 'border-color 0.3s',
              backgroundColor: 'white',
              color: '#2e7d32',
              fontWeight: '600',
              cursor: 'pointer',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#2e7d32')}
            onBlur={(e) => (e.target.style.borderColor = '#4caf50')}
          >
            <option value="" disabled>
              -- Choose an option --
            </option>
            {recommendations.map((rec) => (
              <option key={rec} value={rec}>
                {rec}
              </option>
            ))}
          </select>

          {selectedRecommendation && (
            <div style={{ marginTop: '25px' }}>
              <div
                style={{
                  fontWeight: '600',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                Sustainability Score
                <span
                  style={{
                    display: 'inline-block',
                    width: '18px',
                    height: '18px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    borderRadius: '50%',
                    fontSize: '14px',
                    textAlign: 'center',
                    lineHeight: '18px',
                    cursor: 'default',
                  }}
                  title="This score reflects recyclability, biodegradability, and environmental impact."
                >
                  i
                </span>
              </div>
              <SustainabilityBar score={sustainabilityScore} />
              <div
                style={{
                  marginTop: '8px',
                  fontSize: '14px',
                  color: '#555',
                }}
              >
                {sustainabilityScore} out of 100
              </div>
            </div>
          )}
        </div>

        {/* 3D Canvas */}
        <div
          style={{
            flex: '2 1 550px',
            height: 520,
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            backgroundColor: '#fafafa',
          }}
        >
          <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <OrbitControls />
            {selectedModelPath ? (
              <React.Suspense fallback={<Box color="gray" />}>
                <Model path={selectedModelPath} />
              </React.Suspense>
            ) : (
              <Box color="gray" />
            )}
          </Canvas>
        </div>
      </div>
    </div>
  );
}
