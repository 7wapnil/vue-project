<template>
  <div>
    <deposit-header/>
    <deposit-description/>
    <deposit-errors
      v-if="!isMobile"
      :deposit-state="depositState"
      :deposit-message="depositMessage"
      :bonus-error="bonusError"/>
    <deposit-form-layout>
      <template #depositform>
        <deposit-presets
          :currency="currency"
          @preset-selected="addPresetAmount"/>
        <deposit-form
          :currency="currency"
          :deposit-methods="depositMethods"
          :fields="fields"
          :selected-payment-method-code="selectedPaymentMethodCode"
          :bonus-error="bonusError"
          @action:calculate="calculateBonus"
          @update:amount="updateAmount"
          @update:payment="updatePaymentMethod"
          @update:bonuscode="updateBonus"/>
      </template>
      <template #summary>
        <deposit-summary
          :is-crypto-section-shown="isCryptoSectionShown"
          :calculated-bonus="calculatedBonus"
          :address="address"
          :fields="fields"
          :currency="currency"
          :get-total="getTotal"
          :button-disabled="buttonDisabled"
          @submit:deposit="submitDeposit"/>
      </template>
    </deposit-form-layout>
    <deposit-methods/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  CURRENCIES_LIST_QUERY,
  BONUS_CALCULATION_MUTATION,
  DEPOSIT_METHODS_QUERY,
  DEPOSIT_MUTATION
} from '@/graphql'
import DepositHeader from '@/views/account/account-deposit/DepositHeader'
import DepositMethods from '@/views/account/account-deposit/DepositMethods'
import DepositDescription from '@/views/account/account-deposit/DepositDescription'
import DepositErrors from '@/views/account/account-deposit/DepositErrors'
import DepositSummary from '@/views/account/account-deposit/deposit-summary/DepositSummary'
import DepositPresets from '@/views/account/account-deposit/deposit-form/DepositPresets'
import DepositForm from '@/views/account/account-deposit/deposit-form/DepositForm'
import DepositFormLayout from '@/views/account/account-deposit/deposit-form/DepositFormLayout'
import { EUR } from '@/constants/currencies'
import { BITCOIN, CREDIT_CARD } from '@/constants/payments/methods'
import { FIAT } from '@/constants/currency-kinds'
import QRCode from 'qrcode'
import { Form } from '@/helpers'

