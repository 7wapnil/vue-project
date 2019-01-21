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
        <div
          v-if="getDepositState()"
          :class="getDepositState()"
          class="message my-4 mx-auto text-center w-50 justify-content-center p-4">
          {{ getMessage() }}
        </div>
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
        <h6
          v-if="walletExists"
          class="currency position-absolute text-arc-clr-soil-light mb-0">{{ fields.currency }}</h6>
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
          <button
            v-if="isVisible"
            class="inside bg-arc-clr-sport-bg position-absolute text-arc-clr-white"
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
              <h6 class="text-arc-clr-iron text-right">
                Fee:
              </h6>
              <h6 class="text-arc-clr-iron text-right pt-2">
                Total to be added:
              </h6>
            </b-col>
            <b-col class="col-6">
              <h6 class="text-left"> {{ fields.amount }} {{ fields.currency }}</h6>
              <h6 class="text-left"> {{ calculatedBonus }} {{ fields.currency }}</h6>
              <h6 class="text-left">0.00 {{ fields.currency }}</h6>
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

<style lang="scss" scoped>
    @import "../../assets/styles/variables";
    button {
      &:hover {
        cursor: pointer;
      }
    }

    button.inside {
        width: 15%;
        right: 20px;
        top: 20px;
        outline: none;
        text-align: center;
        font-weight: bold;
        padding: 6px;
        border-top-right-radius: 6px;
        border: 0.2px #1B6945;
    }

    .message {
        border-radius: 6px 0 12px 0;

        &.success {
            background-color: $arc-clr-sport-bg;
        }

        &.fail {
            background-color: $arc-clr-inplay-glow;
        }

        &.pending {
            background-color: $arc-clr-gold-light;
        }
    }

    h6.currency {
        right: 45px;
        top: 30px;
    }
</style>
