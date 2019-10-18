<template>
  <div>
    <activity-header/>

    <b-tabs
      :fill="isMobile"
      nav-wrapper-class="border-top-tabs-orange-tabs"
      content-class="py-4">
      <b-tab
        v-for="tab in tabs"
        :key="tab.id"
        :title="tab.title"
        title-link-class="border-top-tabs-orange-titles"
        @click="changeKind(tab)">

        <activity-filters
          @table-filtered-by-time="tableTimeFilter"
          @table-filtered-by-bet-state="tableBetFilter"/>

        <b-table
          v-if="hasBetHistory && !loadingBets"
          :items="bets.collection"
          :fields="fields"
          thead-class="activity-table-head"
          tbody-class="activity-table-body"
          tbody-tr-class="activity-table-body-row">

          <loader v-if="loadingBets"/>

          <template
            slot="time"
            slot-scope="data">
            <b-row no-gutters>
              <b-col v-html="localDate(data.item.createdAt)"/>
            </b-row>
            <b-row no-gutters>
              <b-col v-html="localTime(data.item.createdAt)"/>
            </b-row>
          </template>
          <template
            slot="details"
            slot-scope="data">
            <b-row no-gutters>
              <b-col>
                {{ data.item.event.name }}
              </b-col>
            </b-row>
            <b-row no-gutters>
              <b-col>
                <span class="font-size-11">
                  {{ data.item.market.name | capitalize }}
                </span>
              </b-col>
            </b-row>
            <b-row no-gutters>
              <b-col>
                <span class="font-size-11">
                  {{ data.item.odd.name }}
                </span>
              </b-col>
            </b-row>
          </template>
          <template
            slot="status"
            slot-scope="data">
            <b-badge
              :variant="badgeStatus[data.item.displayStatus]"
              class="border-4 text-uppercase font-size-11 text-arc-clr-soil-dark p-2"
              v-html="statusText(data.item)" />
          </template>
        </b-table>
        <loader v-if="loadingBets"/>

        <activity-placeholder v-if="!hasBetHistory && !loadingBets"/>

        <b-pagination
          v-if="paginationProps.count > 0 && !loadingBets"
          v-model="currentPage"
          :total-rows="paginationProps.count"
          :per-page="betsPerPage"
          class="table-pagination"
          align="center"
          @input="loadMoreHistory"
        />
      </b-tab>
      <b-tab
        v-for="tab in casinoTabs"
        :key="tab.id"
        :title="tab.title"
        title-link-class="border-top-tabs-orange-titles"
        @click="changeToEveryMatrixTransactions(tab)">

        <b-table
          v-if="hasEveryMatrixTransactionsHistory && !loadingEveryMatrixTransactions"
          :items="everyMatrixTransactions.collection"
          :fields="casinoFields"
          thead-class="activity-table-head"
          tbody-class="activity-table-body"
          tbody-tr-class="activity-table-body-row">

          <loader v-if="loadingEveryMatrixTransactions"/>

          <template
            slot="time"
            slot-scope="data">
            <b-row no-gutters>
              <b-col v-html="localDate(data.item.createdAt)"/>
            </b-row>
            <b-row no-gutters>
              <b-col v-html="localTime(data.item.createdAt)"/>
            </b-row>
          </template>
          <template
            slot="details"
            slot-scope="data">
            <b-row no-gutters>
              <b-col>
                {{ data.item.gameName }}
              </b-col>
            </b-row>
            <b-row no-gutters>
              <b-col>
                <span class="font-size-11">
                  {{ data.item.vendorName }}
                </span>
              </b-col>
            </b-row>
            <b-row no-gutters>
              <b-col>
                <span class="font-size-11">
                  {{ data.item.type }}
                </span>
              </b-col>
            </b-row>
            <b-row no-gutters>
              <b-col>
                <span class="font-size-11">
                  Transaction ID: {{ data.item.transactionId }}
                </span>
              </b-col>
            </b-row>
          </template>
          <template
            slot="debit"
            slot-scope="data">
            {{ data.item.debit || '-' }}
          </template>
          <template
            slot="credit"
            slot-scope="data">
            {{ data.item.credit || '-' }}
          </template>
          <template
            slot="balance"
            slot-scope="data">
            {{ data.item.balance }} {{ data.item.currencyCode }}
          </template>
          <template
            slot="balance"
            slot-scope="data">
            {{ data.item.balance }} {{ data.item.currencyCode }}
          </template>
        </b-table>
        <loader v-if="loadingEveryMatrixTransactions"/>

        <activity-placeholder v-if="!hasEveryMatrixTransactionsHistory && !loadingEveryMatrixTransactions"/>

        <b-pagination
          v-if="paginationProps.count > 0 && !loadingEveryMatrixTransactions"
          v-model="currentPage"
          :total-rows="paginationProps.count"
          :per-page="betsPerPage"
          class="table-pagination"
          align="center"
          @input="loadMoreCasinoHistory"
        />
      </b-tab>
    </b-tabs>

  </div>
</template>

