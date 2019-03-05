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
        style="height: 76px">
        <b-col
          class="px-2 py-4"
          style="min-width: 80px;
           max-width: 80px;
           min-height: 100%;
           position: relative">
          <b-row no-gutters>
            <b-col class="d-flex justify-content-center">
              <span class="font-weight-bold text-arc-clr-iron text-uppercase mb-1 event-card-date">
                61:14
              </span>
            </b-col>

            <div class="w-100"/>

            <b-col class="d-flex align-items-start justify-content-center">
              <span
                style="font-size: 10px"
                class="text-arc-clr-iron text-uppercase font-weight-bold">
                1st half
              </span>
            </b-col>
          </b-row>
        </b-col>

        <b-col style="max-width: 247px; min-width: 60px">
          <b-row no-gutters>
            <b-col
              class="p-3"
              style="min-width: 40px">
              <b-row
                class="mb-2"
                no-gutters>
                <b-col>
                  <h6 class="m-0 font-weight-bold text-arc-clr-iron team-name text-truncate">
                    Faze Clan
                  </h6>
                </b-col>
              </b-row>
              <b-row no-gutters>
                <b-col>
                  <h6 class="m-0 font-weight-bold text-arc-clr-iron team-name text-truncate">
                    Liverpool
                  </h6>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              cols="auto"
              class="py-4 px-3">
              <b-row no-gutters>
                <b-col class="d-inline-flex">
                  <small class="font-weight-bold text-arc-clr-iron">
                    0
                  </small>
                </b-col>
              </b-row>
              <b-row no-gutters>
                <b-col class="d-inline-flex">
                  <small class="font-weight-bold text-arc-clr-iron">
                    1
                  </small>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              cols="auto"
              class="p-3">
              <b-row no-gutters>
                <b-col class="d-inline-flex mb-2">
                  <icon
                    name="upcoming-event-replay"
                    size="16px"
                    color="arc-clr-soil-light"/>
                </b-col>
              </b-row>
              <b-row no-gutters>
                <b-col class="d-inline-flex">
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
          <b-row no-gutters>
            <b-col class="d-inline-flex align-items-center justify-content-center pt-2 mb-1">
              <small class="m-0 text-arc-clr-iron team-name">
                Faze Clan
              </small>
            </b-col>
            <b-col class="d-inline-flex align-items-center justify-content-center pt-2 mb-1">
              <small
                class="text-arc-clr-iron"
                style="opacity: .4">
                Draw
              </small>
            </b-col>
            <b-col class="d-inline-flex align-items-center justify-content-center pt-2 mb-1">
              <small class="m-0 text-center text-arc-clr-iron team-name">
                Liverpool
              </small>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col class="pl-3 mr-2 pb-2">
              <b-button variant="arc-odd">
                6.66
              </b-button>
            </b-col>
            <b-col class="mr-2 pb-2">
              <b-button variant="arc-odd">
                6.66
              </b-button>
            </b-col>
            <b-col class="mr-2 pb-2">
              <b-button
                variant="arc-odd"
                class="active">
                6.66
              </b-button>
            </b-col>
          </b-row>
        </b-col>
        <b-col
          v-b-toggle.sportcard
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
              <h6 class="mb-0 mt-1 font-weight-bold">
                + 3
              </h6>
            </b-col>
          </b-row>
        </b-col>

        <b-link
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
                <h6 class="mb-0 mt-1 font-weight-bold">
                  + 124
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
          id="sportcard"
          accordion="my-accordion">
          <b-row
            no-gutters
            class="bg-arc-clr-soil-darker"
            style="border-radius: 0 0 4px 4px">
            <b-col class="py-2">
              <b-row no-gutters>
                <b-col style="max-width: 205px"/>
                <b-col>
                  <b-row
                    class="event-card-inside-border-bottom"
                    no-gutters>
                    <b-col class="d-flex justify-content-end align-items-end pb-4 pr-4">
                      <h6 class="m-0 text-arc-clr-iron">
                        Over / Under
                      </h6>
                    </b-col>
                    <b-col class="p-2">
                      <b-col class="mb-1">
                        <small class="text-arc-clr-iron">
                          Under 2.15
                        </small>
                      </b-col>
                      <b-button variant="arc-odd">
                        7.77
                      </b-button>
                    </b-col>
                    <b-col class="p-2">
                      <b-col class="mb-1">
                        <small class="text-arc-clr-iron">
                          Under 2.15
                        </small>
                      </b-col>
                      <b-button variant="arc-odd">
                        7.77
                      </b-button>
                    </b-col>
                  </b-row>
                  <b-row
                    class="event-card-inside-border-bottom"
                    no-gutters>
                    <b-col class="d-flex justify-content-end align-items-end pb-4 pr-4">
                      <h6 class="m-0 text-arc-clr-iron">
                        Over / Under
                      </h6>
                    </b-col>
                    <b-col class="p-2">
                      <b-col class="mb-1">
                        <small class="text-arc-clr-iron">
                          Under 2.15
                        </small>
                      </b-col>
                      <b-button variant="arc-odd">
                        7.77
                      </b-button>
                    </b-col>
                    <b-col class="p-2">
                      <b-col class="mb-1">
                        <small class="text-arc-clr-iron">
                          Under 2.15
                        </small>
                      </b-col>
                      <b-button variant="arc-odd">
                        7.77
                      </b-button>
                    </b-col>
                  </b-row>
                  <b-row no-gutters>
                    <b-col class="d-flex justify-content-end align-items-end pb-4 pr-4">
                      <h6 class="m-0 text-arc-clr-iron">
                        Over / Under
                      </h6>
                    </b-col>
                    <b-col class="p-2">
                      <b-col class="mb-1 text-truncate">
                        <small class="text-arc-clr-iron">
                          Under 2.15
                        </small>
                      </b-col>
                      <b-button variant="arc-odd">
                        7.77
                      </b-button>
                    </b-col>
                    <b-col class="p-2">
                      <b-col class="mb-1">
                        <small class="text-arc-clr-iron">
                          Under 2.15
                        </small>
                      </b-col>
                      <b-button variant="arc-odd">
                        7.77
                      </b-button>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col style="max-width: 102px"/>
              </b-row>
            </b-col>
          </b-row>
        </b-collapse>
      </b-col>
    </b-row>
  </b-card>
</template>
