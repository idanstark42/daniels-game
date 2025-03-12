export default class Spellbook {
  constructor() {
    this.spells = []
  }

  learn(spell) {
    this.spells.push(spell)
  }

  forget(spell) {
    this.spells = this.spells.filter(s => s !== spell)
  }

  cast(spellName) {
    const spell = this.spells.find(s => s.name === spellName)
    if (!spell) {
      throw new Error('Spell not found')
    }
    return spell.cast()
  }

  suggest (text) {
    return this.spells.filter(s => s.name.includes(text))
  }
}

class Spell {
  constructor(name, exectue, cooldown) {
    this.name = name
    this.execute = execute
    this.lastCooldown = null
    this.cooldownTime = cooldown
  }

  cast() {
    if (this.lastCooldown && Date.now() - this.lastCooldown < this.cooldownTime) {
      throw new Error('Spell on cooldown')
    }
    this.execute()
    this.lastCooldown = Date.now()
  }
}