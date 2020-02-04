import { findTitleIcon } from '@/helpers/icon-finder'

export const getTitleName = (title) => {
  return (title.name || title.externalName)
}

export const getTitleShortName = (title) => {
  return (title.shortName || getTitleName(title))
}

export const buildTitleTag = (title) => {
  return {
    id: title.id,
    slug: title.slug,
    label: getTitleShortName(title),
    icon: findTitleIcon(title)
  }
}
