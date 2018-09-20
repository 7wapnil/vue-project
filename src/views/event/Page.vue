<template>
  <main-layout>
    <div class="row">
      <div class="col">
        <b-card
          v-if="event"
          class="mt-4">
          <div slot="header">{{ event.description }}</div>

          <markets-list :event="event"/>

        </b-card>
      </div>
    </div>
  </main-layout>
</template>

<script>
import { EVENT_BY_ID_QUERY } from '@/graphql'
import MarketsList from '@/components/markets/MarketsList'
import { mapActions } from 'vuex'

export default {
  components: {
    MarketsList
  },
  data () {
    return {
      event: null
    }
  },
  apollo: {
    event () {
      return {
        query: EVENT_BY_ID_QUERY,
        variables: {
          id: this.eventId
        },
        update ({ events }) {
          if (!events.length) {
            return null
          }
          return events[0]
        }
      }
    }
  },
  computed: {
    eventId () {
      return this.$route.params.id
    }
  },
  methods: {
    ...mapActions('events', [
      'loadOne'
    ]),
  }
}
</script>
