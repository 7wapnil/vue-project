<template>
  <i
    :style="{ 'font-size': fontSize }"
    :class="'arc ' + 'arc-' + `${ name }` + `${ color ? ' text-' + `${ color }` : ''}`"/>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    size: {
      type: [String, Number],
      default: null,
    },
    color: {
      type: [String, Array],
      default: '',
      required: false
    }
  },
  computed: {
    fontSize () {
      return `${parseInt(this.size)}px`
    }
  }
}
</script>
