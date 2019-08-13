<template>
  <b-nav
    class="flex-nowrap"
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
</template>

<script>
import MenuItem from './MobileMenuItem'
import { TITLES_QUERY } from '@/graphql'
import { buildTree } from '@/helpers/navigation-tree'

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
            kind: this.isKindTriggered,
            withScopes: true
          }
        },
        pollInterval: POLL_INTERVAL
      }
    }
  },
  computed: {
    isKindTriggered () {
      return this.titleKind ? this.titleKind : this.$route.params.titleKind
    },
    menuItems () {
      return buildTree(this.isKindTriggered, this.titles, this.$route)
    }
  }
}
</script>
