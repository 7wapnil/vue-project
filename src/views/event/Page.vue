<template>
  <main-layout>
    <div class="row">
      <div class="col">
        <b-card
          v-if="event"
          class="mt-4">
          <div slot="header">{{ event.description }}</div>

          <dl class="row">
            <dt class="col-sm-3">Sport</dt>
            <dd class="col-sm-9">{{ event.title_name }}</dd>
            <dt class="col-sm-3">Time</dt>
            <dd class="col-sm-9">{{ eventTime }}</dd>
          </dl>

          <dl
            v-if="event.details.competitors"
            class="row">
            <dt class="col-sm-3">Competitors</dt>
            <dd class="col-sm-9">
              <p
                v-for="competitor in event.details.competitors"
                :key="competitor.id">
                {{ competitor.name }}
              </p>
            </dd>
          </dl>

          <dl
            v-for="scope in event.scopes"
            :key="scope.id"
            class="row">
            <dt class="col-sm-3 text-capitalize">{{ scope.kind }}</dt>
            <dd class="col-sm-9">{{ scope.name }}</dd>
          </dl>

          <hr>

          <markets-list :event="event"/>

        </b-card>
      </div>
    </div>
  </main-layout>
</template>

<script>
import { EVENT_BY_ID_QUERY } from '@/graphql'
import MarketsList from '@/components/markets/MarketsList'
import moment from 'moment'

export default {
  components: {
    MarketsList
  },
  data () {
    return {
      event: null
    }
  },
  apollo: {
    event () {
      return {
        query: EVENT_BY_ID_QUERY,
        variables: {
          id: this.eventId,
          withDetails: true,
          withScopes: true
        },
        update ({ events }) {
          if (!events.length) {
            return null
          }
          return events[0]
        }
      }
    }
  },
  computed: {
    eventId () {
      return this.$route.params.id
    },
    eventTime () {
      if (!this.event) { return '' }

      const startTime = moment(this.event.start_at).format('YYYY-MM-DD HH:mm')
      const endTime = this.event.end_at ? moment(this.event.end_at).format('HH:mm') : '...'

      return `${startTime} - ${endTime}`
    }
  }
}
</script>
