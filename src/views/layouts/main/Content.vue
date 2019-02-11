<template>
  <b-row no-gutters>
    <b-col
      class="d-none d-lg-block bg-arc-clr-soil-black"
      style="max-width: 268px;min-width: 268px;">
      <side-menu :items="menuItems"/>
    </b-col>
    <b-col class="bg-arc-clr-soil-light">

      <router-view :key="$route.fullPath"/>

    </b-col>
    <b-col
      class="d-none d-lg-block bg-arc-clr-soil-black"
      style="max-width: 268px; min-width: 268px;">
      <div class="betslip-block">
        <promotional-item/>
        <betslip/>
      </div>
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
    PromotionalItem,
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
      titles: []
    }
  },
  computed: {
    menuItems () {
      return buildTree(this.$route.params.titleKind, this.titles, this.$route)
    }
  }
}
</script>
