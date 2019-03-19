import gql from 'graphql-tag';

export const TRANSACTION_LIST_QUERY = gql`
query transactions ($filter: String!,  $page: Int, $per_page: Int) {
  transactions (filter: $filter, page: $page, per_page: $per_page) {
    collection {
      id
      customer_id
      created_at
      amount
      comment
      status
      currencyCode
      updated_at
      mode
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
