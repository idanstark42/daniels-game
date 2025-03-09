import Character from './character'

export default class FightingCharacter extends Character {
  constructor(x, y, width, height, speedValue, maxHP, hp, armor) {
    super(x, y, width, height, speedValue)
    this.hp = hp
    this.maxHP = maxHP
    this.armor = armor
  }

  takeDamage(damage) {
    const damageTaken = Math.max(damage - this.armor, 0)
    this.hp = Math.max(this.hp - damageTaken, 0)
  }

  heal(amount) {
    this.hp = Math.min(this.hp + amount, this.maxHP)
  }

  setArmor(armorValue) {
    this.armor = armorValue
  }
}