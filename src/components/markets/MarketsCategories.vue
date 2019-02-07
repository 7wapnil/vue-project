<template>
  <markets-category
    :event="event"
    :category="category"/>
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
