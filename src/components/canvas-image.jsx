export default function canvasImage (src) {
  const img = new Image()
  img.src = src
  img.onload = () => {
    console.log('Loaded image', src)
  }
  return img
}