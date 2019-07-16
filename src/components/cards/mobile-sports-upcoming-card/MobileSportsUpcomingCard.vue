<template>
  <b-card
    v-if="event"
    no-body
    class="mb-1 border-4"
    style="min-height: 103px"
    bg-variant="arc-clr-soil-dark">
    <b-card-body class="p-2">
      <b-row
        class="pb-2"
        no-gutters>
        <b-col cols="2">
          <b-row no-gutters>
            <b-col class="d-inline-flex justify-content-center">
              <span
                style="margin-top: 3px"
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
            <b-col class="d-inline-flex justify-content-center">
              <span class="font-weight-bold text-arc-clr-iron text-uppercase font-size-10 line-height-14 letter-spacing-5">
                {{ event.startAt | asFormattedDate('HH:mm') }}
              </span>
            </b-col>
          </b-row>
        </b-col>
        <b-col class="pl-2">
          <b-row
            v-for="(competitor, index) in orderedCompetitors"
            :key="index"
            no-gutters>
            <b-col
              style="margin-bottom: 2px"
              class="d-inline-flex">
              <span class="font-weight-bold font-size-12 text-arc-clr-iron line-height-14 letter-spacing-5">
                {{ competitor.name }}
              </span>
            </b-col>
          </b-row>
        </b-col>
        <b-link
          v-if="marketsCount > 0"
          :to="{ name: 'event', params: { id: event.id } }"
          class="col-3">

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
        </b-link>
      </b-row>

      <slot/>

    </b-card-body>
  </b-card>
</template>

<script>
import EsportsUpcomingCard from '@/components/cards/esports-upcoming-card/EsportsUpcomingCard'

export default {
  extends: EsportsUpcomingCard,
}
</script>
