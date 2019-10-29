<template>
  <div class="casino-games-list">
    <category-play-items
      :play-items="tables"
      :category="selectedCategory"/>
  </div>
</template>

<script>
import CategoryPlayItems from './play-items-list/CategoryPlayItems'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { TABLES_QUERY } from '@/graphql'
import { PLAY_ITEMS_UPDATED } from '../../graphql/casino-subscription'
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
      tables: [],
    }
  },
  apollo: {
    tables () {
      return {
        query: TABLES_QUERY,
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
              tables: updateCacheList(currentList.tables, data.playItemsUpdated)
            }
          }
        }
      }
    }
  }
}
</script>
