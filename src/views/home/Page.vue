<template>
  <main-layout>
    <div class="row">
      <div class="col-xs-12 col-md-4 order-md-12">
        <betslip class="mt-4"/>
      </div>
      <div class="col-xs-12 col order-md-2">
        <b-card
          class="mt-4"
          header="Events">
          <b-card
            v-for="event in events"
            :key="event.id"
            class="mt-2">
            <div class="row">
              <div class="col">
                <h5 class="card-title">
                  <router-link
                    :to="{ name: 'event',
                           params: { id: event.id } }">
                    {{ event.description }}
                  </router-link>
                </h5>
              </div>
            </div>
            <event-item
              :event="event"/>
          </b-card>
        </b-card>
      </div>
    </div>
  </main-layout>
</template>

<script>
import Betslip from '@/components/betslip/Betslip.vue'
import EventItem from './EventItem.vue'

export default {
  components: {
    EventItem,
    Betslip
  },
  sockets: {
    oddChange (data) {
      this.loadEvents()
    },
    updateMarket (data) {
      this.loadEvents()
    },
    updateEvent (data) {
      this.loadEvents()
    }
  },
  data () {
    return {
      messages: [],
      events: []
    }
  },
  created () {
    this.loadEvents()
  },
  methods: {
    loadEvents: function () {
      this.$store.dispatch('loadEvents').then(({ data: { events } }) => {
        this.events = events
      })
    }
  }
}
</script>
