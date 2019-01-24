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
          :show="showAlert"
          :variant="getDepositState()"
          class="my-4 mx-auto text-center w-50 justify-content-center p-4">
          {{ getMessage() }}
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        class="ml-5"
        lg="4">
        <RegularInput
          id="deposit-amount"
          v-model="fields.amount"
          type="text"
          label="Amount"
          bottom-bar
        />
        <b-row
          v-if="!fields.currency"
          align-h="center"
          no-gutters
          class="mt-4">
          <b-col
            lg="10"
            md="1">
            <SelectInput
              id="deposit-currency"
              :options="getCurrencyList()"
              v-model="fields.currency"
              class-name="currency"
              type="select"
              label="Choose currency"
              bottom-bar
            />
          </b-col>
        </b-row>
        <span
          v-if="fields.currency"
          class="currency inline-input-label text-arc-clr-soil-light mb-0">{{ fields.currency }}</span>
        <div class="position-relative d-flex">
          <RegularInput
            id="deposit-bonus-code"
            v-model="fields.bonusCode"
            style=" flex: 1;"
            type="text"
            label="Bonus code"
            bottom-bar
            @blur="showButton()"
            @enter="showButton()"
          />
          <b-btn
            v-if="isVisible"
            class="inside bg-arc-clr-sport-bg text-arc-clr-white"
            @click.prevent="calculateBonus()">+
          </b-btn>
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
                <li class=" text-left">{{ fields.amount }} {{ fields.currency }}</li>
                <li class=" text-left"> {{ calculatedBonus }} {{ fields.currency }}</li>
                <li class=" text-left">0.00 {{ fields.currency }}</li>
                <li class=" text-left pt-2">{{ getTotal }} {{ fields.currency }}</li>
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
import { mapGetters, mapActions } from 'vuex'

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
        currency: '',
        bonusCode: ''
      },
      redirectUrl: 'https://backend.arcanedemo.com/redirect/deposits/initiate?',
      walletExists: null,
      calculatedBonus: '',
      isVisible: null,
      showAlert: false
    }
  },
  computed: {
    ...mapGetters({
      walletActive: 'getActiveWallet'
    }),
    ...mapActions({
      loadWallets: 'fetchWallets'
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
        parseFloat(this.calculatedBonus)
        totalValue += this.calculatedBonus
      }
      if (!isNaN(totalValue)) {
        return parseFloat(totalValue).toFixed(2)
      }
    }
  },
  created () {
    this.loadWallets.then(() => {
      if (this.walletActive) {
        this.fields.currency = this.walletActive.currency.code
      }
    })
  },
  methods: {
    getCurrencyList () {
      return ['EUR', 'USD', 'SEK', 'NOK', 'AUD', 'CAD']
    },
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
    getMessage () {
      return this.$route.query.depositStateMessage
    },
    getDepositState () {
      if (this.$route.query.depositState) {
        this.showAlert = true
      }
      return this.$route.query.depositState
    },
    submitDeposit () {
      let queryParams = {
        token: this.token,
        currency_code: this.fields.currency,
        amount: this.fields.amount,
        bonus_code: this.fields.bonusCode
      };

      let query = Object.keys(queryParams)
        .map(param => param + '=' + queryParams[param])
        .join('&');
      window.location.href = this.redirectUrl += query
    }
  }
}
</script>
