<template>
  <div>
    <static-content
      :items="tableOfContentItems"
      :contentful-id="id"/>
  </div>
</template>

<script>
import StaticContent from '@/views/layouts/information-page/StaticContent'

export default {
  components: { StaticContent },
  data () {
    return {
      id: process.env.VUE_APP_CONTENTFUL_SUPPORT_TERMS_AND_CONDITIONS_ID
    }
  },
  metaInfo () {
    return {
      title: this.$i18n.t('meta.support.terms.title'),
      meta: [{ name: 'description', content: this.$i18n.t('meta.support.terms.description'), vmid: 'desc' }]
    }
  }
}
</script>
