import { expect } from 'chai'
import EventsLookup from '@/services/helpers/events-lookup'

describe('EventsLookup', () => {
  describe('oddsMap', () => {
    it('flatten events map', () => {
      const input = [
        { id: 1, dashboard_market: { id: 2, odds: [{ id: 3 }] } }
      ]

      expect(EventsLookup.from(input).oddsMap())
        .to.eql([{
          'event': {
            'id': 1,
            'dashboard_market': null
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
        { id: 1, dashboard_market: { id: 2, odds: [{ id: 3 }] } }
      ]

      expect(EventsLookup.from(input).findOddMapRowById(3))
        .to.eql({
          'event': {
            'id': 1,
            'dashboard_market': null
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
