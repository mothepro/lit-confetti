/** Converts an HSL color value to a color object. */
export default function (hue: number, saturation = 1, lightness = .5) {
  hue %= 360
  let red: number, green: number, blue: number
  const c = (1 - Math.abs(2 * lightness - 1)) * saturation,
    x = c * (1 - Math.abs((hue / 60) % 2 - 1)),
    m = lightness - c / 2

  if (0 <= hue && hue < 60) {
    red = c
    green = x
    blue = 0
  } else if (60 <= hue && hue < 120) {
    red = x
    green = c
    blue = 0
  } else if (120 <= hue && hue < 180) {
    red = 0
    green = c
    blue = x
  } else if (180 <= hue && hue < 240) {
    red = 0
    green = x
    blue = c
  } else if (240 <= hue && hue < 300) {
    red = x
    green = 0
    blue = c
  } else if (300 <= hue && hue < 360) {
    red = c
    green = 0
    blue = x
  } else
    throw Error(`hue (${hue}) must be in range [0,360)`)

  red = Math.round((red + m) * 255)
  green = Math.round((green + m) * 255)
  blue = Math.round((blue + m) * 255)

  return { red, green, blue }
}
