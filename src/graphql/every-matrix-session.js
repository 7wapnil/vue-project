import gql from 'graphql-tag'
import { EVERY_MATRIX_SESSION_FIELDS } from './fields'

export const CREATE_EVERY_MATRIX_SESSION_MUTATION = gql`
  mutation ($walletId: Int, $playItemId: String!) {
    createEveryMatrixSession(walletId: $walletId, playItemId: $playItemId) {
      ${EVERY_MATRIX_SESSION_FIELDS}
    }
  }
`
