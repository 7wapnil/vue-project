<template>
  <b-card
    no-body
    class="mb-1 upcoming-card"
    bg-variant="arc-clr-soil-dark">
    <b-row
      no-gutters
      role="tab"
      class="align-items-stretch h-100">
      <!-- EVENT DATE AND REPLAY/STATISTIC -->
      <b-col
        cols="2"
        class="d-flex justify-content-between p-3">
        <div class="d-fle d-flex flex-column justify-content-around text-center pl-1">
          <strong
            style="font-size: 10px"
            class="text-center text-arc-clr-iron text-uppercase">
            Today
          </strong>
          <strong
            style="font-size: 10px"
            class="text-center text-arc-clr-iron">
            14:30
          </strong>
        </div>
        <div class="d-flex flex-column justify-content-between">
          <icon
            name="upcoming-event-replay"
            size="16px"
            color="arc-clr-soil-light"/>
          <icon
            name="upcoming-event-statistic"
            size="18px"
            color="arc-clr-soil-light"/>
        </div>
      </b-col>
      <!-- EVENT DATE AND REPLAY/STATISTIC END -->

      <!-- EVENT MARKETS AND SHOW MORE MARKETS BUTTON -->
      <b-col
        cols="9"
        class="event-card-inside-border">
        <b-row
          no-gutters
          class="h-100">
          <b-col class="pl-3">
            <event-markets :with-draw="withDraw" />
          </b-col>
          <b-col
            role="button"
            cols="auto"
            tabindex="0"
            class="upcoming-statistics pl-2 pr-4 d-flex flex-column justify-content-around">
            <icon
              color="arc-clr-soil-light"
              size="12px"
              name="upcoming-event-chevron-down"/>
            <h6 class="mb-0">
              <strong>
                +3
              </strong>
            </h6>
          </b-col>
        </b-row>
      </b-col>
      <!-- EVENT MARKETS AND SHOW MORE MARKETS BUTTON END -->

      <!-- GO TO EVENT LINK -->
      <b-col
        cols="1"
        class="upcoming-statistics event-card-inside-border"
        style="max-width: 70px">
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
            <b-col class="d-inline-flex justify-content-center align-items-center">
              <h6 class="mb-0">
                <strong>
                  +124
                </strong>
              </h6>
            </b-col>
          </b-row>
        </b-row>
      </b-col>
      <!-- GO TO EVENT LINK END -->
    </b-row>
  </b-card>
</template>
<script>

import EventMarkets from './EventMarkets.vue'

export default {
  props: {
    withDraw: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    EventMarkets
  }
}
</script>
