import { findTitleIcon } from './icon-finder'
import { getTitleShortName } from './title-names'

/**
 * Build tournaments list by parent ID
 *
 * @param titleKind
 * @param title
 * @param route
 * @param parentId
 * @returns {*}
 */
const buildTournaments = (titleKind, title, route, parentId = null) => {
  return title.eventScopes
    .filter((scope) => {
      return scope.kind === 'tournament' &&
        (parentId === null ? true : scope.eventScopeId === parentId)
    })
    .map((tournament) => {
      return {
        id: tournament.id,
        label: tournament.name,
        active: route.params.tournamentId && route.params.tournamentId === tournament.id,
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
 * @param route
 * @returns {*}
 */
const buildSubTree = (titleKind, title, route) => {
  if (!title.showCategoryInNavigation) {
    return buildTournaments(titleKind, title, route)
  }

  return title
    .eventScopes
    .filter((scope) => {
      return scope.kind === 'category'
    })
    .map((category) => {
      const tournamentList = buildTournaments(titleKind, title, route, category.id)
      if (tournamentList.length > 1) {
        tournamentList.unshift({ label: 'All', to: { name: 'category-tournaments', params: { titleKind, titleId: title.id, categoryId: category.id } } })
      }

      return {
        id: category.id,
        label: category.name,
        active: !!tournamentList.find(t => t.active) || route.params.categoryId === category.id,
        children: tournamentList
      }
    })
}

/**
 * Entry function
 *
 * @param titleKind
 * @param titles
 * @param route
 * @returns {*}
 */
export const buildTree = (titleKind, titles, route) => {
  return titles.map((title) => {
    const children = buildSubTree(titleKind, title, route)

    return {
      id: title.id,
      label: getTitleShortName(title),
      active: !!children.find(c => c.active),
      icon: findTitleIcon(title),
      children
    }
  })
}
