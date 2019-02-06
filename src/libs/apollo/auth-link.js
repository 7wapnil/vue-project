import { ApolloLink } from 'apollo-link'
import { fetchToken } from './helpers'

export default new ApolloLink((operation, forward) => {
  const headers = operation.getContext().headers || {}

  const token = fetchToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  operation.setContext({ headers: headers })

  return forward(operation)
})
