<template>
  <simple-tabs
    :tabs="tabs"
    @tab-changed="tab => $emit('tab-changed', tab)"/>
</template>

<script>
import { UPCOMING_FOR_TIME } from '@/constants/graphql/event-context'
import { LIVE, UPCOMING } from '@/constants/graphql/event-start-statuses'

export default {
  data () {
    return {
      default_tab_index: 1,
      tabs: [{
        value: LIVE,
        label: this.$i18n.t('homePage.live'),
        context: LIVE
      }, {
        value: UPCOMING,
        label: this.$i18n.t('homePage.upcoming'),
        context: UPCOMING_FOR_TIME
      }]
    }
  },
  mounted () {
    this.$emit('tab-changed', this.tabs[this.default_tab_index])
  }
}
</script>
