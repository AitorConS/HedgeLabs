import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const FloatingCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color="#000000" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#111111"
        />
      </mesh>
    </Float>
  );
};


const ProductHero3D = () => {
  return (
    <div className="h-screen w-full relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        className="bg-background"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <FloatingCube />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center space-y-6">
          <h1 className="font-tech text-6xl md:text-5xl font-bold tracking-wider text-foreground text-white">
            HedgeLabs
          </h1>
          <p className="font-display text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto px-4">
            Introducing the next best Christmas gift. <br /> Nexus
          </p>
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
            <span className="font-tech text-sm tracking-widest text-muted-foreground">
              SCROLL TO EXPLORE
            </span>
            <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHero3D;