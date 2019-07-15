import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'UNION',
          name: 'PaymentsWithdrawalsPaymentMethodDetails',
          possibleTypes: [
            { name: 'PaymentMethodBitcoin' },
            { name: 'PaymentMethodCreditCard' },
            { name: 'PaymentMethodSkrill' },
            { name: 'PaymentMethodNeteller' }
          ]
        }
      ]
    }
  }
})

export default fragmentMatcher
