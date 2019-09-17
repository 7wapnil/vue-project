<template>
  <div>
  <simple-tabs
    :tabs="tabs"
    @tab-changed="tab => $emit('tab-changed', tab)"/>
    <b-row>
      <b-col>

        <span>

          {{ eventContexts }}

        </span>



      </b-col>
    </b-row>

  </div>
</template>

<script>
import { UPCOMING_FOR_TIME, UPCOMING_UNLIMITED } from '@/constants/graphql/event-context'
import { LIVE, UPCOMING } from '@/constants/graphql/event-start-statuses'
import { EVENT_CONTEXTS } from '@/graphql/events'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'

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
      defaultTabIndex: 1,
      eventContexts: [],
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
        },
    }
  },
  computed: {
    computedTabs() {
      if (this.tabs && this.eventContexts) {
        let obj = this.tabs.find(tab => tab.context === 'live')
        let obj2 = this.eventContexts.find(tab => tab.context === 'live')
        let sum = {...obj, ...obj2}
      }
     }
  },
  mounted () {
    this.$emit('tab-changed', this.tabs[this.defaultTabIndex])
  }
}
</script>
