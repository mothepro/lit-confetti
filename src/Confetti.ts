import { LitElement, html, property, customElement, css } from 'lit-element'
import Particle from './src/Particle.js'
import random from './src/random.js'

@customElement('lit-confetti')
export default class extends LitElement {
  @property({ type: Number })
  speed = 25

  @property({ type: Number })
  count = Math.floor((this.scrollHeight * this.scrollWidth) ** 0.33)

  private particles = new Set<Particle>()

  private get canvas() { return this.shadowRoot?.getElementById('confetti') as HTMLCanvasElement }

  private context!: CanvasRenderingContext2D

  static readonly styles = css`
  :host {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    /* z-index:  */
  }
  `

  render = () => html`<canvas id="confetti"></canvas>`

  draw = () => {
    this.context.clearRect(0, 0, this.scrollWidth, this.scrollHeight)

    for (const particle of this.particles) {
      particle.draw(this.context!)
      particle.update(this.speed)
      if (!particle.visible)
        this.particles.delete(particle)
    }

    // Refill the particles set
    for (let i = this.particles.size; i < this.count; i++)
      this.particles.add(new Particle(random(this.scrollWidth), this.scrollWidth, this.scrollHeight))

    Particle.waveAngle += 0.001
    if (this.particles.size)
      requestAnimationFrame(this.draw)
  }

  firstUpdated() {
    this.resized()
    this.context = this.canvas.getContext('2d')!
    requestAnimationFrame(this.draw)
    window.onresize = () => console.log(this.scrollWidth, this.scrollHeight)
  }

  resized = () => {
    this.canvas.width = this.scrollWidth
    this.canvas.height = this.scrollHeight
  }

  updated(oldProps: Map<string, any>) {
    // Restart the rAF if we are now rendering particles again.
    if (!oldProps.get('count'))
      requestAnimationFrame(this.draw)
  }
}
