import gql from 'graphql-tag';

export const BETS_LIST_QUERY = gql`
query betsHistory ($kind: String = null, $page: Int, $perPage: Int) {
  bets (kind: $kind, page: $page, perPage: $perPage) {
    collection {
      id
      createdAt
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
        title {
          kind
        }
      }
    pagination {
      count
          items
          page
          pages
          offset
          last
          next
          prev
          from
          to
    }
  }
}
`
