class EventsLookup {
  constructor (eventsPassed) {
    if (eventsPassed === undefined) {
      throw new Error('Events not passed')
    }
    this.events = eventsPassed
  }

  static from (events) {
    return new EventsLookup(events)
  }

  findOddMapRowById (oddId) {
    return this.oddsMap().find(row => row.odd.id === oddId)
  }

  oddsMap () {
    let tree = []
    this.events.forEach(function (event) {
      let market = event.dashboardMarket

      if (!market) return

      market.odds.forEach(function (odd) {
        const displayEvent = Object.assign({}, event)
        displayEvent.dashboardMarket = null

        const displayMarket = Object.assign({}, market)
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
    return tree
  }
}

export default EventsLookup
