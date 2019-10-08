import gql from 'graphql-tag'
import { mapGetters } from 'vuex'
import filters from './filters'
import { SPORTS, ESPORTS, CASINO, LIVE_CASINO } from '@/constants/title-kinds'
import { BETTING, CASINO_GAMES } from '@/constants/page-types'

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
    isKindEsport () {
      return this.$route.params.titleKind === ESPORTS
    },
    pageType () {
      if ([SPORTS, ESPORTS].includes(this.$route.params.titleKind)) return BETTING
      if ([CASINO, LIVE_CASINO].includes(this.$route.params.titleKind)) return CASINO_GAMES
    }
  },
  methods: {
    gql (query) {
      return gql`${query}`
    }
  },
  filters
}
