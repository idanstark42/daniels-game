import './App.css'

import { useSyncedContext } from './logic/sync-context'

import Home from './pages/home'
import Game from './pages/game'

function App() {
  const { connected } = useSyncedContext()

  if (connected) {
    return <Game />
  } else {
    return <Home />
  }
}

export default App
