export default class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add(vector) {
    this.x += vector.x
    this.y += vector.y
    return this
  }

  subtract(vector) {
    this.x -= vector.x
    this.y -= vector.y
    return this
  }

  multiply(scalar) {
    this.x *= scalar
    this.y *= scalar
    return this
  }

  divide(scalar) {
    this.x /= scalar
    this.y /= scalar
    return this
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

  static copy = (vector) => new Vector(vector.x, vector.y)
}
