import gql from 'graphql-tag'
import { PAGINATION_FIELDS, EVERY_MATRIX_TRANSACTION_FIELDS } from './fields'

export const EVERY_MATRIX_TRANSACTIONS_LIST_QUERY = gql`
  query everyMatrixTransactions($page: Int, $perPage: Int) {
    everyMatrixTransactions(page: $page, perPage: $perPage) {
      collection {
        ${EVERY_MATRIX_TRANSACTION_FIELDS}
      }
      pagination {
        ${PAGINATION_FIELDS}
      }
    }
  }
`
