import React, { useEffect, useRef, useState } from 'react'

import Runtime from '../logic/runtime'
import { useSyncedContext } from '../logic/sync-context'
import Vector from '../logic/datatypes/vector'

import GameStats from '../components/game-stats'
import Spellbook from '../components/spellbook'
import CharacterSelection from '../components/character-selection'

import drawBackground from '../components/background'
import drawMap from '../components/map'
import drawMonsters from '../components/monsters'
import drawPlayers from '../components/players'

export default function Game () {
  const { peerId, state, sendUpdate, isHost } = useSyncedContext()
  const canvasRef = useRef(null)
  const [runtime, setRuntime] = useState(null)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    if (peerId) {
      if (!runtime) {
        setRuntime(new Runtime(peerId, state, sendUpdate, true))
      } else {
        runtime.syncdown(state)
      }
    }
  }, [peerId, state, sendUpdate, isHost])

  useEffect(() => {
    if (!runtime) return
    const closers = ['keydown', 'keyup'].map(eventName => {
      const handleEvent = (event) => runtime.emit(eventName, event.key)
      window.addEventListener(eventName, handleEvent)
      return () => {
        window.removeEventListener(eventName, handleEvent)
      }
    })

    return () => {
      closers.forEach(closer => closer())
    }
  }, [runtime])

  useEffect(() => {
    if (!runtime || !runtime.currentPlayer) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const referencePoint = new Vector(canvas.width / 2, canvas.height * 0.8)
    const tileSize = runtime.game.level.map.tileSize

    const render = () => {
      if (!runtime) return
      runtime.tick()

      const referenceVector = runtime.currentPlayer.position.subtract(referencePoint)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawBackground(ctx, canvas)
      drawMap(ctx, runtime.game.level.map, referenceVector, zoom)
      drawMonsters(ctx, runtime.game.level.monsters, tileSize, referenceVector, zoom)
      drawPlayers(ctx, runtime.game.players, tileSize, referenceVector, zoom)

      requestAnimationFrame(render)
    }

    render()

    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [runtime, runtime?.currentPlayer, zoom])

  if (!runtime) return <div>Loading...</div>

  if (!runtime.currentPlayer) {
    return <CharacterSelection runtime={runtime} />
  }

  return <div className='game' style={{ display: 'flex', justifyContent: 'center' }}>
    <GameStats runtime={runtime} />
    <canvas ref={canvasRef} width={900} height={600} style={{ border: '1px solid black' }} />
    <Spellbook runtime={runtime} />
  </div>
}
