# LaTeX Unicode Editor

A Vue 3 component that replaces LaTeX escape sequences (like `\pi`, `\alpha`) with Unicode characters when the user presses Tab.

## Features

- 150+ LaTeX to Unicode mappings (Greek letters, math operators, arrows, subscripts/superscripts, and more)
- Simple textarea-based editor with native undo/redo support
- Visual feedback toast showing each replacement
- Accessible: Tab key works normally when no sequence is found

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Usage Examples

Type these sequences and press Tab:

| Input | Output |
|-------|--------|
| `\pi` | π |
| `\alpha` | α |
| `\sum` | ∑ |
| `\infty` | ∞ |
| `\rightarrow` | → |
| `\leq` | ≤ |
| `^2` | ² |
| `_0` | ₀ |

## Using as a Reusable Component

The `LatexEditor` component can be used in any Vue 3 application. Copy these files to your project:

```
src/
├── components/
│   └── LatexEditor.vue
├── composables/
│   └── useLatexReplacer.js
└── data/
    └── latexMappings.js
```

Then import and use it:

```vue
<script setup>
import { ref } from 'vue'
import LatexEditor from './components/LatexEditor.vue'

const content = ref('')
</script>

<template>
  <LatexEditor
    v-model="content"
    :rows="8"
    placeholder="Enter math..."
    :show-feedback="true"
  />
</template>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | String | `''` | v-model binding for the editor content |
| `rows` | Number | `10` | Number of textarea rows |
| `placeholder` | String | `'Type LaTeX sequences...'` | Placeholder text |
| `showFeedback` | Boolean | `true` | Show toast notification on replacement |

### Using the Composable Directly

You can also use the replacement logic directly via the composable:

```js
import { useLatexReplacer } from './composables/useLatexReplacer.js'

const { tryReplace, getAllMappings, isValidSequence } = useLatexReplacer()

// Attempt a replacement
const result = tryReplace('Hello \\pi', 9)
// result = { newText: 'Hello π', newCursorPos: 7, replaced: { from: '\\pi', to: 'π' } }

// Check if a sequence is valid
isValidSequence('\\alpha') // true
isValidSequence('\\foo')   // false

// Get all available mappings
const mappings = getAllMappings()
```

## Supported Sequences

### Greek Letters
`\alpha` `\beta` `\gamma` `\delta` `\epsilon` `\zeta` `\eta` `\theta` `\iota` `\kappa` `\lambda` `\mu` `\nu` `\xi` `\pi` `\rho` `\sigma` `\tau` `\upsilon` `\phi` `\chi` `\psi` `\omega` and uppercase variants (`\Gamma`, `\Delta`, etc.)

### Math Operators
`\times` `\div` `\pm` `\mp` `\cdot` `\ast` `\circ` `\oplus` `\otimes` `\odot`

### Relations
`\neq` `\approx` `\equiv` `\leq` `\geq` `\ll` `\gg` `\sim` `\propto` `\perp`

### Set Theory
`\in` `\notin` `\subset` `\supset` `\subseteq` `\supseteq` `\cup` `\cap` `\emptyset`

### Logic
`\forall` `\exists` `\neg` `\wedge` `\vee` `\implies` `\iff` `\therefore`

### Arrows
`\rightarrow` `\leftarrow` `\leftrightarrow` `\Rightarrow` `\Leftarrow` `\Leftrightarrow` `\mapsto` `\uparrow` `\downarrow`

### Calculus
`\infty` `\partial` `\nabla` `\int` `\iint` `\iiint` `\oint` `\sum` `\prod` `\sqrt`

### Subscripts & Superscripts
`^0` through `^9`, `^n`, `^i`, `^+`, `^-`
`_0` through `_9`, `_n`, `_i`, `_a`, `_e`, `_x`

### Fractions
`\frac12` `\frac13` `\frac14` `\frac34` and more

See `src/data/latexMappings.js` for the complete list.

## License

MIT
