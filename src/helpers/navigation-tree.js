const DEFAULT_ICON = 'sidemenu-game-icon'

/**
 * Icons map for title high level menu
 */
const iconsMap = {
  'american-football': 'sidemenu-game-icon'
}

/**
 * Converts title name to slug-title-name
 * @param words
 * @returns {string}
 */
const slug = (words) => {
  return words
    .toLowerCase()
    .replace(/\s+/g, '-')
}

const getTitleIcon = (titleName) => {
  const titleSlug = slug(titleName)
  if (iconsMap[titleSlug] === undefined) {
    return DEFAULT_ICON
  }

  return iconsMap[titleSlug]
}

/**
 * Build tournaments list by parent ID
 *
 * @param titleKind
 * @param title
 * @param parentId
 * @returns {*}
 */
const buildTournaments = (titleKind, title, parentId = null) => {
  return title.event_scopes
    .filter((scope) => {
      return scope.kind === 'tournament' &&
        (parentId === null ? true : scope.event_scope_id === parentId)
    })
    .map((tournament) => {
      return {
        id: tournament.id,
        label: tournament.name,
        to: { name: 'tournament', params: { titleKind, titleId: title.id, tournamentId: tournament.id } },
        children: []
      }
    })
}

/**
 * Build categories or tournaments tree
 *
 * @param titleKind
 * @param title
 * @returns {*}
 */
const buildSubTree = (titleKind, title) => {
  if (!title.show_category_in_navigation) {
    return buildTournaments(titleKind, title)
  }

  return title
    .event_scopes
    .filter((scope) => {
      return scope.kind === 'category'
    })
    .map((category) => {
      const tournamentList = buildTournaments(titleKind, title, category.id)
      if (tournamentList.length > 1) {
        tournamentList.unshift({ label: 'All', to: { name: 'category-tournaments', params: { titleKind, titleId: title.id, categoryId: category.id } } })
      }
      return {
        id: category.id,
        label: category.name,
        children: tournamentList
      }
    })
}

/**
 * Entry function
 *
 * @param titleKind
 * @param titles
 * @returns {*}
 */
export const buildTree = (titleKind, titles) => {
  return titles.map((title) => {
    return {
      id: title.id,
      label: title.name,
      icon: getTitleIcon(title.name),
      children: buildSubTree(titleKind, title)
    }
  })
}
