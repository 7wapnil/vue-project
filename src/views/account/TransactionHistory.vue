<template>
  <div>
    <b-row no-gutters>
      <b-col>
        <h3 class="ml-4 mb-4 font-weight-light letter-spacing-2">
          Transactions
        </h3>
      </b-col>
    </b-row>
    <b-tabs
      nav-wrapper-class="border-top-tabs-orange-tabs"
      content-class="py-4">
      <b-tab
        v-for="tab in tabs"
        :key="tab.id"
        :title="tab.title"
        title-link-class="border-top-tabs-orange-titles"
        @click="changeFilter(tab)">

        <loader v-if="loadingHistory"/>

        <b-table
          v-if="!loadingHistory"
          :items="transactions.collection"
          :fields="fields"
          thead-class="activity-table-head"
          tbody-class="activity-table-body"
          tbody-tr-class="activity-table-body-row">
          <template
            slot="amount"
            slot-scope="data">
            {{ data.item.amount }} {{ data.item.currencyCode }}
          </template>
          <template
            slot="status"
            slot-scope="data">
            <b-badge
              :variant="badgeStatus[data.item.status]"
              class="badge-status text-uppercase font-size-11 text-arc-clr-soil-dark p-2">
              {{ data.item.status }}
            </b-badge>
          </template>
        </b-table>
      </b-tab>
    </b-tabs>
    <b-pagination
      v-if="paginationProps.count > 0"
      v-model="currentPage"
      :total-rows="paginationProps.count"
      :per-page="itemsPerPage"
      class="activity-table-pagination"
      align="center"
      @input="loadMoreTransactions()"
    />
  </div>
</template>

<script>
import { TRANSACTION_LIST_QUERY } from '@/graphql'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'

export default {
  data () {
    return {
      transactionHistory: [],
      filter: null,
      loadingHistory: false,
      paginationProps: Object,
      itemsPerPage: 10,
      page: 1,
      fields: [
        {
          key: 'created_at',
          label: 'Date'
        }, 'amount',
        { key: 'mode',
          label: 'Payment Method'
        },
        { key: 'status',
          label: 'Status'
        },
        { key: 'id',
          label: '#'
        }
      ],
      tabs: [{
        id: 0,
        title: 'All',
        kind: null
      }, {
        id: 1,
        title: 'Deposits',
        kind: 'deposit'
      }, {
        id: 2,
        title: 'Withdraws',
        kind: 'withdraw'
      }]
    }
  },
  apollo: {
    transactions () {
      this.loadingHistory = true
      return {
        query: TRANSACTION_LIST_QUERY,
        fetchPolicy: NETWORK_ONLY,
        variables: {
          filter: null,
          page: 1,
          per_page: this.itemsPerPage
        },
        result ({ data }) {
          this.loadingHistory = false
          this.paginationProps = data.transactions.pagination
        }
      }
    }
  },
  computed: {
    currentPage: {
      get () {
        return this.page
      },
      set (value) {
        this.page = value
      }
    },
    variables () {
      return {
        page: this.currentPage,
        per_page: this.itemsPerPage,
        filter: this.filter
      }
    },
    badgeStatus () {
      return {
        settled: 'arc-clr-gold',
        failed: 'wp-clr-notif-red',
        rejected: 'arc-clr-grey-light',
        accepted: 'arc-clr-sport-bg-second',
        cancelled: 'wp-clr-notif-red',
        initial: 'arc-clr-grey-light'
      }
    }
  },
  methods: {
    loadMoreTransactions () {
      this.loadingHistory = true
      this.$apollo.queries.transactions.fetchMore({
        variables: this.variables,
        updateQuery: (previousResult, { fetchMoreResult }) => {
          this.loadingHistory = false
          return {
            transactions: fetchMoreResult.transactions,
            paginationProps: fetchMoreResult.transactions.pagination
          }
        }
      })
    },
    changeFilter (tab) {
      this.filter = tab.kind
      this.page = 1
      this.loadMoreTransactions()
    }
  }
}
</script>
