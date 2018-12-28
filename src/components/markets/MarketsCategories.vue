<template>
  <b-tabs>
    <b-tab
      v-for="category in categories"
      :key="category.slug"
      :title="category.name"
      title-link-class="p-2 border border-arc-clr-gold-light border-bottom-0 font-weight-bold">

      <markets-list
        :event="event"
        :query-options="getQueryOptionsWithCategory(category.slug)" />

    </b-tab>
  </b-tabs>
</template>
<script>
import MarketsList from './MarketsList'
import MARKETS_CATEGORIES from '@/constants/markets/categories'

export default {
  components: {
    MarketsList,
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
  },
  methods: {
    getQueryOptionsWithCategory (category) {
      return {
        ...this.queryOptions,
        category
      }
    }
  }
}
</script>
