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
      :title="category.name"
      @click="categoryChange(category)"/>
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
      tabIndex: this.activeIndex
    }
  },
  computed: {
    categories () {
      return this.event.categories
    }
  },
  methods: {
    categoryChange (category) {
      this.$emit('change-category', category)
    }
  }
}
</script>
