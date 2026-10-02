export function splitWords(text) {
  return text
    .split(' ')
    .map((word, i) => `<span class="w" style="--i:${i}">${word}</span>`)
    .join(' ')
}
