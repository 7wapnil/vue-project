import { expect } from 'chai'
import Bet from '@//models/bet'

describe('Bet', () => {
  describe('initial', () => {
    it('creates new Bet from odd', () => {
      const newBet = Bet.initial({}, {}, { id: 1, value: 23.22 })

      expect(newBet.oddId).to.eql(1)
      expect(newBet.status).to.eql('initial')
      expect(newBet.message).to.eql(null)
      expect(newBet.externalId).to.eql(null)
      expect(newBet.approvedOddValue).to.eql(23.22)
      expect(newBet.currentOddValue).to.eql(23.22)
    })
  })

  describe('statuses', () => {
    it('provides interface for correct statuses map', () => {
      expect(Bet.statuses).to.eql({
        initial: 'initial',
        submitted: 'submitted',
        pending: 'pending',
        accepted: 'accepted',
        failed: 'failed',
        settled: 'settled',
        rejected: 'rejected',
        disabled: 'disabled'
      })
    })
  })

  describe('frozen', () => {
    it('returns true for accepted status', () => {
      const newBet = new Bet({ status: 'accepted' })
      expect(newBet.frozen).to.eql(true)
    })

    it('returns true for pending status', () => {
      const newBet = new Bet({ status: 'pending' })
      expect(newBet.frozen).to.eql(true)
    })

    it('returns true for submitted status', () => {
      const newBet = new Bet({ status: 'submitted' })
      expect(newBet.frozen).to.eql(true)
    })

    it('returns false for any other status', () => {
      const newBet = new Bet({ status: 'boo' })
      expect(newBet.frozen).to.eql(false)
    })
  })
})
