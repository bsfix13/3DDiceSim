import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import * as THREE from 'three'

interface DiceProps {
  position: [number, number, number]
  rotation: [number, number, number]
  isRolling: boolean
  onRollComplete: () => void
}

export const Dice = ({ position, rotation, isRolling, onRollComplete }: DiceProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const rotationSpeed = useRef({ x: 0, y: 0, z: 0 })
  const targetRotation = useRef({ x: 0, y: 0, z: 0 })

  useFrame((_, delta) => {
    if (!meshRef.current || !isRolling) return

    if (isRolling) {
      meshRef.current.rotation.x += rotationSpeed.current.x * delta
      meshRef.current.rotation.y += rotationSpeed.current.y * delta
      meshRef.current.rotation.z += rotationSpeed.current.z * delta

      rotationSpeed.current.x *= 0.95
      rotationSpeed.current.y *= 0.95
      rotationSpeed.current.z *= 0.95

      if (
        Math.abs(rotationSpeed.current.x) < 0.01 &&
        Math.abs(rotationSpeed.current.y) < 0.01 &&
        Math.abs(rotationSpeed.current.z) < 0.01
      ) {
        onRollComplete()
      }
    }
  })

  return (
    <Box ref={meshRef} position={position} rotation={rotation} args={[1, 1, 1]}>
      <meshStandardMaterial color="white" />
    </Box>
  )
}
