import gql from 'graphql-tag'
import { mapGetters } from 'vuex'
import filters from './filters'

export default {
  computed: {
    ...mapGetters('providers', [
      'isLiveConnected',
      'isPreLiveConnected'
    ])
  },
  methods: {
    gql (query) {
      return gql`${query}`
    }
  },
  filters
}
