<template>
  <b-card
    v-if="event"
    no-body
    class="mb-1 p-2 upcoming-card"
    style="min-height: 132px"
    bg-variant="arc-clr-soil-dark"
    @click="goToEventPage">
    <b-row no-gutters>
      <b-col class="ml-1 mt-1 font-size-12 text-arc-clr-iron line-height-14 letter-spacing-2 text-truncate">
        {{ event.name }}
      </b-col>
    </b-row>

    <b-row no-gutters>

      <b-col
        cols="3"
        class="px-1 py-2 text-center">
        <b-row no-gutters>
          <b-col
            v-if="event.timeInSeconds"
            class="d-flex justify-content-center">
            <span class="font-weight-bold text-arc-clr-iron text-uppercase mb-1 event-card-date letter-spacing-2">
              {{ formattedTime }}'
            </span>
          </b-col>

          <div class="w-100"/>

          <b-col class="d-flex align-items-start justify-content-center">
            <span class="font-size-10 text-arc-clr-iron text-uppercase font-weight-bold letter-spacing-2">
              {{ event.displayStatus }}
            </span>
          </b-col>
        </b-row>
      </b-col>

      <b-col
        cols="auto"
        class="p-2">
        <b-row
          v-for="(score, index) in getScore"
          :key="index"
          no-gutters>
          <b-col class="d-inline-flex">
            <span class="font-size-12 font-weight-bold text-arc-clr-iron mb-1 line-height-14">
              {{ score }}
            </span>
          </b-col>
        </b-row>
      </b-col>

      <b-col class="p-2 text-truncate">
        <b-row no-gutters>
          <b-col v-if="event.competitors.length">
            <b-row
              v-for="(competitor, index) in orderedCompetitors"
              :key="index"
              no-gutters>
              <b-col>
                <h6 class="mb-0 font-weight-bold text-arc-clr-iron team-name text-truncate letter-spacing-2 line-height-16">
                  {{ competitor.name }}
                </h6>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
      <b-col
        v-if="marketsCount > 0"
        cols="2"
        class="event-card-statistics-button d-flex align-items-center justify-content-end">
        <b-row no-gutters>
          <b-col class="d-inline-flex justify-content-end align-items-center">
            <h6 class="mt-1 font-weight-bold mr-2">
              +{{ marketsCount }}
            </h6>
          </b-col>
          <b-col class="d-inline-flex justify-content-start align-items-center">
            <icon
              color="arc-clr-soil-light"
              size="10px"
              class="mb-1"
              name="upcoming-event-arrow-right"/>
          </b-col>
        </b-row>
      </b-col>
      <b-col
        v-if="marketsCount === 0"
        cols="2"/>
    </b-row>

    <b-row no-gutters>
      <b-col>
        <slot/>
      </b-col>
    </b-row>

  </b-card>
</template>

<script>
import EsportsLiveCard from '@/components/cards/esports-live-card/EsportsLiveCard'
import { orderByQualifier } from '@/helpers/competitors-order'

export default {
  extends: EsportsLiveCard,
  computed: {
    orderedCompetitors () {
      return orderByQualifier(this.event.competitors)
    }
  }
}
</script>
