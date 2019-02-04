<template>
  <b-row no-gutters>
    <b-col style="height: 385px"
           class="bg-arc-clr-soil-darker">
      <b-row no-gutters>
        <b-col>
          <b-breadcrumb :items="items"/>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { UNLIMITED_QUERY } from '@/constants/graphql/limits'
import { EVENT_BY_ID_QUERY, EVENT_UPDATED } from '@/graphql'
import { updateCacheList } from '@/helpers/graphql'
import MarketsCategories from '@/components/markets/MarketsCategories'
import moment from 'moment'

export default {
  components: {
    MarketsCategories
  },
  data () {
    return {
      event: null,
      marketsLimit: UNLIMITED_QUERY,
      items: ['Basketball', 'Europe', 'Eurocup', 'Charlotte Hornets VS New Orleans Pelicans']
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
    },
    eventTime () {
      if (!this.event) { return '' }

      const startTime = moment(this.event.start_at).format('YYYY-MM-DD HH:mm')
      const endTime = this.event.end_at ? moment(this.event.end_at).format('HH:mm') : '...'

      return `${startTime} - ${endTime}`
    },
    titlesKind () {
      return this.$store.state.titleFilters.titleKind
    }
  }
}
</script>
