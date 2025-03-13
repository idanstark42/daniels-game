import Serializable from './serializable'

export class Spellbook extends Serializable {
  constructor(spells=[]) {
    super(['spells'])
    this.spells = spells
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

  // Serialize the spellbook
  toJSON () {
    return {
      spells: this.spells.map(spell => spell.toJSON())
    }
  }

  static fromJSON (json, spellPool) {
    return new Spellbook(json.spells.map(spell => spellPool.find(s => s.name === spell.name).updated({ lastCasingTime: spell.lastCasingTime })))
  }
}

export class Spell extends Serializable {
  constructor(name, execute, cooldown) {
    super(['name', 'lastCasingTime'])
    this.name = name
    this._execute = execute
    this.lastCasingTime = null
    this.cooldownTime = cooldown
  }

  cast() {
    if (this.lastCasingTime && Date.now() - this.lastCasingTime < this.cooldownTime) {
      throw new Error('Spell on cooldown')
    }
    this._execute()
    this.lastCasingTime = Date.now()
  }
}