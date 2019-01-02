export default {
  state: {
    titleKind: 'esports',
    titleId: null,
    tournamentId: null,
  },
  actions: {
    updateTitleFiltersFromRouteParams (ctx, payload) {
      const {
        titleKind,
        titleId,
        tournamentId
      } = payload

      ctx.commit('updateTitleFilters', {
        titleKind: titleKind || 'esports',
        titleId,
        tournamentId
      })
    }
  },
  mutations: {
    updateTitleFilters (state, payload) {
      state = Object.assign(state, payload)
    }
  }
}
