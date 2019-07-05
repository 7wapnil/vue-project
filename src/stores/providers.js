export const SET_PROVIDERS = 'SET_PROVIDERS'
export const UPDATE_PROVIDER = 'UPDATE_PROVIDER'

const LIVE_CODE = 'liveodds'
const PRE_LIVE_CODE = 'pre'
const HEALTHY_STATE = 'healthy'

const isProviderConnected = (state, code) => {
  const provider = state.providers.find(p => p.code === code)
  if (!provider) {
    return false
  }

  return provider.state === HEALTHY_STATE
}

const mutations = {
  [SET_PROVIDERS] (state, providers) {
    state.providers = providers
  },
  [UPDATE_PROVIDER] (state, provider) {
    const index = state.providers.findIndex(p => p.id === provider.id)
    if (index > -1) {
      state.providers[index] = {
        ...provider
      }
    } else {
      state.providers.push(provider)
    }
  }
}

const getters = {
  isLiveConnected (state) {
    return isProviderConnected(state, LIVE_CODE)
  },
  isPreLiveConnected (state) {
    return isProviderConnected(state, PRE_LIVE_CODE)
  }
}

export default {
  namespaced: true,
  state: {
    providers: []
  },
  mutations,
  getters
}
