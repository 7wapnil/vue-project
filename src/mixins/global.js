import gql, { disableFragmentWarnings } from 'graphql-tag'

disableFragmentWarnings()

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
  methods: {
    gql (query) {
      return gql`${query}`
    }
  }
}
