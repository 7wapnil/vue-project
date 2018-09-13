<template>
  <div class="row">
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
</template>

<script>
import OddButton from './OddButton'

export default {
  components: {
    OddButton
  },
  props: {
    market: {
      type: Object,
      required: true
    }
  }
}
</script>
