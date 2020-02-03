<template>
  <b-form-group
    :label="$i18n.t('generalTerms.amount')"
    label-for="deposit-amount">
    <b-input-group
      :append="currency">
      <b-form-input
        id="deposit-amount"
        :value="fields.amount"
        :placeholder="$i18n.t('account.deposit.enterDepositAmount')"
        min="1"
        type="number"
        @input="updateAmount"
        @blur.prevent="calculate"/>
    </b-input-group>
    <b-alert
      :show="!!amountError"
      variant="danger"
      class="my-2">
      {{ amountError }}
    </b-alert>
  </b-form-group>
</template>

<script>
export default {
  props: {
    currency: {
      type: String,
      required: true
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
    }
  }
}
</script>
