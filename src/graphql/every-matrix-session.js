import gql from 'graphql-tag'
import { EVERY_MATRIX_SESSION_FIELDS } from './fields'

export const CREATE_EVERY_MATRIX_SESSION_MUTATION = gql`
mutation ($walletId: Int!) {
  createEveryMatrixSession(walletId: $walletId) {
    ${EVERY_MATRIX_SESSION_FIELDS}
  }
}
`
