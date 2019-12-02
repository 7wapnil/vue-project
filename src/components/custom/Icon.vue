<template>
  <i
    :style="{ 'font-size': fontSize }"
    :class="iconName, textColor"/>
</template>

<script>
export default {
  name: 'ArcIcon',
  props: {
    name: {
      type: String,
      default: 'arcanebet-default-icon',
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
    },
    textColor () {
      return this.color ? `text-${this.color}` : ''
    },
    iconName () {
      return `arc arc-${this.name}`
    }
  }
}
</script>
