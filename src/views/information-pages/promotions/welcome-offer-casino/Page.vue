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
      id: process.env.VUE_APP_CONTENTFUL_PROMOTIONS_PROMOTIONS_CASINO_ID
    }
  },
  metaInfo () {
    return {
      title: this.$i18n.t('meta.promotions.welcomeOfferCasino.title'),
      meta: [{ name: 'description', content: this.$i18n.t('meta.promotions.welcomeOfferCasino.description'), vmid: 'desc' }]
    }
  }
}
</script>
