<template>
  <div>
    <b-row
      class="mb-4"
      no-gutters>
      <b-col class="text-md-right text-sm-left align-self-center">
        <label
          for="last_four_digits"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          {{ $t('account.withdraw.cardLastFourDigits') }}:
        </label>
      </b-col>
      <b-col class="user-profile-form">
        <div class="ml-4 text-left w-50">
          {{ method.details.lastFourDigits }}
        </div>
      </b-col>
      <b-col/>
    </b-row>
    <b-row
      class="mb-4"
      no-gutters>
      <b-col class="text-md-right text-sm-left align-self-center">
        <label
          for="card_holder_name"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          {{ $t('account.withdraw.cardHolderName') }}:
        </label>
      </b-col>
      <b-col class="user-profile-form">
        <div class="ml-4 text-left w-50">
          {{ fields.holder_name }}
        </div>
      </b-col>
      <b-col/>
    </b-row>
  </div>
</template>

<script>
import formReset from '@/mixins/formReset'

export default {
  mixins: [formReset],
  props: {
    method: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      fields: {
        holder_name: this.method.details.holderName,
        masked_account_number: this.method.details.maskedAccountNumber,
        token_id: this.method.details.tokenId
      }
    }
  },
  created () {
    this.$emit('input', this.fields)
  }
}
</script>
