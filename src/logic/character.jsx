import Vector from './vector'

export default class Character {
  constructor(x, y, width, height, speedValue) {
    this.position = new Vector(x, y)
    this.size = { width, height }
    this.speed = new Vector(0, 0)
    this.speedValue = speedValue
    this.gravity = DEFAULT_GRAVITY
  }

  moveRight () {
    this.speed.x = this.speedValue
  }

  moveLeft () {
    this.speed.x = -this.speedValue
  }

  stop () {
    this.speed.x = 0
  }

  jump() {
    this.speed.y = -this.speedValue
  }

  move(map) {
    let newPosition = new Vector(this.position.x + this.speed.x, this.position.y + this.speed.y)
    this.speed.y += this.gravity

    if (!map.isSolid(newPosition.x, this.position.y, this.size.width, this.size.height)) {
      this.position.x = newPosition.x
    }

    if (map.isSolid(this.position.x, newPosition.y, this.size.width, this.size.height)) {
      this.speed.y = 0
    } else {
      this.position.y = newPosition.y
    }
  }
}

const DEFAULT_GRAVITY = 0.1
