<template>
  <div>
    <b-breadcrumb :items="composedBreadcrumbs"/>

    <header-section :event="event"/>
    <b-row
      v-if="event"
      class="mt-4"
      no-gutters>
      <b-col>
        <markets-categories
          :event="event"
          :active-index="0"
          :number-of-tabs="7"
          tabs-class="event-panel-tabs"
          title-class="event-panel-titles"
          content-class="event-panel-content"
          lazy>

          <template slot-scope="{ markets }">
            <markets-list
              :event="event"
              :markets="markets"
              :item-component="itemComponent"/>

          </template>

        </markets-categories>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { UNLIMITED_QUERY } from '@/constants/graphql/limits'
import { EVENT_BY_ID_QUERY, EVENT_UPDATED } from '@/graphql'
import MarketsCategories from '@/components/markets/MarketsCategories'
import HeaderSection from './HeaderSection'
import MarketsList from '@/components/markets/MarketsList'
import EventDetailsCard from '@/components/cards/EventDetailsCard'

export default {
  components: {
    MarketsList,
    MarketsCategories,
    HeaderSection
  },
  data () {
    return {
      event: null,
      itemComponent: EventDetailsCard,
      marketsLimit: UNLIMITED_QUERY
    }
  },
  apollo: {
    event () {
      return {
        query: EVENT_BY_ID_QUERY,
        variables: {
          id: this.eventId,
          withScopes: true
        },
        subscribeToMore: {
          document: EVENT_UPDATED,
          variables: {
            id: this.eventId
          },
          updateQuery ({ event }, { subscriptionData }) {
            return {
              event: {
                ...event,
                ...subscriptionData.data.event_updated
              }
            }
          }
        }
      }
    }
  },
  computed: {
    eventId () {
      return this.$route.params.id
    },
    category () {
      let category = {}
      this.event.scopes.filter((scope) => {
        if (scope.kind === 'category') {
          category = { id: scope.id, name: scope.name }
        }
      })
      return category
    },
    composedBreadcrumbs () {
      if (this.event) {
        return [
          {
            text: this.event.title.name,
            to: { name: 'title', params: { titleKind: this.$route.params.titleKind, titleId: this.event.title.id, } }
          },
          {
            text: this.category.name,
            to: { name: 'category-tournaments', params: { titleKind: this.$route.params.titleKind, titleId: this.event.title.id, categoryId: this.category.id } }
          },
          {
            text: this.event.tournament.name,
            to: { name: 'tournament', params: { titleKind: this.$route.params.titleKind, titleId: this.event.title.id, tournamentId: this.event.tournament.id } }
          },
          { text: this.event.name }]
      }
    }
  }
}
</script>
