<template>
  <b-card body-class="events-card-body">
    <b-card-header
      header-bg-variant="arc-clr-soil-light"
      header-text-variant="arc-clr-iron"
      header-class="events-header">
      <h4>{{ header }}</h4>
    </b-card-header>

    <loader v-if="loading"/>

    <div v-if="!loading">
      <b-card
        v-for="event in events"
        :key="event.id"
        no-body>

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
import { EVENTS_LIST_QUERY } from '@/graphql'
import { CACHE_AND_NETWORK, NO_CACHE } from '@/constants/graphql/fetch-policy'

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
        variables: this.queryOptions,
        fetchPolicy: CACHE_AND_NETWORK
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
        .getClient()
        .query({
          query: EVENTS_LIST_QUERY,
          fetchPolicy: NO_CACHE,
          variables: {
            ...this.queryOptions,
            ...{ id }
          }
        })
        .then(({ data: { events } }) => {
          this.$log.debug('Received event response from API', events)
          if (events.length === 1) {
            this.updateApolloCache(this.query, (cache) => {
              cache.events.push({ ...events[0], __typename: 'Event' })
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
