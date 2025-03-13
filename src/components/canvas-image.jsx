export default function canvasImage (src) {
  const img = new Image()
  img.src = src
  img.onload = () => {
    console.debug('Loaded image', src)
  }
  return img
}