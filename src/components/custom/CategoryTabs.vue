<template>
  <b-tabs
    :lazy="lazy"
    v-model="tabIndex"
    content-class="p-0 m-0"
    class="category-tabs"
    nav-wrapper-class="category-tabs-wrapper"
    nav-class="category-tabs-nav mx-2 mx-md-5 no-scrollbars">
    <b-tab
      v-for="tab in tabs"
      :key="tab.value"
      no-body
      title-link-class="category-tab px-4 py-3">
      <template #title>
        <b-row no-gutters>
          <b-col>
            <icon
              :name="tab.icon"
              color="arc-clr-iron"
              size="24px"/>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col>
            <span class="font-size-12 text-arc-clr-iron-light line-height-14">
              {{ tab.label }}
            </span>
          </b-col>
        </b-row>
      </template>
    </b-tab>

    <template
      v-if="!isMobile"
      #tabs>
      <b-nav-item
        v-if="categoryTabIndex !== tabs.length - 1"
        class="right-side-navigation"
        @click="moveTab('right')">
        <icon
          class="category-tab"
          name="chevron-right"/>
      </b-nav-item>
      <b-nav-item
        v-if="categoryTabIndex > 0"
        class="left-side-navigation"
        @click="moveTab('left')">
        <icon name="chevron-left"/>
      </b-nav-item>
    </template>
  </b-tabs>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default () { return [] }
    },
    value: {
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
      categoryTabIndex: 0
    }
  },
  computed: {
    tabIndex: {
      get () {
        return this.categoryTabIndex
      },
      set (value) {
        this.categoryTabIndex = value
        const tab = this.tabs[this.categoryTabIndex]
        if (tab) {
          this.$emit('tab-changed', tab)
        }
      }
    }
  },
  created () {
    if (this.$route.params.titleKind) {
      this.tabIndex = this.tabs.findIndex((tab) => tab.value === this.$route.params.titleId) || 0
    }
  },
  methods: {
    moveTab (side) {
      let content = document.querySelector('.category-tabs-nav')
      let step = document.getElementsByClassName('category-tab active')[0].clientWidth
      if (side === 'right') {
        content.scrollLeft += step
        this.categoryTabIndex++
      } else {
        content.scrollLeft -= step
        this.categoryTabIndex--
      }
    }
  }
}
</script>
