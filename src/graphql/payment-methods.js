import gql from 'graphql-tag'

export const PAYMENT_METHODS_QUERY = gql`
    query paymentMethods {
      paymentMethods {
        availability
        code
        name
        type
        payment_note
        fields {
          code
          name
          type
        }
      }
    }
`
