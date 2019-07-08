<template>
  <b-row
    no-gutters>
    <b-col
      class="bg-arc-clr-soil-black side-menu">
      <vue-scroll>
        <side-menu>
          <template #header>
            <b-nav-item class="d-inline-flex align-items-center justify-content-start p-3 bg-arc-clr-soil-dark side-menu-categories w-100">
              <span class="text-arc-clr-iron letter-spacing-2">
                CATEGORIES
              </span>
            </b-nav-item>
          </template>
        </side-menu>
      </vue-scroll>
    </b-col>
    <b-col class="bg-arc-clr-soil-light min-vh-100">
      <router-view :key="$route.fullPath"/>
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

export default {
  components: {
    SideMenu,
    Betslip,
    PromotionalItem
  }
}
</script>
