import * as Contentful from 'contentful'

let client = null

const ContentfulPlugin = {
  install (Vue, options) {
    client = Contentful.createClient({
      space: `${process.env.VUE_APP_CONTENTFUL_SPACE_ID}`,
      accessToken: `${process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN}`
    });
    Vue.$contentful = client
    Vue.prototype.$contentful = client
  }
}

export default ContentfulPlugin
