import { LitElement, html, property, customElement, css } from 'lit-element'
import Particle from './Particle.js'
import random from './random.js'
import hslToColor from './hslToColor.js'
import colorToString from './colorToString.js'

@customElement('lit-confetti')
export default class extends LitElement {
  @property({ type: Number })
  gravity = 1

  @property({ type: Number })
  count = 0

  @property({ type: Boolean })
  gradient = false

  @property({ type: Array })
  colors = [
    { "red": 255, "green": 192, "blue": 203, },
    { "red": 173, "green": 216, "blue": 230, },
    { "red": 238, "green": 130, "blue": 238, },
    { "red": 152, "green": 251, "blue": 152, },
    { "red": 107, "green": 142, "blue": 35, },
    { "red": 244, "green": 164, "blue": 96, },
    { "red": 210, "green": 105, "blue": 30, },
    { "red": 255, "green": 215, "blue": 0, },
    { "red": 220, "green": 20, "blue": 60, },
    { "red": 106, "green": 90, "blue": 205, },
    { "red": 30, "green": 144, "blue": 255, },
    { "red": 70, "green": 130, "blue": 180, },
  ]

  private get canvas() { return this.shadowRoot?.getElementById('confetti') as HTMLCanvasElement }

  private particles = new Set<Particle>()

  private context!: CanvasRenderingContext2D

  private rerenderNeeded = true

  private nextRainbowHue = 0

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

  protected readonly render = () => html`
    <canvas 
      id="confetti"
      width=${this.clientWidth}
      height=${this.clientHeight}
    ></canvas>
  `

  // The dom never actually needs to be changed.
  protected readonly shouldUpdate = () => this.rerenderNeeded

  protected firstUpdated() {
    this.context = this.canvas.getContext('2d')!

    // update size of canvas
    addEventListener('resize', async () => {
      this.rerenderNeeded = true
      await this.requestUpdate()
      this.rerenderNeeded = false
    })

    requestAnimationFrame(this.draw)
  }

  protected updated(oldProps: Map<string, any>) {
    // Restart the rAF if we are now rendering particles again.
    if (oldProps.has('count') && !oldProps.get('count') && this.particles.size == 0)
      requestAnimationFrame(this.draw)

    // Gradient isn't possible with 1 color
    if (oldProps.has('colors') && this.colors.length < 2)
      this.gradient = false
  }

  private draw = () => {
    this.context.clearRect(0, 0, this.clientWidth, this.clientHeight)

    for (const particle of this.particles) {
      particle.drawAndUpdate(this.gravity)
      if (!this.isVisible(particle))
        this.particles.delete(particle)
    }

    // Refill the particles set
    for (let i = this.particles.size; i < this.count; i++)
      this.particles.add(new Particle(
        this.context,
        random(this.clientWidth),
        -random(this.clientHeight / 3, 50),
        // Show rainbow confetti if non is given
        this.colors.length
          ? this.getRandomStyle(random(1, 0.5))
          : [colorToString(
              hslToColor(this.nextRainbowHue++),
              random(1, 0.5))]
      ))

    Particle.waveAngle += 0.01
    if (this.particles.size)
      requestAnimationFrame(this.draw)
  }

  private isVisible = (particle: Particle) =>
    particle.y - 2 * particle.radius < this.clientHeight
    && particle.x + 2 * particle.radius > 0
    && particle.x - 2 * particle.radius < this.clientWidth

  private getRandomStyle = (opacity: number) =>
    [...Array(+this.gradient + 1)]
      .map(() => this.getRandomColor(opacity)) as [string] | [string, string]

  private getRandomColor = (opacity: number) =>
    colorToString(
      this.colors[Math.floor(random(this.colors.length))],
      opacity)
}
