<template>
  <div>
    <deposit-header/>

    <b-row
      class="mb-4"
      no-gutters>
      <b-col>
        <p class="mb-0 text-arc-clr-iron letter-spacing-2">
          This is only a list of payment methods we support.
          You will select the one that suits you on the next page.
          <span class="text-arc-clr-gold">
            We do not charge service fees.
          </span>
        </p>
      </b-col>
    </b-row>
    <b-row
      class="my-4"
      no-gutters>
      <b-col>
        <p class="mb-0 text-arc-clr-iron letter-spacing-2">
          {{ $t('account.deposit.moneyTransferInformation') }}
        </p>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <b-alert
          :show="!!depositState"
          :variant="mapDepositState">
          {{ depositMessage }}
        </b-alert>
        <b-alert
          :show="!!bonusError"
          variant="danger">
          {{ bonusError }}
        </b-alert>
      </b-col>
    </b-row>
    <b-row
      class="my-4"
      no-gutters>

      <b-col class="mr-4">
        <b-row no-gutters>
          <b-col
            class="text-right pt-2"
            cols="4">
            <h6 class="text-arc-clr-iron letter-spacing-2">
              {{ $t('generalTerms.amount') }}:
            </h6>
          </b-col>
          <b-col class="text-right">
            <b-button
              v-for="(moneyAmount, index) in moneyAmounts"
              :key="index"
              class="mb-2 mr-2"
              variant="arc-deposit"
              @click="addPresetAmount(moneyAmount)">
              {{ moneyAmount }} {{ currency }}
            </b-button>
          </b-col>
        </b-row>

        <b-row no-gutters>
          <b-col>
            <b-row no-gutters>
              <b-col
                cols="4"
                class="mr-2"/>
              <b-col class="pl-4 pr-2 pt-2">
                <b-input-group
                  v-if="currency"
                  :append="currency"
                  class="mb-4">
                  <b-form-input
                    id="deposit-amount-currency"
                    v-model="fields.amount"
                    min="1"
                    type="number"
                    placeholder="Custom"
                    @blur.prevent="calculateBonus"/>
                </b-input-group>
                <b-form-select
                  v-model="selectedPaymentMethodCode"
                  class="mb-4">
                  <option
                    value=""
                    disabled>{{ $t('account.deposit.paymentMethodsPlaceholder') }}</option>
                  <option
                    v-for="(payment, index) in depositMethods"
                    :key="index"
                    :value="payment.code">
                    {{ payment.name }}
                  </option>
                </b-form-select>
              </b-col>
            </b-row>
            <b-row no-gutters>
              <b-col
                cols="4"
                class="mr-2">
                <h6 class="text-right mt-2 text-arc-clr-iron letter-spacing-2">
                  {{ $t('generalTerms.bonusCode') }}:
                </h6>
              </b-col>
              <b-col class="ml-4 mr-2">
                <b-input-group >
                  <b-form-input
                    v-model="fields.bonusCode"
                    @blur.prevent="calculateBonus"/>
                  <b-input-group-append>
                    <b-button
                      class="px-4 py-1"
                      variant="user-profile-button"
                      @click.prevent="calculateBonus">
                      <span class="font-size-24">
                        +
                      </span>
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
                <h6 class="text-center text-arc-clr-iron-light mt-3 letter-spacing-2">
                  Bonus code description
                </h6>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
      <b-col class="bg-arc-clr-soil-dark ml-2 p-4 border-4">
        <div
          id="summary"
          :class="{ 'd-none' : isCryptoSectionShown }">
          <b-row no-gutters>
            <b-col class="text-center py-2">
              <h4 class="mt-2 mb-4 font-weight-light letter-spacing-1">
                {{ $t('account.deposit.depositSummary') }}
              </h4>
            </b-col>
          </b-row>
          <b-row
            class="mb-1"
            no-gutters>
            <b-col>
              <h6 class="text-right letter-spacing-2 text-arc-clr-iron">
                {{ $tc('generalTerms.deposit', 1) }}:
              </h6>
            </b-col>
            <b-col class="pl-2 text-truncate">
              <h6 class="letter-spacing-2">
                {{ fields.amount ? fields.amount : 0 }} {{ currency }}
              </h6>
            </b-col>
          </b-row>
          <b-row
            class="mb-1"
            no-gutters>
            <b-col>
              <h6 class="text-right letter-spacing-2 text-arc-clr-iron">
                {{ $tc('generalTerms.bonus', 1) }}:
              </h6>
            </b-col>
            <b-col class="pl-2 text-truncate">
              <h6 class="letter-spacing-2">
                {{ calculatedBonus ? calculatedBonus : 0 }} {{ currency }}
              </h6>
            </b-col>
          </b-row>
          <b-row
            class="mb-1"
            no-gutters>
            <b-col>
              <h6 class="mb-2 text-right letter-spacing-2 text-arc-clr-iron">
                {{ $tc('generalTerms.fee', 1) }}:
              </h6>
            </b-col>
            <b-col class="pl-2 text-truncate">
              <h6 class="mb-2 letter-spacing-2">
                0.00 {{ currency }}
              </h6>
            </b-col>
          </b-row>
          <b-row
            class="mt-2 mb-1"
            no-gutters>
            <b-col class="pt-1">
              <h6 class="mb-0 text-right letter-spacing-2 text-arc-clr-iron">
                {{ $t('account.deposit.total') }}:
              </h6>
            </b-col>
            <b-col class="pl-2 mb-4 text-truncate">
              <span class="letter-spacing-2 font-weight-bold">
                {{ getTotal ? getTotal : 0 }} {{ currency }}
              </span>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col class="px-2 mt-4 mb-2">
              <b-button
                :disabled="buttonDisabled"
                variant="user-profile-button"
                class="w-100"
                @click.prevent="submitDeposit">
                {{ $t('account.cta.deposit') }}
              </b-button>
            </b-col>
          </b-row>
        </div>
        <div
          id="cryptoSection"
          :class="{ 'd-none' : !isCryptoSectionShown }">
          <p
            class="text font-size-14 text-justify"
            v-html="$t('account.deposit.crypto.howTo')"/>
          <h5 class="mt-2 mb-1">{{ $t('account.deposit.crypto.copyAddress') }}</h5>
          <p
            v-clipboard:copy="address"
            v-clipboard:success="onCopyAddress"
            class="pointer font-italic font-size-14 text-break mb-0">{{ address }}</p>
          <h5 class="mt-2 mb-1">{{ $t('account.deposit.crypto.scanQRCode') }}</h5>
          <canvas id="qrcode"/>
        </div>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col class="text-arc-clr-iron mb-2">
        Payments methods we support:
      </b-col>
    </b-row>
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
import DepositHeader from './DepositHeader'
import DepositMethods from './DepositMethods'
import { EUR } from '@/constants/currencies'
import { BITCOIN, CREDIT_CARD } from '@/constants/payments/methods'
import { FIAT } from '@/constants/currency-kinds'
import QRCode from 'qrcode'
import { Form } from '@/helpers'

export default {
  name: 'DepositFunds',
  components: {
    DepositHeader,
    DepositMethods
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
      variantMap: {
        pending: 'warning',
        success: 'success',
        fail: 'danger'
      },
      moneyAmounts: [ 10, 25, 50, 75, 100, 150, 200, 250 ],
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
    mapDepositState () {
      return this.variantMap[this.depositState]
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
    onCopyAddress () {
      this.$noty.info(this.$t('account.deposit.crypto.addressCopied'))
    }
  }
}
</script>
