<template>
  <b-row no-gutters>
    <b-col class="d-flex">
      <loader v-if="$apollo.loading"/>
      <div
        v-if="!recommendedItems.length"
        class="p-4 text-center w-100">
        No recommended items
      </div>
      <div
        v-for="recommendedItem in recommendedItems"
        :key="recommendedItem.id">
        {{ recommendedItems }}
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { RECOMMENDED_GAMES_QUERY } from '@/graphql'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'

export default {
  name: 'CasinoRecommendedGames',
  data () {
    return {
      recommendedItems: []
    }
  },
  apollo: {
    recommendedItems () {
      return {
        query: RECOMMENDED_GAMES_QUERY,
        fetchPolicy: NETWORK_ONLY,
        variables: {
          original_game_id: Number(this.$attrs.item.id),
        },
        update: data => data.recommendedItems,
        result ({ data }) {
          this.recommendedItems = data.recommendedItems
        }
      }
    }
  }
}
</script>
