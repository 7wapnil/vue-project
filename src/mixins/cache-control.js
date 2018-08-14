import gql from 'graphql-tag'
import { LIST_QUERY, EVENT_QUERY } from '@/services/api/events'

export default {
  methods: {
    /**
     * @param {Object} oddData
     * @returns {*|void}
     */
    updateOddInCache(oddData) {
      if (this.hasFragment('Odd', oddData.id)) {
        return this.updateFragment('Odd', oddData)
      }
  
      this._findEvent(oddData.eventId, (event) => {
        console.log(event)
        event.markets.forEach((market) => {
          if (market.id === oddData.marketId) {
            market.odds.push({
              id: oddData.id,
              name: oddData.name,
              value: oddData.value,
              __typename: 'Odd'
            })
          }
        })
      })
    },
  
    /**
     * @param {Object} marketData
     * @returns {*|void}
     */
    updateMarketInCache(marketData) {
      if (this.hasFragment('Market', marketData.id)) {
        return this.updateFragment('Market', marketData)
      }

      this._findEvent(marketData.eventId, (event) => {
        event.markets.push({
          id: marketData.id,
          name: marketData.name,
          priority: marketData.priority,
          odds: [],
          __typename: 'Market'
        })
      })
    },
  
    /**
     * @param {String} eventId
     * @param {Function} callback
     * @private
     */
    _findEvent(eventId, callback) {
      const cacheKeys = [
        { query: LIST_QUERY },
        { query: EVENT_QUERY, variables: { id: eventId } }
      ]
  
      cacheKeys.forEach((cacheKey) => {
        const store = this._readStore(cacheKey)
        if (store) {
          let event
          if (store.event) {
            event = store.event
          } else if (store.events) {
            event = store.events.find(event => event.id === marketData.eventId)
          }
      
          if (event) {
            callback(event)
            cacheKey.data = store
            this._writeStore(cacheKey)
          }
        }
      })
    },
    
    _readStore (cacheKey) {
      const client = this.$apollo.getClient()
      let store
  
      try {
        store = client.readQuery(cacheKey)
      } catch (e) {
        console.log(e)
        return null
      }
      
      return store
    },
    
    _writeStore (date) {
      const client = this.$apollo.getClient()
      client.writeQuery(date)
    },
    
    /**
     * Checks if entity exists in a cache
     * @param {string} typename
     * @param {string} id
     * @returns {boolean}
     */
    hasFragment(typename, id) {
      const fragment = gql `
        fragment ${typename} on ${typename} {
          id
        }
      `
      
      const cacheFragment = this.$apollo.getClient().readFragment({
        id: `${typename}:${id}`,
        fragment
      })
  
      return cacheFragment !== null
    },
  
    /**
     *
     * @param {string} typename
     * @param {Object} updates
     */
    updateFragment(typename, updates) {
      const client = this.$apollo.getClient()
      const id = `${typename}:${updates.id}`
      const fields = Object.keys(updates).filter((key) => {
        return key !== 'eventId' && key !== 'marketId'
      })
      
      const fragment = gql `
        fragment ${typename} on ${typename} {
          ${ fields.join('\n') }
        }
      `
      
      const data = client.readFragment({ id, fragment })
      
      // if entity found in cache update it,
      // otherwise it was not loaded yet and not displayed
      if (data) {
        
        console.log(`Updating entity '${typename}', id ${updates.id}`)
        
        fields.forEach((attr) => {
          if (attr !== 'eventId' && attr !== 'marketId') {
            data[attr] = updates[attr]
          }
        })
        client.writeFragment( {id, fragment, data })
      }
    }
  }
}
