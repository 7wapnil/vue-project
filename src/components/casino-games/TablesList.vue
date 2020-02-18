<template>
  <div>
    <category-play-items :play-items="tablesCollection"/>
    <loader v-if="$apollo.loading"/>
    <b-row no-gutters>
      <b-col
        v-observe-visibility="{
          throttle: 300,
          callback: loadMoreTables
        }"
        v-if="!lastPage"/>
      <b-col
        v-if="!$apollo.loading && !tablesCollection.length"
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
import { TABLES_QUERY } from '@/graphql'

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
      tablesCollection: [],
      paginationProps: Object,
      categoryObject: null,
      itemsPerPage: 25,
      page: 1
    }
  },
  metaInfo () {
    if (!this.$i18n) return

    return buildDefaultMetaTags({
      title: this.metaTitle,
      description: this.metaDescription,
      i18n: this.$i18n,
      siteUrl: window.location.href
    })
  },
  apollo: {
    tables () {
      return {
        query: TABLES_QUERY,
        fetchPolicy: NETWORK_ONLY,
        variables () {
          return {
            context: this.category,
            page: 1,
            perPage: this.itemsPerPage
          }
        },
        result ({ data }) {
          const payload = data.tables

          if (!payload) return

          this.categoryObject = payload.category
          this.tablesCollection = payload.collection
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
      if (!this.categoryObject) return this.$i18n.t('meta.live-casino.title')

      return this.categoryObject.metaTitle ||
             this.$i18n.t('meta.live-casino.category.title', { name: this.categoryObject.label })
    },
    metaDescription () {
      if (!this.categoryObject) return this.$i18n.t('meta.live-casino.description')

      return this.categoryObject.metaDescription ||
        this.$i18n.t('meta.live-casino.category.description', { name: this.categoryObject.label })
    },
    lastPage () {
      return this.paginationProps.next === null
    }
  },
  methods: {
    loadMoreTables (isVisible) {
      if (this.$apollo.loading || !isVisible) return

      this.page = this.paginationProps.next
      this.$apollo.queries.tables.fetchMore({
        variables: {
          perPage: this.itemsPerPage,
          page: this.page
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult

          return {
            tables: {
              category: fetchMoreResult.tables.category,
              collection: this.mergePlayItems(previousResult, fetchMoreResult),
              __typename: previousResult.tables.__typename,
              pagination: fetchMoreResult.tables.pagination
            }
          }
        }
      })
    },
    mergePlayItems (oldItems, newItems) {
      oldItems.tables.collection.push(...newItems.tables.collection)

      return oldItems.tables.collection
    }
  }
}
</script>
