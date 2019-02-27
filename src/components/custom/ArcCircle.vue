<template>
    <div :class="['bg-' + bgColor, 'text-' + color]"
         class="d-flex align-items-center justify-content-center"
         :style="{ 'width': size + 'px',
                   'height': size + 'px',
                   'border-radius': '50px'}">
        <slot/>
    </div>
</template>
<script>
    export default {
      props: {
        size: {
          type: Number,
          default: 10
        },
        color: {
          type: String,
          default: 'arc-clr-white'
        },
        bgColor: {
          type: String,
          default: 'arc-clr-soil-dark'
        }
      }
    }
</script>
