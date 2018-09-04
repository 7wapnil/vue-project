<template>
  <div class="row align-items-end">
    <div class="col">
      <div class="row">
        <div class="col">
          <p class="card-text font-weight-bold">{{ event.title_name }}</p>
        </div>
        <div class="col">
          <p class="card-text">{{ fromNow }}</p>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col">
          <div
            v-for="market in primaryMarkets"
            :key="market.id"
            class="row">
            <div class="col">
              <b>{{ market.name }}</b>
              <div class="row">
                <div
                  v-for="odd in market.odds"
                  :key="odd.id"
                  class="col">
                  <odd-button
                    :odd="odd"
                    :market="market"/>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    primaryMarkets () {
      return this.event.markets.filter(market => market.priority === 1)
    },
    fromNow () {
      return moment(this.event.start_at).fromNow()
    }
  }
}
</script>
