import randomAngles from './randomAngles.js'
import random from './random.js'

export default class Particle {
  /** The general sway for all the current particles. */
  static waveAngle = 0

  private static readonly maxTilt = 15

  private tilt = 0

  constructor(
    public x: number,
    public y: number,
    readonly style: string | CanvasGradient,
    readonly radius: number = random(20, 5),
    private readonly angles = randomAngles(),
  ) { }

  update(speed: number) {
    this.x += Math.sin(Particle.waveAngle) - 0.5
    this.y += 0.01 * speed * (Math.cos(Particle.waveAngle) + this.radius)
    this.tilt = Math.sin(this.angles.next().value) * Particle.maxTilt
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.lineWidth = this.radius * 2
    context.strokeStyle = this.style
    context.moveTo(this.x + this.tilt + this.radius, this.y)
    context.lineTo(this.x + this.tilt,               this.y + this.tilt + this.radius)
    context.stroke()
  }
}
