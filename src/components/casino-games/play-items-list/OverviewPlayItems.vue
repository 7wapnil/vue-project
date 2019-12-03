<template>
  <div>
    <overview-item-header :category="category"/>

    <div
      class="position-relative">
      <div class="slider-control-left">
        <arc-circle
          :size="40"
          inline
          depends
          bg-color="arc-clr-soil-light">
          <icon
            :size="16"
            name="chevron-left"/>
        </arc-circle>
      </div>
      <transition-group
        tag="div"
        class="no-scrollbars play-items-wrapper"
        name="play-items-appearance"
        appear>
        <category-play-item
          v-for="(playItem, index) in playItems"
          :key="playItem.id"
          :item="playItem"
          :category="category"
          :style="{ transitionDelay: index * .1 + 's' }"/>
      </transition-group>
      <div class="slider-control-right">
        <arc-circle
          :size="40"
          inline
          depends
          bg-color="arc-clr-soil-light">
          <icon
            :size="16"
            name="chevron-right"/>
        </arc-circle>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryPlayItem from '@/components/casino-games/play-items-list/CategoryPlayItem'
import OverviewItemHeader from '@/components/casino-games/play-items-list/OverviewItemHeader'

export default {
  components: {
    CategoryPlayItem,
    OverviewItemHeader
  },
  props: {
    category: {
      type: Object,
      required: true
    },
    playItems: {
      type: Array,
      default: () => { return [] }
    }
  }
}
</script>

<style lang="scss"
       scoped>
    .slider-control {
        &-left {
            width: 50px;
            height: 100%;
            top: 0;
            left: 0;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9;
        }
        &-right {
            top: 0;
            right: 0;
            width: 50px;
            height: 100%;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9;
        }
    }
    .play-items-wrapper {
      -webkit-overflow-scrolling: touch;
      margin: 0 24px;
      display: flex;
      overflow: auto;
      flex-wrap: nowrap;
    }
    .play-items-appearance-enter-active {
        transition: all .3s ease-in-out;
    }
    .play-items-appearance-leave-active {
        transition: all .3s ease-in-out;
    }
    .play-items-appearance-enter,
    .play-items-appearance-leave-to {
        transform: scale(1.1);
    }
</style>
