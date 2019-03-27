<template>
  <div>
      <deposit-header/>

      <b-row class="mb-4"
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

      <deposit-methods/>

      <b-row class="my-4"
             no-gutters>
          <b-col>
              <p class="mb-0 text-arc-clr-iron letter-spacing-2">
                  The money will be transferred directly in to your Arcanebet account.
                  When you have won some bets you can look forward to easy and fast
                  withdrawals without fees!
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
      <b-row class="my-4"
             no-gutters>
          <b-col>

          </b-col>
          <b-col class="bg-arc-clr-soil-dark ml-2 p-4">
            <b-row no-gutters>
                <b-col class="text-center py-2">
                    <h4 class="mb-4 font-weight-light letter-spacing-1">
                        Deposit summary
                    </h4>
                </b-col>
            </b-row>
            <b-row class="mb-1"
                   no-gutters>
                <b-col>
                    <h6 class="text-right letter-spacing-2 text-arc-clr-iron">
                        Deposit:
                    </h6>
                </b-col>
                <b-col class="pl-2 text-truncate">
                    <h6 class="letter-spacing-2">
                       {{ fields.amount ? fields.amount : 0 }} {{ currency }}
                    </h6>
                </b-col>
            </b-row>
              <b-row class="mb-1"
                     no-gutters>
                  <b-col>
                      <h6 class="text-right letter-spacing-2 text-arc-clr-iron">
                          Bonus:
                      </h6>
                  </b-col>
                  <b-col class="pl-2 text-truncate">
                      <h6 class="letter-spacing-2">
                          {{ calculatedBonus ? calculatedBonus : 0 }} {{ currency }}
                      </h6>
                  </b-col>
              </b-row>
              <b-row class="mb-1" no-gutters>
                  <b-col>
                      <h6 class="mb-2 text-right letter-spacing-2 text-arc-clr-iron">
                          Fee:
                      </h6>
                  </b-col>
                  <b-col class="pl-2 text-truncate">
                      <h6 class="mb-2 letter-spacing-2">
                          0.00 {{ currency }}
                      </h6>
                  </b-col>
              </b-row>
              <b-row no-gutters>
                  <b-col>
                      <h6 class="mb-2 text-right letter-spacing-2 text-arc-clr-iron">
                          Total to be added:
                      </h6>
                  </b-col>
                  <b-col class="pl-2 text-truncate">
                      <span class="letter-spacing-2 font-weight-bold">
                          {{ getTotal ? getTotal : 0 }} {{ currency }}
                      </span>
                  </b-col>
              </b-row>
              <b-row no-gutters>
                  <b-col class="px-2 mt-4 mb-2">
                      <b-button
                              variant="user-profile-button"
                              class="w-100"
                              @click.prevent="submitDeposit">
                          Deposit
                      </b-button>
                  </b-col>
              </b-row>
          </b-col>
      </b-row>


<!--////-->
    <!--<b-row no-gutters>-->
      <!--<b-col>-->
        <!--<b-row-->
          <!--v-if="currency"-->
          <!--no-gutters>-->
          <!--<b-col>-->
            <!--<b-input-group :append="currency">-->
              <!--<b-form-input-->
                <!--min="1"-->
                <!--id="deposit-amount-currency"-->
                <!--v-model="fields.amount"-->
                <!--type="number"-->
                <!--placeholder="Amount"/>-->
            <!--</b-input-group>-->
          <!--</b-col>-->
        <!--</b-row>-->

        <!--<regular-input-->
          <!--id="deposit-amount"-->
          <!--v-model="fields.amount"-->
          <!--type="number"-->
          <!--label="Amount"-->
        <!--/>-->
        <!--<b-row-->
          <!--v-if="isEmptyWallet"-->
          <!--align-h="center"-->
          <!--no-gutters>-->
          <!--<b-col>-->
            <!--<select-input-->
              <!--id="deposit-currency"-->
              <!--:options="filteredCurrencies"-->
              <!--v-model="currency"-->
              <!--class-name="currency"-->
              <!--type="select"-->
              <!--label="Choose currency"-->
              <!--bottom-bar-->
            <!--/>-->
          <!--</b-col>-->
        <!--</b-row>-->


          <!--<b-row-->
            <!--no-gutters-->
            <!--class="mt-4">-->
            <!--<b-col>-->
              <!--<b-input-group>-->
                <!--<b-form-input-->
                  <!--id="deposit-bonus-code"-->
                  <!--v-model="fields.bonusCode"-->
                  <!--type="text"-->
                  <!--placeholder="Bonus code"-->
                  <!--@blur.native="showButton()"-->
                  <!--@keydown.enter.native="showButton()"/>-->
                <!--<b-input-group-append>-->
                  <!--<b-button-->
                    <!--v-if="isVisible"-->
                    <!--class="bg-arc-clr-sport-bg"-->
                    <!--@click.prevent="calculateBonus()">-->
                      <!--+-->
                  <!--</b-button>-->
                <!--</b-input-group-append>-->
              <!--</b-input-group>-->
            <!--</b-col>-->
          <!--</b-row>-->
      <!--</b-col>-->
    <!--</b-row>-->
  </div>
</template>

<script>
import RegularInput from '@/components/inputs/RegularInput.vue'
import SelectInput from '@/components/inputs/SelectInput.vue'
import { mapGetters } from 'vuex'
import { CURRENCIES_LIST_QUERY, BONUS_CALCULATION_MUTATION } from '@/graphql'
import DepositHeader from './DepositHeader'
import DepositMethods from './DepositMethods'

export default {
  name: 'DepositFunds',
  components: {
    RegularInput,
    SelectInput,
    DepositHeader,
    DepositMethods
  },
  data () {
    return {
      fields: {
        amount: '',
        bonusCode: ''
      },
      dropdownCurrency: null,
      currencies: [],
      redirectUrl: process.env.VUE_APP_DEPOSIT_URL,
      calculatedBonus: '',
      isVisible: null,
      bonusError: null,
      missingValuesError: 'Please make sure you filled all the fields.',
      depositState: this.$route.query.depositState,
      variantMap: {
        pending: 'warning',
        success: 'success',
        fail: 'danger'
      }
    }
  },
  apollo: {
    currencies () {
      return {
        query: CURRENCIES_LIST_QUERY
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
          this.calculatedBonus = data.deposit_bonus.bonus
          this.bonusError = null
        }).catch(({ graphQLErrors }) => {
          this.calculatedBonus = null
          this.bonusError = graphQLErrors[0].message
        })
      } else {
        this.bonusError = this.missingValuesError
      }
    },
    showButton (e) {
      if (this.fields.bonusCode) {
        this.isVisible = true
      }
    },
    submitDeposit () {
      let queryParams = {
        token: this.token,
        currency_code: this.currency,
        amount: this.fields.amount,
        bonus_code: this.fields.bonusCode
      };

      let query = Object.keys(queryParams)
        .map(param => param + '=' + queryParams[param])
        .join('&');
      window.location.href = this.redirectUrl += query
    },
  }
}
</script>
