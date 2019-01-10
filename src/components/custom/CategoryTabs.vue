<template>
  <b-tabs
    :lazy="lazy"
    v-model="tabIndex"
    card
    class="category-tabs"
    nav-class="bg-transparent px-4 py-0"
    nav-wrapper-class="bg-arc-clr-soil-darker">
    <b-tab
      v-for="(tab, index) in tabs"
      :key="index"
      title-link-class="category-tab px-4 py-3 bg-transparent">
      <template slot="title">
        <b-row no-gutters>
          <b-col class="d-flex justify-content-center align-items-center">
            <icon
              :name="tab.icon"
              size="18px"/>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col>
            <small>
              {{ tab.title }}
            </small>
          </b-col>
        </b-row>
      </template>

      <slot :tab="tab"/>

    </b-tab>

    <div
      slot="empty"
      class="text-center text-muted">
      No tabs. Try to check your connection.
    </div>

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
      default: 0
    },
    lazy: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tabIndex: this.activeIndex
    }
  }
}
</script>
