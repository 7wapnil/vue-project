<template>
  <b-nav
    tag="div"
    class="flex-nowrap"
    vertical>
    <slot name="header"/>
    <b-nav-item
      v-for="(item, itemIndex) in menuItems"
      :key="itemIndex">
      <menu-item
        :item="item"
        :index="itemIndex"/>
    </b-nav-item>
  </b-nav>
</template>

<script>
import MenuItem from './MenuItem'
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
