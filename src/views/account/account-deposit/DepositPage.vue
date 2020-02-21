<template>
  <div>
    <deposit-header/>
    <deposit-errors
      :deposit-state="depositState"
      :deposit-message="depositMessage"/>
    <div v-if="address && showChangelly">
      <div
        v-if="!isMobile"
        class="mb-1 d-flex align-items-center pointer"
        @click="resetAll">
        <icon
          name="chevron-left"
          class="mr-2"
          color="arc-clr-white"
          size="14px"/>
        {{ $t('account.deposit.crypto.goBack') }}
      </div>
      <b-embed
        src="https://widget.changelly.com?currencies=*&from=eth&to=btc&amount=10&address=xxxxxxxxxxxxxxxxxx&fiat=true&fixedTo=true&theme=default&merchant_id=fe955c18c16b&payment_id="
        type="iframe"
        aspect="1by1"
        allowfullscreen
        width="100%"
        height="600"
        class="changelly"
        scrolling="no"
        on-load="function ue(e){var t=e.target,n=t.parentNode,r=t.contentWindow,o=function(){return r.postMessage({width:n.offsetWidth},'undefined'!==typeof z?z.url:'https://widget.changelly.com')};window.addEventListener('resize',o),o()};ue.apply(this, arguments);"
        style="min-width: 100%; width: 100px; overflow-y: hidden; border: none"/>
    </div>
    <component
      v-else
      :is="layout"
      :deposit-state="depositState">
      <deposit-amount
        v-if="showBlock"
        slot="deposit-amount"
        :payment-method="paymentMethod"
        :currency="currency"
        :amount-error="amountError"
        :update-amount="updateAmount"
        :wallets="wallets"
        :set-wallet-filter="setWalletFilter"
        :default-currency="defaultCurrency"
        :filter="filter"
        :fields="fields"/>
      <deposit-methods
        v-if="showBlock"
        slot="deposit-methods"
        :set-payment-method="setPaymentMethod"
        :deposit-methods="filteredDepositMethods"
        :loading="$apollo.queries.user.loading"
        :payment-method="paymentMethod"
        :fields="fields"/>
      <deposit-bonus
        v-if="showBlock"
        slot="deposit-bonus"
        :bonus-error="bonusError"
        :calculate-bonus="calculateBonus"
        :set-bonus-error="setBonusError"
        :payment-method="paymentMethod"
        :fields="fields"
        :bonus-success="bonusSuccess" />
      <deposit-summary
        slot="deposit-summary"
        :address="address"
        :fields="fields"
        :currency="currency"
        :payment-method="paymentMethod"
        :get-total="getTotal"
        :button-disabled="buttonDisabled"
        :is-crypto-section-shown="isCryptoSectionShown"
        :calculated-bonus="calculatedBonus"
        :bonus-loading="bonusLoading"
        :deposit-state="depositState"
        @submit:deposit="submitDeposit"/>
    </component>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import {
  BONUS_CALCULATION_MUTATION,
  USER_DEPOSIT_METHODS_QUERY,
  DEPOSIT_MUTATION
} from '@/graphql'
import { HIDE_ALERT_TIMEOUT } from '@/constants/timeouts'
import { DEPOSIT_FAIL, DEPOSIT_SUCCESS } from '@/constants/deposit-states'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import DepositHeader from '@/views/account/account-deposit/DepositHeader'
import DepositAmount from '@/views/account/account-deposit/deposit-form/DepositAmount'
import DepositBonus from '@/views/account/account-deposit/deposit-form/DepositBonus'
import DepositMethods from '@/views/account/account-deposit/deposit-form/DepositMethods'
import DepositErrors from '@/views/account/account-deposit/DepositErrors'
import DepositSummary from '@/views/account/account-deposit/deposit-summary/DepositSummary'
import { EUR } from '@/constants/currencies'
import { BITCOIN, CHANGELLY } from '@/constants/payments/methods'
import { Form } from '@/helpers'
import { getCurrencyKind } from '@/helpers/wallet'

