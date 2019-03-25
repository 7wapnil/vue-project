import gql from 'graphql-tag'

export const WITHDRAW_MUTATION = gql`
        mutation withdraw($amount: Float!, $walletId: ID!, $payment_method: String!, $payment_details: [PaymentMethodDetail]) {
          withdraw(amount: $amount, walletId: $walletId, payment_method: $payment_method, payment_details: $payment_details ) {
            amount
            currency_id
            customer_id
            error_messages
            id
            initiator_id
            initiator_type
            kind
            mode
            status
          }
        }
      `
