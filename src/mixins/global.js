import gql, { disableFragmentWarnings } from 'graphql-tag'
import client from '@/libs/apollo/';
import filters from './filters'

disableFragmentWarnings()

export default {
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