export default {
  name: 'DepositFunds',
  components: {
    DepositHeader,
    DepositAmount,
    DepositBonus,
    DepositMethods,
    DepositErrors,
    DepositSummary,
  },
  data () {
    return {
      fields: new Form({
        amount: null,
        bonusCode: null,
      }),
      isSubmitting: false,
      amountError: null,
      isCryptoSectionShown: false,
      paymentMethod: null,
      calculatedBonus: 0,
      bonusSuccess: null,
      bonusError: null,
      bonusLoading: false,
      bonusValid: true,
      timeout: null,
      depositState: this.$route.query.depositState,
      depositMessage: this.$route.query.depositStateMessage,
      depositDetails: this.$route.query.depositDetails,
      depositMethods: [],
      qrText: '',
      address: '',
      filter: null,
      storedMethod: null
    }
  },
  apollo: {
    user () {
      return {
        query: USER_DEPOSIT_METHODS_QUERY,
        fetchPolicy: NETWORK_ONLY,
        result ({ data }) {
          this.depositMethods = data.user.availableDepositMethods
        }
      }
    }
  },
  computed: {
    layout () {
      const MobileLayout = () => import(`@/views/account/account-deposit/deposit-form/DepositFormLayoutMobile`)
      const DesktopLayout = () => import(`@/views/account/account-deposit/deposit-form/DepositFormLayoutDesktop`)
      return this.isMobile ? MobileLayout : DesktopLayout
    },
    ...mapGetters({
      activeWallet: 'getUserActiveWallet',
      wallets: 'getUserWallets',
    }),
    defaultCurrency () {
      if (!this.activeWallet) return null
      return this.activeWallet.currency.code
    },
    showBlock () {
      if (this.depositDetails) return false

      return !this.isCryptoSectionShown || (!this.isMobile && this.isCryptoSectionShown)
    },
    getTotal () {
      let totalValue
      totalValue = parseFloat(this.fields.amount)
      if (this.calculatedBonus) totalValue += parseFloat(this.calculatedBonus)
      return totalValue
    },
    currency () {
      return (this.paymentMethod && this.paymentMethod.currency.code) || (this.activeWallet && this.activeWallet.currency.code) || EUR
    },
    buttonDisabled () {
      let parsedAmount = parseFloat(this.fields.amount)
      return parsedAmount <= 0 || isNaN(parsedAmount) || !this.paymentMethod || this.isSubmitting || !this.bonusValid
    },
    filteredDepositMethods () {
      if (!this.filter) return this.depositMethods

      return this.depositMethods.filter(method => method.currency.kind === this.filter)
    }
  },
  watch: {
    depositMethods () {
      if (this.depositMethods.length === 0 || this.paymentMethod || !this.depositDetails) return

      const decodedDepositDetails = atob(this.depositDetails)
      const paymentMethod = new URLSearchParams(decodedDepositDetails).get('paymentMethod')
      const [usedMethod] = this.depositMethods.filter(method => method.code === paymentMethod)
      this.paymentMethod = usedMethod
    }
  },
  created () {
    if (!this.depositDetails) return

    this.addTabName(this.$i18n.t('account.tabs.depositFunds'))
    const decodedDepositDetails = atob(this.depositDetails)
    const amount = new URLSearchParams(decodedDepositDetails).get('realMoneyAmount')
    const bonus = new URLSearchParams(decodedDepositDetails).get('bonusAmount')
    this.fields.amount = amount
    this.calculatedBonus = Number(bonus)
  },
  beforeDestroy () {
    if (!this.depositState) return

    this.$router.replace({ name: this.$route.params.titleKind })
  },
  methods: {
    ...mapMutations('tabs', {
      addTabName: 'addTabName',
    }),
    ...mapMutations({ setActiveWallet: 'setActiveWallet' }),
    setPaymentMethod (method) {
      if (!method) return this.resetPaymentMethod()
      this.filter = method.currency.kind
      this.storedMethod = method
      const wallet = this.wallets.find(wallet => wallet.currency.code === method.currency.code)
      if (wallet && wallet.id) this.setActiveWallet(wallet.id)
      this.paymentMethod = method
    },
    resetAll () {
      this.address = null
      this.showChangelly = null
      this.fields.amount = null
      this.resetPaymentMethod()
      this.resetBonus()
    },
    resetPaymentMethod () {
      this.isCryptoSectionShown = false
      this.paymentMethod = null
    },
    resetBonus () {
      this.bonusValid = true
      this.calculatedBonus = 0
    },
    updateAmount (val) {
      const valNum = parseFloat(val)
      if (this.amountError) this.amountError = null
      if (this.bonusError) this.bonusError = null
      if (this.paymentMethod && (valNum > this.paymentMethod.maxAmount || valNum < this.paymentMethod.minAmount)) {
        this.storedMethod = this.paymentMethod
        this.paymentMethod = null
      } else if (this.storedMethod && (valNum <= this.storedMethod.maxAmount && valNum >= this.storedMethod.minAmount)) {
        this.paymentMethod = this.storedMethod
        this.storedMethod = null
      }
      this.fields.amount = val

      if (this.fields.bonusCode) this.calculateBonus(this.fields.bonusCode)
    },
    setBonusError (message) {
      this.bonusError = message
    },
    setWalletFilter (code) {
      const wallet = this.wallets.find(wallet => wallet.currency.code === code)
      if (wallet) {
        this.filter = wallet.currency.kind
        this.setActiveWallet(wallet.id)
      } else {
        const kind = getCurrencyKind(code)
        this.filter = kind
      }
      this.resetPaymentMethod()
    },
    calculateBonus (val) {
      this.fields.bonusCode = val
      if (val.length === 0) this.resetBonus()
      if (val.length < 2) return

      if (this.fields.amount) {
        this.bonusLoading = true
        this.bonusSuccess = null
        this.bonusError = null
        clearTimeout(this.timeout)

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
          this.bonusSuccess = this.$i18n.t('account.deposit.bonusActivated')
          this.bonusValid = true
          this.timeout = setTimeout(() => {
            this.bonusSuccess = null
          }, HIDE_ALERT_TIMEOUT)
        }).catch(({ graphQLErrors }) => {
          this.calculatedBonus = 0
          this.bonusValid = false
          this.bonusError = graphQLErrors[0].message
        }).finally(() => {
          this.bonusLoading = false
        })
      }
    },
    submitDeposit () {
      this.isSubmitting = true

      const input = {
        paymentMethod: this.paymentMethod.code,
        currencyCode: this.currency,
        amount: parseFloat(parseFloat(this.fields.amount).toFixed(2)),
        bonusCode: this.fields.bonusCode
      }

      this.$apollo.mutate({
        mutation: DEPOSIT_MUTATION,
        variables: { input }
      })
        .then(({ data: { deposit } }) => this.depositSuccess(deposit))
        .catch(({ graphQLErrors }) => {
          this.depositState = DEPOSIT_FAIL
          this.depositMessage = graphQLErrors[0].message
        }).finally(() => {
          this.isSubmitting = false
        })
    },
    depositSuccess (deposit) {
      if (this.paymentMethod.code === BITCOIN) {
        this.isCryptoSectionShown = true
        this.address = deposit.url
      } else if (this.paymentMethod.code === CHANGELLY) {
        this.address = deposit.url
        this.showChangelly = true
      } else {
        this.depositState = DEPOSIT_SUCCESS
        this.depositMessage = deposit.message
        window.location.href = deposit.url
      }
    }
  }
}
</script>
