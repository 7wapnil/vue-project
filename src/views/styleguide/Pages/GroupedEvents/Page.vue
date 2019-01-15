<template>
  <b-row no-gutters>
    <div class="col-6 offset-3 bg-arc-clr-soil-light">
      <b-card
        no-body
        class="p-4"
        body-class="events-card-body">
        <div>
          <h1>Grouped Events</h1>
          <grouped-events />
        </div>
        <hr>
      </b-card>
    </div>
  </b-row>
</template>
<script>
import GroupedEvents from './components/GroupedEvents.vue'
export default {
  components: {
    GroupedEvents,
  }
}
</script>
