import iconsMap, { DEFAULT_ICON, DEFAULT_CATEGORY_ICON } from '@/assets/icons/sidemenu/index'
import { slug } from './strings'

export const findTitleIcon = ({ externalName }) => {
  const titleSlug = slug(externalName)
  if (iconsMap[titleSlug] === undefined) {
    return DEFAULT_ICON
  }

  return iconsMap[titleSlug]
}

export const findCategoryIcon = ({ context }) => {
  const titleSlug = slug(context)
  if (iconsMap[titleSlug] === undefined) {
    return DEFAULT_CATEGORY_ICON
  }

  return iconsMap[titleSlug]
}
