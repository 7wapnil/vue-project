<template>
  <b-card
    no-body
    style="min-width: 714px"
    class="mb-1 upcoming-card"
    bg-variant="arc-clr-soil-dark">

    <b-card-body class="h-100 p-0">

      <b-row
        no-gutters
        role="tab"
        style="height: 133px">

        <b-col
          class="p-4"
          style="max-width: 205px; min-width: 60px">
          <b-row no-gutters>
            <b-col class="mb-3 text-center text-truncate d-inline-flex align-items-center justify-content-center">
              <h6 class="m-0 font-weight-bold text-arc-clr-iron-light">
                25:42 Left
              </h6>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col class="mb-4 text-center text-truncate">
              <small class="text-arc-clr-iron">
                ESEA MDL Season 29
              </small>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col
              cols="6"
              class="text-center">
              <icon
                name="upcoming-event-replay"
                size="16px"
                color="arc-clr-soil-light"/>
            </b-col>
            <b-col
              cols="6"
              class="text-center">
              <icon
                name="upcoming-event-statistic"
                size="18px"
                color="arc-clr-soil-light"/>
            </b-col>
          </b-row>
        </b-col>

        <b-col
          class="event-card-inside-border"
          style="min-width: 459px">
          <b-row
            no-gutters
            class="h-50 w-100">
            <b-col class="text-center pt-4">
              <icon
                name="sidemenu-game-icon"
                color="arc-clr-iron"
                size="24px"/>
              <h6 class="pt-3 pb-2 m-0 font-weight-bold text-arc-clr-iron">
                Faze Clan
              </h6>
            </b-col>
            <b-col class="pt-4 d-flex align-items-center justify-content-center">
              <h5 class="m-0 font-weight-light text-arc-clr-iron">
                VS
              </h5>
            </b-col>
            <b-col class="pt-4 text-center">
              <icon
                name="sidemenu-game-icon"
                color="arc-clr-iron"
                size="24px"/>
              <h6 class="pt-3 pb-2 text-center m-0 font-weight-bold text-arc-clr-iron">
                Liverpool
              </h6>
            </b-col>
          </b-row>
          <b-row
            no-gutters
            class="h-50 w-100">
            <b-col class="p-2 d-flex align-items-end">
              <b-button
                variant="arc-odd"
                class="text-arc-clr-gold">
                <h6 class="m-0 font-weight-bold">
                  6.12
                </h6>
              </b-button>
            </b-col>
            <b-col class="p-2 d-flex align-items-end">
              <b-button
                variant="arc-odd"
                class="text-arc-clr-gold">
                <h6 class="m-0 font-weight-bold">
                  6.12
                </h6>
              </b-button>
            </b-col>
            <b-col class="p-2 d-flex align-items-end">
              <b-button
                variant="arc-odd"
                class="text-arc-clr-gold">
                <h6 class="m-0 font-weight-bold">
                  6.12
                </h6>
              </b-button>
            </b-col>
          </b-row>
        </b-col>

        <b-col
          class="event-card-inside-border"
          style="max-width: 102px">
          <b-row
            no-gutters
            class="h-50 w-100">
            <b-link
              class="col pt-3 upcoming-statistics">
              <b-row
                no-gutters
                class="text-center h-100">

                <b-row
                  no-gutters
                  class="h-50 w-100">
                  <b-col class="d-inline-flex justify-content-center align-items-start">
                    <h6 class="mb-0">
                      <strong>
                        +124
                      </strong>
                    </h6>
                  </b-col>
                </b-row>

                <b-row
                  no-gutters
                  class="h-50 w-100">
                  <b-col class="mb-2 d-inline-flex justify-content-center align-items-center">
                    <icon
                      color="arc-clr-soil-light"
                      size="10px"
                      name="upcoming-event-arrow-right"/>
                  </b-col>
                </b-row>

              </b-row>

            </b-link>
          </b-row>
          <b-row
            no-gutters
            class="h-50 w-100 event-card-inside-border-top">
            <b-col class="pt-3 event-card-toggle-button">
              <b-row
                no-gutters
                class="h-50 w-100">
                <b-col class="d-flex align-items-start justify-content-center">
                  <h6 class="mb-0">
                    <strong>
                      +3
                    </strong>
                  </h6>
                </b-col>
              </b-row>
              <b-row
                no-gutters
                class="h-50 w-100">
                <b-col class="pb-2 d-flex align-items-center justify-content-center">
                  <icon
                    role="button"
                    color="arc-clr-soil-light"
                    tabindex="0"
                    size="7.5px"
                    name="upcoming-event-chevron-down"/>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>

      </b-row>
    </b-card-body>

    <b-row
      no-gutters
      role="tablist">
      <b-col
        align="center"
        style="min-height: 0">
        <b-collapse
          id="esportcard"
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
import OddButton from '@/components/markets/OddButton'

export default {
  components: {
    OddButton
  }
}
</script>
