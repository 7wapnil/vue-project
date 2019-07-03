<template>
  <div>
    <static-content :contentful-id="id"/>
  </div>
</template>

<script>
import StaticContent from '@/views/layouts/information-page/StaticContent'

export default {
  components: { StaticContent },
  data () {
    return {
      id: process.env.VUE_APP_CONTENTFUL_SUPPORT_FAQ_ID
    }
  },
  metaInfo () {
    return {
      title: this.$i18n.t('meta.support.faq.title'),
      meta: [{ name: 'description', content: this.$i18n.t('meta.support.faq.description'), vmid: 'desc' }]
    }
  }
}
</script>
