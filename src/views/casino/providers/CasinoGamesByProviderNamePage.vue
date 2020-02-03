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
        v-if="!gamesCollection.length && !$apollo.loading"
        class="text-center p-4">
        {{ $t('casino.noProviders') }}
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CategoryPlayItems from '@/components/casino-games/play-items-list/CategoryPlayItems'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { GAMES_BY_PROVIDER } from '@/graphql'

export default {
  components: {
    CategoryPlayItems
  },
  data () {
    return {
      itemsPerPage: 20,
      gamesCollection: [],
      paginationProps: Object
    }
  },
  computed: {
    formatLabelName () {
      const name = this.$route.params.providerName
      const capitalizedName = name.substr(0, 1).toUpperCase() +
                    name.substr(1).toLowerCase()

      return capitalizedName.split('-').join(' ')
    },
    lastPage () {
      return this.paginationProps.next === null
    }
  },
  created () {
    this.$route.params.category = 'providers'
    this.$route.params.label = this.$route.params.providerFullName || this.formatLabelName
  },
  apollo: {
    gamesByProvider () {
      return {
        query: GAMES_BY_PROVIDER,
        fetchPolicy: NETWORK_ONLY,
        variables () {
          return {
            page: 1,
            perPage: this.itemsPerPage,
            providerSlug: this.$route.params.providerName
          }
        },
        result ({ data }) {
          this.gamesCollection = data.gamesByProvider.collection
          this.paginationProps = data.gamesByProvider.pagination
        }
      }
    }
  },
  methods: {
    loadMoreGames (isVisible) {
      if (this.$apollo.loading || !isVisible) return

      this.page = this.paginationProps.next
      this.$apollo.queries.gamesByProvider.fetchMore({
        variables: {
          perPage: this.itemsPerPage,
          page: this.page,
          providerSlug: this.$route.params.providerName
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult

          return {
            gamesByProvider: {
              collection: this.mergePlayItems(previousResult, fetchMoreResult),
              __typename: previousResult.gamesByProvider.__typename,
              pagination: fetchMoreResult.gamesByProvider.pagination
            }
          }
        }
      })
    },
    mergePlayItems (oldItems, newItems) {
      oldItems.gamesByProvider.collection.push(...newItems.gamesByProvider.collection)

      return oldItems.gamesByProvider.collection
    }
  }
}
</script>
