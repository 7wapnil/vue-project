const STATUSES = {
  initial: 'initial',
  submitted: 'submitted',
  pending: 'pending',
  accepted: 'accepted',
  failed: 'failed',
  rejected: 'rejected',
  validation: 'sent_to_external_validation'
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
      STATUSES.accepted,
      STATUSES.validation
    ].includes(this.status)
  }
}
