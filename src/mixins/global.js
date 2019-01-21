import { NOT_STARTED, STARTED } from '@/constants/event-statuses'
import { mapGetters } from 'vuex'
import client from '@/libs/apollo/';
import filters from './filters'

export default {
  sockets: {
    connect () {
      console.log('Socket connected')
      this.socketConnected = true
    },
    disconnect () {
      console.log('Socket disconnected')
      this.socketConnected = false
    }
  },
  data () {
    return {
      socketConnected: false
    }
  },
  computed: {
    ...mapGetters('app', ['appState'])
  },
  methods: {
    gql (query) {
      return gql`${query}`
    },
    updateApolloCache (query, callback) {
      let data
      try {
        data = client.readQuery(query)
      } catch (err) {
        console.log('Query not found in cache', query)
        return
      }
      callback(data)
      client.writeQuery({ ...query, data })
    },
    isEventAvailable(event) {
      if (this.appState.live_connected === false && event.live) {
        return false
      }

      if (this.appState.pre_live_connected === false && !event.live) {
        return false
      }

      console.log(this.appState)
      return [
        NOT_STARTED,
        STARTED
      ].includes(event.status)
    }
  },
  filters
}
