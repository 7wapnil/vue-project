import iconsMap, { DEFAULT_ICON } from '@/assets/icons/sidemenu/index'
import { slug } from './strings'

export const findTitleIcon = ({ name }) => {
  const titleSlug = slug(name)
  if (iconsMap[titleSlug] === undefined) {
    return DEFAULT_ICON
  }

  return iconsMap[titleSlug]
}
