<template>
  <b-col>
    <b-row
      v-if="secondCompetitor"
      class="h-100 text-center d-flex align-items-center justify-content-center"
      no-gutters>
      <b-col
        v-if="isOddsActive"
        class="h-100 d-flex align-items-center"
        cols="auto">
        <span class="event-description-scoreboard-progress-label">
          {{ winningChance }} <br> %
        </span>
        <b-progress
          :variant="progressVariant"
          class="event-description-scoreboard-progress second-competitor">
          <b-progress-bar
            :value="winningChance"
            class="event-description-scoreboard-progress-bar"/>
        </b-progress>
      </b-col>
      <b-col
        v-if="!isMobile"
        class="font-weight-bold m-4 letter-spacing-2 text-break">
        {{ secondCompetitor.name }}
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
export default {
  props: {
    secondCompetitor: {
      type: Object,
      required: true
    },
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    progressVariant () {
      return this.$route.params.titleKind === 'esports' ? 'arc-clr-esport-bg' : 'arc-clr-sport-bg'
    },
    isOddsActive () {
      return this.event.dashboardMarket.odds[0].value && this.event.dashboardMarket.odds[1].value
    },
    winningChance () {
      const firstDecimalOdd = Math.floor(1 / this.event.dashboardMarket.odds[0].value * 100)
      const secondDecimalOdd = Math.floor(1 / this.event.dashboardMarket.odds[1].value * 100)
      const sumOfDecimalOdds = firstDecimalOdd + secondDecimalOdd
      return Math.round(secondDecimalOdd / sumOfDecimalOdds * 100)
    }
  }
}
</script>
