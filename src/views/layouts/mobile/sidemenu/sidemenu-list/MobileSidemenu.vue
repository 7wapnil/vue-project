<template>
  <div>
    <b-nav
      v-if="!$apollo.loading"
      class="flex-nowrap bg-arc-clr-soil-black"
      vertical>

      <slot/>

      <b-nav-item
        v-for="(item, index) in menuItems"
        :key="index">
        <menu-item
          :item="item"
          :index="index"/>
      </b-nav-item>
    </b-nav>
    <loader
      v-if="$apollo.loading"
      class="w-100 m-4"/>
  </div>
</template>

<script>
import MenuItem from './MobileMenuItem'
import { TITLES_QUERY } from '@/graphql/index'
import { buildTree } from '@/helpers/navigation-tree'
import { mapGetters } from 'vuex'

const POLL_INTERVAL = 10000

export default {
  components: {
    MenuItem
  },
  props: {
    titleKind: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      titles: [],
    }
  },
  apollo: {
    titles () {
      return {
        query: TITLES_QUERY,
        variables () {
          return {
            kind: this.getSidebarKind,
            withScopes: true
          }
        },
        pollInterval: POLL_INTERVAL
      }
    }
  },
  computed: {
    menuItems () {
      if (this.isSidebarOpen) {
        return buildTree(this.getSidebarKind, this.titles, this.$route)
      }
    },
    ...mapGetters([
      'isSidebarOpen',
      'getSidebarKind'
    ])
  }
}
</script>
