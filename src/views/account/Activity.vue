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
        :title="tab.title">

        <loader
          v-if="loadingBets"
          style="height: 1300px;"/>

        <b-table
          v-if="!loadingBets"
          :items="bets"
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
      v-model="currentPage"
      align="center"
    />
  </div>
</template>

<script>
import { BETS_LIST_QUERY } from '@/graphql/index'
import { NO_CACHE } from '@/constants/graphql/fetch-policy'

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
      itemsPerPage: 3,
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
      }]
    }
  },
  computed: {
    currentPage: {
      get () {
        return this.page
      },
      set (value) {
        this.page = value
        this.showMore()
      }
    },
  },
  apollo: {
    bets (index = 0) {
      this.loadingBets = true
      const kind = this.tabs[index].kind
      return {
        query: BETS_LIST_QUERY,
        fetchPolicy: NO_CACHE,
        variables: {
          kind: kind
        },
        result () {
          this.loadingBets = false
        }
      }
    }
  },
  methods: {
    showMore (index = 0) {
      this.loadingBets = true
      const kind = this.tabs[index].kind
      this.$apollo.queries.bets.fetchMore({
        variables: {
          kind: kind
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          this.bets = fetchMoreResult.bets
          this.loadingBets = false
        },
      })
    }
  }
}
</script>
