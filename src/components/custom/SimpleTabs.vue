<template>
  <b-tabs
    v-model="tabIndex"
    nav-class="bg-arc-clr-soil-light-cover"
    nav-wrapper-class="px-0 px-md-4 sorting-panel bg-arc-clr-soil-light">

    <b-tab
      v-for="(tab, index) in tabs"
      :key="index"
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
      default () { return [] }
    },
    lazy: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: ''
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
  created() {
    this.setInitialTabStatus()
  },
  computed: {
    tabIndex: {
      get () {
        return this.currentTabIndex
      },
      set (value) {
        const tab = this.tabs[value]
        if (tab) {
          this.$emit('tab-changed', tab)
        }
      }
    },
  },
  watch: {
    selectedCategory: function (newVal, oldVal) {
      this.setInitialTabStatus()
    },
    tabs: function (newWal, oldWal) {
      console.log('tabs lenght:', this.tabs.length)
      console.log('t', (this.tabs.length <= 1) ? 0 : 1)
      console.log(this.currentTabIndex)

      this.currentTabIndex = (this.tabs.length <= 1) ? 0 : 1
    }
  },
  methods: {
    setInitialTabStatus() {
      this.currentTabIndex = (this.tabs.length <= 1) ? 0 : 1
    }
  }
}
</script>
