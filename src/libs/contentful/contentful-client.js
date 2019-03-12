import * as Contentful from 'contentful'

let client = null

const ContentfulPlugin = {
  install (Vue, options) {
    client = Contentful.createClient({
      space: options.space,
      accessToken: options.accessToken
    });
    Vue.$contentful = client
    Vue.prototype.$contentful = client
  }
}

export default ContentfulPlugin
