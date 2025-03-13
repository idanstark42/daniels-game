import canvasImage from './canvas-image'

import FireWizardIdle from '../assets/players/fire-wizard/Idle.png'
import FireWizardWalk from '../assets/players/fire-wizard/Walk.png'
import FireWizardRun from '../assets/players/fire-wizard/Run.png'
import FireWizardJump from '../assets/players/fire-wizard/Jump.png'

import FireWizardCharge from '../assets/players/fire-wizard/Charge.png'
import FireWizardHurt from '../assets/players/fire-wizard/Hurt.png'
import FireWizardDeath from '../assets/players/fire-wizard/Dead.png'

import FireWizardAttack1 from '../assets/players/fire-wizard/Attack_1.png'
import FireWizardAttack2 from '../assets/players/fire-wizard/Attack_2.png'
import FireWizardMagicBall from '../assets/players/fire-wizard/Fireball.png'
import FireWizardMagicJet from '../assets/players/fire-wizard/Flame_jet.png'

import LightningWizardIdle from '../assets/players/lightning-wizard/Idle.png'
import LightningWizardWalk from '../assets/players/lightning-wizard/Walk.png'
import LightningWizardRun from '../assets/players/lightning-wizard/Run.png'
import LightningWizardJump from '../assets/players/lightning-wizard/Jump.png'

import LightningWizardCharge from '../assets/players/lightning-wizard/Charge.png'
import LightningWizardHurt from '../assets/players/lightning-wizard/Hurt.png'
import LightningWizardDeath from '../assets/players/lightning-wizard/Dead.png'

import LightningWizardAttack1 from '../assets/players/lightning-wizard/Attack_1.png'
import LightningWizardAttack2 from '../assets/players/lightning-wizard/Attack_2.png'
import LightningWizardMagicBall from '../assets/players/lightning-wizard/Light_ball.png'
import LightningWizardMagicJet from '../assets/players/lightning-wizard/Light_charge.png'

import WandarerWizardIdle from '../assets/players/wandarer-wizard/Idle.png'
import WandarerWizardWalk from '../assets/players/wandarer-wizard/Walk.png'
import WandarerWizardRun from '../assets/players/wandarer-wizard/Run.png'
import WandarerWizardJump from '../assets/players/wandarer-wizard/Jump.png'

import WandarerWizardCharge1 from '../assets/players/wandarer-wizard/Charge_1.png'
import WandarerWizardCharge2 from '../assets/players/wandarer-wizard/Charge_2.png'
import WandarerWizardHurt from '../assets/players/wandarer-wizard/Hurt.png'
import WandarerWizardDeath from '../assets/players/wandarer-wizard/Dead.png'

import WandarerWizardAttack1 from '../assets/players/wandarer-wizard/Attack_1.png'
import WandarerWizardAttack2 from '../assets/players/wandarer-wizard/Attack_2.png'
import WandarerWizardMagicBall from '../assets/players/wandarer-wizard/Magic_sphere.png'
import WandarerWizardMagicJet from '../assets/players/wandarer-wizard/Magic_arrow.png'

const ANIMATION_SPEED = 0.1

class PlayerAnimator {
  constructor (animations) {
    this.animations = Object.keys(animations).reduce((acc, key) => {
      acc[key] = { image: canvasImage(animations[key].src), ...animations[key] }
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

    if (player.facing === 'left') {
      ctx.scale(-1, 1)
      position.x = -position.x
    }
    ctx.fillStyle = 'red'
    ctx.drawImage(animation.image, Math.floor((animation.start || 0) + this.frame)*animation.frameSize + animation.offset.x, animation.offset.y, animation.frameSize * zoom, player.size.height*tileSize, (position.x - tileSize / 2) * zoom, (position.y - tileSize / 2) * zoom, animation.frameSize * zoom, player.size.height * tileSize * zoom)
    if (player.facing === 'left') {
      ctx.scale(-1, 1)
      position.x = -position.x
    }
    this.frame = (this.frame + animation.speed) % (animation.frames || (animation.image.width / animation.frameSize))
  }
}

const FIRE_WIZARD = new PlayerAnimator({
  idle: { src: FireWizardIdle, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  walking: { src: FireWizardWalk, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 40, y: 58 } },
  running: { src: FireWizardRun, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  
  'start jumping': { src: FireWizardJump, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 20, y: 58 }, frames: 4 },
  jumping: { src: FireWizardJump, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 20, y: 58 }, frames: 1, start: 4 },
  falling: { src: FireWizardJump, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 20, y: 58 }, frames: 1, start: 5 },
  landing: { src: FireWizardJump, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 20, y: 58 }, frames: 3, start: 6 },

  hurting: { src: FireWizardHurt, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  dead: { src: FireWizardDeath, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },

  attacking1: { src: FireWizardAttack1, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  attacking2: { src: FireWizardAttack2, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  charge: { src: FireWizardCharge, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  ball: { src: FireWizardMagicBall, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  jet: { src: FireWizardMagicJet, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
})

const LIGHTNING_WIZARD = new PlayerAnimator({
  idle: { src: LightningWizardIdle, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  walking: { src: LightningWizardWalk, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 40, y: 58 } },
  running: { src: LightningWizardRun, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  
  'start jumping': { src: LightningWizardJump, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 20, y: 58 }, frames: 4 },
  jumping: { src: LightningWizardJump, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 20, y: 58 }, frames: 1, start: 4 },
  falling: { src: LightningWizardJump, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 20, y: 58 }, frames: 1, start: 5 },
  landing: { src: LightningWizardJump, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 20, y: 58 }, frames: 3, start: 6 },

  hurting: { src: LightningWizardHurt, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  dead: { src: LightningWizardDeath, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },

  attacking1: { src: LightningWizardAttack1, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  attacking2: { src: LightningWizardAttack2, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  charge: { src: LightningWizardCharge, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  ball: { src: LightningWizardMagicBall, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  jet: { src: LightningWizardMagicJet, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
})

const WANDARER_WIZARD = new PlayerAnimator({
  idle: { src: WandarerWizardIdle, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  walking: { src: WandarerWizardWalk, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 40, y: 58 } },
  running: { src: WandarerWizardRun, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  
  'start jumping': { src: WandarerWizardJump, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 20, y: 58 }, frames: 4 },
  jumping: { src: WandarerWizardJump, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 20, y: 58 }, frames: 1, start: 4 },
  falling: { src: WandarerWizardJump, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 20, y: 58 }, frames: 1, start: 5 },
  landing: { src: WandarerWizardJump, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 20, y: 58 }, frames: 3, start: 6 },

  hurting: { src: WandarerWizardHurt, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  dead: { src: WandarerWizardDeath, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },

  attacking1: { src: WandarerWizardAttack1, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  attacking2: { src: WandarerWizardAttack2, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  charge1: { src: WandarerWizardCharge1, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  charge2: { src: WandarerWizardCharge2, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  ball: { src: WandarerWizardMagicBall, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
  jet: { src: WandarerWizardMagicJet, frameSize: 128, speed: ANIMATION_SPEED, offset: { x: 30, y: 58 } },
})

export default {
  'Fire Wizard': FIRE_WIZARD,
  'Lightning Wizard': LIGHTNING_WIZARD,
  'Wandarer Wizard': WANDARER_WIZARD
}