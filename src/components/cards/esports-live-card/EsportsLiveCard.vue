<template>
  <b-card
    v-if="event"
    no-body
    style="min-width: 714px"
    class="mb-1 esport-card"
    body-class="p-0"
    bg-variant="arc-clr-soil-dark"
    @click="goToEventPage">
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
              {{ formattedTime }}'
            </h6>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col class="mb-3 text-center">
            <span class="font-size-12 text-arc-clr-iron letter-spacing-2 text-break">
              {{ event.tournament.name }}
            </span>
          </b-col>
        </b-row>
      </b-col>
      <b-col
        class="event-card-inside-border-left"
        style="min-width: 459px">
        <slot/>
      </b-col>
      <b-col
        class="event-card-inside-border-left event-card-statistics-button"
        style="max-width: 102px">
        <b-col
          v-if="marketsCount > 0"
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
        </b-col>
        <b-row
          v-if="!marketsCount"
          class="h-100"
          no-gutters>
          <b-col class="d-flex justify-content-center align-items-start">
            <no-data-placeholder/>
          </b-col>
        </b-row>
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
      if (this.event.timeInSeconds) {
        return Math.floor(this.event.timeInSeconds / 60)
      }
    }
  },
  methods: {
    goToEventPage () {
      if (this.marketsCount > 0) {
        this.$router.push({ name: 'esports-event', params: { eventSlug: this.event.slug } })
      }
    }
  }
}
</script>
