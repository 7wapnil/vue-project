<template>
  <b-row no-gutters>
    <b-col>
      <b-row no-gutters>
        <b-col
          md="8"
          class="px-4 mx-2 mx-md-0 ml-md-auto mb-md-4">
          <b-input-group
            :append="currency"
            class="mb-4">
            <b-form-input
              id="deposit-amount-currency"
              :value="fields.amount"
              min="1"
              type="number"
              placeholder="Custom"
              @input="updateCustomField"
              @blur.prevent="calculate"/>
          </b-input-group>
          <b-form-select
            :value="selectedPaymentMethodCode"
            @input="updatePaymentMethod">
            <template #first>
              <option
                :value="null"
                disabled>
                {{ $t('account.deposit.paymentMethodsPlaceholder') }}
              </option>
            </template>
            <option
              v-for="(payment, index) in depositMethods"
              :value="payment.code"
              :key="index">
              {{ payment.name }}
            </option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row no-gutters>
        <b-col
          cols="12"
          md="4"
          class="py-2 px-4 p-md-0">
          <h6 class="text-md-right text-left mt-2 ml-2 text-arc-clr-iron letter-spacing-2">
            {{ $t('generalTerms.bonusCode') }}:
          </h6>
        </b-col>
        <b-alert
          :show="!!bonusError && isMobile"
          class="bonus-code-alert"
          variant="danger">
          {{ bonusError }}
        </b-alert>
        <b-col
          cols="12"
          md="8"
          class="px-4">
          <b-input-group class="px-2 px-md-0">
            <b-form-input
              :value="fields.bonusCode"
              placeholder="Enter bonus code"
              @input="updateBonusCode"
              @blur.prevent="calculate"/>
            <b-input-group-append>
              <b-button
                :disabled="!fields.bonusCode"
                class="px-4 py-1"
                variant="user-profile-button"
                @click.prevent="calculate">
                <span class="font-size-24">
                  +
                </span>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col
          cols="12"
          md="8"
          class="p-4 ml-md-auto">
          <h6 class="text-center text-arc-clr-iron-light letter-spacing-2">
            {{ $t('account.deposit.bonusDescription') }}
          </h6>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    currency: {
      type: String,
      required: true
    },
    depositMethods: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Object,
      required: true
    },
    selectedPaymentMethodCode: {
      type: String,
      default: null
    },
    bonusError: {
      type: String,
      default: null
    }
  },
  methods: {
    updateCustomField (value) {
      this.$emit('update:amount', value)
    },
    updateBonusCode (value) {
      this.$emit('update:bonuscode', value)
    },
    updatePaymentMethod (value) {
      this.$emit('update:payment', value)
    },
    calculate () {
      this.$emit('action:calculate')
    }
  },
}
</script>
