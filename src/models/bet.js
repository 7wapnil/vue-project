const STATUSES = {
  initial: 'initial',
  submitted: 'submitted',
  pending: 'pending',
  pendingMtsCancellation: 'pending_mts_cancellation',
  pendingCancellation: 'pending_cancellation',
  sentToExternalValidation: 'sent_to_external_validation',
  accepted: 'accepted',
  settled: 'settled',
  failed: 'failed',
  rejected: 'rejected',
  disabled: 'disabled',
  conflicted: 'conflicted'
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
      stake: null,
      status: STATUSES.initial,
      message: null,
      notificationCode: null,
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
      STATUSES.sentToExternalValidation
    ].includes(this.status)
  }

  get isStatusAccepted () {
    return this.status === STATUSES.accepted
  }

  get hasFailureStatus () {
    return [
      STATUSES.failed,
      STATUSES.rejected,
      STATUSES.conflicted,
      STATUSES.pendingMtsCancellation,
      STATUSES.pendingCancellation
    ].includes(this.status)
  }

  get isAcceptable () {
    return [
      STATUSES.initial,
      STATUSES.failed,
      STATUSES.rejected,
      STATUSES.pendingMtsCancellation,
      STATUSES.pendingCancellation
    ].includes(this.status)
  }

  get oddsChanged () {
    return this.approvedOddValue !== this.currentOddValue
  }
}
