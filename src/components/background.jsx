import BACKGROUND from '../assets/background.png'
import canvasImage from '../components/canvas-image'

const background = canvasImage(BACKGROUND)

export default function drawBackground (ctx, canvas) {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
}