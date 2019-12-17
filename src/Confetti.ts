import { LitElement, html, property, customElement, css } from 'lit-element'
import Particle from './Particle.js'
import random from './random.js'

@customElement('lit-confetti')
export default class extends LitElement {
  @property({ type: Number })
  speed = 25

  @property({ type: Number })
  count = Math.floor((this.scrollHeight * this.scrollWidth) ** 0.33)

  @property({ type: Boolean })
  gradient = false

  @property({ type: Array })
  colors = [
    { "red": 107, "green": 142, "blue": 35, },
    { "red": 255, "green": 192, "blue": 20, },
    { "red": 173, "green": 216, "blue": 23, },
    { "red": 238, "green": 130, "blue": 23, },
    { "red": 152, "green": 251, "blue": 15, },
    { "red": 244, "green": 164, "blue": 96, },
    { "red": 210, "green": 105, "blue": 30, },
    { "red": 255, "green": 215, "blue": 0, },
    { "red": 106, "green": 90, "blue": 20, },
    { "red": 220, "green": 20, "blue": 60, },
    { "red": 30, "green": 144, "blue": 25, },
    { "red": 70, "green": 130, "blue": 18, },
  ]

  private get canvas() { return this.shadowRoot?.getElementById('confetti') as HTMLCanvasElement }

  private particles = new Set<Particle>()

  private context!: CanvasRenderingContext2D

  static readonly styles = css`
  :host {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  `

  render = () => html`<canvas id="confetti"></canvas>`

  draw = () => {
    this.context.clearRect(0, 0, this.scrollWidth, this.scrollHeight)

    for (const particle of this.particles) {
      particle.draw(this.context!)
      particle.update(this.speed)
      if (!this.isVisible(particle))
        this.particles.delete(particle)
    }

    // Refill the particles set
    for (let i = this.particles.size; i < this.count; i++)
      this.particles.add(new Particle(
        random(this.scrollWidth),
        -random(this.scrollHeight, 50),
        this.getRandomStyle(random(1, 0.5))
      ))

    Particle.waveAngle += 0.001
    if (this.particles.size)
      requestAnimationFrame(this.draw)
  }

  protected firstUpdated() {
    addEventListener('resize', this.resized)
    this.resized()
    this.context = this.canvas.getContext('2d')!
    requestAnimationFrame(this.draw)
  }

  protected resized = () => {
    this.canvas.width = this.scrollWidth
    this.canvas.height = this.scrollHeight
  }

  protected updated(oldProps: Map<string, any>) {
    // Restart the rAF if we are now rendering particles again.
    if (!oldProps.get('count'))
      requestAnimationFrame(this.draw)
  }

  protected isVisible = (particle: Particle) =>
    particle.y < this.scrollHeight + particle.radius
    && particle.x > -particle.radius
    && particle.x < this.scrollWidth + particle.radius

  protected getRandomStyle(opacity: number): string | CanvasGradient {
    if (this.gradient) {
      const gradient = this.context.createLinearGradient(x, particle.y, x2, y2)
      gradient.addColorStop(0, this.getRandomColor(opacity))
      gradient.addColorStop(1, this.getRandomColor(opacity))
      return gradient
    } else
      return this.getRandomColor(opacity)
  }

  protected getRandomColor(opacity: number) {
    const { red, green, blue } = this.colors[Math.floor(random(this.colors.length))]
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`
  }
}
