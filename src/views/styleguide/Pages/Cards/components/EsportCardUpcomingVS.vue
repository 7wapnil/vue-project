<template>
  <b-card
    no-body
    style="min-width: 779px"
    class="mb-1 upcoming-card"
    bg-variant="arc-clr-soil-dark">
    <b-card-body class="h-100 p-0">
      <b-row
        no-gutters
        role="tab"
        style="height: 80px">
        <b-col style="max-width: 148px; min-width: 120px">
          <b-row
            no-gutters
            class="p-3 h-100">
            <b-col class="text-truncate text-center">
              <b-row no-gutters>
                <b-col class="mb-2 d-inline-flex justify-content-center mt-1">
                  <span class="font-weight-bold text-arc-clr-iron text-uppercase font-size-xs">
                    Today
                  </span>
                </b-col>
                <div class="w-100"/>
                <b-col class="d-inline-flex justify-content-center">
                  <span class="font-weight-bold text-arc-clr-iron text-uppercase font-size-xs">
                    20:30
                  </span>
                </b-col>
              </b-row>
            </b-col>
            <b-col>
              <b-row
                class="h-100"
                no-gutters>
                <b-col class="d-flex align-items-start justify-content-end mb-3">
                  <icon
                    name="upcoming-event-replay"
                    size="16px"
                    color="arc-clr-soil-light"/>
                </b-col>
                <div class="w-100"/>
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
          class="event-card-inside-border-left pl-4"
          style="min-width: 487px">
          <b-row
            no-gutters
            class="h-100">
            <b-col class="px-4 py-2">
              <b-row no-gutters>
                <b-col class="d-inline-flex justify-content-center pb-1">
                  <span class="text-arc-clr-iron team-name font-weight-bold font-size-sm">
                    Faze Clan
                  </span>
                </b-col>
                <div class="w-100"/>
                <b-col>
                  <b-button
                    variant="arc-odd">
                    6.66
                  </b-button>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              cols="auto"
              class="px-2 d-flex align-items-center justify-content-center">
              <b-row no-gutters>
                <b-col class="pr-3">
                  <icon
                    name="sidemenu-game-icon"
                    style="color: #808080"
                    size="24px"/>
                </b-col>
                <b-col class="px-3">
                  <span class="font-weight-light text-arc-clr-iron font-size-sm">
                    VS
                  </span>
                </b-col>
                <b-col class="pl-3">
                  <icon
                    name="sidemenu-game-icon"
                    style="color: #808080"
                    size="24px"/>
                </b-col>
              </b-row>
            </b-col>

            <b-col class="px-4 py-2">
              <b-row no-gutters>
                <b-col class="d-flex justify-content-center align-items-end pb-1">
                  <span class="text-arc-clr-iron team-name font-weight-bold font-size-sm">
                    Liverpool
                  </span>
                </b-col>
                <div class="w-100"/>
                <b-col>
                  <b-button
                    class="active"
                    variant="arc-odd">
                    7.77
                  </b-button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
        <b-col
          v-b-toggle.esportcard-upcoming-vs
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
              <span class="mt-2 font-weight-bold font-size-md">
                + 3
              </span>
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
                <span class="mt-2 font-weight-bold font-size-md">
                  + 124
                </span>
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
          id="esportcard-upcoming-vs"
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
