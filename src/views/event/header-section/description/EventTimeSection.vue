<template>
  <div v-if="event.timeInSeconds && isLiveEvent">
    <b-row no-gutters>
      <b-col class="mt-1">
        <span class="text-arc-clr-iron text-uppercase font-size-11 letter-spacing-2">
          {{ $t('tournamentPage.description.time') }}
        </span>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col class="letter-spacing-2">
        {{ formattedTime }} {{ $t('eventPage.minute') }}
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
    },
    isLiveEvent: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    formattedTime () {
      return this.$i18n.getSuffix(this.event.timeInSeconds)
    }
  }
}
</script>
