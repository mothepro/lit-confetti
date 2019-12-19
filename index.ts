import 'lit-confetti'
import { LitElement, html, customElement, property } from 'lit-element'

type HTMLEvent<T = HTMLInputElement> = Event & { target: T }

@customElement('confetti-controller')
export default class extends LitElement {
  @property({ type: Number })
  private gravity!: number

  @property({ type: Boolean })
  private gradient = false

  @property({ type: Number })
  private count!: number

  @property({ type: Array })
  private colors: string[] = []

  protected render = () => html`
    Gradient <input
      type=checkbox
      @change=${({ target }: HTMLEvent) => this.gradient = target.checked}
      ?checked=${this.gradient}
      ?disabled=${this.colors.length < 2}
    /><br/>

    Gravity <input
      type=number
      @input=${({ target }: HTMLEvent) => this.gravity = parseFloat(target.value) || 0}
      value=${this.gravity}
      min=0
      max=10
      step=0.1
    /><br/>

    Amount of Confetti <input
      type=number
      @input=${({ target }: HTMLEvent) => this.count = parseFloat(target.value) || 0}
      value=${this.count}
      min=0
      max=500
    /><br/>

    ${this.colors.map((color, i) => html`
      <input
        type=color
        @change=${({ target }: HTMLEvent<HTMLInputElement>) => this.colors = [...this.colors.slice(0, i), target.value, ...this.colors.slice(i + 1)]}
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
      ?gradient=${this.gradient}
      .colors=${this.colors.map(hex => ({
        red:   parseInt(hex[1] + hex[2], 16),
        green: parseInt(hex[3] + hex[4], 16),
        blue:  parseInt(hex[5] + hex[6], 16),
      }))}
    ></lit-confetti>
  `
}
