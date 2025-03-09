import FightingCharacter from './fighting-character'

export default class Player extends FightingCharacter {
  constructor(x, y, width, height, speedValue, maxHP, hp, armor, control, attack) {
    super(x, y, width, height, speedValue, maxHP, hp, armor)
    this.control = control
    this.attack = attack
  }
}
