<template>
    <b-tabs
            :lazy="lazy"
            :value="value"
            content-class="p-0 m-0"
            class="category-tabs"
            v-model="categoryTabIndex"
            nav-class="px-5"
            @input="emitInput">

      <template slot="tabs">

        <b-nav-item v-if="categoryTabIndex > 0"
                    style="position: absolute; left: 0; top: 10px"
                    class="pointer left-side-navigation"
                    @click="categoryTabIndex--">
          <icon name="chevron-left"/>
        </b-nav-item>

      </template>

      <b-tab
              v-for="(tab, index) in tabs"
              :key="index"
              no-body
              @click="$emit('category-tab-changed', tab.title)"
              title-link-class="category-tab px-4 py-3 ">
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
              {{ tab.title }}
            </span>
            </b-col>
          </b-row>
        </template>

        <slot :tab="tab"/>
      </b-tab>



      <template slot="tabs">
        <b-nav-item style="position: absolute; right: 0; top: 10px"
                    v-if="categoryTabIndex !== tabs.length - 1"
                    class="pointer right-side-navigation"
                    @click="categoryTabIndex++">
          <icon class="category-tab" name="chevron-right"/>
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
  data() {
    return {
      categoryTabIndex: 0
    }
  },
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
  methods: {
    emitInput (value) {
      this.$emit('input', value)
    }
  },
}
</script>
