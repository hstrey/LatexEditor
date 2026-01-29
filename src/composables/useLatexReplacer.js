import { latexMappings, sortedSequences } from '../data/latexMappings.js'

/**
 * Composable for LaTeX to Unicode replacement logic
 */
export function useLatexReplacer() {
  /**
   * Find a LaTeX sequence ending at the cursor position
   * @param {string} text - The full text content
   * @param {number} cursorPos - Current cursor position
   * @returns {{ sequence: string, startIndex: number } | null}
   */
  function findSequenceBeforeCursor(text, cursorPos) {
    // Get text before cursor
    const textBeforeCursor = text.slice(0, cursorPos)

    // Try each sequence (sorted by length, longest first)
    for (const sequence of sortedSequences) {
      if (textBeforeCursor.endsWith(sequence)) {
        return {
          sequence,
          startIndex: cursorPos - sequence.length,
        }
      }
    }

    return null
  }

  /**
   * Attempt to replace a LaTeX sequence at cursor position
   * @param {string} text - The full text content
   * @param {number} cursorPos - Current cursor position
   * @returns {{ newText: string, newCursorPos: number, replaced: { from: string, to: string } } | null}
   */
  function tryReplace(text, cursorPos) {
    const found = findSequenceBeforeCursor(text, cursorPos)

    if (!found) {
      return null
    }

    const { sequence, startIndex } = found
    const unicodeChar = latexMappings[sequence]

    // Build new text: before sequence + unicode + after cursor
    const newText =
      text.slice(0, startIndex) + unicodeChar + text.slice(cursorPos)

    // New cursor position is right after the inserted unicode character
    const newCursorPos = startIndex + unicodeChar.length

    return {
      newText,
      newCursorPos,
      replaced: {
        from: sequence,
        to: unicodeChar,
      },
    }
  }

  /**
   * Get all available mappings (useful for help/documentation)
   * @returns {Object} The full mapping object
   */
  function getAllMappings() {
    return { ...latexMappings }
  }

  /**
   * Check if a sequence is valid
   * @param {string} sequence - The sequence to check
   * @returns {boolean}
   */
  function isValidSequence(sequence) {
    return sequence in latexMappings
  }

  return {
    findSequenceBeforeCursor,
    tryReplace,
    getAllMappings,
    isValidSequence,
  }
}
