import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Dice } from './Dice'
import { useState } from 'react'

interface DiceSceneProps {
  isRolling: boolean
  onRollComplete: () => void
}

export const DiceScene = ({ isRolling, onRollComplete }: DiceSceneProps) => {
  const [dice1Position] = useState<[number, number, number]>([-1.5, 0, 0])
  const [dice2Position] = useState<[number, number, number]>([1.5, 0, 0])

  return (
    <Canvas className="w-full h-[400px]">
      <PerspectiveCamera makeDefault position={[0, 5, 8]} />
      <OrbitControls enableZoom={false} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <Dice
        position={dice1Position}
        rotation={[0, 0, 0]}
        isRolling={isRolling}
        onRollComplete={onRollComplete}
      />
      <Dice
        position={dice2Position}
        rotation={[0, 0, 0]}
        isRolling={isRolling}
        onRollComplete={onRollComplete}
      />
    </Canvas>
  )
}
