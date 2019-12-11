import gql from 'graphql-tag'

export const BETSLIP_PLACEMENT_QUERY = gql`
  mutation placeBets($bets: [BetInput]) {
    placeBets(bets: $bets) {
      success
      message
      bet {
        id
        status
        betLegs {
          oddId
          oddValue
        }
      }
    }
  }
`

export const BETSLIP_PLACEMENT_COMBO_QUERY = gql`
  mutation placeComboBets($bet: BetInput) {
    placeComboBets(bet: $bet) {
      success
      message
      bet {
        id
        status
        betLegs {
          oddId
          oddValue
        }
      }
    }
  }
`

export const BETSLIP_BETS_QUERY = gql`
  query bets ($ids: [ID], $perPage: Int) {
    bets (ids: $ids, perPage: $perPage) {
      collection {
        id
        status
        message
        betLegs {
          id
          oddId
        }
      }
    }
  }
`

export const BETSLIP_VALIDATE_COMBO_BETS_QUERY = gql`
  query validateComboBets($odds: [ID]) {
    validateComboBets(odds: $odds) {
      generalMessages
      odds {
        oddId
        valid
        errorMessages
      } 
    }
  }
`
