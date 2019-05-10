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
        <b-form-input
          id="last_four_digits"
          v-model="fields.last_four_digits"
          class="ml-4 text-left w-50"
          type="number"
          min="0"
          @input="onInput()"/>
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
        <b-form-input
          id="card_holder_name"
          v-model="fields.holder_name"
          class="ml-4 text-left w-50"
          type="text"
          @input="onInput()"/>
      </b-col>
      <b-col/>
    </b-row>
  </div>
</template>

<script>
import formReset from '@/mixins/formReset'

export default {
  mixins: [formReset],
  data () {
    return {
      fields: {
        holder_name: '',
        last_four_digits: ''
      }
    }
  },
  methods: {
    onInput (e) {
      this.$emit('input', this.fields)
    }
  }
}
</script>
