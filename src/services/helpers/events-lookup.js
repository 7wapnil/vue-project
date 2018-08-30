const events = []

class EventsLookup {
  constructor(eventsPassed) {
    this.events = eventsPassed
  }

  static from(events) {
    return new EventsLookup(events)
  }

  findOddMapRowById (oddId) {
    return this.oddsMap().find(row => row.odd.id == oddId)
  }

  oddsMap () {
    let tree = []
    this.events.forEach(function(event) {
      event.markets.forEach(function(market) {
        market.odds.forEach(function(odd) {
          const displayEvent = Object.assign({}, event);
          displayEvent.markets = {}

          const displayMarket = Object.assign({}, market);
          displayMarket.odds = {}

          tree.push({
            event: displayEvent,
            eventId: event.id,
            market: displayMarket,
            marketId: market.id,
            odd: odd
          })
        })
      })
    })
    return tree
  }
}

export default EventsLookup
