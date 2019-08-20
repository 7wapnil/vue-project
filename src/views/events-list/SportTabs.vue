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
      activeTabIndex: 0
    }
  },
  computed: {
    tabs () {
      return [
        { value: null, label: 'All', icon: 'arcanebet-default-icon' },
        ...this.titles.map((title) => {
          return { value: title.id, label: title.shortName, icon: findTitleIcon(title) }
        })
      ]
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
