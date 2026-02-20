import { useState } from 'react'
import StarField from './components/StarField'
import Embers from './components/Embers'
import Deck from './components/Deck'
import OregonTrailGame from './components/easter-eggs/OregonTrailGame'
import useKonamiCode from './components/easter-eggs/useKonamiCode'

export default function App() {
  const [showGame, setShowGame] = useState(false)

  useKonamiCode(() => setShowGame(true))

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#080810' }}>
      <StarField />
      <Embers />
      <Deck />
      {showGame && <OregonTrailGame onClose={() => setShowGame(false)} />}
    </div>
  )
}
