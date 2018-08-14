<template>
    <router-view/>
</template>

<script>
    import CacheControl from '@/mixins/cache-control'

    export default {
      mixins: [CacheControl],
      sockets: {
        oddChange(data) {
          this.updateOddInCache(data)
        },
        updateMarket(data) {
          this.updateMarketInCache(data)
        }
      }
    }
</script>
