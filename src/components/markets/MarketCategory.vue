<template>
  <div>
    <loader v-if="loading"/>

    <slot
      v-if="!loading"
      :markets="markets"/>
  </div>
</template>

<script>
import { MARKETS_LIST_QUERY, EVENT_MARKETS_UPDATED } from '@/graphql'
import { updateCacheListWithList } from '@/helpers/graphql'
import MarketsList from './MarketsList'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'

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
        fetchPolicy: NETWORK_ONLY,
        variables: {
          eventId: this.event.id,
          category: this.category.name
        },
        subscribeToMore: {
          document: EVENT_MARKETS_UPDATED,
          variables () {
            return {
              id: this.event.id,
              category: this.category.name
            }
          },
          updateQuery ({ markets }, { subscriptionData }) {
            const event = subscriptionData.data.event_updated

            console.log(event.markets)

            return {
              markets: updateCacheListWithList(markets, event.markets)
            }
          }
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
