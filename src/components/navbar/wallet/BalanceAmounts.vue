<template>
  <div>
    <div class="amount-container font-size-12 letter-spacing-2">
      <div class="text-arc-clr-white">
        {{ $t('wallet.realMoney') }}
      </div>
      <div class="font-weight-bold">
        <span>{{ realMoney.toFixed(2) }} </span>
        <span class="currency-code font-weight-bold font-size-12 letter-spacing-2">
          {{ currencyCode }}
        </span>
      </div>
    </div>
    <div class="amount-container font-size-12 letter-spacing-2">
      <div class="text-arc-clr-white">
        {{ $t('wallet.sportsBonus') }}
      </div>
      <div class="font-weight-bold">
        <span>{{ sportMoney.toFixed(2) }} </span>
        <span class="currency-code font-weight-bold font-size-12 letter-spacing-2">
          {{ currencyCode }}
        </span>
      </div>
    </div>
    <div class="amount-container font-size-12 letter-spacing-2">
      <div class="text-arc-clr-white">
        {{ $t('wallet.casinoBonus') }}
      </div>
      <div class="font-weight-bold">
        <span>{{ casinoMoney.toFixed(2) }} </span>
        <span class="currency-code font-weight-bold font-size-12 letter-spacing-2">
          {{ currencyCode }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currencyCode: {
      type: String,
      required: true
    },
    realMoney: {
      type: Number,
      required: true
    },
    sportMoney: {
      type: Number,
      required: true
    },
    casinoMoney: {
      type: Number,
      required: true
    },
  }
}
</script>

<style lang="scss" scoped>
  .amount-container {
    margin: 10px;
  }

</style>
