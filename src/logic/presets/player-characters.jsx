import Player from '../datatypes/player'
import { Spellbook } from '../datatypes/spellbook'
import { getSpell } from './spells'

const CHARACTER_WIDTH = 1
const CHARACTER_HEIGHT = 2.2
const INITIAL_CHARACTER_SPEED = 5
const INITIAL_CHARACTER_HP = 100
const INITIAL_CHARACTER_ARMOR = 0
const INITIAL_CHARACTER_MANA = 100
const INITIAL_CHARACTER_MANA_REGEN_RATE = 1

const character = (name, spellbook) => new Player(name, 100, 0, CHARACTER_WIDTH, CHARACTER_HEIGHT, INITIAL_CHARACTER_SPEED, INITIAL_CHARACTER_HP, INITIAL_CHARACTER_HP, INITIAL_CHARACTER_ARMOR, spellbook, INITIAL_CHARACTER_MANA, INITIAL_CHARACTER_MANA, INITIAL_CHARACTER_MANA_REGEN_RATE)

const PCS = [
  character('Fire Wizard', new Spellbook([
    getSpell('fireball')
  ])),
  character('Lightning Wizard', new Spellbook([
    getSpell('lightning')
  ])),
  character('Wandarer Wizard', new Spellbook([
    getSpell('arrow')
  ]))
]

export default PCS
