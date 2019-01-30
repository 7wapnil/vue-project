<template>
  <category-tabs
    :tabs="tabs"
    v-model="activeTabIndex">
    <template slot-scope="{ tab }">
      <filter-tabs
        :title-id="tab.id"
        :context="context"/>
    </template>
  </category-tabs>
</template>

<script>
import { TITLES_QUERY } from '@/graphql'
import PubSub from '@/services/pub-sub'
import { TITLE_CHANGED } from '@/constants/pubsub-channels'
import FilterTabs from './FilterTabs'
import { UPCOMING_FOR_TIME } from '@/constants/graphql/event-context'

export default {
  components: {
    FilterTabs
  },
  apollo: {
    titles () {
      return {
        query: TITLES_QUERY,
        variables: {
          kind: this.$route.params.titleKind
        }
      }
    }
  },
  data () {
    return {
      titles: [],
      context: UPCOMING_FOR_TIME,
      activeTitleId: null
    }
  },
  computed: {
    tabs () {
      /**
       * @todo Need to define algorithm of icon selection depends on sport
       */
      return [
        { id: null, title: 'All', icon: 'sidemenu-game-icon' },
        ...this.titles.map((title) => {
          return { id: title.id, title: title.name, icon: 'sidemenu-game-icon' }
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
    PubSub.subscribe(TITLE_CHANGED, titleId => { this.activeTitleId = titleId })
  }
}
</script>
