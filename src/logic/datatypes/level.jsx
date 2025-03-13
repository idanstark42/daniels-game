import Serializable from './serializable'
import Map from './map'

export default class Level extends Serializable {
  constructor (number, map, monsters, keypoints) {
    super(['number', 'map', 'monsters', 'keypoints'])
    this.number = number
    this.map = map
    this.monsters = monsters
    this.keypoints = keypoints
  }

  static fromJSON (json, monstersPool) {
    return new Level(
      json.number,
      Map.fromJSON(json.map),
      json.monsters
        .map(monster => monstersPool.find(m => m.name === monster.name)
        .updated({ x: monster.x, y: monster.y, hp: monster.hp })),
      json.keypoints)
  }
}