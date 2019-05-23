import gql from 'graphql-tag'

export const BETSLIP_PLACEMENT_QUERY = gql`
  mutation placeBets($bets: [BetInput]) {
    placeBets(bets: $bets) {
      id
      success
      message
      bet {
        id
        status
      }
    }
  }
`

export const BETSLIP_BETS_QUERY = gql`
  query bets ($ids: [ID], $per_page: Int) {
    bets (ids: $ids, per_page: $per_page) {
      collection {
        id
        status
        message
        odd {
          id
        }
      }
    }
  }
`
