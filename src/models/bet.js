const STATUSES = {
  initial: 'initial',
  submitted: 'submitted',
  pending: 'pending',
  accepted: 'accepted',
  settled: 'settled',
  failed: 'failed',
  rejected: 'rejected',
  disabled: 'disabled',
  warning: 'warning'
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
      id: null,
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
      STATUSES.submitted,
      STATUSES.pending,
      STATUSES.accepted
    ].includes(this.status)
  }

  get isAcceptable () {
    return [
      STATUSES.initial,
      STATUSES.failed,
      STATUSES.rejected
    ].includes(this.status)
  }
}
