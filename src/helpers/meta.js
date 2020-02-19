const ROBOTS_DEFAULT = 'index,follow'

export const buildDefaultMetaTags = (params) => {
  return {
    title: params.title,
    meta: [
      { name: 'description', content: params.description, vmid: 'desc' },
      { 'http-equiv': 'content-language', content: params.i18n.t('localeName') },
      { name: 'robots', content: params.robots || ROBOTS_DEFAULT },
      { itemprop: 'name', content: params.title },
      { itemprop: 'description', content: params.description },
      { property: 'og:title', content: params.title },
      { property: 'og:description', content: params.description },
      { property: 'og:url', content: params.siteUrl },
      { property: 'og:locale', content: params.i18n.t('localeName') },
      { property: 'og:site_name', content: params.i18n.t('meta.defaultTags.siteName') },
      { property: 'twitter:title', content: params.title },
      { property: 'twitter:description', content: params.description },
      { property: 'twitter:site', content: params.siteUrl }
    ],
    link: [
      { rel: 'canonical', href: params.siteUrl }
    ]
  }
}
