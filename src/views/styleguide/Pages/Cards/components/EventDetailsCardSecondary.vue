<template>
  <b-card
    no-body
    style="min-width: 714px"
    class="mb-1 upcoming-card"
    bg-variant="arc-clr-soil-dark">
    <b-card-body class="h-100 p-0">
      <b-row
        v-b-toggle.eventdetailscardsecondary
        no-gutters
        role="tab"
        style="height: 44px">
        <b-col
          cols="auto"
          class="px-4 py-3 d-flex align-items-center justify-content-center">
          <icon
            role="button"
            tabindex="0"
            size="7.5px"
            name="event-details-chevron-down"/>
        </b-col>
        <b-col class="d-flex align-items-center">
          <h6 class="mb-0 font-weight-bold text-arc-clr-iron-light">
            Match winner
          </h6>
        </b-col>
      </b-row>
    </b-card-body>
    <b-row
      no-gutters
      role="tablist">
      <b-col style="min-height: 0">
        <b-collapse
          id="eventdetailscardsecondary"
          accordion="eventdetails-accordion">
          <b-row
            no-gutters
            class="pb-2 px-3"
            style="border-radius: 0 0 4px 4px">
            <b-col class="mr-2">
              <b-row
                align-v="center"
                class="bg-arc-clr-soil-darker"
                style="border-radius: 0 6px 6px 6px"
                no-gutters>
                <b-col class="pl-3 mr-3 d-inline-block text-truncate text-arc-clr-iron-light font-size-md">
                  Faze Clan
                </b-col>
                <b-col
                  cols="3"
                  style="min-width: 90px">
                  <b-button variant="arc-event-page-odd">
                    6.66
                  </b-button>
                </b-col>
              </b-row>
            </b-col>
            <b-col>
              <b-row
                align-v="center"
                class="bg-arc-clr-soil-darker"
                style="border-radius: 0 6px 6px 6px"
                no-gutters>
                <b-col class="pl-3 mr-3 d-inline-block text-truncate text-arc-clr-iron-light font-size-md">
                  Low Crew
                </b-col>
                <b-col
                  cols="3"
                  style="min-width: 90px">
                  <b-button variant="arc-event-page-odd">
                    6.66
                  </b-button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-collapse>
      </b-col>
    </b-row>
  </b-card>
</template>
