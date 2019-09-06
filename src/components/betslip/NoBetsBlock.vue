<template>
  <span v-if="!getBets.length">
    <b-row
      class="m-3"
      no-gutters>
      <b-col>
        <span class="mr-2 text-arc-clr-iron letter-spacing-2 font-size-11">
          BETSLIP
        </span>
      </b-col>
    </b-row>
    <b-card
      bg-variant="transparent"
      class="mx-2 mb-2 pb-4 betslip-empty-card"
      no-body>
      <img
        class="p-4 mt-2"
        src="~@/assets/images/betslip/arc-logo-black.svg">
      <h6 class="text-center text-arc-clr-iron my-2 px-2">
        {{ $t('betslip.betslipEmpty') }}
      </h6>
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
