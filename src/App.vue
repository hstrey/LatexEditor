<script setup>
import { ref } from 'vue'
import LatexEditor from './components/LatexEditor.vue'

const editorContent = ref('')
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>LaTeX Unicode Editor</h1>
      <p class="subtitle">Type LaTeX sequences and press Tab to convert them to Unicode symbols</p>
    </header>

    <main class="main">
      <LatexEditor v-model="editorContent" :rows="12" />

      <section v-if="editorContent" class="preview-section">
        <h2>Preview</h2>
        <div class="preview-content">{{ editorContent }}</div>
      </section>

      <section class="examples-section">
        <h2>Examples</h2>
        <div class="examples-grid">
          <div class="example-group">
            <h3>Greek Letters</h3>
            <code>\alpha → α</code>
            <code>\beta → β</code>
            <code>\pi → π</code>
            <code>\Sigma → Σ</code>
          </div>
          <div class="example-group">
            <h3>Math Operators</h3>
            <code>\times → ×</code>
            <code>\div → ÷</code>
            <code>\pm → ±</code>
            <code>\infty → ∞</code>
          </div>
          <div class="example-group">
            <h3>Relations</h3>
            <code>\neq → ≠</code>
            <code>\leq → ≤</code>
            <code>\approx → ≈</code>
            <code>\equiv → ≡</code>
          </div>
          <div class="example-group">
            <h3>Set Theory</h3>
            <code>\in → ∈</code>
            <code>\subset → ⊂</code>
            <code>\cup → ∪</code>
            <code>\emptyset → ∅</code>
          </div>
          <div class="example-group">
            <h3>Arrows</h3>
            <code>\rightarrow → →</code>
            <code>\Rightarrow → ⇒</code>
            <code>\mapsto → ↦</code>
            <code>\leftrightarrow → ↔</code>
          </div>
          <div class="example-group">
            <h3>Sub/Superscripts</h3>
            <code>^2 → ²</code>
            <code>_0 → ₀</code>
            <code>^n → ⁿ</code>
            <code>_i → ᵢ</code>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  background: #f5f7fa;
  min-height: 100vh;
}

.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 20px;
}

.header {
  text-align: center;
  margin-bottom: 32px;
}

.header h1 {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 8px;
}

.subtitle {
  color: #666;
  font-size: 1rem;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.preview-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.preview-section h2 {
  font-size: 1rem;
  color: #666;
  margin-bottom: 12px;
  font-weight: 500;
}

.preview-content {
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  color: #333;
}

.examples-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.examples-section h2 {
  font-size: 1rem;
  color: #666;
  margin-bottom: 16px;
  font-weight: 500;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
}

.example-group h3 {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 8px;
  font-weight: 500;
}

.example-group code {
  display: block;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
  color: #555;
  padding: 2px 0;
}
</style>
