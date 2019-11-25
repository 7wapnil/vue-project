<template>
  <div class="header-category-tabs">
    <category-tabs
      :tabs="tabs"
      :arrows="false"
      :position="currentTabIndex"
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
          variables: {
            device: this.deviceType()
          },
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
  props: {
    currentTab: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      categories: []
    }
  },
  computed: {
    tabs () {
      return this.categories.map((tab, index) => {
        return { ...tab, icon: findCategoryIcon(tab), index: index }
      })
    },
    currentTabIndex () {
      if (this.currentTab) return this.currentTab.index

      return 0
    }
  },
  methods: {
    deviceType () {
      return this.isDesktop ? 'desktop' : 'mobile'
    }
  },
}
</script>
