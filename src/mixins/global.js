import gql from 'graphql-tag'
import { NOT_STARTED, STARTED } from '@/constants/event-statuses'
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
    },
    isEventAvailable (event) {
      if (event.live && !this.isLiveConnected) {
        return false
      }

      if (!event.live && !this.isPreLiveConnected) {
        return false
      }

      return [
        NOT_STARTED,
        STARTED
      ].includes(event.status)
    }
  },
  filters
}
