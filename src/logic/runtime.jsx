import deepmerge from 'deepmerge'

import Game from './datatypes/game'
import Level from './datatypes/level'
import Vector from './datatypes/vector'
import { Spellbook } from './datatypes/spellbook'
import EventListener from './datatypes/event-listener'

import PCS from './presets/player-characters'
import LEVELS from './presets/levels'

export default class Runtime extends EventListener {
  constructor(peerId, state, update, isHost) {
    super()
    Object.assign(this, { peerId, state, update, isHost })
    this.playerControl = new PlayerControl(this)

    if (isHost) {
      this.game = new Game({}, LEVELS[0])
      this.syncup()
    }
  }

  get currentPlayer () {
    return this.game?.players[this.peerId]
  }

  set currentPlayer (player) {
    this.game.players[this.peerId] = player
  }

  chooseCharacter (characterName) {
    console.log('Choosing character:', characterName)
    this.currentPlayer = PCS.find(pc => pc.character === characterName)
    this.syncup()
  }

  tick () {
    this.game.tick()
  }

  syncup () {
    this.update(this.game.toJSON())
    console.log('syncup', this)
  }

  syncdown (state) {
    this.state = deepmerge(this.state, state)
    this.game = Game.fromJSON(this.state)
    console.log('syncdown', this)
  }
}

class PlayerControl {
  constructor (runtime) {
    this.runtime = runtime
    this.runtime.on('keydown', this.handleKeyDown.bind(this))
    this.runtime.on('keyup', this.handleKeyUp.bind(this))
  }

  get currentPlayer () {
    return this.runtime.currentPlayer
  }

  handleKeyDown (key) {
    if (!this.currentPlayer) return
    if (key === 'ArrowLeft') this.currentPlayer.moveLeft()
    if (key === 'ArrowRight') this.currentPlayer.moveRight()
    if (key === ' ') this.currentPlayer.jump()
    this.runtime.syncup()
  }

  handleKeyUp (key) {
    console.log('Key up:', key)
    if (!this.currentPlayer) return
    if (key === 'ArrowLeft' && this.currentPlayer.speed.x < 0) this.currentPlayer.stop()
    if (key === 'ArrowRight' && this.currentPlayer.speed.x > 0) this.currentPlayer.stop()
    this.runtime.syncup()
  }
}
