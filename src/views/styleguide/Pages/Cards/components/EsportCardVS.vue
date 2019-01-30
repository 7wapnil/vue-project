<template>
    <b-card
            no-body
            style="min-width: 714px"
            class="mb-1 esport-card"
            bg-variant="arc-clr-soil-dark">
        <b-card-body class="p-0">
            <b-row
                    no-gutters
                    role="tab"
                    style="height: 133px">
                <b-col
                        class="p-4"
                        style="max-width: 205px; min-width: 60px">
                    <b-row no-gutters>
                        <b-col class="mt-1 mb-4 text-truncate d-inline-flex align-items-center justify-content-center">
                            <h6 class="mb-0 font-weight-bold text-arc-clr-iron-light">
                                25:42 Left
                            </h6>
                        </b-col>
                    </b-row>
                    <b-row no-gutters>
                        <b-col class="mb-3 d-inline-flex align-items-center justify-content-center text-truncate">
                            <small class="text-arc-clr-iron">
                                ESEA MDL Season 29
                            </small>
                        </b-col>
                    </b-row>
                    <b-row no-gutters>
                        <b-col
                                class="d-flex justify-content-start align-items-end pl-4">
                            <icon
                                    name="upcoming-event-replay"
                                    size="16px"
                                    color="arc-clr-soil-light"/>
                        </b-col>
                        <b-col
                                class="d-flex justify-content-end align-items-end pr-4">
                            <icon
                                    name="upcoming-event-statistic"
                                    size="18px"
                                    color="arc-clr-soil-light"/>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col
                        class="event-card-inside-border-left"
                        style="min-width: 459px">
                    <b-row
                            no-gutters>
                        <b-col class="text-center pt-4">
                            <icon
                                    name="sidemenu-game-icon"
                                    color="arc-clr-iron"
                                    size="24px"/>
                            <h6 class="mt-3 m-0 font-weight-bold text-arc-clr-iron team-name">
                                Faze Clan
                            </h6>
                        </b-col>
                        <b-col cols="auto" class="text-center pt-4">
                            <h5 style="opacity: .4" class="mt-3 font-weight-light text-arc-clr-iron">
                                VS
                            </h5>
                        </b-col>
                        <b-col class="pt-4 text-center">
                            <icon
                                    name="sidemenu-game-icon"
                                    color="arc-clr-iron"
                                    size="24px"/>
                            <h6 class="mt-3 mb-1 text-center font-weight-bold text-arc-clr-iron team-name">
                                Liverpool
                            </h6>
                        </b-col>
                    </b-row>
                    <b-row
                            no-gutters>
                        <b-col class="pt-1 px-2">
                            <b-button
                                    variant="arc-odd">
                                6.12
                            </b-button>
                        </b-col>
                        <b-col class="pt-1 px-2">
                            <b-button
                                    variant="arc-odd"
                                    class="active">
                                6.12
                            </b-button>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col
                        class="event-card-inside-border-left"
                        style="max-width: 102px">
                    <b-row
                            no-gutters
                            class="h-50 w-100">
                        <b-link
                                class="col pt-3 event-card-statistics-button">
                            <b-row
                                    no-gutters
                                    class="text-center h-100">
                                <b-row
                                        no-gutters
                                        class="h-50 w-100">
                                    <b-col class="d-inline-flex justify-content-center align-items-start">
                                        <h6 class="m-0 font-weight-bold">
                                            + 124
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
                        <b-col
                                v-b-toggle.esportcard
                                class="pt-3 event-card-toggle-button-esport">
                            <b-row
                                    no-gutters
                                    class="h-50 w-100">
                                <b-col class="d-flex align-items-start justify-content-center">
                                    <h6 class="mb-0 font-weight-bold">
                                        + 3
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
                class="bg-arc-clr-soil-darker"
                style="border-radius: 0 0 4px 4px"
                role="tablist">
            <b-col
                    align="center"
                    style="min-height: 0">
                <b-collapse
                        id="esportcard"
                        style="border-radius: 0 0 4px 4px"
                        accordion="my-accordion">
                    <b-row no-gutters>
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

<script>
  import OddButton from '@/components/markets/OddButton'

  export default {
    components: {
      OddButton
    }
  }
</script>
