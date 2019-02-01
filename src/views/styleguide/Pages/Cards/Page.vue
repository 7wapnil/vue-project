<template>
  <b-card>
    <event-list-header/>

    <sport-card-live/>

    <arc-code code-text="<sport-card-live/>"/>

    <h3 class="my-4 text-arc-clr-iron-light">
      Esport card
    </h3>

    <esport-card class="mb-2"/>

    <esport-card-v-s/>

    <arc-code code-text="<esport-card/>"/>
  </b-card>
</template>

<script>
import SportCardLive from './components/SportCardLive'
import ArcCode from '../../Code/ArcCode'
import EsportCard from './components/EsportCard'
import EsportCardVS from './components/EsportCardVS'
import EventListHeader from './components/EventListHeader'

export default {
  components: {
    SportCardLive,
    ArcCode,
    EsportCard,
    EsportCardVS,
    EventListHeader
  }
}
</script>
