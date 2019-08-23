<template>
  <b-row no-gutters>
    <b-col
      class="text-left text-md-right px-4 pb-1 pt-3 p-md-0 pt-md-2 mt-md-4"
      cols="12"
      md="4">
      <h6 class="mb-0 ml-2 mr-3 mr-md-0 text-arc-clr-iron letter-spacing-2">
        {{ $t('generalTerms.amount') }}:
      </h6>
    </b-col>
    <b-col
      cols="12"
      md="8"
      class="px-4 px-md-3 py-2 py-md-0 mb-2 mt-md-4">
      <b-row no-gutters>
        <b-col
          v-for="(moneyAmount, index) in moneyAmounts"
          :key="index"
          cols="6"
          class="mb-md-0 px-2 px-md-1">
          <b-button
            class="mb-2 mr-md-2"
            variant="arc-deposit"
            @click="$emit('preset-selected', moneyAmount)">
            {{ moneyAmount }} {{ currency }}
          </b-button>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    currency: {
      type: String,
      default: 'EUR'
    }
  },
  data () {
    return {
      moneyAmounts: [ 10, 25, 50, 75, 100, 150, 200, 250 ]
    }
  }
}
</script>
