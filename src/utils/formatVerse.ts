/**
 * formatVerseToFourLines — shared utility for rendering verses in 4 lines.
 *
 * Rules:
 *   1. If the DB text already has newlines, use them directly.
 *   2. Otherwise, split by word count into ~4 even lines.
 *
 * Works for both Roman transliteration AND Devanagari text.
 *
 * Example output for BG 18.66:
 *   sarva-dharmān parityajya
 *   mām ekaṁ śaraṇaṁ vraja |
 *   ahaṁ tvāṁ sarva-pāpebhyo
 *   mokṣayiṣyāmi mā śucaḥ ||
 */
export function formatVerseToFourLines(text: string): string[] {
  // If DB already has newlines, use them
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
  if (lines.length >= 2) return lines

  // Fallback: split into roughly 4 lines by word count
  const words = text.split(/\s+/).filter(Boolean)
  if (words.length <= 4) return [text]

  const perLine = Math.ceil(words.length / 4)
  const result: string[] = []
  for (let i = 0; i < words.length; i += perLine) {
    result.push(words.slice(i, i + perLine).join(' '))
  }
  return result
}
