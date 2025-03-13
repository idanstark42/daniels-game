import PLAYER_ANIMATIONS from './player-animations'

import Vector from '../logic/datatypes/vector'


export default function drawPlayers (ctx, players, tileSize, referenceVector, zoom) {
  Object.values(players).forEach(player => {
    const position = Vector.copy(player.position).subtract(referenceVector)
    PLAYER_ANIMATIONS[player.character].draw(ctx, player, position, tileSize, zoom)
  })
}