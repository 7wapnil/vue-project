<template>
  <b-col class="bg-arc-clr-soil-dark p-4 border-4 mt-md-4">
    <loader v-if="bonusLoading" />
    <deposit-details
      v-if="!isCryptoSectionShown && !bonusLoading"
      :fields="fields"
      :currency="currency"
      :payment-method="paymentMethod"
      :get-total="getTotal"
      :button-disabled="buttonDisabled"
      :calculated-bonus="calculatedBonus"
      :deposit-state="depositState"
      @submit:deposit="$emit('submit:deposit')"/>
    <deposit-crypto-section
      v-if="isCryptoSectionShown && !bonusLoading"
      :fields="fields"
      :is-crypto-section-shown="isCryptoSectionShown"
      :address="address" />
  </b-col>
</template>

<script>
import DepositCryptoSection from '@/views/account/account-deposit/deposit-summary/DepositCryptoSection'
import DepositDetails from '@/views/account/account-deposit/deposit-summary/DepositDetails'

export default {
  components: {
    DepositCryptoSection,
    DepositDetails
  },
  props: {
    isCryptoSectionShown: {
      type: Boolean,
      default: false
    },
    paymentMethod: {
      type: Object,
      default: null
    },
    fields: {
      type: Object,
      required: true
    },
    address: {
      type: String,
      default: ''
    },
    currency: {
      type: String,
      default: 'EUR'
    },
    calculatedBonus: {
      type: Number,
      default: 0
    },
    getTotal: {
      type: Number,
      default: 0
    },
    buttonDisabled: {
      type: Boolean,
      default: true
    },
    bonusLoading: {
      type: Boolean,
      default: false
    },
    depositState: {
      type: String,
      default: ''
    }
  },
}
</script>
