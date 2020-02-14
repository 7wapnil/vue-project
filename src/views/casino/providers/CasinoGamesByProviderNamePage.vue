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
        v-else
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
import { buildDefaultMetaTags } from '@/helpers/meta'
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
      providerObject: null,
      emptyGamesList: false,
      country: ''
    }
  },
  metaInfo () {
    return buildDefaultMetaTags({
      title: this.metaTitle,
      description: this.metaDescription,
      i18n: this.$i18n,
      siteUrl: window.location.href
    })
  },
  computed: {
    metaTitle () {
      if (!this.providerObject) return this.$i18n.t('meta.casino.title')

      return this.providerObject.metaTitle ||
             this.$i18n.t('meta.casino.provider.title', { name: this.providerObject.name })
    },
    metaDescription () {
      if (!this.providerObject) return this.$i18n.t('meta.live-casino.description')

      return this.providerObject.metaDescription ||
        this.$i18n.t('meta.casino.provider.description', { name: this.providerObject.name })
    },
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
    this.$route.params.label = this.providerObject
      ? this.providerObject.name
      : this.$route.params.providerFullName || this.formatLabelName
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
          const payload = data.gamesByProvider

          if (!payload.collection.length) this.emptyGamesList = true

          this.providerObject = payload.provider
          this.gamesCollection = payload.collection
          this.paginationProps = payload.pagination
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
              provider: fetchMoreResult.gamesByProvider.provider,
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
