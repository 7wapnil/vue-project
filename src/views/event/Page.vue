<template>
  <div>
    <b-row no-gutters>
      <b-col>
        <b-breadcrumb :items="items"/>
      </b-col>
    </b-row>

    <b-row
      class="pt-4 pb-5"
      no-gutters>
      <b-col class="text-center pt-4">
        <b-row no-gutters>
          <b-col class="font-weight-bold my-4">
            {{ event.competitors[0].name }}
          </b-col>

          <div class="w-100"/>

          <b-col class="mt-1">
            <icon
              name="sidemenu-game-icon"
              size="56px"/>
          </b-col>
        </b-row>
      </b-col>

      <b-col class="text-center">
        <b-row no-gutters>
          <b-col class="mb-2">
            {{ event.description }}
          </b-col>

          <div class="w-100"/>

          <b-col class="mt-4">
            <span
              style="font-size: 11px"
              class="text-arc-clr-iron text-uppercase">
              Starts
            </span>
          </b-col>

          <div class="w-100"/>

          <b-col class="mb-4">
            {{ event.start_at | asFormattedDate }}
          </b-col>

          <div class="w-100"/>

          <b-col class="mt-1">
            <span
              style="font-size: 11px"
              class="text-arc-clr-iron text-uppercase">
              Match type
            </span>
          </b-col>

          <div class="w-100"/>

          <b-col>
            Best of 3
          </b-col>
        </b-row>
      </b-col>

      <b-col class="text-center pt-4">
        <b-row no-gutters>
          <b-col class="font-weight-bold my-4">
            {{ event.competitors[1].name }}
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col class="mt-1">
            <icon
              name="sidemenu-game-icon"
              size="56px"/>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

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
import EventDetailsCard from '@/components/cards/EventDetailsCard'

export default {
  components: {
    MarketsCategories,
    EventTabs,
    EventDetailsCard
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
