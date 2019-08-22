import iconsMap, { DEFAULT_ICON } from '@/assets/icons/sidemenu/index'
import { slug } from './strings'

export const findTitleIcon = ({ externalName }) => {
  const titleSlug = slug(externalName)
  if (iconsMap[titleSlug] === undefined) {
    return DEFAULT_ICON
  }

  return iconsMap[titleSlug]
}
