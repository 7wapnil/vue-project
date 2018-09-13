<template>
  <main-layout>
    <div class="row">
      <div class="col-xs-12 col-md-4 order-md-12">
        <betslip class="mt-4"/>
      </div>
      <div class="col-xs-12 col order-md-2">
        <live-events :events="events" header="Live events"/>
      </div>
    </div>
  </main-layout>
</template>

<script>
import { mapActions } from 'vuex'
import Betslip from '@/components/betslip/Betslip.vue'
import LiveEvents from './LiveEvents'

export default {
  components: {
    LiveEvents,
    Betslip
  },
  data () {
    return {
      events: []
    }
  },
  created () {
    this.loadEvents()
  },
  methods: {
    ...mapActions('events', [
      'loadList'
    ]),
    loadEvents: function () {
      this.loadList({ limit: 10 }).then(({ data: { events } }) => {
        this.events = events
      })
    }
  }
}
</script>
