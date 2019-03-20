import gql from 'graphql-tag'

export const PAYMENT_METHODS_QUERY = gql`
    query paymentMethods {
      paymentMethods {
        code
        name
        type
        fields {
          code
          name
          type
        }
      }
    }
`
