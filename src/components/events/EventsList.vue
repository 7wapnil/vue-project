<template>
  <b-card
    no-body
    class="pt-4"
    body-class="events-card-body">

    <div>
      <b-card
        v-for="event in events"
        :key="event.id"
        no-body>

        <slot :event="event"/>

      </b-card>
    </div>

    <loader v-if="loading"/>

    <div
      v-if="!loading && !events.length"
      class="text-center">
      <h6>No events found</h6>
    </div>
    <button
      v-if="events.length"
      class="btn btn-arc-clr-soil-cover col mb-2 mx-1"
      :disabled="!canLoadMore"
      @click="loadMore">
      {{canLoadMore ? 'Load More' : 'Nothing to Load'}}
    </button>
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
      events: [],
      canLoadMore: true
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
    loadMore () {
      this
        .$apollo
        .queries
        .events
        .fetchMore({
          variables: {
            offset: this.events.length
          },
          updateQuery: (prevResult, {fetchMoreResult: { events }}) => {
            this.updateApolloCache(this.query, (cache) => {
              if (events.length < this.query.variables.limit) {
                this.canLoadMore = false
              }
              events.forEach(event => 
                cache.events.push({ ...event, __typename: 'Event' })
              )
            })
          }
        })
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
