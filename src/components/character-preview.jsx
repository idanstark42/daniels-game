import { useRef, useEffect } from 'react'

export default function CharacterPreview ({ character }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const mock = {
      state: () => 'walking',
      facing: 'right',
      size: { width: 1, height: 2.2 }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#111111'
      ctx.fillRect(0, 0, 128, 128)
      character.draw(ctx, mock, { x: 64, y: 64 }, 32, 1)

      requestAnimationFrame(render)
    }

    render()

    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [character])

  return <canvas ref={canvasRef} width={128} height={128} />
}