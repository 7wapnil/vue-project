<template>
  <div>
    <b-row
      no-gutters>
      <b-col
        cols="3"
        class="text-right pb-4 pl-4 pl-md-0">
        <label
          for="name"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          {{ $t('account.withdraw.skrillAddress') }}:
        </label>
      </b-col>
      <b-col class="pl-4">
        <div class="font-weight-bold">
          {{ method.details.name }}
        </div>
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
        name: this.method.details.name,
        user_payment_option_id: this.method.details.userPaymentOptionId
      }
    }
  },
  created () {
    this.$emit('input', this.fields)
  }
}
</script>
