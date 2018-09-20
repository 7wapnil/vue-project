<template>
  <b-card
    :header="header">
    <loader v-if="loading"/>

    <div v-if="!loading">
      <b-card
        v-for="event in events"
        :key="event.id"
        class="mt-2">
        <div class="row">
          <div class="col">
            <h5 class="card-title">
              <router-link :to="{ name: 'event', params: { id: event.id } }">
                {{ event.description }}
              </router-link>
            </h5>
          </div>
        </div>

        <slot :event="event"/>

      </b-card>
    </div>

    <div
      v-if="!loading && !events.length"
      class="text-center">
      <small>No events found</small>
    </div>
  </b-card>
</template>

<script>
import { EVENTS_LIST_QUERY, EVENT_BY_ID_QUERY } from '@/graphql'

export default {
  props: {
    header: {
      type: String,
      default: 'Events'
    },
    queryOptions: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      loading: 0,
      events: []
    }
  },
  computed: {
    query () {
      return {
        query: EVENTS_LIST_QUERY,
        variables: this.queryOptions
      }
    }
  },
  sockets: {
    eventCreated ({ id }) {
      this.$log.debug('Event created socket event', id)
      this.addEvent(id)
    },
    eventUpdated ({ id, changes }) {
      this.$log.debug('Event updated socket event', id, changes)
      this.updateEvent(id, changes)
    }
  },
  watch: {
    queryOptions () {
      this.loadEvents()
    }
  },
  created () {
    this.loadEvents()
  },
  methods: {
    loadEvents () {
      this
        .$apollo
        .addSmartQuery('events', this.query)
    },
    addEvent (id) {
      this
        .$apollo
        .getClinet()
        .query({
          query: EVENT_BY_ID_QUERY,
          variables: { id }
        })
        .then(({ data: { event } }) => {
          if (event) {
            this.updateApolloCache(this.query, (cache) => {
              cache.events.push({ ...event, __typename: 'Event' })
            })
          }
        })
        .catch(this.$log.error)
    },
    updateEvent (id, changes) {
      this.updateApolloCache(this.query, (cache) => {
        const event = cache.events.find(event => event.id === id)
        if (event) {
          Object.assign(event, changes)
        }
      })
    }
  }
}
</script>
