<template>
  <main-layout>
    <div class="row">
      <div class="col">
        <b-card
          v-if="event"
          class="mt-4">
          <div slot="header">{{ event.description }}</div>
          <b-card
            v-for="market in event.markets"
            :key="market.id"
            class="mt-2">
            {{ market.name }}
            <div class="row">
              <div
                v-for="odd in market.odds"
                :key="odd.id"
                class="col mt-2">
                <odd-button :odd="odd" :market="market"/>
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
import ApiService from '@/services/api/events'

export default {
  components: {
    OddButton
  },
  data () {
    return {
      apiService: new ApiService(this),
      event: null
    }
  },
  computed: {
    eventId () {
      return this.$route.params.id
    }
  },
  created () {
    this
      .apiService
      .loadById(this.eventId)
      .catch(console.log)
  },
}
</script>
