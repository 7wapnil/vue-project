<template>
  <static-content :contentful-id="id"/>
</template>

<script>
import { buildDefaultMetaTags } from '@/helpers/meta'
import StaticContent from '@/views/layouts/information-page/StaticContent'

export default {
  components: { StaticContent },
  data () {
    return {
      id: process.env.VUE_APP_CONTENTFUL_SUPPORT_CONTACT_US_ID
    }
  },
  metaInfo () {
    return buildDefaultMetaTags({
      title: this.$i18n.t('meta.support.contact.title'),
      description: this.$i18n.t('meta.support.contact.description'),
      i18n: this.$i18n,
      siteUrl: window.location.href
    })
  }
}
</script>
