<template>
  <div>
    <category-play-items :play-items="gamesCollection"/>
    <loader v-if="$apollo.loading"/>
    <b-row no-gutters>
      <b-col
        v-observe-visibility="{
          throttle: 300,
          callback: loadMoreGames
        }"
        v-if="!lastPage"/>
      <b-col
        v-if="!$apollo.loading && !gamesCollection.length"
        class="text-center p-4">
        {{ this.$i18n.t('casino.playItemsList.noResults') }}
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CategoryPlayItems from './play-items-list/CategoryPlayItems'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { GAMES_QUERY } from '@/graphql'
import { mapMutations, mapGetters } from 'vuex'

export default {
  components: {
    CategoryPlayItems
  },
  props: {
    category: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      gamesCollection: [],
      paginationProps: Object,
      itemsPerPage: 25,
      page: 1
    }
  },
  apollo: {
    games () {
      return {
        query: GAMES_QUERY,
        fetchPolicy: NETWORK_ONLY,
        variables () {
          return {
            context: this.category,
            page: this.getIsReturned ? this.getLazyLoadPage : 1,
            perPage: this.getIsReturned ? this.itemsPerPage * this.getLazyLoadPage : this.itemsPerPage
          }
        },
        result ({ data }) {
          this.gamesCollection = data.games.collection
          this.paginationProps = data.games.pagination
        }
      }
    }
  },
  computed: {
    lastPage () {
      return this.paginationProps.next === null
    },
    ...mapGetters(['getLazyLoadPage', 'getIsReturned']),
  },
  watch: {
    'page': 'storePageNumber',
    '$route': 'clearPageStore'
  },
  methods: {
    loadMoreGames (isVisible) {
      if (this.$apollo.loading || !isVisible) return

      this.page = this.paginationProps.next
      this.$apollo.queries.games.fetchMore({
        variables () {
          return {
            perPage: this.getIsReturned ? this.itemsPerPage * this.getLazyLoadPage : this.itemsPerPage,
            page: this.getIsReturned ? this.getLazyLoadPage : 1
          }
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult

          return {
            games: {
              collection: this.mergePlayItems(previousResult, fetchMoreResult),
              __typename: previousResult.games.__typename,
              pagination: fetchMoreResult.games.pagination
            }
          }
        }
      })
    },
    mergePlayItems (oldItems, newItems) {
      oldItems.games.collection.push(...newItems.games.collection)

      return oldItems.games.collection
    },
    ...mapMutations(['storeLazyLoadPage', 'isReturned']),
    storePageNumber () {
      this.storeLazyLoadPage(this.page)
    },
    clearPageStore (to, from) {
      if (from.name !== 'casino-game') {
        this.storeLazyLoadPage(1)
        this.isReturned(false)
      }
    }
  }
}
</script>
