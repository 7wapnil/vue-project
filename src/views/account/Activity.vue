<template>
  <div>
    <activity-header/>

    <b-tabs
      nav-wrapper-class="border-top-tabs-orange-tabs"
      content-class="py-4">
      <b-tab
        v-for="tab in tabs"
        :key="tab.id"
        :title="tab.title"
        title-link-class="border-top-tabs-orange-titles"
        @click="changeKind(tab)">

        <loader v-if="loadingBets"/>

        <activity-filters
          @table-filtred-by-time="tableTimeFilter"
          @table-filtred-by-bet-state="tableBetFilter"/>

        <b-table
          v-if="!loadingBets"
          :items="bets.collection"
          :fields="fields"
          thead-class="activity-table-head"
          tbody-class="activity-table-body"
          tbody-tr-class="activity-table-body-row">
          <template
            slot="details"
            slot-scope="data">
            <b-row no-gutters>
              <b-col>
                <span class="font-size-11">
                  {{ data.item.market.name | capitalize }}
                </span>
              </b-col>
            </b-row>
            <b-row no-gutters>
              <b-col>
                {{ data.item.event.name }}
              </b-col>
            </b-row>
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
      :per-page="betsPerPage"
      class="activity-table-pagination"
      align="center"
      @input="loadMoreHistory()"
    />
  </div>
</template>

<script>
import { BETS_LIST_QUERY } from '@/graphql/index'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import ActivityFilters from '@/views/account/activity/ActivityFilters'
import ActivityHeader from '@/views/account/activity/ActivityHeader'

export default {
  components: {
    ActivityFilters,
    ActivityHeader
  },
  data () {
    return {
      bets: [],
      page: 1,
      paginationProps: Object,
      betsPerPage: 10,
      betKind: null,
      loadingBets: true,
      fields: [
        {
          key: 'created_at',
          label: 'Date'
        },
        'details',
        { key: 'amount',
          label: 'Stake'
        },
        { key: 'oddValue',
          label: 'Odds'
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
        title: 'Esport',
        kind: 'esports'
      }, {
        id: 2,
        title: 'Sport',
        kind: 'sports'
      }],
      timeFilterState: '',
      betFilterState: ''
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
        per_page: this.betsPerPage,
        kind: this.betKind
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
  apollo: {
    bets () {
      this.loadingBets = true
      return {
        query: BETS_LIST_QUERY,
        fetchPolicy: NETWORK_ONLY,
        variables: {
          page: 1,
          per_page: this.betsPerPage,
          kind: null
        },
        result ({ data }) {
          this.loadingBets = false
          this.paginationProps = data.bets.pagination
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
    changeKind (tab) {
      this.betKind = tab.kind
      this.page = 1
      this.loadMoreHistory()
      return this.betKind
    },
    tableTimeFilter (state) {
      this.timeFilterState = state.event
    },
    tableBetFilter (state) {
      this.betFilterState = state.event
    }
  }
}
</script>
