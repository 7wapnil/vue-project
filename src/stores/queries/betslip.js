import gql from 'graphql-tag'

export const BETSLIP_PLACEMENT_QUERY = gql`
        mutation placeBets($bets: [BetInput]) {
          placeBets(bets: $bets) {
            id
            status
            message
            odd {
              id
            }
          }
        }
      `
