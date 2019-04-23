<template>
  <b-row
    class="pt-2"
    no-gutters>
    <b-col>
      <div
        v-for="(tab, index) in tabsMapping"
        :key="index">
        <b-col class="d-inline-flex px-4 pt-4 events-list-title">
          <h4 class="ml-4 mb-0 text-arc-clr-white">
            {{ tab.title }}
          </h4>
        </b-col>
        <events-list
          :title-id="$route.params.titleId"
          :tournament-id="$route.params.tournamentId"
          :context="tab.context">

          <template slot-scope="{ event }">
            <hybrid-card
              :event="event"
              :tab-id="tab.id"/>
          </template>
        </events-list>
      </div>

    </b-col>
  </b-row>
</template>

<script>
import EventsList from '@/components/events/EventsList'
import { UPCOMING_UNLIMITED } from '@/constants/graphql/event-context'
import { LIVE, UPCOMING } from '@/constants/graphql/event-start-statuses'
import HybridCard from '@/views/events-list/HybridCard'

export default {
  components: {
    HybridCard,
    EventsList
  },
  data () {
    return {
      tabsMapping: [{
        id: LIVE,
        title: this.$i18n.t('homePage.live'),
        context: LIVE
      }, {
        id: UPCOMING,
        title: this.$i18n.t('homePage.upcoming'),
        context: UPCOMING_UNLIMITED
      }],
      upcoming: UPCOMING,
      live: LIVE
    }
  }
}
</script>
