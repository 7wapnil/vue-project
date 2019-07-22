<template>
  <div>
    <deposit-header/>
    <deposit-description/>
    <deposit-errors
      :deposit-state="depositState"
      :deposit-message="depositMessage"
      :bonus-error="bonusError"/>

    <b-row
      class="my-4"
      no-gutters>

      <b-col class="mr-4">
        <b-row no-gutters>
          <b-col
            class="text-right pt-2"
            cols="12"
            md="4">
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
                  value=""
                  class="mb-4"
                  @change="selectPaymentMethod">
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
          <h5 class="my-4">Scan code</h5>
          <canvas id="qrcode" />
          <h5 class="font-italic text">Raw address:</h5>
          <h5 class="text-break">{{ address }}</h5>
        </div>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col class="text-arc-clr-iron mb-md-2 mb-0 p-4 p-md-0">
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
import DepositHeader from '@/views/account/account-deposit/DepositHeader'
import DepositMethods from '@/views/account/account-deposit/DepositMethods'
import DepositDescription from '@/views/account/account-deposit/DepositDescription'
import DepositErrors from '@/views/account/account-deposit/DepositErrors'
import { EUR } from '@/constants/currencies'
import QRCode from 'qrcode'
import { Form } from '@/helpers'

export default {
  components: {
    DepositHeader,
    DepositMethods,
    DepositDescription,
    DepositErrors
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
    ...mapGetters('wallets', ['fiatWallet']),
    ...mapGetters({
      token: 'getToken'
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
      return this.fields.amount == null || !this.paymentMethod
    },
    isFormEmpty () {
      return Object.values(this.fields.values()).some(value => (value === null || value === ''))
    }
  },
  methods: {
    selectPaymentMethod (paymentMethodCode) {
      this.paymentMethod = this.depositMethods.find((method) => method.code === paymentMethodCode)
      this.fields.reset()
      this.calculatedBonus = null
      this.isCryptoSectionShown = false
    },
    calculateBonus () {
      if (!this.isFormEmpty) {
        this.$apollo.mutate({
          mutation: BONUS_CALCULATION_MUTATION,
          variables: {
            amount: parseFloat(this.fields.amount),
            code: this.fields.bonusCode
          }
        }).then(({ data }) => {
          this.calculatedBonus = data.depositBonus.bonus
          this.bonusError = null
        }).catch(({ graphQLErrors }) => {
          this.calculatedBonus = null
          this.bonusError = graphQLErrors[0].message
        })
      }
    },
    submitDeposit () {
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
        if (this.paymentMethod.code === 'bitcoin') {
          this.isCryptoSectionShown = true
          this.address = deposit.url
          this.qrText = `bitcoin:${this.address}?amount=${this.fields.amount / 1000}`
          QRCode.toCanvas(document.getElementById('qrcode'), this.qrText, { scale: 8, margin: 2 })
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
    }
  }
}
</script>
