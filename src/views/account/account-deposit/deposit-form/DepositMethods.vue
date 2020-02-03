<template>
  <div>
    <loader v-if="loading" />
    <div v-else>
      <div>{{ methodsCopy }}:</div>
      <div class="deposit-methods-container">
        <b-card
          v-for="method in methods"
          :key="method.code"
          no-body
          bg-variant="arc-clr-soil-black"
          class="deposit-method"
          @click="setPaymentMethod(method)">
          <div
            v-if="showOverlay(method)"
            class="overlay">
            <pre>{{ getOverlayText(method) }}</pre>
          </div>
          <b-img :src="depositIcons[method.code]"/>
        </b-card>
      </div>
      <div
        v-if="paymentMethod"
        class="go-back"
        @click="setPaymentMethod(null)">
        >> {{ $t('account.deposit.changePaymentMethod') }}
      </div>
    </div>
  </div>
</template>

<script>
import skrill from '@/assets/icons/payment-methods/skrill.svg'
import paysafecard from '@/assets/icons/payment-methods/paysafecard.svg'
import idebit from '@/assets/icons/payment-methods/idebit.svg'
import creditCard from '@/assets/icons/payment-methods/card.svg'
import bitcoin from '@/assets/icons/payment-methods/bitcoin.svg'
import neteller from '@/assets/icons/payment-methods/neteller.svg'
import ecoPayz from '@/assets/icons/payment-methods/ecopayz.svg'

export default {
  props: {
    depositMethods: {
      required: true,
      type: Array
    },
    loading: {
      required: true,
      type: Boolean
    },
    setPaymentMethod: {
      required: true,
      type: Function
    },
    paymentMethod: {
      type: Object,
      default: null
    },
    fields: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      depositIcons: {
        skrill,
        paysafecard,
        idebit,
        credit_card: creditCard,
        eco_payz: ecoPayz,
        bitcoin,
        neteller
      }
    }
  },
  computed: {
    methods () {
      if (!this.paymentMethod) return this.depositMethods
      else return this.depositMethods.filter(method => method.code === this.paymentMethod.code)
    },
    methodsCopy () {
      return this.paymentMethod ? this.$t('account.deposit.yourPaymentMethod') : this.$t('account.deposit.selectPaymentMethod')
    }
  },
  methods: {
    getOverlayText (method) {
      const { fields: { amount } } = this;
      const numberAmount = Number(amount)
      if (numberAmount < method.minAmount) return `Min: \n ${method.minAmount}`
      else return `Max: \n ${method.maxAmount}`
    },
    showOverlay (method) {
      const { fields: { amount } } = this
      const numberAmount = Number(amount)
      if (!numberAmount) return false
      if (numberAmount > method.maxAmount || numberAmount < method.minAmount) return true
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.go-back {
  font-size: 16px;
  cursor: pointer;
}
.deposit-methods-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10px;
  .deposit-method {
    flex: 0 30%;
    padding: 5px;
    margin-bottom: 10px;
    position: relative;
    img {
      width: 100%;
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      pre {
        color: $wp-clr-notif-red;
      }
    }
  }
}
</style>
