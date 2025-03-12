import FireWizardIdle from '../assets/players/fire-wizard/Idle.png'
import FireWizardWalk from '../assets/players/fire-wizard/Walk.png'
import FireWizardRun from '../assets/players/fire-wizard/Run.png'
import FireWizardJump from '../assets/players/fire-wizard/Jump.png'

import FireWizardCharge from '../assets/players/fire-wizard/Charge.png'
import FireWizardHurt from '../assets/players/fire-wizard/Hurt.png'
import FireWizardDeath from '../assets/players/fire-wizard/Dead.png'

import FireWizardAttack1 from '../assets/players/fire-wizard/Attack_1.png'
import FireWizardAttack2 from '../assets/players/fire-wizard/Attack_2.png'
import FireWizrdFireball from '../assets/players/fire-wizard/Fireball.png'
import FireWizardFlameJet from '../assets/players/fire-wizard/Flame_jet.png'

const ANIMATION_SPEED = 10

class PlayerAnimator {
  constructor (animations) {
    this.animations = Object.keys(animations).reduce((acc, key) => {
      const img = new Image()
      img.src = animations[key].src
      img.onload = () => {
        console.log('Loaded animation', key)
      }
      acc[key] = { image: img, ...animations[key] }
      return acc
    }, {})
    this.frame = 0
  }

  draw (ctx, player, position, tileSize, zoom) {
    let animation = this.animations[player.state()]
    if (!animation) {
      console.warn(`Animation ${player.state()} not found`)
      animation = this.animations.idle
    }

    ctx.fillRect((position.x - tileSize / 2) * zoom, (position.y - tileSize / 2) * zoom, player.size.width * tileSize * zoom, player.size.height * tileSize * zoom)
    if (animation.flipped) {
      ctx.scale(-1, 1)
      position.x = -position.x
    }
    ctx.drawImage(animation.image, Math.floor(this.frame)*animation.frameSize + animation.offset.x, animation.offset.y, animation.frameSize * zoom, player.size.height*tileSize, (position.x - tileSize / 2) * zoom, (position.y - tileSize / 2) * zoom, animation.frameSize * zoom, player.size.height * tileSize * zoom)
    if (animation.flipped) {
      ctx.scale(-1, 1)
      position.x = -position.x
    }
    this.frame = (this.frame + (1 / animation.speed)) % (animation.image.width / animation.frameSize)
  }
}

const FIRE_WIZARD = new PlayerAnimator({
  idle: { src: FireWizardIdle, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  'walking right': { src: FireWizardWalk, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 40, y: 58 } },
  'walking left': { src: FireWizardWalk, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 40, y: 58 }, flipped: true },
  'running right': { src: FireWizardRun, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  'running left': { src: FireWizardRun, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 }, flipped: true },
  'jumping right': { src: FireWizardJump, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  'jumping left': { src: FireWizardJump, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 }, flipped: true },

  hurting: { src: FireWizardHurt, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  dead: { src: FireWizardDeath, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },

  attacking1: { src: FireWizardAttack1, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  attacking2: { src: FireWizardAttack2, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  charge: { src: FireWizardCharge, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  fireball: { src: FireWizrdFireball, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  flameJet: { src: FireWizardFlameJet, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
})

export default { FIRE_WIZARD }