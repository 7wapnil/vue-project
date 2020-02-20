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
      :key="tab.id"
      no-body
      title-link-class="category-tab px-4 py-3"
      @click="changeUrl(tab)">
      <template #title>
        <category-tab-body
          :tab="tab"
          @rendered="onTabRendered"/>
      </template>
    </b-tab>

    <template
      v-if="!isMobile"
      #tabs>
      <b-nav-item
        v-if="tabIndex !== tabs.length - 1"
        class="right-side-navigation"
        @click="moveTab('right')">
        <icon
          class="category-tab"
          name="chevron-right"/>
      </b-nav-item>
      <b-nav-item
        v-if="tabIndex > 0"
        class="left-side-navigation"
        @click="moveTab('left')">
        <icon name="chevron-left"/>
      </b-nav-item>
    </template>
  </b-tabs>
</template>

<script>
import CategoryTabBody from './CategoryTabBody'

export default {
  components: {
    CategoryTabBody
  },
  props: {
    tabs: {
      type: Array,
      default () { return [] }
    },
    position: {
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
      categoryTabIndex: this.position,
      renderedTabsCount: 0
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

        if (tab) this.$emit('tab-changed', tab)
      }
    }
  },
  watch: {
    position (tab) {
      this.tabIndex = tab
    },
    tabs (_list, oldList) {
      this.renderedTabsCount = oldList.length
    }
  },
  methods: {
    moveTab (side) {
      let content = document.querySelector('.category-tabs-nav')
      let step = document.getElementsByClassName('category-tab active')[0].clientWidth

      if (side === 'right') {
        content.scrollLeft += step
        this.tabIndex++
      } else {
        content.scrollLeft -= step
        this.tabIndex--
      }

      this.changeUrl(this.tabs[this.tabIndex])
    },
    onTabRendered () {
      this.renderedTabsCount++

      if (this.renderedTabsCount === this.tabs.length) {
        this.tabIndex = this.position
      }
    },
    changeUrl (tab) {
      if (tab.slug) {
        this.$router.push({
          name: `${this.$route.params.titleKind}-title`,
          params: {
            titleKind: this.$route.params.titleKind,
            titleSlug: tab.slug
          }
        })
      } else {
        this.$router.push({ name: this.$route.params.titleKind })
      }
    }
  }
}
</script>
