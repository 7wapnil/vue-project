<template>
  <div>
    <withdraw-placeholder v-if="!currentUserPaymentMethods"/>
    <div v-if="currentUserPaymentMethods">
      <h3 class="mb-5 font-weight-light">
        Withdraw funds
      </h3>
      <b-row
        v-b-toggle.withdrawMethod
        no-gutters
        class="d-flex align-items-center"
        style="min-height: 80px; box-shadow: 0 1px 0 0 rgba(0,0,0,0.30)">
        <b-col
          class="p-2"
          cols="auto">
          <b-img :src="imageSrc"/>
        </b-col>
        <b-col
          v-if="selectedMethod"
          class="ml-2">
          <span class="font-weight-bold letter-spacing-2 text-arc-clr-white">
            {{ selectedMethod.name }}
          </span>
          <br>
          <span class="font-size-14 letter-spacing-2 text-arc-clr-iron">
            {{ selectedMethod.payment_note }}
          </span>
        </b-col>
        <b-col
          v-if="allMethods.length > 1"
          cols="auto">
          <b-button variant="arc-secondary">
            Change withdraw method
          </b-button>
        </b-col>
      </b-row>
      <b-collapse
        v-if="allMethods.length > 1"
        id="withdrawMethod">
        <withdraw-methods-switch
          :methods="allMethods"
          @clicked-change-method="changeMethod"/>
      </b-collapse>
      <withdraw-form
        :default-method="selectedMethod"/>
    </div>
  </div>
</template>

<script>
import WithdrawMethodsSwitch from './WithdrawMethodsSwitch'
import WithdrawPlaceholder from './WithdrawPlaceholder'
import WithdrawForm from './WithdrawForm'
import { PAYMENT_METHODS_QUERY, USER_PAYMENT_METHODS_QUERY } from '@/graphql'
import SofortIcon from '@/assets/images/withdraw-methods/sofort.png'
import SkrillIcon from '@/assets/images/withdraw-methods/skrill.png'
import SkinwalletIcon from '@/assets/images/withdraw-methods/skinwallet.png'
import SkinpayIcon from '@/assets/images/withdraw-methods/skinpay.png'
import QiwiIcon from '@/assets/images/withdraw-methods/qiwi.png'
import PaysafeIcon from '@/assets/images/withdraw-methods/paysafe.png'
import MruIcon from '@/assets/images/withdraw-methods/mru.png'
import CreditCardIcon from '@/assets/images/withdraw-methods/card.png'
import BitcoinIcon from '@/assets/images/withdraw-methods/btc.png'
import YandexIcon from '@/assets/images/withdraw-methods/yandex.png'

export default {
  components: {
    WithdrawMethodsSwitch,
    WithdrawForm,
    WithdrawPlaceholder
  },
  data () {
    return {
      paymentMethods: [],
      selectedMethod: {},
      user: [],
      loading: true,
      imageSrc: '',
      images: {
        credit_card: CreditCardIcon,
        yandex: YandexIcon,
        mru: MruIcon,
        bitcoin: BitcoinIcon,
        paysafe: PaysafeIcon,
        qiwi: QiwiIcon,
        skinpay: SkinpayIcon,
        skinwallet: SkinwalletIcon,
        skrill: SkrillIcon,
        sofort: SofortIcon
      }
    }
  },
  apollo: {
    paymentMethods () {
      return {
        query: PAYMENT_METHODS_QUERY,
        result: this.setDefaultMethodProps
      }
    },
    user () {
      return {
        query: USER_PAYMENT_METHODS_QUERY
      }
    }
  },
  computed: {
    currentUserPaymentMethods () {
      return this.user ? this.user['available_withdraw_methods'] : []
    },
    allMethods () {
      if (!this.paymentMethods) {
        return []
      }

      let methods = this.paymentMethods

      if (this.currentUserPaymentMethods) {
        methods.forEach(method => {
          method.active = this.currentUserPaymentMethods.includes(method.code)
        })
      }

      return methods
    }
  },
  methods: {
    setDefaultMethodProps () {
      this.selectedMethod = this.allMethods[0]
      this.imageSrc = this.images[this.selectedMethod.code]
    },
    changeMethod (value) {
      this.selectedMethod = value
      this.imageSrc = value.icon
    }
  }
}
</script>
