<template>
  <div>
    <nav-bar/>
    <div class="container-fluid">
      <div class="row">
        <div class="col-2 p-0">
          <side-menu/>
        </div>
        <div class="col p-0">
          <slot/>
        </div>
        <div class="col-3 p-0">
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
