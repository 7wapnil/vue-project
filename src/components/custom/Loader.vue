<template>
  <div class="w-100 d-flex justify-content-center align-items-center" :style="{ height }">
    <div class="lds-dual-ring"/>
  </div>
</template>

<script>
  export default {
    props: {
      height: {
        type: String,
        default: '100px'
      }
    }
  }
</script>

<style scoped lang="scss">
  $color: #999;

  .lds-dual-ring {
    display: inline-block;
    width: 64px;
    height: 64px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid $color;
    border-color: $color transparent $color transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
