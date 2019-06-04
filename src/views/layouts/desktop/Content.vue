<template>
  <b-row
    style="min-width: 1380px"
    no-gutters>
    <b-col
      class="bg-arc-clr-soil-black side-menu">
      <vue-scroll>
        <side-menu :items="menuItems"/>
      </vue-scroll>
    </b-col>
    <b-col class="bg-arc-clr-soil-light min-vh-100">
      <router-view
        v-if="titles.length"
        :key="$route.fullPath"/>
    </b-col>
    <b-col
      class="bg-arc-clr-soil-black betslip-block">
      <vue-scroll>
        <promotional-item/>
        <betslip/>
      </vue-scroll>
    </b-col>
  </b-row>
</template>

<script>
import SideMenu from '@/components/side-menu/SideMenu'
import Betslip from '@/components/betslip/Betslip.vue'
import PromotionalItem from '@/components/promotional/PromotionalItem'
import { TITLES_QUERY } from '@/graphql'
import { buildTree } from '@/helpers/navigation-tree'

const POLL_INTERVAL = 10000

export default {
  components: {
    SideMenu,
    Betslip,
    PromotionalItem
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
  data () {
    return {
      titles: [],
    }
  },
  computed: {
    menuItems () {
      return buildTree(this.$route.params.titleKind, this.titles, this.$route)
    }
  }
}
</script>
