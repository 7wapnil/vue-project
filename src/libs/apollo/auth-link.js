import { ApolloLink } from 'apollo-link'
import arcanebetSession from '@/services/local-storage/session'

export default new ApolloLink((operation, forward) => {
  const headers = operation.getContext().headers || {}

  const sessionExists = arcanebetSession.getSession()
  if (sessionExists !== null) {
    const token = arcanebetSession.getSession().token
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }
  operation.setContext({ headers: headers })

  return forward(operation)
})
