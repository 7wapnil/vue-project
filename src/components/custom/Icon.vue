<template>
  <i
    :style="{ 'font-size': size }"
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
      type: String,
      default: '',
      required: false
    },
    color: {
      type: [String, Array],
      default: '',
      required: false
    }
  }
}
</script>
