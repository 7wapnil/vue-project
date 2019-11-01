<template>
  <category-tabs
    :tabs="tabs"
    v-model="activeTabIndex"
    @tab-changed="tab => $emit('tab-changed', tab)"/>
</template>

<script>
import { TITLES_QUERY } from '@/graphql'
import { TITLE_CHANGED } from '@/constants/custom-events'
import FilterTabs from './FilterTabs'
import { UPCOMING, UPCOMING_FOR_TIME_TITLES_CONTEXT } from '@/constants/graphql/title-context'
import { findTitleIcon } from '@/helpers/icon-finder'
import { getTitleShortName } from '@/helpers/title-names'

const POLL_INTERVAL = 10000

export default {
  components: {
    FilterTabs
  },
  apollo: {
    titles () {
      return {
        query: TITLES_QUERY,
        variables: {
          kind: this.$route.params.titleKind,
          context: this.$route.params.titleKind === 'esports' ? UPCOMING : UPCOMING_FOR_TIME_TITLES_CONTEXT
        },
        pollInterval: POLL_INTERVAL
      }
    }
  },
  data () {
    return {
      titles: [],
      activeTabIndex: 0
    }
  },
  computed: {
    tabs () {
      let data = [
        ...this.titles.map((title) => {
          return { value: title.id, label: getTitleShortName(title), icon: findTitleIcon(title) }
        })
      ]

      if (this.isKindEsport) {
        data.unshift({ value: null, label: 'All', icon: 'arcanebet-default-icon' })
      }

      return data
    }
  },
  created () {
    this.$root.$on(TITLE_CHANGED, (titleId) => {
      const tabIndexToShow = this.tabs.findIndex(t => t.value === titleId)
      if (tabIndexToShow > -1) {
        this.activeTabIndex = tabIndexToShow
      }
    })
  }
}
</script>
