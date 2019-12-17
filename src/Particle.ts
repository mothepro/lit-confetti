import random from './random.js'
import randomAngles from './randomAngles.js'

export default class Particle {
  /** The general sway for all the current particles. */
  static waveAngle = 0

  private static readonly maxTilt = 15

  private tilt = 0

  get strokeStyle() {
    if (this.colors.length == 1)
      return this.colors[0]
    const gradient = this.context.createLinearGradient(
      this.x + this.tilt + this.radius,
      this.y,
      this.x + this.tilt,
      this.y + this.tilt + this.radius
    )
    gradient.addColorStop(0, this.colors[0])
    gradient.addColorStop(1, this.colors[1])
    return gradient
  }

  constructor(
    private readonly context: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    readonly colors: [string] | [string, string],
    readonly radius: number = random(20, 5),
    private readonly angles = randomAngles(),
  ) { }

  drawAndUpdate(gravity: number) {
    this.context.beginPath()
    this.context.lineWidth = this.radius * 2
    this.context.strokeStyle = this.strokeStyle
    this.context.moveTo(this.x + this.tilt + this.radius, this.y)
    this.context.lineTo(this.x + this.tilt,               this.y + this.tilt + this.radius)
    this.context.stroke()

    // Move the particle depending on wind and gravity.
    this.x += 0.1 * (Math.sin(Particle.waveAngle) - 0.5)
    this.y += 0.01 * gravity * this.radius
    this.tilt = Math.sin(this.angles.next().value) * Particle.maxTilt
  }
}
