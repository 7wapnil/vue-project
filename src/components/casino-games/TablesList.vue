<template>
  <div>
    <category-play-items :play-items="tablesCollection"/>
    <loader v-if="$apollo.loading"/>
    <b-row
      v-if="!$apollo.loading && !tablesCollection.length"
      no-gutters>
      <b-col class="text-center p-4">
        No result
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
    }
  }
}
</script>
