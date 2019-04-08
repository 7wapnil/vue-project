<template>
  <div class="input-group-custom">
    <b-form-input
      :id="id"
      :type="type"
      v-model="content"
      :disabled="disabled"
      :name="id"
      :autocomplete="autocomplete"
      required
      min="1"
      @blur.native="handleBlur"
      @keydown.enter.native="handleEnter"
      @input="handleInput"/>
  </div>
</template>

<script>
export default {
  name: 'RegularInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    feedback: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    mask: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    autocomplete: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      content: this.value
    }
  },
  watch: {
    'value' (val) {
      if (val) {
        this.content = val
      }
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', this.content)
    },
    handleBlur (e) {
      this.$emit('blur')
    },
    handleEnter (e) {
      this.$emit('enter')
    }
  }
}
</script>

<style lang="scss">
@include regularInput();
</style>
