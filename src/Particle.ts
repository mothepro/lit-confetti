import allColors from './allColors.json'
import randomAngles from './randomAngles.js'
import random from './random.js'

interface Color {
  red: number
  green: number
  blue: number
  opacity?: number
}

export default class Particle {
  /** The general sway for all the current particles. */
  static waveAngle = 0

  private static readonly maxTilt = 15

  public y = random(this.radius * -2, -this.height)

  private tilt = 0

  get visible() {
    return this.y < this.height + this.radius
      && this.x > -this.radius
      && this.x < this.width + this.radius
  }

  constructor(
    public x: number,
    private readonly width: number,
    private readonly height: number,
    private readonly radius: number = random(20, 5),
    private readonly opacity = random(1, 0.5),
    private readonly color: Color = allColors[Math.floor(random(allColors.length))],
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
    context.strokeStyle = `rgba(${this.color.red}, ${this.color.green}, ${this.color.blue}, ${this.opacity})`
    context.moveTo(this.x + this.tilt + this.radius, this.y)
    context.lineTo(this.x + this.tilt,               this.y + this.tilt + this.radius)
    context.stroke()
  }

  /*
      var gradient = context.createLinearGradient(x, particle.y, x2, y2);
      gradient.addColorStop("0", particle.color);
      gradient.addColorStop("1.0", particle.color2);
      context.strokeStyle = gradient;
    */
}
