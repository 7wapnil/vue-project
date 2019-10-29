<template>
  <b-col class="bg-arc-clr-soil-dark p-4 border-4 mt-md-4">
    <deposit-details
      v-if="!isCryptoSectionShown"
      :fields="fields"
      :currency="currency"
      :calculated-bonus="calculatedBonus"
      :get-total="getTotal"
      :button-disabled="buttonDisabled"
      :deposit-state="depositState"
      :deposit-message="depositMessage"
      @submit:deposit="$emit('submit:deposit')"/>
    <deposit-crypto-section
      :is-crypto-section-shown="isCryptoSectionShown"
      :address="address">
      <slot/>
    </deposit-crypto-section>
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
      type: [String, Number],
      default: ''
    },
    getTotal: {
      type: String,
      default: ''
    },
    buttonDisabled: {
      type: Boolean,
      default: true
    },
    depositState: {
      type: String,
      default: null
    },
    depositMessage: {
      type: String,
      default: null
    }
  },
}
</script>
