<template>
  <b-tabs
    :lazy="lazy"
    v-model="tabIndex"
    nav-class="bg-arc-clr-soil-light-cover"
    nav-wrapper-class="sorting-panel p-0">

    <b-tab
      v-for="(tab, index) in tabs"
      :key="index"
      title-link-class="mx-4 py-3 bg-transparent"
      @click="emitTabChange">

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
    activeIndex: {
      type: Number,
      default: 1
    },
    lazy: {
      type: Boolean,
      default: true
    },
    variant: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      tabIndex: this.activeIndex
    }
  },
  created () {
    this.emitTabChange()
  },
  methods: {
    emitTabChange () {
      if (this.tabs[this.tabIndex]) {
        this.$emit('tab-changed', this.tabs[this.tabIndex])
      }
    }
  }
}
</script>
