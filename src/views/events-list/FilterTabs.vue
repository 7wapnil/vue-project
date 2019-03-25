<template>
  <simple-tabs
    :tabs="tabs"
    @tab-changed="tab => $emit('tab-changed', tab)"/>
</template>

<script>
import { UPCOMING_FOR_TIME } from '@/constants/graphql/event-context'
import { LIVE, UPCOMING } from '@/constants/graphql/event-start-statuses'

export default {
  data () {
    return {
      tabs: [{
        value: LIVE,
        label: 'Live now',
        context: LIVE
      }, {
        value: UPCOMING,
        label: 'Upcoming',
        context: UPCOMING_FOR_TIME
      }]
    }
  },
  computed: {
    tournamentId () {
      return this.$route.params.tournamentId
    }
  }
}
</script>
