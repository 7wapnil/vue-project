<template>
  <b-row
    v-if="event"
    class="py-4 w-100"
    no-gutters>
    <b-col
      v-if="firstCompetitor"
      class="text-center pt-4">
      <b-row no-gutters>
        <b-col class="font-weight-bold my-4 letter-spacing-2">
          {{ firstCompetitor.name }}
        </b-col>

        <div class="w-100"/>

        <b-col class="mt-1">
          <icon
            v-if="showicons"
            name="sidemenu-game-icon"
            size="56px"/>
        </b-col>
      </b-row>
    </b-col>

    <b-col class="text-center">
      <b-row no-gutters>
        <b-col class="mb-2 letter-spacing-2">
          {{ event.description }}
        </b-col>

        <div class="w-100"/>

        <b-col
          v-if="!isLiveEvent"
          class="mt-4">
          <span class="text-arc-clr-iron text-uppercase font-size-11 letter-spacing-2">
            Starts
          </span>
        </b-col>

        <div class="w-100"/>

        <b-col
          v-if="!isLiveEvent"
          class="mb-4 letter-spacing-2">
          {{ event.start_at | asFormattedDate('DD MMMM HH:mm') }}
        </b-col>

        <div class="w-100"/>

        <b-col class="mt-4">
          <span
            v-if="event.score"
            class="text-arc-clr-iron text-uppercase font-size-11 letter-spacing-2">
            Score
          </span>
        </b-col>

        <div class="w-100"/>

        <b-col class="letter-spacing-2">
          {{ event.score }}
        </b-col>

        <div class="w-100"/>

        <b-col
          v-if="isLiveEvent"
          class="mt-1">
          <span
            v-if="event.time_in_seconds"
            class="text-arc-clr-iron text-uppercase font-size-11 letter-spacing-2">
            Time
          </span>
        </b-col>

        <div class="w-100"/>

        <b-col
          v-if="event.time_in_seconds && isLiveEvent"
          class="mb-4 letter-spacing-2">
          {{ formattedTime }} {{ $t('eventPage.minute') }}
        </b-col>

      </b-row>
    </b-col>

    <b-col
      v-if="secondCompetitor"
      class="text-center pt-4">
      <b-row no-gutters>
        <b-col class="font-weight-bold my-4 letter-spacing-2">
          {{ secondCompetitor.name }}
        </b-col>
      </b-row>
      <b-row no-gutters>
        <b-col class="mt-1">
          <icon
            v-if="showicons"
            name="sidemenu-game-icon"
            size="56px"/>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import { STARTED, SUSPENDED, INTERRUPTED } from '@/constants/event-statuses'
export default {
  props: {
    event: {
      type: Object,
      required: true
    },
    showicons: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    firstCompetitor () {
      return this.event.competitors[0]
    },
    secondCompetitor () {
      return this.event.competitors[1]
    },
    formattedTime () {
      return this.$i18n.getSuffix(this.event.time_in_seconds)
    },
    isLiveEvent () {
      return [STARTED, SUSPENDED, INTERRUPTED].includes(this.event.status)
    }
  }
}
</script>
