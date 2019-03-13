<template>
  <category-tabs
    :tabs="tabs"
    v-model="activeTabIndex">
    <template slot-scope="{ tab }">
      <filter-tabs
        :title-id="tab.id"
        :tabs="tabsMapping"/>
    </template>
  </category-tabs>
</template>

<script>
import { TITLES_QUERY } from '@/graphql'
import { TITLE_CHANGED } from '@/constants/custom-events'
import FilterTabs from './FilterTabs'
import { UPCOMING_FOR_TIME } from '@/constants/graphql/event-context'
import { LIVE, UPCOMING } from '@/constants/graphql/event-start-statuses'
import { UPCOMING_FOR_TIME_TITLES_CONTEXT } from '@/constants/graphql/title-context'
import { findTitleIcon } from '@/helpers/icon-finder'

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
          context: UPCOMING_FOR_TIME_TITLES_CONTEXT
        }
      }
    }
  },
  data () {
    return {
      titles: [],
      activeTitleId: null,
      tabsMapping: [{
        id: LIVE,
        title: 'Live now',
        context: LIVE
      }, {
        id: UPCOMING,
        title: 'Upcoming',
        context: UPCOMING_FOR_TIME
      }]
    }
  },
  computed: {
    tabs () {
      return [
        { id: null, title: 'All', icon: 'sidemenu-game-icon' },
        ...this.titles.map((title) => {
          return { id: title.id, title: title.name, icon: findTitleIcon(title) }
        })
      ]
    },
    activeTabIndex: {
      get () {
        return this.activeTitleId
          ? this.tabs.findIndex(title => title.id === this.activeTitleId)
          : 0
      },
      set (tabIndex) {
        this.activeTitleId = this.tabs[tabIndex].id
      }
    }
  },
  created () {
    this.$root.$on(TITLE_CHANGED, titleId => { this.activeTitleId = titleId })
  }
}
</script>
