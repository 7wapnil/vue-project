<template>
  <div class="promotion-block">
    <p class="promotion-title-label font-weight-bold text-uppercase mb-2">Tournament promotion</p>
    <p class="promotion-title font-weight-bold text-uppercase mb-4">{{ promotion.title }}</p>
    <b-link
      class="btn text-uppercase btn-promotion"
      href="#">Register Now!</b-link>
    <img
      :src="promotionImage"
      class="promotion-image position-absolute right-0 top-0">
  </div>
</template>

<script>
export default {
  data () {
    return {
      promotion: {
        title: 'Participate in our 10.000 EUR slot tournament!'
      },
      promotionImage: require(`@/assets/images/casino-games/promotion-girl.png`)
    }
  }
}
</script>
