<template>
  <div>
    <div class="deposit-amount-container">
      <b-form-group
        :label="$i18n.t('generalTerms.amount')"
        label-for="deposit-amount"
        class="amount-input">
        <b-form-input
          id="deposit-amount"
          :value="fields.amount"
          :placeholder="$i18n.t('account.deposit.enterDepositAmount')"
          min="1"
          type="number"
          @input="updateAmount"/>
      </b-form-group>
      <b-form-group
        :label="$i18n.t('account.deposit.wallet')"
        label-for="deposit-wallet"
        class="wallet-select">
        <b-form-select
          id="deposit-wallet"
          :value="value"
          :options="currencies"
          @change="setWalletFilter"
        />
      </b-form-group>
    </div>
    <b-alert
      :show="!!amountError"
      variant="danger"
      class="my-2">
      {{ amountError }}
    </b-alert>
  </div>
</template>

<script>
import { getCurrencyOptions } from '@/helpers/wallet'
export default {
  props: {
    currency: {
      type: String,
      required: true
    },
    paymentMethod: {
      type: Object,
      default: null
    },
    fields: {
      type: Object,
      required: true
    },
    amountError: {
      type: String,
      default: ''
    },
    updateAmount: {
      type: Function,
      required: true
    },
    wallets: {
      type: Array,
      required: true
    },
    setWalletFilter: {
      type: Function,
      required: true
    },
    defaultCurrency: {
      type: String,
      default: null
    },
    filter: {
      type: String,
      default: null
    }
  },
  computed: {
    currencies () {
      return getCurrencyOptions(this.wallets)
    },
    value () {
      return this.paymentMethod ? this.paymentMethod.currency.code : this.defaultCurrency
    }
  }
}
</script>

<style lang="scss" scoped>
  .deposit-amount-container {
    display: flex;
    align-items: flex-end;
    .amount-input {
      width: calc(100% - 100px);
    }
    .wallet-select {
      width: 90px;
      margin-left: 10px;
    }
  }
</style>
