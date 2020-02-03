<template>
  <div v-if="event.score">
    <b-row no-gutters>
      <b-col class="mt-4">
        <span class="text-arc-clr-iron text-uppercase font-size-11 letter-spacing-2">
          {{ $t('tournamentPage.description.score') }}
        </span>
      </b-col>
    </b-row>

    <b-row no-gutters>
      <b-col class="letter-spacing-2 mb-2">
        {{ event.score }}
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
  }
}
</script>
