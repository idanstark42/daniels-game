import { Spell } from '../datatypes/spellbook'

const DEFAULT_TIMEOUT = 10000

export const SPELLS = [
  new Spell('fireball', () => console.log('fireball'), DEFAULT_TIMEOUT),
  new Spell('lightning', () => console.log('lightning'), DEFAULT_TIMEOUT),
  new Spell('arrow', () => console.log('arrow'), DEFAULT_TIMEOUT),
  new Spell('heal', () => console.log('heal'), DEFAULT_TIMEOUT)
]

export function getSpell (name) {
  return SPELLS.find(spell => spell.name === name)
}