import TILES from '../components/tiles'
import Vector from '../logic/datatypes/vector'

export default function drawMap (ctx, map, referenceVector, zoom) {
  map.grid.forEach((row, cellY) => {
    row.forEach((cell, cellX) => {
      const position = new Vector(cellX * map.tileSize, cellY * map.tileSize).subtract(referenceVector)
      if (cell !== -1) {
        ctx.fillStyle = 'gray'
        ctx.drawImage(TILES[cell], (position.x - map.tileSize / 2) * zoom, (position.y - map.tileSize / 2) * zoom, map.tileSize * zoom, map.tileSize * zoom)
      }
    })
  })
}
