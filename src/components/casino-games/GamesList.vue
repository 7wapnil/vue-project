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
import { buildDefaultMetaTags } from '@/helpers/meta'
import CategoryPlayItems from './play-items-list/CategoryPlayItems'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { GAMES_QUERY } from '@/graphql'

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
      categoryObject: null,
      itemsPerPage: 25,
      page: 1
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
  apollo: {
    games () {
      return {
        query: GAMES_QUERY,
        fetchPolicy: NETWORK_ONLY,
        variables () {
          return {
            context: this.category,
            page: 1,
            perPage: this.itemsPerPage
          }
        },
        result ({ data }) {
          const payload = data.games

          if (!payload) return

          this.categoryObject = payload.category
          this.gamesCollection = payload.collection
          this.paginationProps = payload.pagination
        },
        error () {
          this.$router.push({ name: 'not-found' })
        }
      }
    }
  },
  computed: {
    metaTitle () {
      if (!this.categoryObject) return this.$i18n.t('meta.casino.title')

      return this.categoryObject.metaTitle ||
             this.$i18n.t('meta.casino.category.title', { name: this.categoryObject.label })
    },
    metaDescription () {
      if (!this.categoryObject) return this.$i18n.t('meta.casino.description')

      return this.categoryObject.metaDescription ||
             this.$i18n.t('meta.casino.category.description', { name: this.categoryObject.label })
    },
    lastPage () {
      return this.paginationProps.next === null
    }
  },
  methods: {
    loadMoreGames (isVisible) {
      if (this.$apollo.loading || !isVisible) return

      this.page = this.paginationProps.next
      this.$apollo.queries.games.fetchMore({
        variables: {
          perPage: this.itemsPerPage,
          page: this.page
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult

          return {
            games: {
              category: fetchMoreResult.games.category,
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
    }
  }
}
</script>
