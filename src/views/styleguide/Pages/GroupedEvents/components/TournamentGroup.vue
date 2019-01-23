<template>
  <div class="pt-4">
    <h3 class="pl-4 text-arc-clr-gold events-list-tornament">ESEA MDL Season 29</h3>

    <event
      v-for="x in 2"
      :key="x"
      :with-draw="x % 2 === 0"/>

  </div>
</template>
<script>
import Event from './Event.vue'

export default {
  components: {
    Event
  }
}
</script>
