<template>
  <b-card
    no-body
    class="p-4"
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
      :disabled="!canLoadMore"
      class="btn btn-arc-clr-soil-cover mb-2 mx-1"
      @click="loadMore">
      {{ canLoadMore ? 'Load More' : 'Nothing to Load' }}
    </button>
  </b-card>
</template>

<script>
import {
  EVENTS_LIST_QUERY,
  KIND_EVENT_UPDATED,
  SPORT_EVENT_UPDATED,
  TOURNAMENT_EVENT_UPDATED
} from '@/graphql'
import { updateCacheList } from '@/helpers/graphql'

export default {
  props: {
    header: {
      type: String,
      default: 'Events'
    },
    titleId: {
      type: String,
      default: null
    },
    tournamentId: {
      type: String,
      default: null
    },
    live: {
      type: Boolean,
      default: true
    }
  },
  apollo: {
    events () {

      let subscription = null
      let variables = { live: this.live }

      if (this.tournamentId) {
        subscription = TOURNAMENT_EVENT_UPDATED
        variables.tournament = this.tournamentId
      } else if (this.titleId) {
        subscription = SPORT_EVENT_UPDATED
        variables.title = this.titleId
      } else {
        subscription = KIND_EVENT_UPDATED
        variables.kind = this.$route.params.titleKind
      }

      return {
        ...this.query,
        subscribeToMore: {
          document: subscription,
          variables,
          updateQuery ({ events }, { subscriptionData }) {
            const endpoint = Object.keys(subscriptionData.data)[0]

            return {
              events: updateCacheList(events, subscriptionData.data[endpoint])
            }
          }
        }
      }
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
        variables: {
          titleKind: this.$route.params.titleKind,
          titleId: this.titleId,
          tournamentId: this.tournamentId,
          inPlay: this.live,
          upcoming: !this.live,
          withMarkets: true,
          marketsLimit: 1,
          limit: 10
        }
      }
    }
  },
  methods: {
    loadMore () {
      this
        .$apollo
        .queries
        .events
        .fetchMore({
          variables: {
            offset: this.events.length
          },
          updateQuery: (prevResult, { fetchMoreResult: { events } }) => {
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
    }
  }
}
</script>
