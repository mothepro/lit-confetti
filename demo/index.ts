import { LitElement, html, customElement, property } from 'lit-element'
import '../src/Confetti.js'

type HTMLEvent<T = HTMLElement> = Event & { target: T }

const hexToColor = (hex: string) => ({
  red: parseInt(hex[1] + hex[2], 16),
  green: parseInt(hex[3] + hex[4], 16),
  blue: parseInt(hex[5] + hex[6], 16)
})

@customElement('confetti-controller')
export default class extends LitElement {
  @property({ type: Number })
  private gravity!: number

  @property({ type: Number })
  private count!: number

  @property({ type: Array })
  private colors = ["#6b8e23", "#ffc0cb", "#add8e6", "#ee82ee", "#98fb98", "#f4a460", "#d2691e", "#ffd700", "#6a5acd", "#dc143c", "#1e90ff", "#4682b4"]


  protected render = () => html`
    Gravity <input
      type=number
      @change=${({ target }: HTMLEvent<HTMLInputElement>) => this.gravity = parseFloat(target.value)}
      value=${this.gravity}
      min=0
      max=10
      step=0.1
    /><br/>

    Amount of Confetti <input
      type=number
      @change=${({ target }: HTMLEvent<HTMLInputElement>) => this.count = parseFloat(target.value)}
      value=${this.count}
      min=0
      max=500
    /><br/>

    ${this.colors.map((color, i) => html`
      <input
        type=color
        @change=${({ target }: HTMLEvent<HTMLInputElement>) => console.log(target.value, target)}
        value=${color}
      />
      <button
        @click=${() => this.colors = [...this.colors.slice(0, i), ...this.colors.slice(i+1)]}
      >&times;</button>
      <br/>`)}
      <button
        @click=${() => this.colors = [...this.colors, '#000000']}
      >Add color</button>

    <lit-confetti 
      gravity=${this.gravity}
      count=${this.count}
      .colors=${this.colors.map(hexToColor)}
    ></lit-confetti>
    `
}
