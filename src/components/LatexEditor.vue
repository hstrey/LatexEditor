<script setup>
import { ref, watch, nextTick } from 'vue'
import { useLatexReplacer } from '../composables/useLatexReplacer.js'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Type LaTeX sequences like \\pi, \\alpha, \\sum and press Tab to convert...',
  },
  rows: {
    type: Number,
    default: 10,
  },
  showFeedback: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const { tryReplace } = useLatexReplacer()

const textareaRef = ref(null)
const feedbackMessage = ref('')
const feedbackVisible = ref(false)

let feedbackTimeout = null

/**
 * Show a temporary feedback toast
 */
function showFeedback(from, to) {
  if (!props.showFeedback) return

  feedbackMessage.value = `${from} → ${to}`
  feedbackVisible.value = true

  // Clear any existing timeout
  if (feedbackTimeout) {
    clearTimeout(feedbackTimeout)
  }

  // Hide after 1.5 seconds
  feedbackTimeout = setTimeout(() => {
    feedbackVisible.value = false
  }, 1500)
}

/**
 * Handle keydown events, specifically Tab key
 */
function handleKeydown(event) {
  if (event.key !== 'Tab') return

  const textarea = textareaRef.value
  const text = props.modelValue
  const cursorPos = textarea.selectionStart

  const result = tryReplace(text, cursorPos)

  if (result) {
    // Prevent default Tab behavior
    event.preventDefault()

    // Update the text
    emit('update:modelValue', result.newText)

    // Show feedback
    showFeedback(result.replaced.from, result.replaced.to)

    // Restore cursor position after Vue updates the DOM
    nextTick(() => {
      textarea.selectionStart = result.newCursorPos
      textarea.selectionEnd = result.newCursorPos
    })
  }
  // If no match, allow default Tab behavior (accessibility)
}

/**
 * Handle input events for v-model
 */
function handleInput(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="latex-editor">
    <div class="editor-container">
      <textarea
        ref="textareaRef"
        :value="modelValue"
        :placeholder="placeholder"
        :rows="rows"
        class="editor-textarea"
        @input="handleInput"
        @keydown="handleKeydown"
      ></textarea>

      <Transition name="fade">
        <div v-if="feedbackVisible" class="feedback-toast">
          {{ feedbackMessage }}
        </div>
      </Transition>
    </div>

    <div class="helper-text">
      <kbd>Tab</kbd> to convert LaTeX sequences to Unicode
    </div>
  </div>
</template>

<style scoped>
.latex-editor {
  width: 100%;
}

.editor-container {
  position: relative;
}

.editor-textarea {
  width: 100%;
  padding: 12px;
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 16px;
  line-height: 1.5;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  resize: vertical;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.editor-textarea:focus {
  outline: none;
  border-color: #4a90d9;
  box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.1);
}

.editor-textarea::placeholder {
  color: #999;
}

.feedback-toast {
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: #333;
  color: #fff;
  padding: 8px 16px;
  border-radius: 6px;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.helper-text {
  margin-top: 8px;
  font-size: 13px;
  color: #666;
}

kbd {
  background: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 2px 6px;
  font-family: inherit;
  font-size: 12px;
  box-shadow: 0 1px 0 #bbb;
}
</style>
