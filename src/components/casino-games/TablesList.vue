<template>
  <div class="casino-games-list">
    <category-play-items
      :play-items="tablesCollection"
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
import { TABLES_QUERY } from '@/graphql'

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
      tablesCollection: [],
      paginationProps: Object,
      itemsPerPage: 5,
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
            context: this.selectedCategory.context,
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
        this.loadMoreTables()
      }
    },
    loadMoreTables () {
      this.page = this.paginationProps.next

      this.$apollo.queries.tables.fetchMore({
        variables: {
          perPage: this.itemsPerPage,
          page: this.page
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return {
            tables: this.mergePlayItems(previousResult, fetchMoreResult).tables,
            paginationProps: fetchMoreResult.tables.pagination
          }
        }
      })
    },
    mergePlayItems (oldItems, newItems) {
      newItems.tables.collection = [...oldItems.tables.collection, ...newItems.tables.collection]

      return newItems
    }
  }
}
</script>
