<template>
  <b-tabs
    :lazy="lazy"
    v-model="tabIndex"
    nav-wrapper-class="event-panel mx-4">
    <b-tab
      v-for="category in categories"
      :key="category.slug"
      :title="category.name"
      title-link-class="pb-4 px-4 pt-3 bg-arc-dropdown-divider">

      <markets-category
        :event="event"
        :category="category"/>

    </b-tab>
  </b-tabs>
</template>

<script>
import MARKETS_CATEGORIES from '@/constants/markets/categories'
import MarketsCategory from '@/components/markets/MarketCategory'

export default {
  components: {
    MarketsCategory
  },
  props: {
    event: {
      type: Object,
      required: true
    },
    queryOptions: {
      type: Object,
      default () { return {} }
    },
    activeIndex: {
      type: Number,
      default: 0
    },
    lazy: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tabIndex: this.activeIndex,
      categories: MARKETS_CATEGORIES.slice(0, 7)
    }
  }
}
</script>
