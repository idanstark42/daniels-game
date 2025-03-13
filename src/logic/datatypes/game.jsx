import Serializable from './serializable'

import Player from './player'
import Level from './level'
import Vector from './vector'
import { Spellbook } from './spellbook'

import PCS from '../presets/player-characters'
import { SPELLS } from '../presets/spells'

export default class Game extends Serializable {
  constructor(players, level) {
    super(['players', 'level'])
    this.players = players
    this.level = level
  }

  tick () {
    for (const player of Object.values(this.players)) {
      player.move(this.level.map)
    }
    for (const monster of this.level.monsters) {
      monster.move(this.level.map)
    }
  }

  static fromJSON (json) {
    return new Game(
      Object.fromEntries(
        Object.entries(json.players).map(([id, player]) => [id, PCS.find(pc => pc.character === player.character).updated({
          position: new Vector(player.position.x, player.position.y),
          speed: new Vector(player.speed.x, player.speed.y),
          speedValue: player.speedValue,
          facing: player.facing,
          hp: player.hp,
          maxHP: player.maxHP,
          armor: player.armor,
          mana: player.mana,
          maxMana: player.maxMana,
          manaRegenRate: player.manaRegenRate,
          spellbook: Spellbook.fromJSON(player.spellbook, SPELLS),
          _temporaryState: player._temporaryState
        })])
      ),
      Level.fromJSON(json.level)
    )
  }
}
