<template>
  <simple-tabs
    :tabs="tabs"
    @tab-changed="tab => $emit('tab-changed', tab)"/>
</template>

<script>
import { UPCOMING_FOR_TIME, UPCOMING_UNLIMITED } from '@/constants/graphql/event-context'
import { LIVE, UPCOMING } from '@/constants/graphql/event-start-statuses'

export default {
  props: {
    upcomingContext: {
      type: [String, null],
      default: null
    },
    upcomingLabel: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      defaultTabIndex: 1,
      tabs: [{
        value: LIVE,
        label: this.$i18n.t('homePage.live'),
        context: LIVE
      }, {
        value: UPCOMING,
        label: (this.upcomingLabel || this.$route.params.titleKind === 'esports') ? this.$i18n.t('homePage.upcomingCommon') : this.$i18n.t('homePage.upcoming'),
        context: this.upcomingContext || (this.$route.params.titleKind === 'esports' ? UPCOMING_UNLIMITED : UPCOMING_FOR_TIME)
      }]
    }
  },
  mounted () {
    this.$emit('tab-changed', this.tabs[this.defaultTabIndex])
  }
}
</script>
