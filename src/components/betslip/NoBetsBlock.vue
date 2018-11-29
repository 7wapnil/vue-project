<template>
  <span v-if="!getBets.length">
    <div class="m-3">
      <small class="text-arc-clr-iron">
        <strong>
          Betslip
        </strong>
      </small>
    </div>
    <b-card
      bg-variant="transparent"
      class="mx-2 mb-2 pb-4 betslip-empty-card"
      no-body>
      <img
        class="p-4"
        src="~@/assets/images/betslip/arc-logo-black.svg">
      <p class="text-center text-arc-clr-iron px-2 mb-0">Your betslip is currently empty<br>
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