export default {
  name: 'DepositFunds',
  components: {
    DepositHeader,
    DepositMethods,
    DepositDescription,
    DepositErrors,
    DepositSummary,
    DepositPresets,
    DepositForm,
    DepositFormLayout
  },
  data () {
    return {
      fields: new Form({
        amount: null,
        bonusCode: null,
      }),
      isCryptoSectionShown: false,
      paymentMethod: null,
      currencies: [],
      redirectUrl: process.env.VUE_APP_DEPOSIT_URL,
      calculatedBonus: '',
      bonusError: null,
      depositState: this.$route.query.depositState,
      depositMessage: this.$route.query.depositStateMessage,
      depositMethods: [],
      qrText: '',
      address: '',
    }
  },
  apollo: {
    currencies () {
      return {
        query: CURRENCIES_LIST_QUERY
      }
    },
    depositMethods () {
      return {
        query: DEPOSIT_METHODS_QUERY
      }
    }
  },
  computed: {
    ...mapGetters({
      token: 'getToken',
      fiatWallet: 'getUserFiatWallet',
      activeWallet: 'getUserActiveWallet',
      wallets: 'getUserWallets'
    }),
    getTotal () {
      let totalValue
      if (this.fields.amount && this.fields.amount.includes(',')) {
        this.fields.amount.replace(',', '.')
      }
      totalValue = parseFloat(this.fields.amount)
      if (this.calculatedBonus) {
        totalValue += parseFloat(this.calculatedBonus)
      }
      if (!isNaN(totalValue)) {
        return parseFloat(totalValue).toFixed(2)
      }
    },
    currency () {
      return (this.paymentMethod && this.paymentMethod.currencyCode) ||
        (this.fiatWallet && this.fiatWallet.currency.code) ||
        EUR
    },
    buttonDisabled () {
      let parsedAmount = parseFloat(this.fields.amount)
      return parsedAmount <= 0 || isNaN(parsedAmount) || !this.paymentMethod
    },
    isFormEmpty () {
      return Object.values(this.fields.values()).some(value => (value === null || value === ''))
    },
    selectedPaymentMethodCode: {
      get: function () {
        return this.selectedPaymentMethod ? this.selectedPaymentMethod.code : ''
      },
      set: function (paymentMethodCode) {
        let newPaymentMethod = this.depositMethods.find((method) => method.code === paymentMethodCode)

        if (this.paymentMethod && newPaymentMethod.currencyKind !== this.paymentMethod.currencyKind) {
          this.calculatedBonus = null
          this.bonusError = null
          this.fields.reset()
        }

        this.paymentMethod = newPaymentMethod
        this.isCryptoSectionShown = false
      }
    },
    selectedPaymentMethod () {
      return this.paymentMethod || this.initialPaymentMethod
    },
    initialPaymentMethod () {
      let method = this.activeWalletPaymentMethod
      if (method) return method

      return this.secondaryWalletPaymentMethod
    },
    activeWalletPaymentMethod () {
      if (!this.activeWallet) return

      return this.depositMethods.find((method) => method.currencyCode === this.activeWallet.currency.code)
    },
    secondaryWalletPaymentMethod () {
      if (!this.wallets.length) return

      let foundMethod = null

      this.wallets.some((wallet) => {
        if (wallet.currency.kind === FIAT) {
          foundMethod = this.depositMethods.find((method) => method.code === CREDIT_CARD)
        } else {
          foundMethod = this.depositMethods.find((method) => method.currencyCode === wallet.currency.code)
        }

        return foundMethod
      })

      return foundMethod
    }
  },
  created () {
    if (this.selectedPaymentMethod) {
      this.paymentMethod = this.selectedPaymentMethod
    }
  },
  methods: {
    calculateBonus (callback = null) {
      if (!this.isFormEmpty) {
        this.$apollo.mutate({
          mutation: BONUS_CALCULATION_MUTATION,
          variables: {
            amount: parseFloat(this.fields.amount),
            code: this.fields.bonusCode,
            currencyCode: this.currency
          }
        }).then(({ data }) => {
          this.calculatedBonus = data.depositBonus.bonus
          this.bonusError = null
          if (callback === this.submitDepositCallback) {
            callback()
          }
        }).catch(({ graphQLErrors }) => {
          this.calculatedBonus = null
          this.bonusError = graphQLErrors[0].message
          setTimeout(() => {
            this.bonusError = null
            this.updateBonus(null)
          }, 2000)
        })
      }
    },
    submitDeposit () {
      if (this.isFormEmpty) {
        this.submitDepositCallback()
      } else {
        this.calculateBonus(this.submitDepositCallback)
      }
    },
    submitDepositCallback () {
      const input = {
        paymentMethod: this.paymentMethod.code,
        currencyCode: this.currency,
        amount: parseFloat(parseFloat(this.fields.amount).toFixed(2)),
        bonusCode: this.fields.bonusCode
      }

      this.$apollo.mutate({
        mutation: DEPOSIT_MUTATION,
        variables: { input }
      }).then(({ data: { deposit } }) => {
        if (this.paymentMethod.code === BITCOIN) {
          this.isCryptoSectionShown = true
          this.address = deposit.url
          this.qrText = `bitcoin:${this.address}?amount=${this.fields.amount / 1000}`
          QRCode.toCanvas(document.getElementById('qrcode'), this.qrText, { scale: 4, margin: 2 })
        } else {
          this.depositState = 'success'
          this.depositMessage = deposit.message
          window.location.href = deposit.url
        }
      }).catch(({ graphQLErrors }) => {
        this.depositState = 'fail'
        this.depositMessage = graphQLErrors[0].message
      })
    },
    addPresetAmount (amount) {
      this.fields.amount = amount.toString()
      this.calculateBonus()
    },
    updateAmount (payload) {
      this.fields.amount = payload
    },
    updateBonus (payload) {
      this.fields.bonusCode = payload
    },
    updatePaymentMethod (payload) {
      this.selectedPaymentMethodCode = payload
    }
  }
}
</script>
