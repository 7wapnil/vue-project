import { expect } from 'chai'
import Eventslookup from '@/services/helpers/events-lookup'

describe('Eventslookup', () => {
  describe('oddsMap', () => {
    it('flatten events map', () => {
      const input = [
        { id: 1, markets: [ { id: 2, odds: [ { id: 3 }] }] }
      ]

      expect(Eventslookup.from(input).oddsMap())
        .to.eql([{
          'event': {
            'id': 1,
            'markets': {}
          },
          'eventId': 1,
          'market': {
            'id': 2,
            'odds': {}
          },
          'marketId': 2,
          'odd': {
            'id': 3
          }
        }])
    })
  })

  describe('findOddMapRowById', () => {
    it('returns event row by Id', () => {
      const input = [
        { id: 1, markets: [ { id: 2, odds: [ { id: 3 }] }] }
      ]

      expect(Eventslookup.from(input).findOddMapRowById(3))
        .to.eql({
          'event': {
            'id': 1,
            'markets': {}
          },
          'eventId': 1,
          'market': {
            'id': 2,
            'odds': {}
          },
          'marketId': 2,
          'odd': {
            'id': 3
          }
        })
    })
  })
})
