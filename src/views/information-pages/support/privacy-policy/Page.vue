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
      id: process.env.VUE_APP_CONTENTFUL_SUPPORT_PRIVACY_POLICY_ID
    }
  },
  metaInfo () {
    return buildDefaultMetaTags({
      title: this.$i18n.t('meta.support.privacyPolicy.title'),
      description: this.$i18n.t('meta.support.privacyPolicy.description'),
      i18n: this.$i18n,
      siteUrl: window.location.href
    })
  }
}
</script>
