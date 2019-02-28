import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { from } from 'apollo-link'
import cache from './cache'

const contentful = new ApolloClient({
  link: from([new HttpLink({
    uri: `${process.env.VUE_APP_CONTENTFUL_API_URL}${process.env.VUE_APP_CONTENTFUL_SPACE_ID}`,
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN}`
    }
  })]),
  cache,
  connectToDevTools: true
})

export default contentful
