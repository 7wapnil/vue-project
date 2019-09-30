<template>
  <div>
    <events-list
      :events="sportEvents"
      :tab-id="selectedFilter.value"
      :key="key" />
  </div>
</template>

<script>
import EventsList from '@/components/events/EventsList'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import {
  SPORT_EVENTS,
  EVENTS_BET_STOPPED,
  KIND_EVENT_UPDATED,
  SPORT_EVENT_UPDATED,
} from '@/graphql'
import { subscribeToMoreHelper } from '@/helpers/subscriptions'

export default {
  components: {
    EventsList
  },
  props: {
    selectedCategory: {
      type: Object,
      default: () => {}
    },
    selectedFilter: {
      type: Object,
      required: true
    }
  },
  apollo: {
    sportEvents () {
      return {
        ...this.query,
        ...this.subscribeToMore
      }
    }
  },
  data () {
    return {
      loading: 0,
      sportEvents: []
    }
  },
  computed: {
    query () {
      return {
        query: SPORT_EVENTS,
        fetchPolicy: NETWORK_ONLY,
        variables: {
          titleId: this.selectedCategory ? this.selectedCategory.value : null,
          context: this.selectedFilter.value,
          withScopes: true
        }
      }
    },
    key () {
      if (!this.selectedFilter) { return '' }

      var event_props = {
        titleId: this.selectedCategory ? this.selectedCategory.value : null,
        tournamentId: this.$route.params.tournamentId || null,
        context: this.selectedFilter ? this.selectedFilter.value : null
      }
      return Object.values(event_props).join(':')
    },
    subscribeToMore () {
      return subscribeToMoreHelper({
        tournamentId: this.$route.params.tournamentId
      })
    }
  }
}
</script>
