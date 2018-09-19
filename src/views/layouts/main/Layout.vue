<template>
  <div>
    <nav-bar/>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-4 order-md-12">
          <betslip class="mt-4"/>
        </div>
        <div class="col-xs-12 col order-md-2">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar'
import Betslip from '@/components/betslip/Betslip.vue'

export default {
  components: {
    NavBar,
    Betslip
  }
}
</script>

<style>
  li.socket > div {
    width: 8px;
    height: 8px;
    margin: auto;
    border-radius: 50px;
    background: red;
  }

  li.socket > div.online {
    background: green;
  }
</style>
