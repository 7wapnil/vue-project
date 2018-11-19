<template>
  <div
    role="tablist"
    class="mb-2">
    <b-row
      no-gutters
      class=" upcoming-event-card"
      role="tab">

      <b-col
        class="bg-arc-clr-soil-dark p-2"
        style="max-width: 199px">
        <b-row no-gutters>
          <b-col class="p-2">
            <p class="card-text">
              {{ fromNow }}
            </p>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col class="p-2">
            <small class="text-truncate">
              <b-link :to="{ name: 'event', params: { id: event.id } }">
                {{ event.tournament.name }}
              </b-link>
            </small>
          </b-col>
        </b-row>
      </b-col>

      <b-col class="bg-arc-clr-soil-dark">
        <b-row
          no-gutters
          class="p-2">
          <b-col/>
          <b-col
            v-b-toggle="'upcoming' + event.id"
            cols="10"
            align="center">
            <span class="text-truncate">{{ event.name }}</span>
          </b-col>
          <b-col/>
        </b-row>
        <b-row no-gutters>
          <b-col>
            <slot/>
          </b-col>
        </b-row>
      </b-col>

      <b-col
        class="bg-arc-clr-soil-black p-2"
        style="max-width: 99px">
        <b-row no-gutters>
          <b-col
            align="center"
            class="p-2">
            <strong>Stats</strong>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col
            align="center"
            class="p-2">
            <strong>+12</strong>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col align="center">
        <b-collapse
          :id="'upcoming' + `${event.id}`"
          accordion="my-accordion"
          role="tabpanel">
          <b-card
            class="mb-2"
            body-bg-variant="arc-clr-soil-black">
            More information here
          </b-card>
        </b-collapse>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    fromNow () {
      return moment(this.event.start_at).fromNow()
    }
  }
}
</script>
