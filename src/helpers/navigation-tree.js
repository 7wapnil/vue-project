import { CATEGORY, TOURNAMENT } from '@/constants/event-scopes/kinds'
import { findTitleIcon } from '@/helpers/icon-finder'
import { getTitleName } from '@/helpers/titles'

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
      return scope.kind === TOURNAMENT &&
        (parentId === null ? true : scope.eventScopeId === parentId)
    })
    .map((tournament) => {
      return {
        id: tournament.id,
        label: tournament.name,
        active: route.params.tournamentSlug && route.params.tournamentSlug === tournament.slug,
        to: {
          name: `${titleKind}-tournament`,
          params: {
            titleKind,
            titleSlug: title.slug,
            tournamentSlug: tournament.slug
          }
        },
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
      return scope.kind === CATEGORY
    })
    .map((category) => {
      const tournamentList = buildTournaments(titleKind, title, route, category.id)

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
      label: getTitleName(title),
      active: !!children.find(c => c.active),
      icon: findTitleIcon(title),
      children
    }
  })
}
