/**
 * Reorder competitors list by qualifier
 *
 * @param competitors
 * @returns {Array<Object>}
 */
export const orderByQualifier = (competitors) => {
  if (competitors[0].qualifier === 'home') {
    return competitors
  } else {
    return competitors.reverse()
  }
}