<script>
import Bet from '@/models/bet'
import { BETS_LIST_QUERY, EVERY_MATRIX_TRANSACTIONS_LIST_QUERY } from '@/graphql/index'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import ActivityFilters from '@/views/account/account-activity/ActivityFilters'
import ActivityHeader from '@/views/account/account-activity/ActivityHeader'
import ActivityPlaceholder from '@/views/account/account-activity/ActivityPlaceholder'
import { SPORTS, ESPORTS, CASINO } from '@/constants/title-kinds'
import moment from 'moment'

export default {
  components: {
    ActivityFilters,
    ActivityHeader,
    ActivityPlaceholder
  },
  data () {
    return {
      bets: {},
      page: 1,
      paginationProps: Object,
      betsPerPage: 10,
      betKind: null,
      loadingBets: true,
      fields: [
        'time',
        'details',
        { key: 'amount',
          label: 'Stake'
        },
        { key: 'oddValue',
          label: 'Odds'
        },
        { key: 'status',
          label: 'Return'
        },
        { key: 'id',
          label: '#'
        }
      ],
      tabs: [{
        id: 1,
        title: this.$i18n.t('homePage.esport'),
        kind: ESPORTS
      }, {
        id: 2,
        title: this.$i18n.t('homePage.sport'),
        kind: SPORTS
      }],
      casinoTabs: [{
        id: 3,
        title: this.$i18n.t('homePage.casino'),
        kind: CASINO
      }],
      casinoFields: [
        'time',
        'details',
        'debit',
        'credit',
        'balance'
      ],
      everyMatrixTransactions: {},
      loadingEveryMatrixTransactions: true,
      timeFilterState: '',
      betFilterState: ''
    }
  },
  computed: {
    hasBetHistory () {
      return this.bets.collection && this.bets.collection.length
    },
    hasEveryMatrixTransactionsHistory () {
      return this.everyMatrixTransactions.collection && this.everyMatrixTransactions.collection.length
    },
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
        perPage: this.betsPerPage,
        kind: this.betKind,
        settlementStatus: this.betFilterState,
        dateRange: this.timeFilterState,
        excludedStatuses: [Bet.statuses.failed, Bet.statuses.rejected]
      }
    },
    badgeStatus () {
      return {
        settled: 'arc-clr-gold',
        failed: 'wp-clr-notif-red',
        rejected: 'arc-clr-grey-light',
        accepted: 'arc-clr-sport-bg-second',
        cancelled: 'wp-clr-notif-red',
        initial: 'arc-clr-grey-light',
        won: 'arc-clr-sport-glow',
        lost: 'wp-clr-notif-red',
        voided: 'arc-clr-gold-light'
      }
    }
  },
  apollo: {
    bets () {
      this.loadingBets = true
      return {
        query: BETS_LIST_QUERY,
        fetchPolicy: NETWORK_ONLY,
        variables: {
          page: 1,
          perPage: this.betsPerPage,
          kind: null,
          excludedStatuses: [Bet.statuses.failed, Bet.statuses.rejected]
        },
        result ({ data }) {
          this.loadingBets = false
          this.paginationProps = data.bets.pagination
        }
      }
    },
    everyMatrixTransactions () {
      this.loadingEveryMatrixTransactions = true
      return {
        query: EVERY_MATRIX_TRANSACTIONS_LIST_QUERY,
        fetchPolicy: NETWORK_ONLY,
        variables: {
          page: 1,
          perPage: this.betsPerPage
        },
        result ({ data }) {
          this.loadingEveryMatrixTransactions = false
          this.paginationProps = data.everyMatrixTransactions.pagination
        }
      }
    }
  },
  methods: {
    loadMoreHistory () {
      this.loadingBets = true
      this.$apollo.queries.bets.fetchMore({
        variables: this.variables,
        updateQuery: (previousResult, { fetchMoreResult }) => {
          this.loadingBets = false
          return {
            bets: fetchMoreResult.bets,
            paginationProps: fetchMoreResult.bets.pagination
          }
        }
      })
    },
    loadMoreCasinoHistory () {
      this.loadingEveryMatrixTransactions = true
      this.$apollo.queries.everyMatrixTransactions.fetchMore({
        variables: this.variables,
        updateQuery: (previousResult, { fetchMoreResult }) => {
          this.loadingEveryMatrixTransactions = false
          return {
            everyMatrixTransactions: fetchMoreResult.everyMatrixTransactions,
            paginationProps: fetchMoreResult.everyMatrixTransactions.pagination
          }
        }
      })
    },
    changeKind (tab) {
      this.betKind = tab.kind
      this.page = 1
      this.loadMoreHistory()
    },
    changeToEveryMatrixTransactions (tab) {
      this.page = 1
      this.loadMoreCasinoHistory()
    },
    tableTimeFilter (state) {
      this.timeFilterState = state.event
      this.page = 1
      this.loadMoreHistory()
    },
    tableBetFilter (state) {
      this.betFilterState = state.event
      this.page = 1
      this.loadMoreHistory()
    },
    statusText (item) {
      if (item.displayStatus === 'won') {
        return (item.amount * item.oddValue).toFixed(2)
      }

      return item.displayStatus
    },
    localDate (str) {
      return moment.utc(str, 'D.M.YYYY HH:mm:ss').local().format('D.M.YYYY')
    },
    localTime (str) {
      return moment.utc(str, 'D.M.YYYY HH:mm:ss').local().format('HH:mm:ss')
    }
  }
}
</script>
