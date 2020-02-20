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
            kind: this.currentLobbyName,
            context: this.currentLobbyName === ESPORTS ? UPCOMING : UPCOMING_FOR_TIME_TITLES_CONTEXT
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
  watch: {
    titles: 'watchTitles'
  },
  created () {
    this.$root.$on(TITLE_CHANGED, (titleId) => {
      const tabIndexToShow = this.tabs.findIndex(t => t.value === titleId)
      if (tabIndexToShow > -1) {
        this.activeTabIndex = tabIndexToShow
      }
    })
  },
  methods: {
    watchTitles (val) {
      const { titleSlug } = this.$route.params
      if (val.length > 0 && this.currentLobbyName === 'sports' && !titleSlug) {
        this.$router.push({
          name: `${this.currentLobbyName}-title`,
          params: {
            titleKind: this.currentLobbyName,
            titleSlug: val[0].slug
          }
        })
        this.$emit('tab-changed', { ...val[0], label: val[0].name })
      }
    }
  }
}
</script>
