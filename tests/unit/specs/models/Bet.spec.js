import { expect } from 'chai'
import bet from '@//models/bet'

describe('Bet', () => {
  describe('constructor', () => {
    it('sets status according to statuses map', () => {
      const newBet = new bet(
        { odd: { id: 1 },
          stake: 2,
          status: 'initial',
          message: 'zoo',
          externalId: '3',
          approvedValue: 12.22
        })
      expect(newBet.odd).to.eql({ id: 1 })
      expect(newBet.stake).to.eql(2)
      expect(newBet.status).to.eql('initial')
      expect(newBet.message).to.eql('zoo')
      expect(newBet.externalId).to.eql('3')
      expect(newBet.approvedValue).to.eql(12.22)
    })

    it('sets initial status for invalid status', () => {
      const newBet = new bet({ status: 'boo' })
      expect(newBet.status).to.eql('initial')
    })
  })

  describe('initial', () => {
    it('creates new bet from odd', () => {
      const newBet = bet.initial({ odd: { id: 1, value: 23.22 } })

      expect(newBet.odd).to.eql({ id: 1, value: 23.22 })
      expect(newBet.stake).to.eql(0)
      expect(newBet.status).to.eql('initial')
      expect(newBet.message).to.eql(null)
      expect(newBet.externalId).to.eql(null)
      expect(newBet.approvedValue).to.eql(23.22)
    })
  })

  describe('statuses', () => {
    it('provides interface for correct statuses map', () => {
      expect(bet.statuses).to.eql({
        initial: 'initial',
        submitting: 'submitting',
        pending: 'pending',
        succeeded: 'succeeded',
        failed: 'failed'
      })
    })
  })

  describe('frozen', () => {
    it('returns true for submitting status', () => {
      const newBet = new bet({ status: 'submitting' })
      expect(newBet.frozen).to.eql(true)
    })

    it('returns true for pending status', () => {
      const newBet = new bet({ status: 'pending' })
      expect(newBet.frozen).to.eql(true)
    })

    it('returns true for succeeded status', () => {
      const newBet = new bet({ status: 'succeeded' })
      expect(newBet.frozen).to.eql(true)
    })

    it('returns false for any other status', () => {
      const newBet = new bet({ status: 'boo' })
      expect(newBet.frozen).to.eql(false)
    })
  })
})
