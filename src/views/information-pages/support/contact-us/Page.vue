<template>
  <static-content :contentful-id="id"/>
</template>

<script>
import StaticContent from '@/views/layouts/information-page/StaticContent'

export default {
  components: { StaticContent },
  data () {
    return {
      id: process.env.VUE_APP_CONTENTFUL_SUPPORT_CONTACT_US_ID
    }
  },
  metaInfo () {
    return {
      title: this.$i18n.t('meta.support.contact.title'),
      meta: [{ name: 'description', content: this.$i18n.t('meta.support.contact.description'), vmid: 'desc' }]
    }
  }
}
</script>
