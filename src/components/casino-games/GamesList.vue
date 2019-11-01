<template>
  <div class="casino-games-list">
    <category-play-items
      :play-items="games"
      :category="selectedCategory"/>
  </div>
</template>

<script>
import CategoryPlayItems from './play-items-list/CategoryPlayItems'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { GAMES_QUERY, PLAY_ITEMS_UPDATED } from '@/graphql'
import { updateCacheList } from '@/helpers/graphql'

export default {
  components: {
    CategoryPlayItems
  },
  props: {
    selectedCategory: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      games: [],
    }
  },
  apollo: {
    games () {
      return {
        query: GAMES_QUERY,
        fetchPolicy: NETWORK_ONLY,
        variables () {
          return {
            context: this.selectedCategory.context
          }
        },
        subscribeToMore: {
          document: PLAY_ITEMS_UPDATED,
          variables () {
            return {
              context: this.selectedCategory.context
            }
          },
          updateQuery: (currentList, { subscriptionData: { data } }) => {
            return {
              games: updateCacheList(currentList.games, data.playItemsUpdated)
            }
          }
        }
      }
    }
  }
}
</script>
