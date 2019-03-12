import gql from 'graphql-tag';

export const BETS_LIST_QUERY = gql`
query betsHistory ($kind: String = null, $page: Int, $per_page: Int) {
  bets (kind: $kind, page: $page, per_page: $per_page) {
    collection {
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
