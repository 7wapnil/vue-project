<template>
  <b-tabs
    :value="currentTabIndex"
    :nav-wrapper-class="'px-0 px-md-4 bg-arc-clr-soil-light ' + `${ tabs.length ?
    'sorting-panel' : ''}`"
    nav-class="bg-arc-clr-soil-light-cover"
    @input="changeTabIndex">

    <template slot="empty">
      <b-row
        class="loading-row"
        no-gutters>
        <b-col class="loading-col d-flex justify-content-center align-items-center">
          <h6 class="m-0 letter-spacing-2">
            {{ $t('eventPage.loading') }}...
          </h6>
        </b-col>
      </b-row>
    </template>

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
const FIRST_TAB_INDEX = 0
const SECOND_TAB_INDEX = 1

export default {
  props: {
    tabs: {
      type: Array,
      default () { return [] }
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
    tabIndexToSelect () {
      return this.tabsAmount === 1 ? FIRST_TAB_INDEX : SECOND_TAB_INDEX
    },
    tabsAmount () {
      return this.tabs.length
    },
    setTabIndex () {
      this.changeTabIndex(this.tabIndexToSelect())
    },
    changeTabIndex (ev) {
      this.currentTabIndex = ev
      const tab = this.tabs[ev]
      if (tab) {
        this.$emit('tab-changed', tab)
      }
    }
  }
}
</script>

<style lang="scss"
       scoped>
  .loading-row {
    min-height: 65px;
    background: #3d3d3d;
  }
  .loading-col {
    border-bottom: 1px solid $arc-clr-soil-cover;
    margin: 0 20px;
  }
</style>
