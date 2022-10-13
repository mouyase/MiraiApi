export default function random(max: number, min: number = 0) {
  const value = Math.random() * (max - min + 1) + min + ''
  return parseInt(value)
}
