<template>
  <div class="row align-items-end">
    <div class="col-lg-6">
      <div class="row">
        <div class="col-lg-12 col-sm-6">
          <p class="card-text font-weight-bold">
            {{ event.title_name }}
          </p>
        </div>
        <div class="col-lg-12 col-sm-6">
          <p class="catd-text">
            {{ fromNow }}
          </p>
        </div>
      </div>
    </div>
    <div class="col-lg-6">
      <div
        v-if="primaryMarket"
        class="row">

        <odd-button
          v-for="odd in primaryMarket.odds"
          :market="primaryMarket"
          :key="odd.id"
          :odd="odd"/>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import OddButton from '@/components/custom/OddButton.vue'

export default {
  components: {
    OddButton
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    primaryMarket () {
      return this.event.markets.find(market => market.priority === 1)
    },
    fromNow () {
      return moment(this.event.start_at).fromNow()
    }
  }
}
</script>
