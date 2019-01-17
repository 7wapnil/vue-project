<template>
  <div>
    <b-row
      class="mb-4">
      <b-col>
        <h3>Deposit Funds</h3>
        <hr class="border-arc-clr-iron">
        <p>The money will be transferred directly in to your Arcanebet account.
        When you have won some bets you can look forward to easy and fast
        withdrawals without fees!</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        class="ml-5"
        lg="4">
        <input-component
          id="deposit-amount"
          v-model="fields.amount"
          type="text"
          label="Amount"
          bottom-bar
        />
        <b-row
          v-if="!walletExists"
          align-h="center"
          no-gutters
          class="mt-4">

          <b-col
            lg="10"
            md="1">
            <select-component
              id="deposit-currency"
              :options="getCurrencyList()"
              v-model="fields.currency"
              :disabled="walletExists"
              class-name="currency"
              type="select"
              label="Choose currency"
              bottom-bar
            />
          </b-col>
        </b-row>
        <input-component
          v-if="walletExists"
          v-model="fields.currency"
          :disabled="true"
          type="text"
          bottom-bar
        />
        <div class="position-relative d-flex">
          <input-component
            id="deposit-bonus-code"
            v-model="fields.bonusCode"
            style=" flex: 1;"
            type="text"
            label="Bonus code"
            bottom-bar
            @blur="showButton()"
          />
          <button
            v-if="isVisible"
            class="inside bg-arc-clr-sport-bg position-absolute text-arc-clr-white"
            style="width: 15%"
            @click="calculateBonus()">+
          </button>
        </div>
      </b-col>
      <b-col class="ml-2">
        <div
          class="square bg-arc-clr-soil-dark w-90 p-5"
          style="width: 90%;">
          <h4 class="text-center pt-1 pb-2 text-arc-clr-iron">Deposit Summary</h4>
          <b-row>
            <b-col class="col-6">
              <h6 class="text-arc-clr-iron text-right">
                Deposit:
              </h6>
              <h6 class="text-arc-clr-iron text-right">
                Bonus:
              </h6>
              <h6 class="text-arc-clr-iron text-right pt-2">
                Total to be added:
              </h6>
            </b-col>
            <b-col class="col-6">
              <h6 class="text-left"> {{ fields.amount }} {{ fields.currency }}</h6>
              <h6 class="text-lef"> {{ calculatedBonus }} {{ fields.currency }}</h6>
              <h6 class="text-left pt-2 font-weight-bold"> {{ getTotal() }} {{ fields.currency }}</h6>
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

export default {
  name: 'DepositFunds',
  components: {
    'input-component': RegularInput,
    'select-component': SelectInput
  },
  data () {
    return {
      fields: {
        amount: '',
        currency: '',
        bonusCode: ''
      },
      walletExists: false,
      totalValue: '',
      calculatedBonus: '',
      isVisible: false
    }
  },
  created () {
    this.activeWalletCurrency()
  },
  methods: {
    activeWalletCurrency () {
      this.walletExists = true
      this.fields.currency = this.$store.getters.getActiveWallet.currency.code
    },
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
      this.totalValue = parseInt(this.fields.amount) + parseInt(this.calculatedBonus)
      if (!isNaN(this.totalValue)) {
        return this.totalValue
      }
    },
    submitDeposit () {
      const input = this.fields
      console.log(input)
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

<style lang="scss" scoped>
    button.inside {
        right: 20px;
        top: 20px;
        outline: none;
        text-align: center;
        font-weight: bold;
        padding: 6px;
        border-top-right-radius: 6px;
        border: 0.2px #1B6945;

        &:hover {
            cursor: pointer;
        }
    }
</style>
