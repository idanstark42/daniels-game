import Serializable from './serializable'

export default class Vector extends Serializable {
  constructor(x, y) {
    super(['x', 'y'])
    this.x = x
    this.y = y
  }

  add(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y)
  }

  subtract(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y)
  }

  multiply(scalar) {
    return new Vector(this.x * scalar, this.y * scalar)
  }

  divide(scalar) {
    return new Vector(this.x / scalar, this.y / scalar)
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  normalize() {
    const len = this.length()
    if (len !== 0) {
      this.x /= len
      this.y /= len
    }
  }

  set(x, y) {
    this.x = x
    this.y = y
  }

  toString = () => `(${this.x}, ${this.y})`

  static copy = (vector) => new Vector(vector.x, vector.y)

  static fromJSON = (json) => new Vector(json.x, json.y)
}
