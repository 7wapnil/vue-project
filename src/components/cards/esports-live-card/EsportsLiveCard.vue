<template>
  <b-card
    v-if="event"
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
              <h6
                v-if="event.timeInSeconds"
                class="mb-0 font-weight-bold text-arc-clr-iron-light">
                {{ formattedTime }} {{ $t('eventPage.minute') }}
              </h6>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col class="mb-3 d-inline-flex align-items-center justify-content-center text-truncate">
              <small class="text-arc-clr-iron">
                {{ event.tournament.name }}
              </small>
            </b-col>
          </b-row>
        </b-col>
        <b-col
          class="event-card-inside-border-left"
          style="min-width: 459px">
          <slot/>
        </b-col>
        <b-col
          :class="{'pointer-none': marketsCount === 0}"
          class="event-card-inside-border-left event-card-statistics-button"
          style="max-width: 102px">
          <b-link
            v-if="marketsCount > 0"
            :to="{ name: 'event', params: { id: event.id } }"
            class="col h-100 w-100 p-0 d-flex justify-content-center align-items-center">
            <b-row no-gutters>
              <b-col class="d-flex align-items-center justify-content-center px-2">
                <h6 class="m-0 font-weight-bold">
                  +{{ marketsCount }}
                </h6>
              </b-col>
            </b-row>
            <b-row no-gutters>
              <b-col class="d-flex align-items-center justify-content-center px-2">
                <icon
                  color="arc-clr-soil-light"
                  size="10px"
                  name="upcoming-event-arrow-right"/>
              </b-col>
            </b-row>
          </b-link>
          <b-row
            v-if="marketsCount === 0"
            class="h-100"
            no-gutters>
            <b-col class="d-flex justify-content-center align-items-start">
              <no-data-placeholder/>
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
          :id="'esports-live-event-' + `${event.id}`"
          style="border-radius: 0 0 4px 4px"
          accordion="esports-live-events">
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
import NoDataPlaceholder from '@/components/cards/NoDataPlaceholder'

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
    }
  }
}
</script>
