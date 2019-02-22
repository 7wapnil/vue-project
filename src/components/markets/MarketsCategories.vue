<template>
  <b-tabs
    :nav-wrapper-class="tabsClass"
    :content-class="contentClass"
    v-model="tabIndex"
    :lazy="lazy">
    <b-tab
      v-for="category in categories"
      :key="category.slug"
      :title-link-class="titleClass"
      :title="category.name">
      <markets-category
        :event="event"
        :category="category">
        <template slot-scope="{ markets }">
          <slot :markets="markets"/>
        </template>
      </markets-category>

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
    },
    titleClass: {
      type: String,
      default: ''
    },
    tabsClass: {
      type: String,
      default: ''
    },
    activeIndex: {
      type: Number,
      default: 0
    },
    lazy: {
      type: Boolean,
      default: true
    },
    numberOfTabs: {
      type: Number,
      default: 7
    },
    contentClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      tabIndex: this.activeIndex,
      categories: MARKETS_CATEGORIES.slice(0, this.numberOfTabs)
    }
  }
}
</script>
