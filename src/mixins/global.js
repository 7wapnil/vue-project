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
    isKindEsport () {
      return this.$route.params.titleKind === 'esports'
    }
  },
  methods: {
    gql (query) {
      return gql`${query}`
    }
  },
  filters
}
