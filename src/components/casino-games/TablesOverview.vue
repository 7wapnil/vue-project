<template>
  <b-row no-gutters>
    <b-col class="py-4">
      <loader v-if="$apollo.loading"/>
      <overview-play-items
        v-for="category in categories"
        :key="category.id"
        :category="category"
        :play-items="category.playItems"/>
    </b-col>
  </b-row>
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
            return {
              ...category,
              icon: findCategoryIcon({ context: category.context }),
              index: index + 1 // + 1 because of default category
            }
          })
        }
      }
    }
  }
}
</script>
