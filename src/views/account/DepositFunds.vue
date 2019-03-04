<template>
  <div>
    <b-row
      class="mb-4">
      <b-col>
        <h3>Deposit Funds</h3>
        <hr class="border-arc-clr-iron">
        <p class="my-2">The money will be transferred directly in to your Arcanebet account.
        When you have won some bets you can look forward to easy and fast
        withdrawals without fees!</p>
        <b-alert
          :show="!!depositState"
          :variant="mapDepositState"
          class="my-4 mx-auto text-center w-50 justify-content-center p-4">
          {{ getMessage }}
        </b-alert>
      </b-col>
    </b-row>

    <b-row>
      <b-col
        class="ml-5"
        lg="4">
        <b-row
          v-if="currency"
          no-gutters
          class="mt-4">
          <b-col
            md="12"
            lg="10"
            class="mr-auto ml-auto ml-3"
            block>
            <b-input-group :append="currency">
              <b-form-input
                id="deposit-amount-currency"
                v-model="fields.amount"
                class="bg-arc-clr-white"
                type="text"
                placeholder="Amount"
              />
            </b-input-group>
          </b-col>
        </b-row>

        <RegularInput
          v-if="!currency"
          id="deposit-amount"
          v-model="fields.amount"
          type="text"
          label="Amount"
          bottom-bar
        />
        <b-row
          v-if="isEmptyWallet"
          align-h="center"
          no-gutters
          class="mt-4">
          <b-col
            lg="10"
            md="1">
            <SelectInput
              id="deposit-currency"
              :options="filteredCurrencies"
              v-model="currency"
              class-name="currency"
              type="select"
              label="Choose currency"
              bottom-bar
            />
          </b-col>
        </b-row>

        <div>
          <b-row
            no-gutters
            class="mt-4">
            <b-col
              md="12"
              lg="10"
              class="mr-auto ml-auto ml-3"
              block>
              <b-input-group>
                <b-form-input
                  id="deposit-bonus-code"
                  v-model="fields.bonusCode"
                  class="bg-arc-clr-white"
                  type="text"
                  placeholder="Bonus code"
                  @blur.native="showButton()"
                  @keydown.enter.native="showButton()"
                />
                <b-input-group-append>
                  <b-btn
                    v-if="isVisible"
                    class="bg-arc-clr-sport-bg border-0"
                    @click.prevent="calculateBonus()">+</b-btn>
                </b-input-group-append>
              </b-input-group>
            </b-col>
          </b-row>
        </div>
      </b-col>
      <b-col class="ml-2">
        <div
          class="square bg-arc-clr-soil-dark w-90 p-5"
          style="width: 90%;">
          <h4 class="text-center pt-1 pb-2 text-arc-clr-iron">Deposit Summary</h4>
          <b-row style="font-size: 0.875rem">
            <b-col class="col-6">
              <ul class="list-unstyled list-group">
                <li class="text-arc-clr-iron text-right">Deposit:</li>
                <li class="text-arc-clr-iron text-right"> Bonus:</li>
                <li class="text-arc-clr-iron text-right">Fee:</li>
                <li class="text-arc-clr-iron text-right pt-2">Total to be added:</li>
              </ul>
            </b-col>
            <b-col class="col-6">
              <ul class="list-unstyled list-group">
                <li class=" text-left">{{ fields.amount }} {{ currency }}</li>
                <li class=" text-left"> {{ calculatedBonus }} {{ currency }}</li>
                <li class=" text-left">0.00 {{ currency }}</li>
                <li class=" text-left pt-2">{{ getTotal }} {{ currency }}</li>
              </ul>
            </b-col>
          </b-row>
          <b-button
            class="bg-arc-clr-sport-bg text-arc-clr-white btn border-0 mt-4"
            style="width: 100%"
            @click.prevent="submitDeposit()">Deposit
          </b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RegularInput from '@/components/inputs/RegularInput.vue'
import SelectInput from '@/components/inputs/SelectInput.vue'
import { mapGetters } from 'vuex'
import { CURRENCIES_LIST_QUERY } from '@/graphql'

export default {
  name: 'DepositFunds',
  components: {
    RegularInput,
    SelectInput
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
      return this.walletActive.id === null
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
      // mock
      if (this.fields.bonusCode) {
        this.calculatedBonus = '25'
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
