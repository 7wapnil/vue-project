<template>
  <div v-if="isEventStarted && event.displayStatus">
    <b-row no-gutters>
      <b-col class="mt-1">
        <span class="text-arc-clr-iron text-uppercase font-size-11 letter-spacing-2">
          {{ $t('tournamentPage.description.status') }}
        </span>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col class="letter-spacing-2 mb-2">
        {{ event.displayStatus }}
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    isEventStarted () {
      return this.event.displayStatus !== 'Not started'
    }
  }
}
</script>
