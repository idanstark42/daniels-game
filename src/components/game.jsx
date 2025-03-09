import React, { useEffect, useRef, useState } from 'react'
import { GameLogic } from '../logic/game'
import { useSyncedContext } from '../logic/sync-context'

import Vector from '../logic/vector'

export function GameView () {
  const { peerId, gameState, sendUpdate } = useSyncedContext()
  const canvasRef = useRef(null)
  const [gameLogic, setGameLogic] = useState(null)

  useEffect(() => {
    if (peerId) {
      setGameLogic(new GameLogic(peerId, sendUpdate, gameState))
    }
  }, [peerId, gameState, sendUpdate])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (gameLogic) gameLogic.handleKeyDown(event.key)
    }
    const handleKeyUp = (event) => {
      if (gameLogic) gameLogic.handleKeyUp(event.key)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameLogic])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const referencePoint = new Vector(canvas.width / 2, canvas.height * 0.8)

    const drawMap = (ctx, map, playerPosition) => {
      map.grid.forEach((row, cellY) => {
        row.forEach((cell, cellX) => {
          const position = new Vector(cellX * map.tileSize, cellY * map.tileSize).subtract(playerPosition).add(referencePoint)
          if (cell === 1) {
            ctx.fillStyle = 'gray'
            ctx.fillRect(position.x - map.tileSize / 2, position.y - map.tileSize / 2, map.tileSize, map.tileSize)
          }
        })
      })
    }

    const drawMonsters = (ctx, monsters) => {
      // monsters.forEach(monster => {
      //   ctx.fillStyle = 'red'
      //   ctx.fillRect(monster.x, monster.y, monster.width, monster.height)
      // })
    }

    const drawPlayers = (ctx, players, playerPosition) => {
      Object.values(players).forEach(player => {
        ctx.fillStyle = 'blue'
        const position = Vector.copy(player.position).subtract(playerPosition).add(referencePoint)
        ctx.fillRect(
          position.x - player.size.width * gameLogic.state.level.map.tileSize / 2,
          position.y - player.size.height * gameLogic.state.level.map.tileSize / 2,
          player.size.width * gameLogic.state.level.map.tileSize,
          player.size.height * gameLogic.state.level.map.tileSize
        )
      })
    }

    const render = () => {
      if (!gameLogic) return
      gameLogic.update()

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawMap(ctx, gameLogic.state.level.map, gameLogic.currentPlayer.position)
      drawMonsters(ctx, gameLogic.state.level.monsters, gameLogic.currentPlayer.position)
      drawPlayers(ctx, gameLogic.state.players, gameLogic.currentPlayer.position)

      requestAnimationFrame(render)
    }

    render()
  }, [gameLogic])

  return <canvas ref={canvasRef} width={600} height={400} style={{ border: '1px solid black' }} />
}
