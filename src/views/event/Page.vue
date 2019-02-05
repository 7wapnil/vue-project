<template>
  <div>
    <b-row no-gutters>
      <b-col
        style="height: 385px"
        class="bg-arc-clr-soil-light">
        <b-row no-gutters>
          <b-col>
            <b-breadcrumb :items="items"/>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <event-tabs :tabs="tabs">
          <template slot-scope="{ tab }">
            <b-card
              v-if="event"
              class="mt-4">
              <div slot="header">{{ event.description }}</div>

              <dl class="row">
                <dt class="col-sm-3">Sport</dt>
                <dd class="col-sm-9">{{ event.title.name }}</dd>
                <dt class="col-sm-3">Time</dt>
                <dd class="col-sm-9">{{ eventTime }}</dd>
              </dl>

              <dl
                v-if="event.competitors"
                class="row">
                <dt class="col-sm-3">Competitors</dt>
                <dd class="col-sm-9">
                  <p
                    v-for="competitor in event.competitors"
                    :key="competitor.id">
                    {{ competitor.name }}
                  </p>
                </dd>
              </dl>

              <dl
                v-for="(scope, index) in event.scopes"
                :key="index"
                class="row">
                <dt class="col-sm-3 text-capitalize">{{ scope.kind }}</dt>
                <dd class="col-sm-9">{{ scope.name }}</dd>
              </dl>

              <div v-if="event.state">
                <dl
                  v-if="event.state.status_code"
                  class="row">
                  <dt class="col-sm-3">Status</dt>
                  <dd class="col-sm-9">{{ event.state.status }}</dd>
                </dl>

                <dl
                  v-if="event.state.score"
                  class="row">
                  <dt class="col-sm-3">Score</dt>
                  <dd class="col-sm-9">{{ event.state.score }}</dd>
                </dl>

                <dl
                  v-if="event.state.time"
                  class="row">
                  <dt class="col-sm-3">Time</dt>
                  <dd class="col-sm-9">{{ event.state.time }}</dd>
                </dl>

                <dl
                  v-if="event.state.period_scores.length > 0"
                  class="row">
                  <dt class="col-sm-3">Period Scores</dt>
                  <dd class="col-sm-9"/>
                </dl>

                <dl
                  v-for="period in event.state.period_scores"
                  :key="period.status_code"
                  class="row">
                  <dt class="col-sm-3">{{ period.status }}</dt>
                  <dd class="col-sm-9">{{ period.score }}</dd>
                </dl>
              </div>

              <hr>

              <markets-categories :event="event"/>

            </b-card>
          </template>
        </event-tabs>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { UNLIMITED_QUERY } from '@/constants/graphql/limits'
import { EVENT_BY_ID_QUERY, EVENT_UPDATED } from '@/graphql'
import { updateCacheList } from '@/helpers/graphql'
import MarketsCategories from '@/components/markets/MarketsCategories'
import moment from 'moment'
import EventTabs from '@/components/tabs/EventTabs'

export default {
  components: {
    MarketsCategories,
    EventTabs
  },
  data () {
    return {
      event: null,
      marketsLimit: UNLIMITED_QUERY,
      items: ['Basketball',
        'Europe',
        'Eurocup',
        'Charlotte Hornets VS New Orleans Pelicans'],
      tabs: [
        { title: 'Main' },
        { title: 'Halves' },
        { title: 'Quaters' },
        { title: 'All Markets' }
      ]
    }
  },
  apollo: {
    event () {
      return {
        query: EVENT_BY_ID_QUERY,
        variables: {
          id: this.eventId
        },
        update ({ events }) {
          if (!events.length) {
            return null
          }
          return events[0]
        },
        subscribeToMore: {
          document: EVENT_UPDATED,
          variables: {
            id: this.eventId
          },
          updateQuery ({ events }, { subscriptionData }) {
            return {
              events: updateCacheList(events, subscriptionData.data.event_updated, false)
            }
          }
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
    },
    titlesKind () {
      return this.$store.state.titleFilters.titleKind
    }
  }
}
</script>
