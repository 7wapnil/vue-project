<template>
  <simple-tabs
    :tabs="computedTabs"
    :selected-category="selectedCategory"
    @tab-changed="emitTabIndex"/>
</template>

<script>
import { UPCOMING_FOR_TIME, UPCOMING_UNLIMITED } from '@/constants/graphql/event-context'
import { LIVE, UPCOMING } from '@/constants/graphql/event-start-statuses'
import { EVENT_CONTEXTS } from '@/graphql/events'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { ESPORTS } from '@/constants/title-kinds'

export default {
  props: {
    upcomingContext: {
      type: [String, null],
      default: null
    },
    upcomingLabel: {
      type: Boolean,
      default: false
    },
    selectedCategory: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      eventContexts: [],
      tabs: [{
        id: 1,
        value: LIVE,
        label: this.$i18n.t('homePage.live'),
        context: LIVE
      }, {
        id: 2,
        value: UPCOMING,
        label: (this.upcomingLabel || this.$route.params.titleKind === ESPORTS) ? this.$i18n.t('homePage.upcomingCommon') : this.$i18n.t('homePage.upcoming'),
        context: this.upcomingContext || (this.$route.params.titleKind === ESPORTS ? UPCOMING_UNLIMITED : UPCOMING_FOR_TIME)
      }]
    }
  },
  apollo: {
    eventContexts: {
      query: EVENT_CONTEXTS,
      fetchPolicy: NETWORK_ONLY,
      variables () {
        return {
          titleKind: this.$route.params.titleKind,
          titleId: this.selectedCategory.value,
          contexts: this.tabs.map(({ context }) => context)
        }
      }
    }
  },
  computed: {
    computedTabs () {
      const tabs = this.tabs
      const eventContexts = this.eventContexts
      const visibleContexts = eventContexts.filter(obj => obj['show'] === true)
      const visibleContextsValues = visibleContexts.map(a => a.context)
      return tabs.filter(x => visibleContextsValues.includes(x.context))
    }
  },
  methods: {
    emitTabIndex (tab) {
      this.$emit('tab-changed', tab)
    }
  }
}
</script>
