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
        <b-col
          class="px-2 py-4"
          style="min-width: 80px;
           max-width: 80px;
           min-height: 100%;
           position: relative">
          <b-row no-gutters>
            <b-col
              v-if="event.timeInSeconds"
              class="d-flex justify-content-center">
              <span class="font-weight-bold text-arc-clr-iron text-uppercase mb-1 event-card-date letter-spacing-2">
                {{ formattedTime }} {{ $t('eventPage.minute') }}
              </span>
            </b-col>

            <div class="w-100"/>

            <b-col class="d-flex align-items-start justify-content-center">
              <span
                class="font-size-10 text-arc-clr-iron text-uppercase font-weight-bold letter-spacing-2">
                {{ event.displayStatus }}
              </span>
            </b-col>
          </b-row>
        </b-col>

        <b-col style="max-width: 247px; min-width: 60px">
          <b-row no-gutters>
            <b-col
              v-if="event.competitors.length"
              class="p-3"
              style="min-width: 40px">
              <b-row
                v-for="(competitor, index) in orderedCompetitors"
                :key="index"
                class="mb-1"
                no-gutters>
                <b-col>
                  <h6 class="m-0 font-weight-bold text-arc-clr-iron team-name text-truncate letter-spacing-2">
                    {{ competitor.name }}
                  </h6>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              cols="auto"
              class="py-4 px-3">
              <b-row
                v-for="(score, index) in getScore"
                :key="index"
                no-gutters>
                <b-col class="d-inline-flex">
                  <small class="font-weight-bold text-arc-clr-iron">
                    {{ score }}
                  </small>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
        <b-col
          class="event-card-inside-border-left pl-3"
          style="min-width: 459px">
          <slot/>
        </b-col>
        <b-col
          v-b-toggle="'sports-live-event-' + event.id"
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
                <h6 class="mb-0 mt-1 font-weight-bold">
                  +{{ marketsCount }}
                </h6>
              </b-col>
            </b-row>
          </b-row>
        </b-link>
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
    </b-card-body>
    <b-row
      no-gutters
      role="tablist">
      <b-col
        align="center"
        style="min-height: 0">
        <b-collapse
          :id="'sports-live-event-' + `${event.id}`"
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
    getScore () {
      if (this.event.score) {
        return this.event.score.split(':')
      }
    },
    formattedTime () {
      return this.$i18n.getSuffix(this.event.timeInSeconds)
    },
    orderedCompetitors () {
      return orderByQualifier(this.event.competitors)
    }
  }
}
</script>
