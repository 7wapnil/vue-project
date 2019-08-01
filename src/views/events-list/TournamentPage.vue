<template>
  <b-row
    class="pt-2 bg-arc-clr-soil-light"
    no-gutters>
    <b-col>
      <scope-breadcrumbs/>
      <div
        v-for="(tab, index) in tabsMapping"
        :key="index">
        <b-col class="d-inline-flex px-0 px-md-4 mt-4 events-list-title">
          <h4 class="ml-4 mb-0 text-arc-clr-white">
            {{ tab.title }}
          </h4>
        </b-col>
        <events-list
          :title-id="$route.params.titleId"
          :tournament-id="$route.params.tournamentId"
          :tab-id="tab.value"
          :context="tab.context"/>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import EventsList from '@/components/events/EventsList'
import { UPCOMING_UNLIMITED } from '@/constants/graphql/event-context'
import { LIVE, UPCOMING } from '@/constants/graphql/event-start-statuses'
import HybridCard from '@/views/events-list/HybridCard'
import ScopeBreadcrumbs from '@/views/events-list/ScopeBreadcrumbs'

export default {
  components: {
    HybridCard,
    EventsList,
    ScopeBreadcrumbs
  },
  data () {
    return {
      tabsMapping: [{
        value: LIVE,
        title: this.$i18n.t('homePage.live'),
        context: LIVE
      }, {
        value: UPCOMING,
        title: this.$i18n.t('homePage.upcoming'),
        context: UPCOMING_UNLIMITED
      }]
    }
  }
}
</script>
