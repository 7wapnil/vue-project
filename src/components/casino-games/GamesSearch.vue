<template>
  <div>
    <search-play-items
      :play-items="gamesCollection"
      :loading="this.$apollo.loading"
      :count="paginationProps.count" />
    <loader v-if="$apollo.loading"/>
    <b-row no-gutters>
      <b-col
        v-observe-visibility="{
          throttle: 300,
          callback: loadMoreGames
        }"
        v-if="!lastPage"/>
    </b-row>
    <overview-providers/>
  </div>
</template>

<script>
import OverviewProviders from '@/components/casino-games/OverviewProviders'
import SearchPlayItems from '@/components/casino-games/play-items-list/SearchPlayItems'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { SEARCH_GAMES_QUERY } from '@/graphql'

export default {
  components: {
    OverviewProviders,
    SearchPlayItems
  },
  data () {
    return {
      gamesCollection: [],
      paginationProps: Object,
      itemsPerPage: 25,
      page: 1
    }
  },
  computed: {
    lastPage () {
      return this.paginationProps.next === null
    }
  },
  watch: {
    '$route.query.q' () {
      this.gamesCollection = [];
      this.itemsPerPage = 25;
      this.page = 1;
    }
  },
  destroyed () {
    this.$route.query.q = ''
  },
  methods: {
    loadMoreGames (isVisible) {
      if (this.$apollo.loading || !isVisible) return
      this.page = this.paginationProps.next
      this.$apollo.queries.searchCasinoGames.fetchMore({
        variables: {
          perPage: this.itemsPerPage,
          page: this.page
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult
          return {
            searchCasinoGames: {
              collection: this.mergePlayItems(previousResult, fetchMoreResult),
              __typename: previousResult.searchCasinoGames.__typename,
              pagination: fetchMoreResult.searchCasinoGames.pagination
            }
          }
        }
      })
    },
    mergePlayItems (oldItems, newItems) {
      oldItems.searchCasinoGames.collection.push(...newItems.searchCasinoGames.collection)

      return oldItems.searchCasinoGames.collection
    },
  },
  apollo: {
    searchCasinoGames () {
      return {
        query: SEARCH_GAMES_QUERY,
        fetchPolicy: NETWORK_ONLY,
        variables () {
          return {
            context: this.$route.params.titleKind,
            page: 1,
            perPage: this.itemsPerPage,
            query: this.$route.query.q
          }
        },
        result ({ data }) {
          this.gamesCollection = data.searchCasinoGames.collection
          this.paginationProps = data.searchCasinoGames.pagination
        }
      }
    }
  },
}
</script>
