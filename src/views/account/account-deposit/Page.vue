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
          {{ getMessage }}
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
                    placeholder="Custom"/>
                </b-input-group>
                <b-form-select
                  v-model="fields.depositMethod"
                  class="mb-4">
                  <option
                    value=""
                    disabled>{{ $t('account.deposit.paymentMethodsPlaceholder') }}</option>
                  <option
                    v-for="(payment, index) in depositMethods"
                    :key="index">
                    {{ payment.name }}
                  </option>
                </b-form-select>
                <b-form-select
                  v-if="isEmptyWallet"
                  v-model="currency"
                  class="mb-4">
                  <option :value="null">Choose currency</option>
                  <option
                    v-for="(filtredCurrency, index) in filteredCurrencies"
                    :key="index">
                    {{ filtredCurrency.value }}
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
                  <b-form-input v-model="fields.bonusCode"/>
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
import { CURRENCIES_LIST_QUERY, BONUS_CALCULATION_MUTATION, DEPOSIT_METHODS_QUERY } from '@/graphql'
import DepositHeader from './DepositHeader'
import DepositMethods from './DepositMethods'

export default {
  name: 'DepositFunds',
  components: {
    DepositHeader,
    DepositMethods
  },
  data () {
    return {
      fields: {
        amount: '',
        bonusCode: null,
        depositMethod: ''
      },
      dropdownCurrency: null,
      currencies: [],
      redirectUrl: process.env.VUE_APP_DEPOSIT_URL,
      calculatedBonus: '',
      bonusError: null,
      invalidBonusCode: 'Invalid bonus code',
      depositState: this.$route.query.depositState,
      variantMap: {
        pending: 'warning',
        success: 'success',
        fail: 'danger'
      },
      moneyAmounts: [ 10, 25, 50, 75, 100, 150, 200, 250 ],
      depositMethods: []
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
    ...mapGetters('wallets', {
      walletActive: 'activeWallet'
    }),
    ...mapGetters({
      token: 'getToken'
    }),
    getTotal () {
      let totalValue
      if (this.fields.amount.includes(',')) {
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
    currency: {
      get () {
        if (this.dropdownCurrency) {
          return this.dropdownCurrency
        }

        if (this.walletActive && !this.isEmptyWallet) {
          return this.walletActive.currency.code
        }

        return null
      },
      set (value) {
        this.dropdownCurrency = value
      }
    },
    isEmptyWallet () {
      if (this.walletActive) {
        return this.walletActive.id === null
      }
    },
    getMessage () {
      return this.$route.query.depositStateMessage
    },
    mapDepositState () {
      return this.variantMap[this.depositState]
    },
    filteredCurrencies () {
      let currencyList = []

      this.currencies.forEach((currency) => {
        currencyList.push({ label: currency.name, value: currency.code, kind: currency.kind, primary: currency.primary })
      })

      return currencyList
    },
    buttonDisabled () {
      return this.fields.amount == null || this.fields.depositMethod === ''
    }
  },
  methods: {
    calculateBonus () {
      if (this.fields.bonusCode && this.fields.amount) {
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
      } else {
        this.bonusError = this.invalidBonusCode
      }
    },
    submitDeposit () {
      let queryParams = {
        token: this.token,
        currencyCode: this.currency,
        amount: this.fields.amount,
        bonusCode: this.fields.bonusCode
      };

      let query = Object.keys(queryParams)
        .map(param => param + '=' + queryParams[param])
        .join('&');
      window.location.href = this.redirectUrl += query
    },
    addPresetAmount (amount) {
      this.fields.amount = amount.toString()
    }
  }
}
</script>
