import Vector from './vector'

const STATE_TIME = 100
const RUNNING_SPEED = 4

const RIGHT = 'right'
const LEFT = 'left'

export default class Character {
  constructor(x, y, width, height, speedValue) {
    this.position = new Vector(x, y)
    this.size = { width, height }
    this.speed = new Vector(0, 0)
    this.speedValue = speedValue
    this.gravity = DEFAULT_GRAVITY
    this.facing = RIGHT
  }

  moveRight () {
    this.speed.x = this.speedValue
    this.facing = RIGHT
  }

  moveLeft () {
    this.speed.x = -this.speedValue
    this.facing = LEFT
  }

  stop () {
    this.speed.x = 0
    console.log(this.facing)
  }

  jump() {
    this.setTemporaryState('start jumping ' + this.facing).then(() => {
      this.speed.y = -this.speedValue
    })
  }

  move(map) {
    let newPosition = new Vector(this.position.x + this.speed.x, this.position.y + this.speed.y)

    if (!map.isSolid(newPosition.x, this.position.y, this.size.width, this.size.height)) {
      this.position.x = newPosition.x
    }

    if (map.isSolid(this.position.x, newPosition.y, this.size.width, this.size.height)) {
      this.speed.y = 0
      this.setTemporaryState('landing ' + this.facing)
    } else if (map.isSolid(this.position.x, newPosition.y + 1, this.size.width, this.size.height)) {
      this.speed.y = 0
    } else {
      this.speed.y += this.gravity
      this.position.y = newPosition.y
    }
  }

  state () {
    if (this._temporaryState) return this._temporaryState
    if (this.speed.y < -0.1) {
      return 'jumping ' + this.facing
    } else if (this.speed.y > 0.1) {
      return 'falling ' + this.facing
    }

    if (Math.abs(this.speed.x) > RUNNING_SPEED) {
      return 'running ' + this.facing
    } else if (Math.abs(this.speed.x) > 0) {
      return 'walking ' + this.facing
    }

    return 'idle ' + this.facing
  }

  setTemporaryState (state) {
    this._temporaryState = state
    return new Promise(resolve => {
      setTimeout(() => {
        this._temporaryState = null
        resolve()
      }, STATE_TIME)
    })
  }
}

const DEFAULT_GRAVITY = 0.1
