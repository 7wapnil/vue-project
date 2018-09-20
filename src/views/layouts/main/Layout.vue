<template>
  <div>
    <nav-bar class="mb-4"/>
    <div class="container-fluid">
      <div class="row">
        <div class="col-2">
          <side-menu/>
        </div>
        <div class="col">
          <slot/>
        </div>
        <div class="col-3">
          <betslip/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar'
import SideMenu from './SideMenu'
import Betslip from '@/components/betslip/Betslip.vue'

export default {
  components: {
    SideMenu,
    NavBar,
    Betslip
  }
}
</script>
