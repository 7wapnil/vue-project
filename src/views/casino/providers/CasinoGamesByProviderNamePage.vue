<template>
  <div>
    <category-play-items :play-items="gamesCollection"/>
    <loader v-if="$apollo.loading && !errorMessage"/>
    <b-row no-gutters>
      <b-col
        v-observe-visibility="{
          throttle: 300,
          callback: loadMoreGames
        }"
        v-if="!errorMessage && !lastPage"
      />
      <b-col
        v-if="errorMessage"
        class="px-4">
        <h4
          class="mb-0 text-arc-clr-iron">
          {{ errorMessage }}
        </h4>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CategoryPlayItems from '@/components/casino-games/play-items-list/CategoryPlayItems'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { GAMES_BY_PROVIDER, COUNTRY_BY_REQUEST_QUERY } from '@/graphql'

export default {
  components: {
    CategoryPlayItems
  },
  data () {
    return {
      itemsPerPage: 20,
      gamesCollection: [],
      paginationProps: Object,
      emptyGamesList: false,
      country: ''
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
    },
    errorMessage () {
      if (!this.emptyGamesList) return false

      return this.$i18n.t('casino.playItemsList.noGamesProvider', { country: this.country })
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
          if (!data.gamesByProvider.collection.length) {
            this.emptyGamesList = true
          }

          this.gamesCollection = data.gamesByProvider.collection
          this.paginationProps = data.gamesByProvider.pagination
        }
      }
    },
    countryByRequest () {
      return {
        query: COUNTRY_BY_REQUEST_QUERY,
        fetchPolicy: NETWORK_ONLY,
        result ({ data: { countryByRequest: { country } } }) {
          this.country = country
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
