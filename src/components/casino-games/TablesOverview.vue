<template>
  <div class="casino-games-list">
    <overview-play-items
      v-for="(category, index) in categories"
      :key="index"
      :category="category"
      :play-items="category.playItems"
      @tab-changed="tab => $emit('tab-changed', tab)"/>
  </div>
</template>

<script>
import OverviewPlayItems from '@/components/casino-games/play-items-list/OverviewPlayItems'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { TABLES_OVERVIEW_QUERY } from '@/graphql'
import { findCategoryIcon } from '@/helpers/icon-finder'

export default {
  components: {
    OverviewPlayItems
  },
  data () {
    return {
      categories: [],
    }
  },
  apollo: {
    tablesOverview () {
      return {
        query: TABLES_OVERVIEW_QUERY,
        fetchPolicy: NETWORK_ONLY,
        result ({ data: { tablesOverview } }) {
          this.categories = tablesOverview.map((category, index) => {
            return { ...category, icon: findCategoryIcon(category), index: index + 1 } // + 1 because of default category
          })
        }
      }
    }
  }
}
</script>