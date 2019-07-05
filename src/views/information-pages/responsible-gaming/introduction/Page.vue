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
      id: process.env.VUE_APP_CONTENTFUL_RESPONSIBLE_INTRODUCTION_ID
    }
  },
  metaInfo () {
    return {
      title: this.$i18n.t('meta.responsibleGaming.introduction.title'),
      meta: [{ name: 'description', content: this.$i18n.t('meta.responsibleGaming.introduction.description'), vmid: 'desc' }]
    }
  }
}
</script>
