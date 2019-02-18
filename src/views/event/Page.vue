<template>
  <div>
    <b-breadcrumb :items="breadcrumbsItems"/>

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
import { updateCacheList } from '@/helpers/graphql'
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
      marketsLimit: UNLIMITED_QUERY,
      breadcrumbsItems: ['Basketball',
        'Europe',
        'Eurocup',
        'Charlotte Hornets VS New Orleans Pelicans'],
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
        },
        subscribeToMore: {
          document: EVENT_UPDATED,
          variables: {
            id: this.eventId
          },
          updateQuery ({ events }, { subscriptionData }) {
            return {
              events: updateCacheList(events, subscriptionData.data.event_updated, false)
            }
          }
        }
      }
    }
  },
  computed: {
    eventId () {
      return this.$route.params.id
    }
  }
}
</script>
