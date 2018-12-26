<template>
  <div>
    <small v-if="wallet">
      <b>
        {{ wallet.amount | round }}
        <span class="currency-code">
          {{ wallet.currency.code }}
        </span>
      </b>
    </small>

    <small v-if="!wallet">
      <b class="text-center">
        No active wallets
      </b>
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
  },
  created() {
    console.log(this.wallet)
  }
}
</script>
