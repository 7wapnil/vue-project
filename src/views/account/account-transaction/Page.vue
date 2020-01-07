<template>
  <div>
    <b-row
      v-if="!isMobile"
      no-gutters>
      <b-col>
        <h3 class="mb-4 font-weight-light letter-spacing-2">
          {{ $tc('generalTerms.transaction', 2) }}
        </h3>
      </b-col>
    </b-row>
    <b-tabs
      nav-wrapper-class="border-top-tabs-orange-tabs"
      content-class="pt-4">
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
              class="border-4 text-uppercase font-size-11 text-arc-clr-soil-dark p-2">
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
      class="table-pagination"
      align="center"
      @input="loadMoreTransactions"/>
  </div>
</template>

<script>
import { TRANSACTION_LIST_QUERY } from '@/graphql/index'
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
          key: 'createdAt',
          label: this.$i18n.t('generalTerms.date'),
        },
        {
          key: 'amount',
          label: this.$i18n.t('generalTerms.amount'),
        },
        { key: 'mode',
          label: this.$i18n.tc('generalTerms.paymentMethod', 1)
        },
        { key: 'status',
          label: this.$i18n.t('generalTerms.status')
        },
        { key: 'id',
          label: '#'
        }
      ],
      tabs: [{
        id: 0,
        title: this.$i18n.t('generalTerms.all'),
        kind: null
      }, {
        id: 1,
        title: this.$i18n.tc('generalTerms.deposit', 2),
        kind: 'deposit'
      }, {
        id: 2,
        title: this.$i18n.tc('generalTerms.withdraw', 2),
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
          perPage: this.itemsPerPage
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
        perPage: this.itemsPerPage,
        filter: this.filter
      }
    },
    badgeStatus () {
      return {
        initial: 'arc-clr-grey-light',
        pending: 'arc-clr-gold-light',
        processing: 'wp-clr-notif-yellow',
        rejected: 'wp-clr-notif-red',
        failed: 'wp-clr-notif-red',
        succeeded: 'arc-clr-sport-glow'
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
