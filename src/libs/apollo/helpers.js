import arcanebetSession from '@/services/local-storage/session'

export const fetchToken = () => {
  const session = arcanebetSession.getSession()
  if (session === null) { return null }

  const token = session.token
  if (!token) { return null }

  return token
}
