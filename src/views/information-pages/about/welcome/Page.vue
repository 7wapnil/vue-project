<template>
  <div>
    <static-content :contentful-id="id"/>
  </div>
</template>

<script>
import { buildDefaultMetaTags } from '@/helpers/meta'
import StaticContent from '@/views/layouts/information-page/StaticContent'

export default {
  components: { StaticContent },
  data () {
    return {
      id: process.env.VUE_APP_CONTENTFUL_ABOUT_WELCOME_ID
    }
  },
  metaInfo () {
    if (!this.$i18n) return

    return buildDefaultMetaTags({
      title: this.$i18n.t('meta.about.welcome.title'),
      description: this.$i18n.t('meta.about.welcome.description'),
      i18n: this.$i18n,
      siteUrl: window.location.href
    })
  }
}
</script>
