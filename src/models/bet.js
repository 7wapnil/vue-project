const STATUSES = {
  initial: 'initial',
  submitting: 'submitting',
  pending: 'pending',
  succeeded: 'succeeded',
  failed: 'failed'
}

export default class Bet {
  constructor ({ odd, stake, status, message, externalId, approvedValue }) {
    this.odd = odd
    this.stake = stake
    this.status = STATUSES[status] || STATUSES.initial
    this.message = message
    this.externalId = externalId
    this.approvedValue = approvedValue
  }

  static get statuses () {
    return STATUSES
  }

  static initial ({ odd }) {
    return new this({
      odd: odd,
      stake: 0,
      status: STATUSES.initial,
      message: null,
      externalId: null,
      approvedValue: odd.value
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
