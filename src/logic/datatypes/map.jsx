import Serializable from './serializable'

export default class Map extends Serializable {
  constructor(grid, tileSize = DEFAULT_TILE_SIZE) {
    super(['grid', 'tileSize'])
    this.grid = grid
    this.tileSize = tileSize
  }

  isSolid(x, y, width, height) {
    const startX = Math.floor(x / this.tileSize)
    const startY = Math.floor(y / this.tileSize)
    const endX = Math.floor((x + width * this.tileSize) / this.tileSize)
    const endY = Math.floor((y + height * this.tileSize) / this.tileSize)

    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        if (this.grid[j] && this.grid[j][i] !== -1) {
          return true
        }
      }
    }
    return false
  }

  static fromJSON(json) {
    return new Map(json.grid, json.tileSize)
  }
}

const DEFAULT_TILE_SIZE = 32