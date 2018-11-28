<template>
    <i :style="{ 'font-size': size }"
       :class="'arc ' + 'arc-' + `${ name }`"/>
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
        default: '12px'
      },
    }
  }
</script>
