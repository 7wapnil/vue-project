import gql from 'graphql-tag'
import { mapGetters } from 'vuex'
import filters from './filters'

export default {
  computed: {
    ...mapGetters('providers', [
      'isLiveConnected',
      'isPreLiveConnected'
    ]),
    isMobile () {
      return this.$mq === 'mobile'
    },
    isTablet () {
      return this.$mq === 'tablet'
    },
    isDesktop () {
      return this.$mq === 'desktop'
    },
    isMobileDevice () {
      return this.isMobile || this.isTablet
    },
    isIosDevice () {
      return /iPhone|iPad/i.test(navigator.userAgent) && /AppleWebKit/i.test(navigator.userAgent)
    },
    isKindEsport () {
      return this.$route.params.titleKind === 'esports'
    },
    currentLobbyName () {
      return this.$route.params.titleKind
    },
    currentLobbySection () {
      const isEsportLobby = ['esports', 'sports'].includes(this.$route.params.titleKind)
      return isEsportLobby ? 'sportsbook' : 'casino'
    }
  },
  methods: {
    gql (query) {
      return gql`${query}`
    }
  },
  filters
}
