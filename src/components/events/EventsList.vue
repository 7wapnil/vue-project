<template>
  <b-card
    no-body
    class="p-4"
    body-class="events-card-body">
    <div>
      <div
        v-for="title in groupedEvents"
        :key="title.name"
        class="mb-4">
        <header
          v-if="!titleId"
          class="d-flex pl-2">
          <h2 class="events-list-title font-weight-light">
            <icon
              class="text-arc-clr-esport-glow px-3"
              name="sidemenu-game-icon"
              size="24px"/>
            {{ title.name }}
          </h2>
          <span class="align-self-center events-list-upcoming-events-hint">
            1 event starts in 20min
          </span>
          <b-button
            variant="arc-events-list-upcoming"
            class="border-0 d-flex">
            {{ title.name }} upcoming
            <icon
              class="align-self-center text-arc-clr-esport-glow pl-4"
              name="arrow-right"
              size="12px"/>
          </b-button>
        </header>

        <div
          v-for="tournament in title.tournaments"
          :key="tournament.id"
          class="pt-4">
          <h3
            v-if="!tournamentId"
            class="pl-4 text-arc-clr-gold events-list-tornament">
            {{ tournament.name }}
          </h3>
          <div>
            <b-card
              v-for="event in tournament.events"
              :key="event.id"
              no-body>
              <slot :event="event"/>
            </b-card>
          </div>
        </div>

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
import { EVENTS_LIST_QUERY } from '@/graphql'

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
      return this.query
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
  }
}
</script>
