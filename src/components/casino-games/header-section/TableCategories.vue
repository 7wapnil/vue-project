<template>
  <div class="header-category-tabs">
    <category-tabs
      :tabs="tabs"
      :arrows="false"
      v-model="activeTabIndex"
      @tab-changed="tab => $emit('tab-changed', tab)"/>
  </div>
</template>

<script>
import { TABLES_CATEGORIES_QUERY, TABLE_CATEGORIES_UPDATED } from '@/graphql'
import { findCategoryIcon } from '@/helpers/icon-finder'
import { updateCacheList } from '@/helpers/graphql'

export default {
  apollo: {
    categories () {
      return {
        query: TABLES_CATEGORIES_QUERY,
        result ({ data }) {
          this.categories = data.categories
        },
        subscribeToMore: {
          document: TABLE_CATEGORIES_UPDATED,
          updateQuery: (currentCategories, { subscriptionData: { data } }) => {
            return {
              categories: updateCacheList(currentCategories.categories, data.categoriesUpdated)
                .sort((a, b) => (a.position > b.position) ? 1 : -1)
            }
          }
        }
      }
    }
  },
  data () {
    return {
      activeTabIndex: 0,
      categories: []
    }
  },
  computed: {
    tabs () {
      return this.categories.map((tab) => {
        return { ...tab, icon: findCategoryIcon(tab) }
      })
    }
  }
}
</script>
