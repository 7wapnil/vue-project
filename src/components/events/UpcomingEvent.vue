<template>
  <b-card
    v-if="event"
    no-body
    style="min-width: 714px"
    class="mb-1 upcoming-card"
    bg-variant="arc-clr-soil-dark">

    <b-card-body class="h-100 p-0">

      <b-row
        no-gutters
        role="tab"
        style="height: 76px">

        <time-block :event-start="event.start_at"/>

        <b-col
          class="pt-2 pr-3 pb-2 pl-3 event-card-inside-border-left"
          style="max-width: 247px; min-width: 60px">
          <b-row
            no-gutters>
            <b-col style="line-height: 14px; min-width: 40px">
              <b-row
                v-for="competitor in event.competitors"
                :key="competitor.id"
                no-gutters>
                <b-col class="text-truncate">
                  <small>
                    <strong
                      class="text-arc-clr-iron"
                      style="line-height: 14px">
                      {{ competitor.name }}
                    </strong>
                  </small>
                </b-col>
              </b-row>
            </b-col>

            <b-col
              cols="auto"
              class="ml-1 mt-1"
              style="min-width: 20px">
              <b-row
                no-gutters
                class="h-50 w-100">
                <b-col class="d-flex align-items-start justify-content-end">
                  <icon
                    name="upcoming-event-replay"
                    size="16px"
                    color="arc-clr-soil-light"/>
                </b-col>
              </b-row>
              <b-row
                no-gutters
                class="h-50 w-100">
                <b-col class="d-flex align-items-end justify-content-end">
                  <icon
                    name="upcoming-event-statistic"
                    size="18px"
                    color="arc-clr-soil-light"/>
                </b-col>
              </b-row>
            </b-col>

          </b-row>
        </b-col>

        <b-col
          class="event-card-inside-border-left"
          style="min-width: 459px">
          <b-row
            no-gutters>
            <b-col class="pl-3 pt-1">
              <slot/>
            </b-col>
          </b-row>
        </b-col>

        <b-col
          v-b-toggle="'upcoming-event-' + event.id"
          v-if="[event.dashboard_market].length > 1"
          cols="auto"
          class="px-3 event-card-toggle-button">
          <b-row
            no-gutters
            class="h-50 w-100">
            <b-col class="d-flex align-items-center justify-content-center">
              <icon
                role="button"
                color="arc-clr-soil-light"
                tabindex="0"
                size="7.5px"
                name="upcoming-event-chevron-down"/>
            </b-col>
          </b-row>
          <b-row
            no-gutters
            class="h-50 w-100">
            <b-col class="d-flex align-items-start justify-content-center">
              <h6 class="mb-0 mt-1">
                <strong>
                  +3
                </strong>
              </h6>
            </b-col>
          </b-row>
        </b-col>

        <b-link
          v-if="marketsCount > 0"
          :to="{ name: 'event', params: { id: event.id } }"
          class="col event-card-statistics-button event-card-inside-border-left"
          style="min-width: 70px; max-width: 70px; min-height: 100%; position:relative">

          <b-row
            no-gutters
            class="text-center h-100">

            <b-row
              no-gutters
              class="h-50 w-100">
              <b-col class="d-inline-flex justify-content-center align-items-center">
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
                <h6 class="mb-0 mt-1">
                  <strong>
                    +{{ event.markets_count - 1 }}
                  </strong>
                </h6>
              </b-col>
            </b-row>
          </b-row>

        </b-link>
      </b-row>
    </b-card-body>

    <b-row
      no-gutters
      role="tablist">
      <b-col
        align="center"
        style="min-height: 0">

        <b-collapse
          :id="'upcoming-event-' + `${event.id}`"
          accordion="my-accordion">
          <b-row
            no-gutters
            class="bg-arc-clr-soil-darker d-flex justify-content-center p-5">
            More information here
          </b-row>
        </b-collapse>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import TimeBlock from './TimeBlock'

export default {
  components: {
    TimeBlock
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    marketsCount () {
      return this.event.markets_count - 1
    }
  }
}
</script>
