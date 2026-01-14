'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

interface BuildingProps {
  floors: number
}

function Building({ floors }: BuildingProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Create floor meshes with thermal gradient
  const floorMeshes = useMemo(() => {
    const meshes = []
    const floorHeight = 0.3
    const floorWidth = 4
    const floorDepth = 3

    for (let i = 0; i < floors; i++) {
      // Calculate thermal intensity (hotter at top)
      const thermalIntensity = i / floors
      
      meshes.push({
        position: [0, i * floorHeight, 0] as [number, number, number],
        color: new THREE.Color().lerpColors(
          new THREE.Color('#4ECDC4'), // Cool (bottom)
          new THREE.Color('#FF6B6B'), // Hot (top)
          thermalIntensity
        ),
        wastePercentage: 20 + (thermalIntensity * 40), // 20% to 60% waste
      })
    }

    return meshes
  }, [floors])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      {floorMeshes.map((floor, index) => (
        <mesh key={index} position={floor.position}>
          <boxGeometry args={[4, 0.2, 3]} />
          <meshStandardMaterial
            color={floor.color}
            emissive={floor.color}
            emissiveIntensity={0.3 + (index / floors) * 0.4}
            transparent
            opacity={0.85}
          />
          
          {/* Floor edges for definition */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(4, 0.2, 3)]} />
            <lineBasicMaterial color="#ffffff" opacity={0.2} transparent />
          </lineSegments>
        </mesh>
      ))}

      {/* Heat flow particles */}
      <HeatParticles floors={floors} />
    </group>
  )
}

function HeatParticles({ floors }: { floors: number }) {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 100

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 5
      positions[i * 3 + 1] = Math.random() * floors * 0.3
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4

      // Hot colors
      colors[i * 3] = 1
      colors[i * 3 + 1] = 0.4 + Math.random() * 0.3
      colors[i * 3 + 2] = 0.4 + Math.random() * 0.3
    }

    return { positions, colors }
  }, [floors])

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        // Move particles upward (heat rises)
        positions[i * 3 + 1] += 0.01

        // Reset if too high
        if (positions[i * 3 + 1] > floors * 0.3) {
          positions[i * 3 + 1] = 0
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[8, 5, 8]} />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={5}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={0.5}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4ECDC4" />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#FF6B6B" />
      <spotLight
        position={[0, 20, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
      />

      {/* Building */}
      <Building floors={40} />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#1a1a1a"
          transparent
          opacity={0.3}
        />
      </mesh>
    </>
  )
}

export default function Building3D() {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <Scene />
      </Canvas>
    </div>
  )
}
