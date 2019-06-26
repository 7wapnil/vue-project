<template>
  <div>
    <b-row
      class="mb-4"
      no-gutters>
      <b-col class="text-md-right text-sm-left align-self-center">
        <label
          for="bitcoin_address"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          Bitcoin Address:
        </label>
      </b-col>
      <b-col class="user-profile-form">
        <b-form-input
          id="bitcoin_address"
          v-model="fields.bitcoin_address"
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
        bitcoin_address: ''
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
