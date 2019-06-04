import { InMemoryCache } from 'apollo-cache-inmemory'
import { toIdValue } from 'apollo-utilities'

const dataIdFromObject = object => {
  switch (object.__typename) {
    case 'WithdrawalsPaymentMethod' :
    case 'DepositsPaymentMethod' : return `${object.__typename}:${object.code}`
    default: return `${object.__typename}:${object.id}`
  }
}

export default new InMemoryCache({
  cacheRedirects: {
    Query: {
      event: (root, { id }) => toIdValue(dataIdFromObject({ __typename: 'Event', id })),
      market: (root, { id }) => toIdValue(dataIdFromObject({ __typename: 'Market', id })),
      odd: (root, { id }) => toIdValue(dataIdFromObject({ __typename: 'Odd', id }))
    }
  },
  dataIdFromObject
})
