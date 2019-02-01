<template>
  <div
    :class="className"
    class="input-group-select">
    <multiselect
      :placeholder="label"
      :options="options"
      :type="type"
      v-model="content"
      :show-labels="false"
      tracked-by="value"
      label="label"
      class="bg-arc-clr-white"
      required
      open-direction="bottom"
      autocomplete="off"
      ref="select"
      @open="toggleLabel()"
      @close="toggleLabel()"
      @change="handleInput()"
      @input="handleInput()"
      @select="setFocus"/>
    <span
      v-if="bottomBar"
      class="bar"/>
    <label
      :class="{'up' : lift}"
      class="select">{{ label }}</label>
  </div>
</template>

<script>
import Select from 'vue-multiselect'

export default {
  name: 'SelectInput',
  components: {
    'multiselect': Select
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
    },
    toggleLabel () {
      this.lift = true;
    },
    setFocus () {
      this.$nextTick(() => this.$refs.select.$el.focus())
    }
  },
  mounted() {
    this.$refs.select.$el.setAttribute('tabindex', 0)
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
@include selectInput();
</style>
