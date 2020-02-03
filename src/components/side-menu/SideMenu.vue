<template>
  <b-nav
    tag="div"
    class="flex-nowrap"
    vertical>
    <b-nav-item class="d-inline-flex align-items-center justify-content-start p-3 bg-arc-clr-soil-dark side-menu-categories w-100">
      <span class="text-arc-clr-iron letter-spacing-2 text-uppercase">
        Categories
      </span>
    </b-nav-item>
    <b-nav-item
      v-for="(item, itemIndex) in menuItems"
      :key="item.id">
      <menu-item
        :item="item"
        :index="itemIndex"/>
    </b-nav-item>
  </b-nav>
</template>

<script>
import MenuItem from './MenuItem'
import { TITLES_QUERY } from '@/graphql/index'
import { buildTree } from '@/helpers/navigation-tree'

const POLL_INTERVAL = 10000

export default {
  components: {
    MenuItem
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
            kind: this.$route.params.titleKind,
            withScopes: true
          }
        },
        pollInterval: POLL_INTERVAL
      }
    }
  },
  computed: {
    menuItems () {
      return buildTree(this.$route.params.titleKind, this.titles, this.$route)
    }
  }
}
</script>
