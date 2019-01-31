import gql from 'graphql-tag';

export const BETS_LIST_QUERY = gql`
query betsHistory ($kind: String = null) {
  bets (kind: $kind) {
    id
    created_at
    amount
    oddValue
    status
    market {
      id
      name
    }
    event {
      id
      name
    }
  }
}
`
