const STATUSES = {
  initial: 'initial',
  submitting: 'submitting',
  pending: 'pending',
  succeeded: 'succeeded',
  failed: 'failed'
}

export default class Bet {
  constructor (attributes = {}) {
    Object.keys(attributes).forEach((key) => {
      this[key] = attributes[key]
    })
  }

  static get statuses () {
    return STATUSES
  }

  static initial (event, market, odd) {
    return new Bet({
      eventId: event.id,
      marketStatus: null,
      eventName: event.name,
      marketId: market.id,
      marketName: market.name,
      oddId: odd.id,
      oddName: odd.name,
      stake: 5,
      status: STATUSES.initial,
      message: null,
      externalId: null,
      approvedOddValue: odd.value,
      currentOddValue: odd.value,
      success: null
    })
  }

  get frozen () {
    return [
      STATUSES.submitting,
      STATUSES.pending,
      STATUSES.succeeded
    ].includes(this.status)
  }
}
