var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import 'lit-confetti';
import { LitElement, html, customElement, property } from 'lit-element';
let default_1 = class default_1 extends LitElement {
    constructor() {
        super(...arguments);
        this.gradient = false;
        this.colors = [];
        this.render = () => html `
    Gradient <input
      type=checkbox
      @change=${({ target }) => this.gradient = target.checked}
      ?checked=${this.gradient}
      ?disabled=${this.colors.length < 2}
    /><br/>

    Gravity <input
      type=number
      @input=${({ target }) => this.gravity = parseFloat(target.value) || 0}
      value=${this.gravity}
      min=0
      max=10
      step=0.1
    /><br/>

    Amount of Confetti <input
      type=number
      @input=${({ target }) => this.count = parseFloat(target.value) || 0}
      value=${this.count}
      min=0
      max=500
    /><br/>

    ${this.colors.map((color, i) => html `
      <input
        type=color
        @change=${({ target }) => this.colors = [...this.colors.slice(0, i), target.value, ...this.colors.slice(i + 1)]}
        value=${color}
      />
      <button
        @click=${() => this.colors = [...this.colors.slice(0, i), ...this.colors.slice(i + 1)]}
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
            red: parseInt(hex[1] + hex[2], 16),
            green: parseInt(hex[3] + hex[4], 16),
            blue: parseInt(hex[5] + hex[6], 16),
        }))}
    ></lit-confetti>
  `;
    }
};
__decorate([
    property({ type: Number })
], default_1.prototype, "gravity", void 0);
__decorate([
    property({ type: Boolean })
], default_1.prototype, "gradient", void 0);
__decorate([
    property({ type: Number })
], default_1.prototype, "count", void 0);
__decorate([
    property({ type: Array })
], default_1.prototype, "colors", void 0);
default_1 = __decorate([
    customElement('confetti-controller')
], default_1);
export default default_1;
//# sourceMappingURL=index.js.map