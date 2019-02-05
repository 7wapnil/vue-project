<template>
  <div
    :class="className"
    class="input-group-select">
    <v-select
      :placeholder="label"
      :options="options"
      v-model="content"
      :show-labels="false"
      tracked-by="value"
      label="label"
      class="bg-arc-clr-white"
      required
      autocomplete="off"
      @change="handleInput()"
      @input="handleInput()"
    />
  </div>
</template>

<script>
import vSelect from 'vue-select'

export default {
  components: {
    'v-select': vSelect
  },
  props: {
    label: {
      type: String,
      default: 'Name'
    },
    bottomBar: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'text'
    },
    feedback: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      content: this.value,
      lift: false
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', this.content.value)
    }
  }
}
</script>

<style lang="scss">
@include selectInput();
</style>
