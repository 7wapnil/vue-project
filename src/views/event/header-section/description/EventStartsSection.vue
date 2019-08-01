<template>
  <div v-if="!isLiveEvent">
    <b-row no-gutters>
      <b-col class="mt-4">
        <span class="text-arc-clr-iron text-uppercase font-size-11 letter-spacing-2">
          {{ $t('tournamentPage.description.starts') }}
        </span>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col class="mb-4 letter-spacing-2">
        {{ event.startAt | asFormattedDate('DD MMMM HH:mm') }}
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
  }
}
</script>
