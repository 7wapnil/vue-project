<template>
  <b-row>
    <b-col>

      <loader v-if="loading"/>

      <markets-list
        :event="event"
        :markets="markets"
        display-markets-names />

    </b-col>
  </b-row>
</template>

<script>
import { MARKETS_LIST_QUERY } from '@/graphql'
import MarketsList from './MarketsList'

export default {
  components: {
    MarketsList
  },
  props: {
    event: {
      type: Object,
      required: true
    },
    category: {
      type: Object,
      required: true
    }
  },
  apollo: {
    markets () {
      return {
        query: MARKETS_LIST_QUERY,
        variables: {
          eventId: this.event.id,
          category: this.category.slug,
          limit: 1000
        }
      }
    }
  },
  data () {
    return {
      loading: 0,
      markets: []
    }
  }
}
</script>
