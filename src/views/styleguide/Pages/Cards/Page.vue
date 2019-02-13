<template>
  <b-card>

    <event-list-header/>

    <h3 class="my-3 text-arc-clr-iron-light">
      Sport cards
    </h3>

    <sport-card-live/>

    <arc-code code-text="<sport-card-live/>"/>

    <sport-card-upcoming/>

    <arc-code code-text="<sport-card-upcoming/>"/>

    <h3 class="my-4 text-arc-clr-iron-light">
      Esport cards
    </h3>

    <esport-card class="mb-2"/>

    <esport-card-v-s/>

    <arc-code code-text="<esport-card/>"/>

    <esport-card-upcoming/>
    <esport-card-upcoming-v-s/>

    <arc-code code-text="<esport-card-upcoming/>"/>

    <h3 class="my-4 text-arc-clr-iron-light">
      Event details card
    </h3>

    <event-details-card/>
    <event-details-card-secondary/>
    <event-details-card-team/>

    <arc-code
      class="mb-4"
      code-text="<event-details-card/>"/>

  </b-card>
</template>

<script>
import ArcCode from '../../Code/ArcCode'
import SportCardLive from './components/SportCardLive'
import SportCardUpcoming from './components/SportCardUpcoming'
import EsportCard from './components/EsportCard'
import EsportCardVS from './components/EsportCardVS'
import EventListHeader from './components/EventListHeader'
import EsportCardUpcoming from './components/EsportCardUpcoming'
import EsportCardUpcomingVS from './components/EsportCardUpcomingVS'
import EventDetailsCard from './components/EventDetailsCard'
import EventDetailsCardSecondary from './components/EventDetailsCardSecondary'
import EventDetailsCardTeam from './components/EventDetailsCardTeam'

export default {
  components: {
    SportCardLive,
    SportCardUpcoming,
    ArcCode,
    EsportCard,
    EsportCardVS,
    EventListHeader,
    EsportCardUpcoming,
    EsportCardUpcomingVS,
    EventDetailsCard,
    EventDetailsCardSecondary,
    EventDetailsCardTeam
  }
}
</script>
