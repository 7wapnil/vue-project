<template>
  <div :class="titleKind">
    <b-container
      fluid
      class="p-0">
      <top-nav @changeColor="titleKind = $event"/>
    </b-container>
    <b-container
      fluid
      class="p-0">
      <b-row no-gutters>
        <b-col
          cols="12"
          class="d-none d-lg-block"
          style="max-width: 268px">
          <side-menu/>
        </b-col>
        <b-col
          class="bg-arc-clr-soil-light"
          style="min-height: 100vh">

          <router-view/>

        </b-col>
      </b-row>

    </b-container>
  </div>
</template>
<script>
import SideMenu from './Sidemenu'
import Betslip from '@/components/betslip/Betslip'
import TopNav from './TopNav'

export default {
  components: {
    SideMenu,
    Betslip,
    TopNav
  },
  data () {
    return {
      titleKind: 'sports'
    }
  }
}
</script>
