<template>
  <div>
    <small v-if="wallet">
      <b>
        {{ wallet.amount | fix }}
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
  filters: {
    fix: (value) => {
      return value.toFixed(2)
    }
  },
  props: {
    wallet: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
}
</script>
