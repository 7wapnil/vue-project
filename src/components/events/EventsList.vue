<template>
  <b-card
    no-body
    class="px-1 px-md-4 py-md-4 min-vh-100">

    <div v-if="tabId">
      <events-group
        v-for="(group, index) in groupedEvents"
        :key="index"
        :group="group"
        :tab-id="tabId"/>
    </div>

    <loader
      v-if="loading"
      class="mt-4"/>

    <div
      v-if="!loading && !events.length"
      class="text-center">
      <h6 class="my-4">No events found</h6>
    </div>
  </b-card>
</template>

<script>
import {
  EVENTS_LIST_QUERY,
  KIND_EVENT_UPDATED,
  SPORT_EVENT_UPDATED,
  CATEGORY_EVENT_UPDATED,
  TOURNAMENT_EVENT_UPDATED,
  EVENTS_BET_STOPPED
} from '@/graphql'
import { updateCacheList } from '@/helpers/graphql'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { CONTEXT_TO_START_STATUS_MAP } from '@/constants/graphql/event-start-statuses'
import { INACTIVE, SUSPENDED, MARKET_STOP_STATUSES } from '@/constants/graphql/event-market-statuses'
import EventsGroup from '@/components/events/EventsGroup'

const DEFAULT_POSITION = 9999

export default {
  components: {
    EventsGroup
  },
  props: {
    header: {
      type: String,
      default: 'Events'
    },
    titleId: {
      type: String,
      default: null
    },
    categoryId: {
      type: String,
      default: null
    },
    tournamentId: {
      type: String,
      default: null
    },
    context: {
      type: String,
      default: null
    },
    tabId: {
      type: String,
      default: null
    }
  },
  apollo: {
    events () {
      return {
        ...this.query,
        subscribeToMore: [
          {
            document: this.eventsSubscription.document,
            variables: this.eventsSubscription.variables,
            updateQuery ({ events }, { subscriptionData }) {
              const endpoint = Object.keys(subscriptionData.data)[0]
              const attributes = subscriptionData.data[endpoint]
              const isRemoved =
                attributes.startStatus !== CONTEXT_TO_START_STATUS_MAP[this.context]

              return { events: updateCacheList(events, attributes, isRemoved) }
            }
          },
          {
            document: EVENTS_BET_STOPPED,
            updateQuery ({ events }, { subscriptionData: { data } }) {
              const subscriptionData = data.eventsBetStopped
              const marketStatus = subscriptionData.marketStatus

              if (MARKET_STOP_STATUSES.includes(marketStatus)) {
                const eventIndex = events
                  .findIndex(event => event.id === subscriptionData.eventId)

                if (marketStatus === INACTIVE) events.splice(eventIndex, 1)
                if (marketStatus === SUSPENDED) {
                  events[eventIndex]
                    .dashboardMarket
                    .odds
                    .forEach(function (odd) { odd.status = INACTIVE })
                }
              }
              return { events: events }
            }
          }
        ]
      }
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
        fetchPolicy: NETWORK_ONLY,
        variables: {
          titleKind: this.$route.params.titleKind,
          titleId: this.titleId,
          tournamentId: this.tournamentId,
          categoryId: this.categoryId,
          context: this.context,
          withScopes: true
        }
      }
    },
    eventsSubscription () {
      let document = null
      let variables = {}

      if (this.tournamentId) {
        document = TOURNAMENT_EVENT_UPDATED
        variables.tournament = this.tournamentId
      } else if (this.categoryId) {
        document = CATEGORY_EVENT_UPDATED
        variables.category = this.categoryId
      } else if (this.titleId) {
        document = SPORT_EVENT_UPDATED
        variables.title = this.titleId
      } else {
        document = KIND_EVENT_UPDATED
        variables.kind = this.$route.params.titleKind
      }

      return {
        document: document,
        variables: variables
      }
    },
    parentizeEvents () {
      return this.events.map((event) => {
        const { title, scopes } = event
        const category = scopes.find(s => s.kind === 'category')
        const tournament = scopes.find(s => s.kind === 'tournament')

        return {
          ...event,
          type: 'event',
          title: event.title,
          parent: {
            ...tournament,
            type: 'tournament',
            title: event.title,
            parent: {
              ...category,
              type: 'category',
              title: event.title,
              parent: {
                ...title,
                type: 'title'
              }
            }
          }
        }
      })
    },
    groupedEvents () {
      return this.buildEventBranch(this.parentizeEvents)
    }
  },
  methods: {
    buildEventBranch (items) {
      const branch = items
        .reduce(this.addItemToGroup, [])
        .sort((a, b) => {
          if (a.position === undefined && b.position === undefined) {
            return 0
          }

          if (a.position < DEFAULT_POSITION && b.position < DEFAULT_POSITION) {
            return a.position - b.position
          }

          if (a.position === DEFAULT_POSITION && b.position < DEFAULT_POSITION) {
            return 1
          }

          if (a.position < DEFAULT_POSITION && b.position === DEFAULT_POSITION) {
            return -1
          }

          if (a.position === DEFAULT_POSITION && b.position === DEFAULT_POSITION) {
            return this.sortByName(a, b)
          }

          return this.sortByName(a, b)
        })

      if (branch.length && branch[0].parent) {
        return this.buildEventBranch(branch)
      }

      return branch
    },
    addItemToGroup (groups, item) {
      let groupIndex = groups.findIndex(i => i.id === item.parent.id)

      // if group not found - create it
      if (groupIndex < 0) {
        groups.push({ ...item.parent, children: [] })
        groupIndex = groups.length - 1
      }

      // add item to group
      groups[groupIndex].children.push(item)

      return groups
    },
    sortByName (a, b) {
      if (a.name < b.name) { return -1 }
      if (a.name > b.name) { return 1 }

      return 0
    }
  }
}
</script>
