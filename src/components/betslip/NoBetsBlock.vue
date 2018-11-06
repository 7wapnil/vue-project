<template>
  <span v-if="!getBets.length">
    <h6 class="ml-4 mt-3">Betslip</h6>
    <b-card
      class="mx-2 py-4"
      no-body>
      <p class="text-center m-2">Your betslip is currently empty<br>
        Click on any odds to add them<br>
        to betslip.
      </p>
    </b-card>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('betslip', [
      'getBets',
    ]),
  }
}
</script>
