<template>
  <b-row
    no-gutters>
    <b-col
      class="bg-arc-clr-soil-black side-menu">
      <component :is="sidemenuKind"/>
    </b-col>
    <b-col class="bg-arc-clr-soil-light min-vh-100">
      <router-view :key="$route.fullPath"/>
    </b-col>
    <b-col class="bg-arc-clr-soil-black betslip-block">
      <promotional-item/>
      <betslip/>
    </b-col>
  </b-row>
</template>

<script>
import Betslip from '@/components/betslip/Betslip.vue'
import PromotionalItem from '@/components/promotional/PromotionalItem'

export default {
  components: {
    Betslip,
    PromotionalItem
  },
  data () {
    return {
      sidemenuMeta: ''
    }
  },
  computed: {
    sidemenuKind () {
      if (this.sidemenuMeta === 'info') {
        return () => import('@/views/layouts/information-page/InfoPageSidemenu')
      } else {
        return () => import('@/components/side-menu/SideMenu')
      }
    }
  },
  watch: {
    '$route': {
      handler: function (to) {
        if (to.meta.sidemenu) {
          this.sidemenuMeta = to.meta.sidemenu
        }
      },
      immediate: true
    }
  },
}
</script>
