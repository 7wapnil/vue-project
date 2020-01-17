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
          :ref="tab.kind"
          @table-filtered-by-time="tableTimeFilter"
          @table-filtered-by-bet-state="tableBetFilter"/>

        <loader v-if="loading[tab.kind]" />

        <table
          v-if="hasBetHistory && !loading[tab.kind]"
          class="activity-table"
        >
          <thead>
            <tr>
              <th
                v-for="(field,index) in fields"
                :key="`th-${index}`">{{ field }}</th>
            </tr>
          </thead>

          <tbody>
            <template v-for="item in bets.collection">
              <tr
                :key="item.id"
                :class="{ 'activity-table-row-pointer': isCombo(item.betLegs) }"
                @click="displayComboBets(item)">
                <td>
                  <div>{{ localDate(item.createdAt ) }}</div>
                  <div>{{ localTime(item.createdAt ) }}</div>
                </td>

                <td>
                  <div
                    v-if="isCombo(item.betLegs)"
                  >
                    <div>
                      {{ $t('account.activity.comboBet') }} - {{ item.betLegs.length }} {{ $t('account.activity.comboBetSelections') }}
                    </div>

                    <div v-show="!displayBetLegs[item.id]">
                      {{ $t('account.activity.clickToExpand') }}
                    </div>
                    <div v-show="displayBetLegs[item.id]">
                      {{ $t('account.activity.clickToClose') }}
                    </div>
                  </div>

                  <div
                    v-for="betLeg in item.betLegs"
                    :key="betLeg.id"
                  >
                    <div v-if="!isCombo(item.betLegs)">
                      <div>
                        {{ betLeg.event.name }}
                      </div>

                      <div>
                        {{ betLeg.market.name | capitalize }}
                      </div>

                      <div>
                        {{ betLeg.odd.name }}
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  {{ item.amount }}
                </td>

                <td>
                  {{ item.oddValue }}
                </td>

                <td>
                  <b-badge
                    :variant="badgeStatus[item.displayStatus]"
                    class="border-4 text-uppercase font-size-11 text-arc-clr-soil-dark p-2"
                    v-html="statusText(item)" />
                </td>

                <td>
                  {{ item.id }}
                </td>
              </tr>

              <template
                v-for="betLeg in item.betLegs">
                <tr
                  v-if="isCombo(item.betLegs) && displayBetLegs[item.id]"
                  :key="betLeg.id" >
                  <td/>

                  <td>
                    <div>
                      {{ betLeg.event.name }}
                    </div>
                    <div>
                      {{ betLeg.market.name | capitalize }}
                    </div>
                    <div>
                      {{ betLeg.odd.name }}
                    </div>
                  </td>

                  <td/>

                  <td>
                    {{ betLeg.oddValue }}
                  </td>

                  <td>
                    <b-badge
                      :variant="badgeStatus[betLeg.displayStatus]"
                      class="border-4 text-uppercase font-size-11 text-arc-clr-soil-dark p-2 opacity-5"
                      v-html="statusTextComboLeg(betLeg)" />
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>

        <activity-placeholder v-if="!hasBetHistory && !loading[tab.kind]"/>

        <b-pagination
          v-if="paginationProps.count > 0 && !loading[tab.kind]"
          v-model="currentPage"
          :total-rows="paginationProps.count"
          :per-page="betsPerPage"
          class="table-pagination"
          align="center"
          @input="loadMore"
        />
      </b-tab>
      <b-tab
        v-for="tab in casinoTabs"
        :key="tab.id"
        :title="tab.title"
        title-link-class="border-top-tabs-orange-titles"
        @click="changeToEveryMatrixTransactions(tab)">

        <loader v-if="loading.casino"/>

        <b-table
          v-if="hasEveryMatrixTransactionsHistory && !loading.casino"
          :items="everyMatrixTransactions.collection"
          :fields="casinoFields"
          thead-class="activity-table-head"
          tbody-class="activity-table-body"
          tbody-tr-class="activity-table-body-row">

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
                  Transaction ID: {{ data.item.id }}
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

        <activity-placeholder v-if="!hasEveryMatrixTransactionsHistory && !loading.casino"/>

        <b-pagination
          v-if="paginationProps.count > 0 && !loading.casino"
          v-model="currentPage"
          :total-rows="paginationProps.count"
          :per-page="betsPerPage"
          class="table-pagination"
          align="center"
          @input="loadMore"
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
      betKind: 'esports',
      loading: {
        esports: true,
        sports: false,
        casino: false,
      },
      fields: [
        this.$i18n.t('account.activity.table.headers.time'),
        this.$i18n.t('account.activity.table.headers.details'),
        this.$i18n.t('account.activity.table.headers.stake'),
        this.$i18n.t('account.activity.table.headers.odds'),
        this.$i18n.t('account.activity.table.headers.return'),
        this.$i18n.t('account.activity.table.headers.id')
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
      timeFilterState: '',
      betFilterState: '',
      displayBetLegs: {}
    }
  },
  computed: {
    hasBetHistory () {
      return !!(this.bets.collection && this.bets.collection.length)
    },
    hasEveryMatrixTransactionsHistory () {
      return !!(this.everyMatrixTransactions.collection &&
          this.everyMatrixTransactions.collection.length)
    },
    currentPage: {
      get () {
        return this.page
      },
      set (value) {
        this.page = value
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
    }
  },
  watch: {
    betKind: function (newValue) {
      if (newValue === 'sports' || newValue === 'esports') {
        this.$apollo.queries.everyMatrixTransactions.skip = true
        this.$apollo.queries.bets.skip = false
      }
      if (newValue === 'casino') {
        this.$apollo.queries.everyMatrixTransactions.skip = false
        this.$apollo.queries.bets.skip = true
      }
    }
  },
  created () {
    this.$apollo.queries.everyMatrixTransactions.skip = true
  },
  apollo: {
    bets () {
      this.loading[this.betKind] = true
      return {
        query: BETS_LIST_QUERY,
        fetchPolicy: NETWORK_ONLY,
        variables: {
          page: 1,
          perPage: this.betsPerPage,
          kind: this.betKind,
          excludedStatuses: [Bet.statuses.failed, Bet.statuses.rejected]
        },
        result ({ data }) {
          this.loading[this.betKind] = false
          this.paginationProps = data.bets.pagination
          this.displayBetLegs = {}
        }
      }
    },
    everyMatrixTransactions () {
      this.loading.casino = true
      return {
        query: EVERY_MATRIX_TRANSACTIONS_LIST_QUERY,
        fetchPolicy: NETWORK_ONLY,
        variables: {
          page: 1,
          perPage: this.betsPerPage
        },
        result ({ data }) {
          this.loading.casino = false
          this.paginationProps = data.everyMatrixTransactions.pagination
        }
      }
    }
  },
  methods: {
    loadMore () {
      if (this.betKind === 'esports' || this.betKind === 'sports') {
        return this.loadMoreHistory()
      }
      return this.loadMoreCasinoHistory()
    },
    loadMoreHistory () {
      this.loading[this.betKind] = true
      this.bets.collection = []
      this.$apollo.queries.bets.fetchMore({
        variables: this.variables,
        updateQuery: (previousResult, { fetchMoreResult }) => {
          this.loading[this.betKind] = false
          return {
            bets: fetchMoreResult.bets,
            paginationProps: fetchMoreResult.bets.pagination
          }
        }
      })
    },
    loadMoreCasinoHistory () {
      this.loading.casino = true
      this.everyMatrixTransactions.collection = []
      this.$apollo.queries.everyMatrixTransactions.fetchMore({
        variables: this.variables,
        updateQuery: (previousResult, { fetchMoreResult }) => {
          this.loading.casino = false
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
      this.$refs[tab.kind][0].resetData()
      this.timeFilterState = ''
      this.betFilterState = ''
      this.loading[this.betKind] = true
      this.$apollo.queries.bets.refetch({ kind: this.betKind })
    },
    changeToEveryMatrixTransactions (tab) {
      this.betKind = tab.kind
      this.page = 1
      this.loadMoreCasinoHistory()
    },
    tableTimeFilter (state, lazy = false) {
      this.timeFilterState = state.event
      this.page = 1

      if (!lazy) this.loadMoreHistory()
    },
    tableBetFilter (state) {
      this.betFilterState = state.event
      this.page = 1
      this.loadMoreHistory()
    },
    statusText (item) {
      if (item.displayStatus !== Bet.settlementStatuses.won) return item.displayStatus

      return (item.amount * item.oddValue).toFixed(2)
    },
    statusTextComboLeg (betLeg) {
      return betLeg.displayStatus
    },
    localDate (str) {
      return moment.utc(str, 'D.M.YYYY HH:mm:ss').local().format('D.M.YYYY')
    },
    localTime (str) {
      return moment.utc(str, 'D.M.YYYY HH:mm:ss').local().format('HH:mm:ss')
    },
    isCombo (betLegs) {
      return betLegs.length > 1
    },
    displayComboBets (item) {
      if (item.betLegs.length === 1) {
        return
      }

      this.$set(this.displayBetLegs, item.id, !this.displayBetLegs[item.id])
    }
  }
}
</script>

<style lang="scss" scoped>
.activity-table{
  width: 100%;
  thead{
    color: $arc-clr-gold;
    border-bottom: 1px solid #2A2A2A;
  }
  th{
    padding: 0.5rem;
  }
  tbody{
    color: $arc-clr-iron;
    font-size: $h6-font-size;
    tr{
      border-bottom: 1px solid #2A2A2A;
    }
    td{
      padding: 0.5rem;
    }
  }
  &-row-pointer{
    cursor: pointer;
  }
}
</style>
