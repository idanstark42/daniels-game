import FightingCharacter from './fighting-character'

export default class Monster extends FightingCharacter {
  constructor(name, x, y, width, height, speedValue, maxHP, hp, armor, control, attack) {
    super(x, y, width, height, speedValue, maxHP, hp, armor, ['name'])
    this.name = name
    this.control = control
    this.attack = attack
  }
}
