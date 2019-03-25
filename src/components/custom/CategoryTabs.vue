<template>
  <b-tabs
    :lazy="lazy"
    v-model="categoryTabIndex"
    content-class="p-0 m-0"
    class="category-tabs"
    style="overflow: hidden !important;"
    nav-class="px-5">

    <template slot="tabs">

      <b-nav-item
        v-if="categoryTabIndex > 0"
        class="pointer left-side-navigation"
        @click="categoryTabIndex--">
        <icon name="chevron-left"/>
      </b-nav-item>

    </template>

    <b-tab
      v-for="(tab, index) in tabs"
      :key="index"
      no-body
      title-link-class="category-tab px-4 py-3 "
      @click="emitTabChanged">
      <template slot="title">
        <b-row no-gutters>
          <b-col>
            <icon
              :name="tab.icon"
              color="arc-clr-iron"
              size="18px"/>
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

    <template slot="tabs">
      <b-nav-item
        v-if="categoryTabIndex !== tabs.length - 1"
        class="pointer right-side-navigation"
        @click="categoryTabIndex++">
        <icon
          class="category-tab"
          name="chevron-right"/>
      </b-nav-item>
    </template>

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
  created () {
    this.emitTabChanged()
  },
  methods: {
    emitTabChanged () {
      if (this.tabs[this.categoryTabIndex]) {
        this.$emit('tab-changed', this.tabs[this.categoryTabIndex])
      }
    }
  },
}
</script>
