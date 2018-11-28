<template>
    <i :style="{ 'font-size': size,'color': color }"
       :class="'arc ' + 'arc-' + `${ name }`"/>
</template>

<script>
  import '@/assets/styles/variables.scss'

  export default {
    props: {
      name: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: '12px'
      },
      color: {
        type: String,
        default: '#FFFFFF'
      }
    }
  }
</script>
