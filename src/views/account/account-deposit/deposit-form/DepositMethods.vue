<template>
  <div>
    <loader v-if="loading" />
    <div v-else>
      <div>{{ $t('account.deposit.selectPaymentMethod') }}:</div>
      <div class="deposit-methods-container">
        <b-card
          v-for="method in depositMethods"
          :key="method.code"
          :class="{
            active: paymentMethod && method.code === paymentMethod.code,
            disabled: showOverlay(method)
          }"
          no-body
          bg-variant="arc-clr-soil-black"
          class="deposit-method"
          @click="setPaymentMethod(method)">
          <div
            v-if="showOverlay(method)"
            class="overlay">
            <div>
              {{ getOverlayText(method) }}
            </div>
            <div>
              {{ getOverlayAmount(method) }}
            </div>
          </div>
          <b-img :src="depositIcons[method.code]"/>
        </b-card>
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
  methods: {
    getOverlayText (method) {
      const { fields: { amount } } = this;
      const numberAmount = Number(amount)
      if (numberAmount < method.minAmount) return `${this.$t('account.deposit.minLimit')}:`
      return `${this.$t('account.deposit.maxLimit')}:`
    },
    getOverlayAmount (method) {
      const { fields: { amount } } = this;
      const numberAmount = Number(amount)
      if (numberAmount < method.minAmount) return method.minAmount
      return method.maxAmount
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
  margin-top: 10px;
  .deposit-method {
    flex: 0 calc(33% - 8px);
    padding: 5px;
    margin: 0 6px 10px 6px;
    position: relative;
    border: 1px solid transparent;
    border-radius: $btn-border-radius;
    cursor: pointer;
    height: 40px;
    transition: all .4s ease-in-out;
    &:nth-child(3n) {
      margin-right: 0;
    }
    &:nth-child(3n - 1) {
      margin: 0 6px 10px 6px;
    }
    &:nth-child(3n - 2) {
      margin-left: 0;
    }
    &.active {
      border: 1px solid $arc-clr-gold;
    }
    &.disabled {
      border: 1px solid $wp-clr-notif-red;
      cursor: default;
    }
    &:hover {
      & > img {
          transform: scale(1.1);
      }
    }
    img {
      width: 80%;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      left: 0;
      right: 0;
      z-index: 1;
      transition: all .4s ease-in-out;
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      line-height: 16px;
      z-index: 2;
      border-radius: $btn-border-radius;
      div:first-child {
        color: $wp-clr-notif-red;
      }
      div:last-child {
        font-weight: bold;
      }
    }
  }
}
</style>
