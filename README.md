# [`<lit-confetti>`](https://mothepro.github.io/lit-confetti/)

> Confetti animation as a web component

[![npm](https://img.shields.io/npm/v/lit-confetti.svg)](https://www.npmjs.com/package/lit-confetti)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/mothepro/lit-confetti)

## Install

`yarn add lit-confetti`

## How to Use

First, import the module in your page.
```html
<script type="module" src="https://unpkg.com/lit-confetti/dist/esm/index.js"></script>
```

Then, add the element to the page.

<!--
```
<custom-element-demo height=500>
  <template>
    <script type="module" src="//unpkg.com/es-module-shims@0.4.6/dist/es-module-shims.min.js"></script>
    <script type="importmap-shim" src="//mothepro.github.io/lit-confetti/import-map.json"></script>
    <script type="module-shim" src="//unpkg.com/lit-confetti/dist/esm/index.js"></script>
 
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<lit-confetti
  gravity=1
  count=40
></lit-confetti>
```

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `gravity` | `number` | How fast the confetti papers fall |
| `count` | `number` | Limit for the max amount of confetti papers to create at once |
| `gradient` | `boolean` | Confetti papers will have a gradient between 2 colors set |
| `colors` | `string[]`<br/> *`#RRGGBB` color format* |  Possible colors to choose from when generating a confetti paper.<br/> *By default rainbow colors are used.* |

### TODO

+ add [tests](https://dev.to/open-wc/testing-workflow-for-web-components-g73)
+ check if it's worth it to [Schedule updates to occur just before the next frame](https://lit-element.polymer-project.org/api/classes/_lib_updating_element_.updatingelement.html#performupdate).
