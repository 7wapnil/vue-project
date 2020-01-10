<template>
  <div
    :class="classNames"
    class="promo-item"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="clickHandler">
    <arc-circle
      v-if="isMobile && itemsPerPage <= 3"
      :size="30"
      class="down-icon"
      bg-color="arc-clr-soil-light"
      inline
      depends>
      <icon
        :size="16"
        color="arc-clr-soil-black"
        name="chevron-left"/>
    </arc-circle>
    <div
      v-if="!isMobile || itemsPerPage > 2"
      class="promo-img" />
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
    clickHandler: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    classNames () {
      let classNames = this.isMobile ? 'promo-item-mobile play-item-mobile' : 'promo-item-desktop play-item-desktop'
      if (this.isMobile && this.itemsPerPage > 3) classNames += ' tablet'
      return classNames
    }
  },
}
</script>
<style lang="scss"
       scoped>
  .promo-item {
    background-image: url(#{'~@/assets/images/casino-games/lines-background.png'});
    background-repeat: no-repeat;
    background-size: cover;
    transition: all .4s ease-in-out;
    flex: 0 0 auto;
    border-radius: 5px;
    position: relative;

    .promo-img {
      height: 100%;
      background-image: url(#{'~@/assets/images/casino-games/promo-coins.png'});
      background-repeat: no-repeat;
      background-size: cover;
      width: 220px;
      float: left;
    }

    .promo-text {
      width: 380px;
      padding: 35px 0;
      text-transform: uppercase;
      float: right;
      &-header {
        color: $arc-clr-gold;
        font-weight: $font-weight-bold;
      }
      .play-these-games {
        color: $arc-clr-iron;
        align-items: center;
      }
    }

    &:hover {
      filter: brightness(0.5);
      transform: scale(1.05, 1.09);
      transition: all .4s ease-in-out;
    }
    &-desktop {
      margin: 10px 10px 10px 0;
      cursor: pointer;
      height: 200px;
      max-width: 620px;
      width: 100%;
      .play-these-games {display: flex;}
    }
    &-mobile {
      margin: 10px;
      text-align: center;
      display: flex;
      .promo-text {
        width: 100%;
        padding: 12px 0;
        &-header {font-size: $h6-font-size;}
        .amount {font-size: $h3-font-size;}
        .play-these-games {font-size: $h6-font-size;}
      }
      .down-icon {
        position: absolute;
        bottom: -15px;
        left: calc(50% - 8px);
        transform: rotate(-90deg);
      }
    }
    &-mobile.tablet {
      width: 360px;
      margin: 5px;
      text-align: left;
      .promo-img {
        background-size: contain;
        min-width: 140px;
      }
    }
  }
</style>
