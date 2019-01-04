<template>
  <b-card
    v-if="event"
    no-body
    class="mb-1 upcoming-card"
    bg-variant="arc-clr-soil-dark">

    <b-row
      no-gutters
      role="tab"
      style="height: 76px">
      <b-col
        class="p-2 h-100 d-flex align-items-center justify-content-center"
        style="max-width: 80px">
        <b-row no-gutters>
          <b-col class="d-flex align-items-center justify-content-center text-uppercase">
            <strong
              style="font-size: 10px"
              class="text-center text-arc-clr-iron">
              {{ event.state.time }}
            </strong>
          </b-col>

          <div class="w-100"/>

          <b-col class="d-flex align-items-center justify-content-center text-uppercase">
            <strong
              style="font-size: 10px"
              class="text-center text-arc-clr-iron">
              {{ event.state.status }}
            </strong>
          </b-col>
        </b-row>
      </b-col>

      <b-col
        class="pt-2 pr-3 pb-2 pl-3 event-card-inside-border"
        style="max-width: 247px">
        <b-row
          no-gutters
          class="h-100">
          <b-col
            style="line-height: 14px"
            cols="10">

            <p class="mb-2 text-truncate">
              <small class="text-arc-clr-iron">
                {{ event.tournament.name }}
              </small>
            </p>
            <b-row
              v-for="competitor in event.details.competitors"
              :key="competitor.id"
              no-gutters>
              <b-col
                cols="8"
                class="text-truncate">
                <small>
                  <strong
                    class="text-arc-clr-iron"
                    style="line-height: 14px">
                    {{ competitor.name }}
                  </strong>
                </small>
              </b-col>
              <b-col
                cols="4"
                class="text-right">
                <small>
                  <strong class="text-arc-clr-iron">
                    0
                  </strong>
                </small>
              </b-col>
            </b-row>

          </b-col>

          <b-col class="ml-3 mt-1">
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

      <b-col class="event-card-inside-border">
        <b-row no-gutters>
          <b-col class="pl-3 py-2">
            <slot/>
          </b-col>
          <b-col
            cols="auto"
            class="ml-2 mr-4">
            <b-row
              no-gutters
              class="h-50 w-100">
              <b-col class="d-flex align-items-center justify-content-end">
                <icon
                  v-b-toggle="'upcoming-event-' + event.id"
                  role="button"
                  color="arc-clr-soil-light"
                  tabindex="0"
                  size="12px"
                  name="upcoming-event-chevron-down"/>
              </b-col>
            </b-row>
            <b-row
              no-gutters
              class="h-50 w-100">
              <b-col class="d-flex align-items-center justify-content-end">
                <h6 class="mb-0">
                  <strong>
                    +3
                  </strong>
                </h6>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>

      <b-col
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
    </b-row>
    <b-row
      no-gutters
      role="tablist">
      <b-col align="center">
        <b-collapse
          :id="'upcoming-event-' + `${event.id}`"
          accordion="my-accordion">
          <b-row
            no-gutters
            class="bg-arc-clr-soil-black d-flex justify-content-center p-5">
            More information here
          </b-row>
        </b-collapse>
      </b-col>
    </b-row>
  </b-card>
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
