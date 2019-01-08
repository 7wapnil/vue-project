import gql, { disableFragmentWarnings } from 'graphql-tag'
import client from '@/libs/apollo/';
import filters from './filters'

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
    }
  },
  filters
}
