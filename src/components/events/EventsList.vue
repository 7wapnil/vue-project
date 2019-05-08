<template>
  <b-card
    no-body
    class="p-4">

    <div v-if="tabId">
      <events-group
        v-for="(group, index) in groupedEvents"
        :key="index"
        :group="group"
        :tab-id="tabId"/>
    </div>

    <loader v-if="loading"/>

    <div
      v-if="!loading && !events.length"
      class="text-center">
      <h6 class="mb-0">No events found</h6>
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
import { TITLE_CHANGED } from '@/constants/custom-events'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { CONTEXT_TO_START_STATUS_MAP } from '@/constants/graphql/event-start-statuses'
import { INACTIVE, SUSPENDED, MARKET_STOP_STATUSES } from '@/constants/graphql/event-market-statuses'
import { findTitleIcon } from '@/helpers/icon-finder'
import EventsGroup from '@/components/events/EventsGroup'

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
      default: () => 'upcoming'
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
                attributes.start_status !== CONTEXT_TO_START_STATUS_MAP[this.context]

              return { events: updateCacheList(events, attributes, isRemoved) }
            }
          },
          {
            document: EVENTS_BET_STOPPED,
            updateQuery ({ events }, { subscriptionData: { data } }) {
              const subscriptionData = data.events_bet_stopped
              const marketStatus = subscriptionData.market_status

              if (MARKET_STOP_STATUSES.includes(marketStatus)) {
                const eventIndex = events
                  .findIndex(event => event.id === subscriptionData.event_id)

                if (marketStatus === INACTIVE) events.splice(eventIndex, 1)
                if (marketStatus === SUSPENDED) {
                  events[eventIndex]
                    .dashboard_market
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

        let highestParent = {
          ...title,
          type: 'title'
        }

        if (category) {
          highestParent = {
            ...category,
            type: 'category',
            title: event.title,
            parent: highestParent
          }
        }

        return {
          ...event,
          type: 'event',
          title: event.title,
          parent: {
            ...tournament,
            type: 'tournament',
            title: event.title,
            parent: highestParent
          }
        }
      })
    },
    groupedEvents () {
      return this.buildEventBranch(this.parentizeEvents)

      // let groupedEvents = [];
      // console.log(this.events)
      // this.events.forEach((event) => {
      //   const currentTitleIndex = groupedEvents.findIndex(title => title.name === event.title.name);
      //
      //   const children = event
      //     .scopes
      //     .filter((scope) => {
      //       return scope.kind === 'category'
      //     })
      //     .map((category) => {
      //       console.log(category)
      //       const tournamentList = event.scopes
      //         .filter((scope) => {
      //           return scope.kind === 'tournament' &&
      //                               (category.id === null ? true : scope.event_scope_id === category.id)
      //         })
      //         .map((tournament) => {
      //           return {
      //             id: tournament.id,
      //             label: tournament.name,
      //             position: tournament.position
      //           }
      //         })
      //
      //       return {
      //         id: category.id,
      //         label: category.name,
      //         tournaments: tournamentList,
      //         position: category.position
      //       }
      //     })
      //
      //   let title = {
      //     id: event.title.id,
      //     name: event.title.name,
      //     category: children
      //   }
      //
      //   if (currentTitleIndex > -1) {
      //     groupedEvents[currentTitleIndex] = title
      //   } else {
      //     groupedEvents.push(title)
      //   }
      // })
      //
      // console.log(groupedEvents)
      // // this.events.forEach(event => {
      // //
      // //   const currentTitleIndex = groupedEvents.findIndex(title => title.name === event.title.name);
      // //
      // //   if (currentTitleIndex > -1) {
      // //
      // //     const currentTournamentIndex = groupedEvents[currentTitleIndex]
      // //       .tournaments
      // //       .findIndex(tournament => tournament.id === event.tournament.id)
      // //
      // //     if (currentTournamentIndex > -1) {
      // //       groupedEvents[currentTitleIndex]
      // //         .tournaments[currentTournamentIndex]
      // //         .events.push(event)
      // //     } else {
      // //       groupedEvents[currentTitleIndex]
      // //         .tournaments.push({
      // //           position: tourPosition,
      // //           ...event.tournament,
      // //           events: [event]
      // //         })
      // //     }
      // //   } else {
      // //     groupedEvents.push({
      // //       ...event.title,
      // //       ...event.scope,
      // //       tournaments: [{
      // //         ...event.tournament,
      // //         events: [event]
      // //       }]
      // //     })
      // //   }
      // // })
      // return groupedEvents
      // // groupedEvents.forEach(event => {
      // //   let asd = event.tournaments.filter(tournament => {
      // //     return tournament && tournament.catPosition !== 9999
      // //   }).sort((a, b) => {
      // //     return a.catPosition - b.catPosition
      // //   })
      // //
      // //   let dsasda = event.tournaments.filter(tournament => {
      // //     return tournament && tournament.catPosition === 9999
      // //   }).sort((a, b) => {
      // //     if (a.name < b.name) { return -1; }
      // //     if (a.name > b.name) { return 1; }
      // //     return 0;
      // //   })
      // //   event.tournaments = asd.concat(dsasda)
      // // })
      // //
      // // groupedEvents.forEach(event => {
      // //   let asd = event.tournaments.filter(tournament => {
      // //     return tournament && tournament.position !== 9999
      // //   }).sort((a, b) => {
      // //     return a.position - b.position
      // //   })
      // //
      // //   let dsasda = event.tournaments.filter(tournament => {
      // //     return tournament && tournament.position === 9999
      // //   }).sort((a, b) => {
      // //     if (a.name < b.name) { return -1; }
      // //     if (a.name > b.name) { return 1; }
      // //     return 0;
      // //   })
      // //   event.tournaments = asd.concat(dsasda)
      // // })
    }
  },
  methods: {
    emitTitleChange (titleId) {
      this.$root.$emit(TITLE_CHANGED, titleId)
    },
    findTitleIcon,
    buildEventBranch (items) {
      const branch = items.reduce(this.addItemToGroup, [])

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
    }
  }
}
</script>
