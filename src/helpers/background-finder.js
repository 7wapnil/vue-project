import backgroundsMap, { DEFAULT_BACKGROUND } from '@/assets/images/introduction-area/index'
import { slug } from '@/helpers/strings'

export const findBackground = ({ name }) => {
  const titleSlug = slug(name)
  if (backgroundsMap[titleSlug] === undefined) {
    return DEFAULT_BACKGROUND
  }

  return backgroundsMap[titleSlug]
}
