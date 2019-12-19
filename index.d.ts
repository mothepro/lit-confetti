import 'lit-confetti';
import { LitElement } from 'lit-element';
export default class extends LitElement {
    private gravity;
    private gradient;
    private count;
    private colors;
    protected render: () => import("lit-element").TemplateResult;
}
