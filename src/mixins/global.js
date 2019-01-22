import gql from 'graphql-tag'
import { NOT_STARTED, STARTED } from '@/constants/event-statuses'
import { mapGetters } from 'vuex'
import filters from './filters'

export default {
  computed: {
    ...mapGetters('app', ['appState'])
  },
  methods: {
    gql (query) {
      return gql`${query}`
    },
    isEventAvailable (event) {
      if (this.appState.live_connected === false && event.live) {
        return false
      }

      if (this.appState.pre_live_connected === false && !event.live) {
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
