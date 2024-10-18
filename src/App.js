import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Floor({ position, color }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[10, 0.1, 10]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Light({ position, intensity, color, onClick }) {
  const lightRef = useRef();
  const [isOn, setIsOn] = useState(true);

  return (
    <group>
      <mesh position={position} onClick={() => {
        setIsOn(!isOn);
        onClick(!isOn); 
      }}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={isOn ? color : 'gray'} />
      </mesh>
      {isOn && <pointLight ref={lightRef} intensity={intensity} color={color} position={position} />}
    </group>
  );
}

function Door({ position, onClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const doorRef = useRef();

  
  const handleDoorClick = () => {
    setIsOpen(!isOpen);
    onClick(!isOpen); 
  };

  return (
    <mesh 
      position={position} 
      onClick={handleDoorClick} 
      ref={doorRef} 
      rotation={[0, isOpen ? Math.PI / 2 : 0, 0]} 
    >
      <boxGeometry args={[1, 2, 0.1]} />
      <meshStandardMaterial color={isOpen ? 'green' : 'brown'} />
    </mesh>
  );
}

export default function App() {
  const [currentFloor, setCurrentFloor] = useState(1);

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <OrbitControls />

        
        <Floor position={[0, 0, 0]} color={currentFloor === 1 ? 'lightblue' : 'gray'} />
        
        
        <Floor position={[0, -3, 0]} color={currentFloor === 2 ? 'lightblue' : 'gray'} />

        
        <Light 
          position={[2, 1, 0]} 
          intensity={1} 
          color={'red'} 
          onClick={(isOn) => console.log(`Light 1 is ${isOn ? 'On' : 'Off'}`)} 
        />
        <Light 
          position={[2, 1, 2]} 
          intensity={1} 
          color={'red'} 
          onClick={(isOn) => console.log(`Light 2 is ${isOn ? 'On' : 'Off'}`)} 
        />
        <Light 
          position={[2, 1, -2]} 
          intensity={1} 
          color={'red'} 
          onClick={(isOn) => console.log(`Light 3 is ${isOn ? 'On' : 'Off'}`)} 
        />

        
        <Door 
          position={[-2, 1, 0]} 
          onClick={(isOpen) => console.log(`Door 1 is ${isOpen ? 'Open' : 'Closed'}`)} 
        />
        <Door 
          position={[-2, 1, 2]} 
          onClick={(isOpen) => console.log(`Door 2 is ${isOpen ? 'Open' : 'Closed'}`)} 
        />
        <Door 
          position={[-2, 1, -2]} 
          onClick={(isOpen) => console.log(`Door 3 is ${isOpen ? 'Open' : 'Closed'}`)} 
        />

        
        <Light 
          position={[2, -2, 0]} 
          intensity={1} 
          color={'red'} 
          onClick={(isOn) => console.log(`Floor 2 - Light 1 is ${isOn ? 'On' : 'Off'}`)} 
        />
        <Light 
          position={[2, -2, 2]} 
          intensity={1} 
          color={'red'} 
          onClick={(isOn) => console.log(`Floor 2 - Light 2 is ${isOn ? 'On' : 'Off'}`)} 
        />
        <Light 
          position={[2, -2, -2]} 
          intensity={1} 
          color={'red'} 
          onClick={(isOn) => console.log(`Floor 2 - Light 3 is ${isOn ? 'On' : 'Off'}`)} 
        />

        
        <Door 
          position={[-2, -2, 0]} 
          onClick={(isOpen) => console.log(`Floor 2 - Door 1 is ${isOpen ? 'Open' : 'Closed'}`)} 
        />
        <Door 
          position={[-2, -2, 2]} 
          onClick={(isOpen) => console.log(`Floor 2 - Door 2 is ${isOpen ? 'Open' : 'Closed'}`)} 
        />
        <Door 
          position={[-2, -2, -2]} 
          onClick={(isOpen) => console.log(`Floor 2 - Door 3 is ${isOpen ? 'Open' : 'Closed'}`)} 
        />
      </Canvas>

     
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
        <button onClick={() => setCurrentFloor(1)}>Floor 1</button>
        <button onClick={() => setCurrentFloor(2)}>Floor 2</button>
      </div>
    </div>
  );
}