<template>
  <div>
    <loader v-if="loading"/>

    <slot
      v-if="!loading"
      :markets="markets"/>
  </div>
</template>

<script>
import { MARKETS_LIST_QUERY, CATEGORY_MARKET_UPDATED } from '@/graphql'
import { updateCacheList } from '@/helpers/graphql'
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
          category: this.category.slug
        },
        subscribeToMore: {
          document: CATEGORY_MARKET_UPDATED,
          variables: {
            eventId: this.event.id,
            category: this.category.slug,
          },
          updateQuery ({ markets }, { subscriptionData }) {
            return {
              markets: updateCacheList(markets, subscriptionData.data.category_market_updated)
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
