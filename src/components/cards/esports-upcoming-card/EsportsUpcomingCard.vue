<template>
  <b-card
    v-if="event"
    no-body
    style="min-width: 800px"
    class="mb-1 upcoming-card"
    bg-variant="arc-clr-soil-dark"
    @click="goToEventPage">
    <b-row
      no-gutters
      role="tab">
      <b-col style="max-width: 148px; min-width: 120px">
        <b-row
          style="max-height: 80px; min-height: 80px"
          no-gutters
          class="p-3">
          <b-col class="text-truncate text-center">
            <b-row no-gutters>
              <b-col class="mb-2 d-inline-flex justify-content-center mt-1">
                <span class="font-weight-bold text-arc-clr-iron text-uppercase font-size-10 hover-item">
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
                <span class="font-weight-bold text-arc-clr-iron text-uppercase font-size-10 hover-item">
                  {{ event.startAt | asFormattedDate('HH:mm') }}
                </span>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
      <b-col
        class="event-card-inside-border-left"
        style="min-width: 487px">
        <slot :icons="icons"/>
      </b-col>
      <b-col
        v-b-toggle="'esports-upcoming-card-' + event.id"
        v-if="event.dashboardMarket.length > 1"
        cols="auto"
        class="px-3 event-card-toggle-button">
        <b-row
          no-gutters
          class="h-50 w-100">
          <b-col class="d-flex align-items-center justify-content-center">
            <icon
              role="button"
              color="arc-clr-soil-light"
              class="mt-2"
              tabindex="0"
              size="7.5px"
              name="upcoming-event-chevron-down"/>
          </b-col>
        </b-row>
        <b-row
          no-gutters
          class="h-50 w-100">
          <b-col class="d-flex align-items-start justify-content-center">
            <span class="mt-2 font-weight-bold font-size-14">
              + 3
            </span>
          </b-col>
        </b-row>
      </b-col>
      <b-col
        v-if="marketsCount > 0"
        class="event-card-statistics-button event-card-inside-border-left"
        style="min-width: 70px; max-width: 70px">
        <b-row
          no-gutters
          class="text-center h-100">
          <b-row
            no-gutters
            class="h-50 w-100">
            <b-col class="mt-2 d-inline-flex justify-content-center align-items-center">
              <icon
                color="arc-clr-soil-light"
                size="10px"
                name="upcoming-event-arrow-right"/>
            </b-col>
          </b-row>
          <b-row
            no-gutters
            class="h-50 w-100">
            <b-col class="d-inline-flex justify-content-center align-items-start">
              <span class="mt-2 font-weight-bold font-size-14">
                +{{ marketsCount }}
              </span>
            </b-col>
          </b-row>
        </b-row>
      </b-col>
      <span
        v-if="marketsCount === 0"
        class="col event-card-statistics-button event-card-inside-border-left"
        style="min-width: 70px; max-width: 70px; min-height: 100%; position:relative; pointer-events: none">
        <b-row
          no-gutters
          class="text-center h-100">
          <b-col class="d-inline-flex justify-content-center align-items-start">
            <no-data-placeholder/>
          </b-col>
        </b-row>
      </span>
    </b-row>
  </b-card>
</template>
<script>
import NoDataPlaceholder from '@/components/cards/NoDataPlaceholder'
import { orderByQualifier } from '@/helpers/competitors-order'

export default {
  components: {
    NoDataPlaceholder
  },
  props: {
    event: {
      type: Object,
      required: true
    },
    icons: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    marketsCount () {
      return this.event.marketsCount - 1
    },
    orderedCompetitors () {
      return orderByQualifier(this.event.competitors)
    }
  },
  methods: {
    goToEventPage () {
      if (this.marketsCount > 0) {
        this.$router.push({ name: 'event', params: { id: this.event.id } })
      }
    }
  }
}
</script>
