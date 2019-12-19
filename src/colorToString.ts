/** Converts a color object to a string color format. */
export default function ({ red, green, blue }: {
  red: number
  green: number
  blue: number
}, opacity: number) {
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`
}
