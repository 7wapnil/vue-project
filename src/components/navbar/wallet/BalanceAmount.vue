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
      props: {
        wallet: {
          type: Object
        }
      },
      data() {
        return {}
      },
      filters: {
        fix: (value) => {
          return value.toFixed(2)
        }
      }
    }
</script>
