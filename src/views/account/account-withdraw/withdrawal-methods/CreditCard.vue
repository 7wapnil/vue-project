<template>
  <div>
    <b-row
      no-gutters>
      <b-col
        cols="3"
        class="text-right pb-4 pl-4 pl-md-0">
        <label
          for="last_four_digits"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          {{ $t('account.withdraw.cardLastFourDigits') }}:
        </label>
      </b-col>
      <b-col class="pl-4">
        <div class="font-weight-bold">
          {{ method.details.lastFourDigits }}
        </div>
      </b-col>
    </b-row>
    <b-row
      no-gutters>
      <b-col
        cols="3"
        class="text-right pb-4 pl-4 pl-md-0">
        <label
          for="card_holder_name"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          {{ $t('account.withdraw.cardHolderName') }}:
        </label>
      </b-col>
      <b-col class="text-truncate pl-4">
        {{ fields.holder_name }}
      </b-col>
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
