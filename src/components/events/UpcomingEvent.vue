<template>
  <b-card
    v-if="event"
    no-body
    class="mb-1 upcoming-card"
    bg-variant="arc-clr-soil-dark">

    <b-row no-gutters
           role="tab"
           style="height: 76px">
      <b-col
        class="p-4 h-100"
        style="max-width: 80px; border-right: 1px solid #232323">
        <b-row no-gutters>
          <b-col class="d-flex align-items-center justify-content-center">
            <small>
              Today
              <!--{{ event.start_at | asFormattedDate('MMMM DD') }}-->
            </small>
          </b-col>

          <div class="w-100"/>

          <b-col class="d-flex align-items-center justify-content-center">
            <small>
              {{ event.start_at | asFormattedDate('HH:mm') }}
            </small>
          </b-col>
        </b-row>
      </b-col>

      <b-col class="p-3"
             style="max-width: 247px; border-right: 1px solid #232323">
        <b-row no-gutters
               class="h-100">
          <b-col cols="10">
            <small class="text-truncate">
            <b-link :to="{ name: 'event', params: { id: event.id } }">
              {{ event.tournament.name }}
            </b-link>
            </small>
            <br>
          </b-col>
          <b-col cols="2">
            <b-row no-gutters
                   class="h-50 w-100 mb-1">
              <b-col class="d-flex align-items-center justify-content-end">
                <icon name="upcoming-event-replay"
                      size="16px"
                      color="arc-clr-soil-light"/>
              </b-col>
            </b-row>
            <b-row no-gutters
                   class="h-50 w-100">
              <b-col class="d-flex align-items-center justify-content-end">
                <icon name="upcoming-event-statistic"
                      size="18px"
                      color="arc-clr-soil-light"/>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>

      <b-col style="border-right: 1px solid #232323">
        <b-row no-gutters
               class="h-100">
          <b-col class="pl-3 py-2">
            <slot/>
          </b-col>
          <b-col cols="2"
                 class="px-3">
            <b-row no-gutters
                   class="h-50 w-100">
              <b-col class="d-flex align-items-center justify-content-end">
                <icon role="button"
                      color="arc-clr-soil-light"
                      v-b-toggle="'upcoming-event-' + event.id"
                      tabindex="0"
                      size="12px"
                      name="upcoming-event-chevron-down"/>
              </b-col>
            </b-row>
            <b-row no-gutters
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

      <b-col style="max-width: 70px">
        <b-row no-gutters
               class="text-center h-100">

          <b-row no-gutters
                 class="h-50 w-100">
            <b-col class="d-inline-flex justify-content-center align-items-center">
              <icon color="arc-clr-soil-light"
                    size="10px"
                    name="upcoming-event-arrow-right"/>
            </b-col>
          </b-row>

          <b-row no-gutters
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
    <b-row no-gutters
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
