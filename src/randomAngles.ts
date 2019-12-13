import random from './random.js'

/** Creates a random angle and modifies it ever so slightly each time. */
export default function* (): Generator<number, never> {
  let angle = random(Math.PI)
  yield angle
  while (true)
    yield angle += random(0.12, 0.05)
}
