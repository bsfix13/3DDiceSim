import { useState } from 'react'
import { DiceScene } from './components/DiceScene'
import { Dice as DiceIcon } from 'lucide-react'

function App() {
  const [isRolling, setIsRolling] = useState(false)
  const [score, setScore] = useState(0)
  const [cooldown, setCooldown] = useState(false)

  const handleRoll = () => {
    if (cooldown) return
    
    setIsRolling(true)
    setCooldown(true)
    
    // Random score between 2 and 12
    const newScore = Math.floor(Math.random() * 11) + 2
    setScore(newScore)

    setTimeout(() => {
      setCooldown(false)
    }, 10000)
  }

  const handleRollComplete = () => {
    setIsRolling(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center p-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-white text-center mb-8">3D Dice Roller</h1>
        
        <div className="relative">
          <DiceScene isRolling={isRolling} onRollComplete={handleRollComplete} />
        </div>

        <div className="mt-8 flex flex-col items-center gap-6">
          <div className="text-2xl font-bold text-white">
            Score: {score}
          </div>

          <button
            onClick={handleRoll}
            disabled={cooldown || isRolling}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold
              transition-all duration-200
              ${cooldown || isRolling
                ? 'bg-gray-500 cursor-not-allowed opacity-50'
                : 'bg-white text-purple-900 hover:bg-purple-100 active:scale-95'
              }
            `}
          >
            <DiceIcon className="w-6 h-6" />
            Roll Dice
          </button>

          {cooldown && (
            <div className="text-white/80 text-sm">
              Please wait 10 seconds before rolling again
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
