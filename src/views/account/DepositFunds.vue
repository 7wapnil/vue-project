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
          :show="getDepositState()"
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
          v-if="walletExists === false"
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
          v-if="walletExists"
          style="font-size: 0.875rem;
            right: 45px;
            top: 30px;"
          class="currency position-absolute text-arc-clr-soil-light mb-0">{{ fields.currency }}</span>
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
            @click="calculateBonus()">+
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
                <li class=" text-left pt-2">{{ getTotal() }} {{ fields.currency }}</li>
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
      walletExists: null,
      totalValue: '',
      calculatedBonus: '',
      isVisible: null
    }
  },
  computed: {
    ...mapGetters({
      walletActive: 'getActiveWallet'
    })
  },
  created () {
    this.$store.dispatch('fetchWallets').then(() => {
      if (this.walletActive) {
        this.walletExists = true
        this.fields.currency = this.walletActive.currency.code
      } else {
        this.walletExists = false
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
    getTotal () {
      if (this.fields.amount.includes(',')) {
        this.fields.amount = this.fields.amount.replace(',', '.')
      }
      this.totalValue = parseFloat(this.fields.amount)
      if (this.calculatedBonus) {
        this.totalValue += parseFloat(this.calculatedBonus)
      }
      if (!isNaN(this.totalValue)) {
        return parseFloat(this.totalValue).toFixed(2)
      }
    },
    getMessage () {
      return this.$route.query.depositStateMessage
    },
    getDepositState () {
      return this.$route.query.depositState
    },
    submitDeposit () {
      const input = this.fields
      // test
      window.location.href = '?depositState=success&depositStateMessage=Here goes success 123'
      this.$store.dispatch('submitDepositFunds', input)
        .then((res) => {
          // do something
        })
        .catch(() => {
          // do something
        })
        .finally(() => {
          // do something
        })
    }
  }
}
</script>
