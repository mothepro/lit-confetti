import { LitElement, html, property, customElement, css } from 'lit-element'
import Particle from './Particle.js'
import random from './random.js'

@customElement('lit-confetti')
export default class extends LitElement {
  @property({ type: Number })
  gravity = 1

  @property({ type: Number })
  count = 0

  @property({ type: Boolean })
  gradient = false

  @property({ type: Boolean })
  hidden = false

  @property({ type: Array })
  colors: string[] = []

  private get canvas() { return this.shadowRoot?.getElementById('confetti') as HTMLCanvasElement }

  private particles = new Set<Particle>()

  private context!: CanvasRenderingContext2D

  private rerenderNeeded = true

  private nextRainbowHue = 0

  static readonly styles = css`
  :host[hidden] {
    display: none
  }
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
    <slot></slot>
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
  }

  protected updated(oldProps: Map<string, any>) {
    // Start drawing if we are no longer hidden OR had no particles before and the count was unset (or 0).
    if (oldProps.get('hidden') || (oldProps.has('count') && !oldProps.get('count') && !this.particles.size))
      this.draw()

    // Gradient isn't possible with 1 color
    if (oldProps.has('colors') && this.colors.length < 2)
      this.gradient = false
  }

  private draw = () => {
    this.context.clearRect(0, 0, this.clientWidth, this.clientHeight)

    // Refill particles
    for (let i = this.particles.size; i < this.count; i++)
      this.particles.add(new Particle(
        this.context,
        random(this.clientWidth),
        -random(this.clientHeight / 3, 50),
        this.colors.length
          ? this.getRandomStyle(random(1, 0.5))
          : [`hsla(${this.nextRainbowHue++ % 360}, 100%, 50%, ${random(1, 0.75)})`]
      ))

    // Draw & update particles, remove if no longer visible
    for (const particle of this.particles) {
      particle.drawAndUpdate(this.gravity)
      if (!this.isVisible(particle))
        this.particles.delete(particle)
    }

    Particle.waveAngle += 0.01
    if (this.particles.size && !this.hidden)
      requestAnimationFrame(this.draw)
  }

  private isVisible = (particle: Particle) =>
    particle.y - 2 * particle.radius < this.clientHeight
    && particle.x + 2 * particle.radius > 0
    && particle.x - 2 * particle.radius < this.clientWidth

  private getRandomStyle = (opacity: number) =>
    [...Array(+this.gradient + 1)]
      .map(() => this.getRandomColor(opacity)) as [string] | [string, string]

  private getRandomColor = (opacity: number) => {
    const randomColor = this.colors[Math.floor(random(this.colors.length))]
    return `rgba(${
      parseInt(randomColor.slice(1, 3), 16)}, ${
      parseInt(randomColor.slice(3, 5), 16)}, ${
      parseInt(randomColor.slice(5, 7), 16)}, ${
      opacity})`
  }
}
