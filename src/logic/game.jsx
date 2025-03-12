import LEVELS from './levels'
import Player from './player'

export class GameLogic {
  constructor(peerId, update, initialState = null) {
    this._update = update
    this.state = initialState // players & level
    if (!this.state) {
      this.state = { players: {}, level: null }
    }
    if (!this.state.players) {
      this.set({ players: {} })
    }
    if (!this.state.players[peerId]) {
      this.set({ players: { ...(initialState.players || {}), [peerId]: new Player(100, 0, 1, 2.2, 5) } })
    }
    if (!this.state.level) {
      this.set({ level: LEVELS[0] })
    }
    this.currentPlayer = this.state?.players[peerId]
  }

  set (update) {
    this.state = { ...this.state, ...update }
    this._update(update)
  }

  handleKeyDown (key) {
    console.log('Key down:', key)
    if (!this.currentPlayer) return
    if (key === 'ArrowLeft') this.currentPlayer.moveLeft()
    if (key === 'ArrowRight') this.currentPlayer.moveRight()
    if (key === ' ') this.currentPlayer.jump()
    this.update()
  }

  handleKeyUp (key) {
    console.log('Key up:', key)
    if (!this.currentPlayer) return
    if (key === 'ArrowLeft' && this.currentPlayer.speed.x < 0) this.currentPlayer.stop()
    if (key === 'ArrowRight' && this.currentPlayer.speed.x > 0) this.currentPlayer.stop()
  }

  update () {
    for (const player of Object.values(this.state.players)) {
      player.move(this.state.level.map)
    }
    for (const monster of this.state.level.monsters) {
      monster.move(this.state.level.map)
    }
  }
}
