import React, { useEffect, useRef, useState } from 'react'

import BACKGROUND from '../assets/background.png'

import { GameLogic } from '../logic/game'
import { useSyncedContext } from '../logic/sync-context'

import Vector from '../logic/vector'
import canvasImage from './canvas-image'
import TILES from './tiles'
import PLAYERS from './players'

export function GameView () {
  const { peerId, gameState, sendUpdate } = useSyncedContext()
  const canvasRef = useRef(null)
  const [gameLogic, setGameLogic] = useState(null)
  const [zoom, setZoom] = useState(1)

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

    const drawBackground = (ctx) => {
      ctx.drawImage(canvasImage(BACKGROUND), 0, 0, canvas.width, canvas.height)
    }

    const drawMap = (ctx, map, playerPosition) => {
      map.grid.forEach((row, cellY) => {
        row.forEach((cell, cellX) => {
          const position = new Vector(cellX * map.tileSize, cellY * map.tileSize).subtract(playerPosition).add(referencePoint)
          if (cell !== -1) {
            ctx.fillStyle = 'gray'
            ctx.drawImage(TILES[cell], (position.x - map.tileSize / 2) * zoom, (position.y - map.tileSize / 2) * zoom, map.tileSize * zoom, map.tileSize * zoom)
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
        const position = Vector.copy(player.position).subtract(playerPosition).add(referencePoint)
        PLAYERS.FIRE_WIZARD.draw(ctx, player, position, gameLogic.state.level.map.tileSize, zoom)
      })
    }

    const render = () => {
      if (!gameLogic) return
      gameLogic.update()

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawBackground(ctx)
      drawMap(ctx, gameLogic.state.level.map, gameLogic.currentPlayer.position)
      drawMonsters(ctx, gameLogic.state.level.monsters, gameLogic.currentPlayer.position)
      drawPlayers(ctx, gameLogic.state.players, gameLogic.currentPlayer.position)

      requestAnimationFrame(render)
    }

    render()

    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [gameLogic])

  return <canvas ref={canvasRef} width={900} height={600} style={{ border: '1px solid black' }} />
}
