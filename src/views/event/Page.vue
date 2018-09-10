<template>
  <main-layout>
    <div class="row">
      <div class="col">
        <b-card
          v-if="event"
          class="mt-4">
          <div slot="header">{{ event.description }}</div>
          <b-card
            v-for="market in markets"
            :key="market.id"
            class="mt-2">
            {{ market.name }}
            <div class="row">
              <div
                v-for="odd in market.odds"
                :key="odd.id"
                class="col mt-2">
                <odd-button
                  :odd="odd"
                  :market="market"/>
              </div>
            </div>
          </b-card>
        </b-card>
      </div>
    </div>
  </main-layout>
</template>

<script>
import OddButton from '@/components/custom/OddButton.vue'
import { CANCELLED_STATUS } from '@/models/market'

export default {
  components: {
    OddButton
  },
  data () {
    return {
      event: null
    }
  },
  computed: {
    eventId () {
      return this.$route.params.id
    },
    markets () {
      if (!this.event) {
        return [];
      }

      return this.event.markets.filter((market) => {
        return market.status !== CANCELLED_STATUS
      })
    }
  },
  created () {
    this
      .$store
      .dispatch('loadEventById', this.eventId)
      .then(({ data: { event } }) => {
        this.event = event
      })
  },
}
</script>
