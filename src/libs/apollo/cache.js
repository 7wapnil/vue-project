import { InMemoryCache } from 'apollo-cache-inmemory'
import { toIdValue } from 'apollo-utilities'
import fragmentMatcher from './fragment-matcher'

const dataIdFromObject = object => {
  switch (object.__typename) {
    case 'DepositsPaymentMethod' : return `${object.__typename}:${object.code}`
    case 'EventContext' : return `${object.__typename}:${object.context}`
    case 'OddValidation' : return `${object.__typename}:${object.oddId}`
    default: return `${object.__typename}:${object.id}`
  }
}

export default new InMemoryCache({
  fragmentMatcher,
  cacheRedirects: {
    Query: {
      event: (root, { id }) => toIdValue(dataIdFromObject({ __typename: 'Event', id })),
      market: (root, { id }) => toIdValue(dataIdFromObject({ __typename: 'Market', id })),
      odd: (root, { id }) => toIdValue(dataIdFromObject({ __typename: 'Odd', id }))
    }
  },
  dataIdFromObject
})
