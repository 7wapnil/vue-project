import { expect } from 'chai'
import serializer from '@/services/serializers/betslip'

describe('BetslipSerializer', () => {
  describe('static serialize', () => {
    it('converts bet according to template', () => {
      const bet = { stake: 12.23434, odd: { id: 3 }, approvedValue: 1.2344 }
      const bet2 = { stake: 30.222, odd: { id: 4 }, approvedValue: 3.2 }
      expect(serializer.serialize({ bets: [bet, bet2], currencyCode: 'EUR' }))
        .to.eql([
          { amount: 12.23434, oddId: 3, oddValue: 1.2344, currencyCode: 'EUR' },
          { amount: 30.222, oddId: 4, oddValue: 3.2, currencyCode: 'EUR' }
        ])
    })
  })
})
