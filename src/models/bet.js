const STATUSES = {
  initial: 'initial',
  submitting: 'submitting',
  pending: 'pending',
  succeeded: 'succeeded',
  failed: 'failed'
}

export default class Bet {
  constructor({ odd, stake, status, externalId, approvedValue }) {
    this.odd = odd
    this.stake = stake
    this.status = STATUSES[status] || STATUSES.initial
    this.externalId = externalId
    this.approvedValue = approvedValue
  }

  static get statuses() {
    return STATUSES
  }

  static initial({ odd }) {
    return new this({
      odd: odd,
      stake: 0,
      status: STATUSES.initial,
      externalId: null,
      approvedValue: odd.value
    })
  }

  get frozen() {
    return [
      STATUSES.submitting,
      STATUSES.pending,
      STATUSES.succeeded
    ].includes(this.status)
  }
}
