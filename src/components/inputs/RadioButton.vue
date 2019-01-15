<template>
  <b-row
    no-gutters
    class="mt-4 mb-0">
    <b-col
      md="12"
      lg="10"
      class="mr-auto ml-auto mb-0"
      block>
      <b-form-group
        :label="label"
        class="mb-1">
        <b-form-radio-group
          :id="id"
          :options="options"
          v-model="content"
          required
          @input="handleInput()"/>
      </b-form-group>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'RadioButton',
  props: {
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      content: this.value
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', this.content)
    }
  }
}
</script>
