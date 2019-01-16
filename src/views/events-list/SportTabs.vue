<template>
  <category-tabs :tabs="tabs">
    <template slot-scope="{ tab }">
      <filter-tabs :title-id="tab.id"/>
    </template>
  </category-tabs>
</template>

<script>
import { TITLES_QUERY } from '@/graphql'
import FilterTabs from './FilterTabs'

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
      titles: []
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
    }
  }
}
</script>
