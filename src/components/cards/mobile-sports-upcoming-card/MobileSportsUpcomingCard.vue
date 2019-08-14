<template>
  <b-card
    v-if="event"
    no-body
    class="mb-1 border-4 pt-3 px-2 pb-2"
    style="min-height: 103px"
    bg-variant="arc-clr-soil-dark"
    @click="goToEventPage">
    <b-row
      class="mb-2"
      no-gutters>

      <b-col cols="auto">
        <b-row no-gutters>
          <b-col class="d-inline-flex align-items-center justify-content-center">
            <span
              style="margin-top: 1px; margin-bottom: 2px"
              class="font-weight-bold text-arc-clr-iron text-uppercase font-size-10 line-height-14 letter-spacing-5">
              {{ event.startAt | asCalendarDate({
                sameDay: '[Today]',
                nextDay: '[Tomorrow]',
                lastDay: '[Yesterday]',
                nextWeek: 'DD.MM',
                sameElse: 'DD.MM'}) }}
            </span>
          </b-col>
          <div class="w-100"/>
          <b-col class="d-inline-flex align-items-center justify-content-center">
            <span class="font-weight-bold text-arc-clr-iron text-uppercase font-size-10 line-height-14 letter-spacing-5">
              {{ event.startAt | asFormattedDate('HH:mm') }}
            </span>
          </b-col>
        </b-row>
      </b-col>

      <b-col class="text-truncate">
        <b-row
          v-for="(competitor, index) in orderedCompetitors"
          :key="index"
          no-gutters>
          <b-col
            style="margin-bottom: 2px"
            class="d-inline-flex px-2 text-truncate">
            <span class="font-weight-bold font-size-12 text-arc-clr-iron line-height-14 letter-spacing-2 text-truncate">
              {{ competitor.name }}
            </span>
          </b-col>
        </b-row>
      </b-col>
      <b-col
        v-if="marketsCount > 0"
        cols="3">
        <b-row
          class="h-100"
          no-gutters>
          <b-col class="d-flex align-items-center justify-content-end mr-2">
            <span class="font-weight-bold font-size-14">
              + {{ marketsCount }}
            </span>
          </b-col>
          <b-col
            cols="auto"
            class="d-flex align-items-center justify-content-center">
            <icon
              color="arc-clr-soil-light"
              size="10px"
              name="upcoming-event-arrow-right"/>
          </b-col>
        </b-row>
      </b-col>
      <b-col
        v-if="!marketsCount"
        cols="3"
        class="d-flex align-items-center justify-content-end">
        <no-data-placeholder class="mr-3"/>
      </b-col>
    </b-row>

    <slot/>

  </b-card>
</template>

<script>
import EsportsUpcomingCard from '@/components/cards/esports-upcoming-card/EsportsUpcomingCard'

export default {
  extends: EsportsUpcomingCard,
}
</script>
