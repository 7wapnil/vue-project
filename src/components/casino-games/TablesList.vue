<template>
  <div>
    <category-play-items :play-items="tablesCollection"/>
    <loader v-if="$apollo.loading"/>
    <b-row no-gutters>
      <b-col
        v-if="lastPage"
        class="text-center p-4">
        {{ this.$i18n.t('casino.playItemsList.noMoreResults') }}
      </b-col>
      <b-col
        v-observe-visibility="{
          throttle: 300,
          callback: loadMoreTables
        }"
        v-else/>
      <b-col
        v-if="!$apollo.loading && !tablesCollection.length"
        class="text-center p-4">
        {{ this.$i18n.t('casino.playItemsList.noResults') }}
      </b-col>
    </b-row>
  </div>
</template>

<script>
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
      itemsPerPage: 25,
      page: 1
    }
  },
  apollo: {
    tables () {
      return {
        query: TABLES_QUERY,
        fetchPolicy: NETWORK_ONLY,
        variables () {
          return {
            context: this.computedCategory,
            page: 1,
            perPage: this.itemsPerPage
          }
        },
        result ({ data }) {
          this.tablesCollection = data.tables.collection
          this.paginationProps = data.tables.pagination
        }
      }
    }
  },
  computed: {
    computedCategory () {
      return this.isMobile ? `${this.category}-mobile` : `${this.category}-desktop`
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
