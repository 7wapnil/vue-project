<template>
  <b-tabs
    :nav-wrapper-class="tabsClass"
    :content-class="contentClass"
    v-model="tabIndex"
    :lazy="lazy">
    <b-tab
      v-for="(category, index) in categories"
      :key="index"
      :title-link-class="titleClass"
      :title="category.name"/>
  </b-tabs>
</template>
<script>
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
    contentClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentTabIndex: 0
    }
  },
  computed: {
    categories () {
      return this.event.categories
    },
    tabIndex: {
      get () {
        return this.currentTabIndex
      },
      set (value) {
        this.currentTabIndex = value
        const category = this.categories[this.currentTabIndex]
        if (category) {
          this.$emit('change-category', category)
        }
      }
    }
  },
  created () {
    this.tabIndex = this.activeIndex
  }
}
</script>
