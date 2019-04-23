<template>
  <div v-if="!wallet">
    <small class="font-weight-bold">
      {{ wallet.amount | round }}
      <span class="currency-code">
        {{ wallet.currency.code }}
      </span>
    </small>
    <small class="font-weight-bold text-center">
      No active wallets
    </small>
  </div>
</template>

<script>
export default {
  props: {
    wallet: {
      type: Object,
      required: true
    }
  }
}
</script>
