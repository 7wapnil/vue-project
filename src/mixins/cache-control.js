import { LIST_QUERY, EVENT_QUERY } from '@/services/api/events'

const log = (msg) => {
  console.log(msg)
}

export default {
  methods: {
    /**
     * @param {Object} eventData
     * @returns {*|void}
     */
    addEventToCache (eventData) {
      const cacheKey = { query: LIST_QUERY }
      const store = this._readStore(cacheKey)
      if (store) {
        const event = store.events.find(item => item.id === eventData.id)
        if (event) {
          log(`Updating event ID ${eventData.id}`)
          Object.keys(eventData).forEach((key) => {
            event[key] = eventData[key]
          })
          event.description = eventData.name
        } else {
          log(`New event ID ${eventData.id}`)
          store.events.push({
            id: eventData.id,
            name: eventData.name,
            description: eventData.name,
            start_at: eventData.start_at,
            end_at: null,
            title_name: '',
            markets: [],
            __typename: 'Event'
          })
        }

        cacheKey.data = store
        this._writeStore(cacheKey)
      }
    },

    /**
     * @param {Object} oddData
     * @returns {*|void}
     */
    updateOddInCache (oddData) {
      this._findEvent(oddData.eventId, (event) => {
        const market = event.markets.find(item => item.id === oddData.marketId)
        if (!market) { return }

        const odd = market.odds.find(item => item.id === oddData.id)
        if (odd) {
          log(`Updating odd ID ${oddData.id}`)
          Object.keys(oddData).forEach((key) => {
            odd[key] = oddData[key]
          })
          return
        }

        log(`New odd ID ${oddData.id}`)
        market.odds.push({
          id: oddData.id,
          name: oddData.name,
          value: oddData.value,
          __typename: 'Odd'
        })
      })
    },

    /**
     * @param {Object} marketData
     * @returns {*|void}
     */
    updateMarketInCache (marketData) {
      this._findEvent(marketData.eventId, (event) => {
        const market = event.markets.find(item => item.id === marketData.id)
        if (market) {
          Object.keys(marketData).forEach((key) => {
            market[key] = marketData[key]
          })
          return
        }

        event.markets.push({
          id: marketData.id,
          name: marketData.name,
          priority: marketData.priority,
          status: marketData.status,
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
    _findEvent (eventId, callback) {
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
            event = store.events.find(event => event.id === eventId)
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
        return null
      }

      return store
    },

    _writeStore (date) {
      const client = this.$apollo.getClient()
      client.writeQuery(date)
    }
  }
}
