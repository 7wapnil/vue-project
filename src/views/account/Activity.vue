<template>
  <div>
    <b-row>
      <b-col>
        <h1 class="mb-4">
          My activity
        </h1>
      </b-col>
    </b-row>
    <b-tabs
      card>
      <b-tab
        v-for="tab in tabs"
        :key="tab.id"
        :title="tab.title"
        @click="changeKind(tab)">

        <loader v-if="loadingBets"/>

        <b-table
          v-if="!loadingBets"
          :items="bets.collection"
          :fields="fields">
          <template
            slot="details"
            slot-scope="data">
            <b-row>
              <b-col>
                {{ data.item.market.name | capitalize }}
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                {{ data.item.event.name }}
              </b-col>
            </b-row>
          </template>
          <template
            slot="status"
            slot-scope="data">
            <b-badge variant="secondary">
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
      align="center"
      @input="loadMoreHistory()"
    />
  </div>
</template>

<script>
import { BETS_LIST_QUERY } from '@/graphql/index'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'

export default {
  filters: {
    capitalize (value) {
      if (!value) {
        return ''
      }
      return value.toUpperCase()
    }
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
        kind: 'sport'
      }],
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
      return this.betKind
    }
  }
}
</script>
