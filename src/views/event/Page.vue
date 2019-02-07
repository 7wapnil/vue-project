<template>
  <div>
    <b-breadcrumb :items="items"/>

    <header-section :event="event"/>

    <b-row
      class="mt-4"
      no-gutters>
      <b-col>
        <event-tabs :event="event">
          <template slot-scope="{ tab }">

            <markets-categories :event="event"/>

          </template>
        </event-tabs>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { UNLIMITED_QUERY } from '@/constants/graphql/limits'
import { EVENT_BY_ID_QUERY, EVENT_UPDATED } from '@/graphql'
import { updateCacheList } from '@/helpers/graphql'
import MarketsCategories from '@/components/markets/MarketsCategories'
import EventTabs from '@/components/tabs/EventTabs'
import HeaderSection from './HeaderSection'

export default {
  components: {
    MarketsCategories,
    EventTabs,
    HeaderSection
  },
  data () {
    return {
      event: null,
      marketsLimit: UNLIMITED_QUERY,
      items: ['Basketball',
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
          id: this.eventId,
          context: 'upcoming_for_time' // Hard code, remove after backend fix
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
