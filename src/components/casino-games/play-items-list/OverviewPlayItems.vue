<template>
  <div>
    <b-row no-gutters>
      <b-col class="px-4 pt-4 pb-2 d-inline-flex events-list-title">
        <icon
          :name="category.icon"
          :size="26"
          style="margin-left: 26px"/>
        <b-link
          :to="{ name: 'casino-category', params: { category: categoryName } }"
          router-tag="h4"
          style="margin-left: 14px"
          class="mb-0 text-arc-clr-white font-weight-light letter-spacing-1 pointer">
          {{ category.label }}
        </b-link>
      </b-col>
      <b-col class="px-4 pt-4 pb-2 d-flex justify-content-center flex-row align-items-center">
        <arc-circle
          :size="6"
          style="width: 20px; background-color: #1b9cb0 !important;"/>
        <arc-circle
          :size="6"
          class="ml-4"/>
        <arc-circle
          :size="6"
          class="ml-4"/>
        <arc-circle
          :size="6"
          class="ml-4"/>
        <arc-circle
          :size="6"
          class="ml-4"/>
      </b-col>
      <b-col class="text-right px-4 pt-4 pb-2">
        <b-link
          :to="{ name: 'casino-category', params: { category: categoryName } }"
          class="mr-2">
          {{ this.$i18n.t('casino.viewAll') }}
        </b-link>
      </b-col>
    </b-row>

    <div class="position-relative">
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
        style="-webkit-overflow-scrolling: touch; margin: 0 24px;"
        class="d-flex flex-nowrap overflow-auto no-scrollbars"
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

export default {
  components: {
    CategoryPlayItem
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
  },
  computed: {
    categoryName () {
      const name = this.category.context.split('-')
      return name[0]
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
