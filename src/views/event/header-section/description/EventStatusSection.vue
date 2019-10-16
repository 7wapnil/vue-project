<template>
  <div v-if="isEventStarted">
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
      type: Boolean,
      required: true
    }
  },
  computed: {
    isEventStarted () {
      return event.displayStatus !== 'Not started'
    }
  }
}
</script>
