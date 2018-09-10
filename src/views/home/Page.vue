<template>
  <main-layout>
    <div class="row">
      <div class="col-xs-12 col-md-2 order-md-1">
        <p class="mt-3">
          Websocket messages
        </p>
        <hr>
        <ul class="list-unstyled">
          <li
            v-for="message in messages"
            :key="message">
            {{ message.name }}: {{ message.message }}
          </li>
        </ul>
      </div>
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
    test (data) {
      console.log(data)
      this.messages.push(data)
    }
  },
  data () {
    return {
      messages: [],
      events: []
    }
  },
  created () {
    this
      .$store
      .dispatch('loadEvents', { priority: 1 })
      .then(({ data: { events } }) => {
        this.events = events
      })
  }
}
</script>
<style scoped>
</style>
