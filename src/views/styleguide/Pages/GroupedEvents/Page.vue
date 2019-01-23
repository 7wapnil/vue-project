<template>
  <b-card>
    <h3>Event cards</h3>
    <div>
      <b-row
        no-gutters
        class="py-4 pl-4 pr-0">
        <b-col class="text-left d-inline-flex align-items-center">
          <icon
            class="pl-2 pr-3"
            name="event-list-demo"
            size="24px"/>
          <h4 class="m-0 font-weight-light">
            CS:GO
          </h4>
        </b-col>
        <b-col class="text-right">
          <small class="mr-2">
            1 event starts in 20min
          </small>

          <b-button
            variant="arc-secondary"
            class="ml-4 d-inline-flex align-items-center">
            <h6 class="m-0 font-weight-bold">
              CS:GO All Events
            </h6>
            <icon
              class="pl-4"
              name="arrow-right"
              size="12px"/>
          </b-button>
        </b-col>
      </b-row>

      <event/>

      <arc-code code-text="<sport-card/>"/>

      <h3 class="my-4">
        Esport card
      </h3>
      <esport-card/>

      <arc-code code-text="<esport-card/>"/>

    </div>
  </b-card>
</template>

<script>
import Event from './components/Event'
import ArcCode from '../../Code/ArcCode'
import EsportCard from './components/EsportCard'

export default {
  components: {
    Event,
    ArcCode,
    EsportCard
  }
}
</script>
