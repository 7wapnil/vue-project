<template>
  <div class="casino-games-list">
    <category-play-items
      :play-items="gamesCollection"
      :category="selectedCategory"/>
    <div v-observe-visibility="onLastItem" />
    <b-row
      id="noMoreResults"
      class="text-left d-none">
      <b-col class="pl-5">
        <p>No more games</p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CategoryPlayItems from './play-items-list/CategoryPlayItems'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { GAMES_QUERY } from '@/graphql'

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
            context: this.selectedCategory.context,
            page: 1,
            perPage: this.itemsPerPage
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
    }
  },
  methods: {
    onLastItem (isVisible) {
      if (!isVisible) return;

      if (this.paginationProps.next === null) {
        document.getElementById('noMoreResults').classList.remove('d-none');
      } else {
        document.getElementById('noMoreResults').classList.add('d-none')
        this.loadMoreGames()
      }
    },
    loadMoreGames () {
      this.page = this.paginationProps.next

      this.$apollo.queries.games.fetchMore({
        variables: {
          perPage: this.itemsPerPage,
          page: this.page
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return {
            games: this.mergePlayItems(previousResult, fetchMoreResult).games,
            paginationProps: fetchMoreResult.games.pagination
          }
        }
      })
    },
    mergePlayItems (oldItems, newItems) {
      newItems.games.collection = [...oldItems.games.collection, ...newItems.games.collection]

      return newItems
    }
  }
}
</script>
