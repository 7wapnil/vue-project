/**
 * Converts word slug-word
 * @param words
 * @returns {string}
 */
export const slug = (words) => {
  return words
    .toLowerCase()
    .replace(/\s+/g, '-')
}
