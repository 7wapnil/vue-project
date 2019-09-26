<template>
  <div
    v-if="moreThanOneCategory"
    class="pt-3">
    <b-tabs
      :nav-wrapper-class="tabsClass"
      :content-class="contentClass"
      :nav-class="navClass"
      :justified="justified"
      v-model="tabIndex"
      :lazy="lazy"
      :style="{ 'margin': isMobile ? '0' : '0 58px' }">

      <b-tab
        v-for="(category, index) in categories"
        :key="index"
        :title-link-class="titleClass"
        :title="category.name"/>

      <template
        v-if="!isMobile"
        #tabs>
        <b-nav-item

          class="event-tabs-left-side-navigation position-absolute ml-4 mr-4"
          @click="moveTab('left')">
          <icon name="chevron-left"/>
        </b-nav-item>
        <b-nav-item
          class="event-tabs-right-side-navigation position-absolute mr-4"
          @click="moveTab('right')">
          <icon name="chevron-right"/>
        </b-nav-item>
      </template>
    </b-tabs>
  </div>
</template>
<script>
import MarketsCategory from './MarketCategory'
import { CATEGORY_CHANGED } from '@/constants/custom-events'

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
    },
    justified: {
      type: Boolean,
      default: false
    },
    navClass: {
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
    moreThanOneCategory () {
      return this.event.categories.length > 1
    },
    tabIndex: {
      get () {
        return this.currentTabIndex
      },
      set (value) {
        this.currentTabIndex = value
        const category = this.categories[this.currentTabIndex]
        if (category) {
          this.$emit(CATEGORY_CHANGED, category)
        }
      }
    }
  },
  created () {
    this.tabIndex = this.activeIndex
    if (this.moreThanOneCategory) {
      this.$emit('update:twitch:size', this.moreThanOneCategory)
    }
  },
  methods: {
    moveTab (side) {
      let content = document.querySelector('.event-panel-tabs-nav')
      let step = document.getElementsByClassName('active event-panel-titles')[0].clientWidth
      if (side === 'right') {
        content.scrollLeft += step
        this.tabIndex++
      } else {
        content.scrollLeft -= step
        this.tabIndex--
      }
    }
  }
}
</script>
