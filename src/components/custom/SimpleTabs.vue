<template>
  <b-tabs
    v-if="tabs.length"
    :value="currentTabIndex"
    @input="changeTabIndex"
    nav-class="bg-arc-clr-soil-light-cover"
    nav-wrapper-class="px-0 px-md-4 sorting-panel bg-arc-clr-soil-light">

    <b-tab
      v-for="tab in tabs"
      :key="tab.id"
      title-link-class="mx-4 py-4 px-2 px-md-4 bg-transparent">

      <template slot="title">
        <b-row no-gutters>
          <b-col class="d-flex justify-content-center align-items-center">
            <h5 class="m-0">
              {{ tab.label }}
            </h5>
          </b-col>
        </b-row>
      </template>

      <slot :tab="tab"/>

    </b-tab>
  </b-tabs>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: []
    },
    selectedCategory: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      currentTabIndex: 0
    }
  },
  watch: {
    tabs: {
      handler: 'setTabIndex',
      immediate: true
    }
  },
  methods: {
    tabsOrder () {
      return this.tabsAmount === 1 ? 0 : 1
    },
    tabsAmount () {
      return this.tabs.length
    },
    setTabIndex () {
      this.changeTabIndex(this.tabsOrder())
    },
    changeTabIndex(ev) {
      this.currentTabIndex = ev
      const tab = this.tabs[ev]
      if (tab) {
        this.$emit('tab-changed', tab)
      }
    }
  }
}
</script>
