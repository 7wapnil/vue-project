<template>
  <b-col>
    <b-row
      v-if="secondCompetitor"
      class="h-100 text-center d-flex align-items-center justify-content-center"
      no-gutters>
      <b-col
        class="h-100 d-flex align-items-center"
        cols="auto">
        <span class="event-description-scoreboard-progress-label">
          {{ progressValue }} <br> %
        </span>
        <b-progress
          :variant="progressVariant"
          class="event-description-scoreboard-progress">
          <b-progress-bar
            :value="progressValue"
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
    }
  },
  data () {
    return {
      progressValue: 55
    }
  },
  computed: {
    progressVariant () {
      return this.$route.params.titleKind === 'esports' ? 'arc-clr-esport-bg' : 'arc-clr-sport-bg'
    }
  }
}
</script>
