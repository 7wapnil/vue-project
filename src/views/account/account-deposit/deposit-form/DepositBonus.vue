<template>
  <b-form-group
    :label="$i18n.t('account.deposit.bonus')"
    label-for="deposit-bonus">
    <b-form-input
      id="deposit-bonus"
      :v-model="value"
      :placeholder="$i18n.t('account.deposit.enterDepositBonus')"
      type="text"
      @input="debounceInput"/>
    <b-alert
      :show="!!bonusError"
      variant="danger"
      class="my-2">
      {{ bonusError }}
    </b-alert>
    <b-alert
      :show="!!bonusSuccess"
      variant="success"
      class="my-2">
      {{ bonusSuccess }}
    </b-alert>
  </b-form-group>
</template>

<script>
import { INPUT_DEBOUNCE_TIMEOUT } from '@/constants/timeouts.js'
export default {
  props: {
    fields: {
      type: Object,
      required: true
    },
    calculateBonus: {
      type: Function,
      required: true
    },
    bonusError: {
      type: String,
      default: null
    },
    setBonusError: {
      type: Function,
      required: true
    },
    paymentMethod: {
      type: Object,
      default: null
    },
    bonusSuccess: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      timeout: null,
      value: null
    }
  },
  methods: {
    debounceInput (val) {
      if (this.bonusError) this.setBonusError(null)
      if (!this.paymentMethod) this.setBonusError(this.$i18n.t('account.deposit.pleaseSelectMethod'))

      this.value = val
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.calculateBonus(this.value)
      }, INPUT_DEBOUNCE_TIMEOUT);
    }
  }
}
</script>
