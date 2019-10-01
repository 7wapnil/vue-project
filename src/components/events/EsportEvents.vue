<template>
  <div>
    <events-list
      :events="esportEvents"
      :tab-id="selectedFilter.value"
      :key="key" />
  </div>
</template>

<script>
import EventsList from '@/components/events/EventsList'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { ESPORT_EVENTS } from '@/graphql'
import { eventUpdatedSubscriber } from '@/helpers/subscriptions'

export default {
  components: {
    EventsList
  },
  props: {
    selectedEventScope: {
      type: Object,
      default: () => {}
    },
    selectedFilter: {
      type: Object,
      required: true
    }
  },
  apollo: {
    esportEvents () {
      return {
        ...this.query,
        ...this.subscribeToMore
      }
    }
  },
  data () {
    return {
      esportEvents: []
    }
  },
  computed: {
    query () {
      return {
        query: ESPORT_EVENTS,
        fetchPolicy: NETWORK_ONLY,
        variables: {
          titleId: this.selectedEventScope ? this.selectedEventScope.value : null,
          context: this.selectedFilter.value,
          withScopes: true
        }
      }
    },
    key () {
      if (!this.selectedFilter) return

      const eventProps = {
        titleId: this.selectedEventScope ? this.selectedEventScope.value : null,
        tournamentId: this.$route.params.tournamentId || null,
        context: this.selectedFilter ? this.selectedFilter.value : null
      }
      return Object.values(eventProps).join(':')
    },
    subscribeToMore () {
      return eventUpdatedSubscriber({
        titleKind: this.$route.params.titleKind,
        titleId: this.selectedEventScope.value,
        context: this.selectedFilter.value,
      })
    }
  }
}
</script>
