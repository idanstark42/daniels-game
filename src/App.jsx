import './App.css'

import { useSyncedContext } from './logic/sync-context'

import Home from './pages/home'
import Game from './pages/game'

function App() {
  const { peerId } = useSyncedContext()

  if (!peerId) {
    return <Home />
  } else {
    return <Game />
  }
}

export default App
