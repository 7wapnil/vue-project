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
import { GAMES_CATEGORIES_QUERY, GAME_CATEGORIES_UPDATED } from '@/graphql'
import { findCategoryIcon } from '@/helpers/icon-finder'
import { updateCacheList } from '@/helpers/graphql'

export default {
  apollo: {
    categories () {
      return {
        query: GAMES_CATEGORIES_QUERY,
        result ({ data }) {
          this.categories = data.categories
        },
        subscribeToMore: {
          document: GAME_CATEGORIES_UPDATED,
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
      categories: [],
      defaultTab: {
        position: 0,
        label: 'Popular',
        context: 'default'
      }
    }
  },
  computed: {
    tabs () {
      let tabs = this.categories.map((tab, index) => {
        return { ...tab, icon: findCategoryIcon(tab), index: index + 1 } // + 1 because of default category
      })

      return [{ ...this.defaultTab, icon: findCategoryIcon(this.defaultTab) }, ...tabs]
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
