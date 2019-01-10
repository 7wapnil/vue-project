<template>
  <b-tabs lazy>
    <b-tab
      v-for="category in categories"
      :key="category.slug"
      :title="category.name"
      title-link-class="p-2 border border-arc-clr-gold-light border-bottom-0 font-weight-bold">

      <markets-category
        :event="event"
        :category="category"/>

    </b-tab>
  </b-tabs>
</template>
<script>
import MARKETS_CATEGORIES from '@/constants/markets/categories'
import MarketsCategory from './MarketCategory'

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
    }
  },
  data () {
    return {
      categories: MARKETS_CATEGORIES
    }
  }
}
</script>
