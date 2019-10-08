<template>
  <b-row
    no-gutters>
    <b-col
      class="bg-arc-clr-soil-black side-menu">
      <side-menu/>
    </b-col>
    <b-col class="bg-arc-clr-soil-light min-vh-100">
      <casino-page/>
    </b-col>
  </b-row>
</template>

<script>
import SideMenu from '@/components/casino-games/side-menu/SideMenu'
import CasinoPage from '@/views/casino-games/Page.vue'

export default {
  components: {
    SideMenu,
    CasinoPage
  }
}
</script>
