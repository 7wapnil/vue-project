<template>
  <b-col>
    <b-row
      v-if="firstCompetitor"
      class="h-100 text-center d-flex align-items-center justify-content-center"
      no-gutters>
      <b-col
        v-if="!isMobile"
        class="font-weight-bold m-4 letter-spacing-2 text-break">
        {{ firstCompetitor.name }}
      </b-col>
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
    </b-row>
  </b-col>
</template>

<script>
export default {
  props: {
    firstCompetitor: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      progressValue: 100
    }
  },
  computed: {
    progressVariant () {
      return this.$route.params.titleKind === 'esports' ? 'arc-clr-esport-bg' : 'arc-clr-sport-bg'
    }
  }
}
</script>
