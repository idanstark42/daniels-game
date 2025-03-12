import FightingCharacter from './fighting-character'

export default class Player extends FightingCharacter {
  constructor(x, y, width, height, speedValue, maxHP, hp, armor, spellbook, maxMana, mana, manaRegenRate) {
    super(x, y, width, height, speedValue, maxHP, hp, armor)
    this.spellbook = spellbook
    this.mana = mana
    this.manaRegenRate = manaRegenRate
    this.maxMana = maxMana
  }

  // Cast a spell by typing the corresponding key
  castSpell(spellName) {
    const spell = this.spellbook.get(spellName)
    if (!spell) {
      throw new Error('Spell not found')
    }
    if (this.mana < spell.cost) {
      throw new Error('Not enough mana')
    }

    spell.cast()
    this.mana -= this.spellbook.getManaCost(spellName) // Deduct mana
  }

  // Regenerate mana
  regenerateMana() {
    this.mana = Math.min(this.mana + this.manaRegenRate, this.maxMana)
  }
}
