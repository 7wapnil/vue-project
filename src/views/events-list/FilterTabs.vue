<template>
  <simple-tabs
    :tabs="tabs"
    :active-index="1">
    <template slot-scope="{ tab }">
      <ul>
        <li>Sport ID: {{ titleId }}</li>
        <li>Tournament ID: {{ tournamentId }}</li>
        <li>Live: {{ tab.live }}</li>
      </ul>
    </template>
  </simple-tabs>

</template>

<script>
export default {
  props: {
    titleId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      tabIndex: 1,
      tabs: [{
        id: 'live',
        title: 'Live now',
        live: true
      }, {
        id: 'upcoming',
        title: 'Upcoming',
        live: false
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
