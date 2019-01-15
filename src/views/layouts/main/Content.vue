<template>
  <b-row no-gutters>
    <b-col
      cols="12"
      class="d-none d-lg-block"
      style="max-width: 268px">
      <side-menu :items="menuItems"/>
    </b-col>
    <b-col class="bg-arc-clr-soil-light">

      <router-view/>

    </b-col>
    <b-col
      cols="12"
      class="d-none d-lg-block"
      style="max-width: 268px">
      <promotional-item/>
      <betslip/>
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
      return buildTree(this.$route.params.titleKind, this.titles)
    }
  }
}
</script>
