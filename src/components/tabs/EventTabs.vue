<template>
    <b-tabs
            :lazy="lazy"
            v-model="tabIndex"
            nav-wrapper-class="sorting-panel-test mx-4">
        <b-tab
                v-for="(tab, index) in tabs"
                :key="index"
                no-body
                card
                title-link-class="pb-4 px-4 pt-3 bg-arc-dropdown-divider">

            <template slot="title">
                <b-row no-gutters>
                    <b-col class="d-flex justify-content-center align-items-center">
                        <span style="font-size: 16px;">
                            {{ tab.title }}
                        </span>
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
    }
  }
</script>
