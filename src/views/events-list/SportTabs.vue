<template>
  <category-tabs
    :tabs="tabs"
    :position="activeTabIndex"
    @tab-changed="tab => $emit('tab-changed', tab)"/>
</template>

<script>
import { TITLES_QUERY } from '@/graphql'
import { TITLE_CHANGED } from '@/constants/custom-events'
import FilterTabs from './FilterTabs'
import { UPCOMING, UPCOMING_FOR_TIME_TITLES_CONTEXT } from '@/constants/graphql/title-context'
import { buildTitleTag } from '@/helpers/titles'
import { ESPORTS } from '@/constants/title-kinds'

export default {
  components: {
    FilterTabs
  },
  apollo: {
    titles () {
      return {
        query: TITLES_QUERY,
        variables () {
          return {
            kind: this.$route.params.titleKind,
            context: this.$route.params.titleKind === ESPORTS ? UPCOMING : UPCOMING_FOR_TIME_TITLES_CONTEXT
          }
        },
        result () {
          if (this.$route.params.titleSlug) {
            const tabIndexToShow = this.tabs.findIndex(tab => tab.slug === this.$route.params.titleSlug)

            if (tabIndexToShow > -1) this.activeTabIndex = tabIndexToShow
          }
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
      let data = this.titles.map(buildTitleTag)

      if (this.isKindEsport) {
        data.unshift({ id: null, slug: null, label: 'All', icon: 'arcanebet-default-icon' })
      }

      return data
    }
  },
  created () {
    this.$root.$on(TITLE_CHANGED, this.setActiveTabById)
  },
  methods: {
    setActiveTabById (titleId) {
      const tabIndexToShow = this.tabs.findIndex(tab => tab.id === titleId)

      if (tabIndexToShow > -1) this.activeTabIndex = tabIndexToShow
    }
  }
}
</script>
