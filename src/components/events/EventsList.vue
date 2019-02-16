<template>
  <b-card
    no-body
    class="p-4"
    body-class="events-card-body">
    <div
      v-for="title in groupedEvents"
      :key="title.name">
      <b-row
        v-if="!titleId"
        no-gutters>
        <b-col class="d-inline-flex px-4 pt-4 events-list-title">

          <icon
            class="ml-2"
            name="sidemenu-game-icon"
            size="24px"/>

          <h4
            tabindex="0"
            class="ml-4 mb-0 text-arc-clr-white"
            style="cursor: pointer; outline: 0;"
            @click="() => emitTitleChange(title.id)">
            {{ title.name }}
          </h4>

        </b-col>
      </b-row>
      <div
        v-for="tournament in title.tournaments"
        :key="tournament.id"
        class="pt-4">
        <router-link
          v-if="!tournamentId"
          :to="{name: 'tournament', params: {titleId: title.id, tournamentId: tournament.id}}"
          class="pl-4 text-arc-clr-gold mb-2 d-block">
          {{ tournament.name }}
        </router-link>
        <div>
          <b-card
            v-for="event in tournament.events"
            :key="event.id"
            no-body>
            <slot :event="event"/>
          </b-card>
        </div>
        <more-button
          v-if="categoryId && tournament.events.length > 16"
          :link="{ name: 'tournament', params: { titleKind: $route.params.titleKind, titleId: titleId, tournamentId: tournament.id } }"/>
      </div>
    </div>

    <loader v-if="loading"/>

    <div
      v-if="!loading && !events.length"
      class="text-center">
      <h6>No events found</h6>
    </div>
  </b-card>
</template>

<script>
import {
  EVENTS_LIST_QUERY,
  KIND_EVENT_UPDATED,
  SPORT_EVENT_UPDATED,
  CATEGORY_EVENT_UPDATED,
  TOURNAMENT_EVENT_UPDATED
} from '@/graphql'
import { updateCacheList } from '@/helpers/graphql'
import MoreButton from '@/components/custom/MoreButton'
import { TITLE_CHANGED } from '@/constants/custom-events'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { CONTEXT_TO_START_STATUS_MAP } from '@/constants/graphql/event-start-statuses'

export default {
  components: { MoreButton },
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
    }
  },
  apollo: {
    events () {
      return {
        ...this.query,
        subscribeToMore: {
          document: this.subscription.document,
          variables: this.subscription.variables,
          updateQuery ({ events }, { subscriptionData }) {
            const endpoint = Object.keys(subscriptionData.data)[0]
            const attributes = subscriptionData.data[endpoint]
            const isRemoved = attributes.start_status !== CONTEXT_TO_START_STATUS_MAP[this.context]

            return { events: updateCacheList(events, attributes, isRemoved) }
          }
        }
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
          context: this.context
        }
      }
    },
    subscription () {
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
    groupedEvents () {
      const groupedEvents = [];

      this.events.forEach(event => {
        const currentTitleIndex = groupedEvents.findIndex(title => title.name === event.title.name);

        if (currentTitleIndex > -1) {
          const currentTournamentIndex = groupedEvents[currentTitleIndex]
            .tournaments
            .findIndex(tournament => tournament.id === event.tournament.id);

          if (currentTournamentIndex > -1) {
            groupedEvents[currentTitleIndex]
              .tournaments[currentTournamentIndex]
              .events.push(event)
          } else {
            groupedEvents[currentTitleIndex]
              .tournaments.push({
                ...event.tournament,
                events: [event]
              })
          }
        } else {
          groupedEvents.push({
            ...event.title,
            tournaments: [{
              ...event.tournament,
              events: [event]
            }]
          })
        }
      })

      return groupedEvents
    }
  },
  methods: {
    emitTitleChange (titleId) {
      this.$root.$emit(TITLE_CHANGED, titleId)
    }
  }
}
</script>
