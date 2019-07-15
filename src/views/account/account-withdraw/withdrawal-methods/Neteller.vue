<template>
  <div>
    <b-row
      class="mb-4"
      no-gutters>
      <b-col class="text-md-right text-sm-left align-self-center">
        <label
          for="last_four_digits"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          Neteller account ID:
        </label>
      </b-col>
      <b-col class="user-profile-form">
        <div class="ml-4 text-left w-50">
          {{ fields.account_id }}
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
        account_id: this.method.details.accountId
      }
    }
  },
  created () {
    this.$emit('input', this.fields)
  }
}
</script>
