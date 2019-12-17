<template>
  <div>
    <overview-item-header
      :category="category"
      :pages="numberOfPages"
      :current-page="currentPage"/>
    <div class="position-relative">

      <transition name="arrow-left">
        <div
          v-show="scrollPosition > 0"
          class="slider-control-left"
          @click="slideLeft">
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
      </transition>

      <transition-group
        :ref="category.id"
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

      <transition name="arrow-right">
        <div
          v-show="currentPage !== numberOfPages"
          class="slider-control-right"
          @click="slideRight">
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
      </transition>
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
  },
  data () {
    return {
      numberOfPages: 0,
      currentPage: 0,
      wrapperWidth: 0,
      scrollPosition: 0,
      itemsPerPage: 0,
      rowWidth: 0
    }
  },
  mounted () {
    this.calculateDimensions()
    this.calculateCurrentPage()
    this.addScrollListener()
  },
  methods: {
    calculateDimensions () {
      const wrapper = this.$refs[this.category.id].$el
      const item = this.$refs[this.category.id].$children[0].$el

      this.wrapperWidth = wrapper.clientWidth
      this.itemWidth = item.clientWidth
      this.itemsPerPage = Math.floor(this.wrapperWidth / this.itemWidth)
      this.numberOfPages = Math.floor(this.playItems.length / this.itemsPerPage)
      this.rowWidth = this.numberOfPages * this.wrapperWidth
      this.scrollPosition = wrapper.scrollLeft
    },
    calculateCurrentPage () {
      const a = Math.round(this.scrollPosition / (this.itemsPerPage * this.itemWidth))
      this.currentPage = a < 1 ? 1 : a + 1
    },
    slideLeft () {
      const wrapper = this.$refs[this.category.id].$el
      this.scrollPosition = wrapper.scrollLeft
      wrapper.scrollLeft = this.scrollPosition - wrapper.clientWidth
    },
    slideRight () {
      const wrapper = this.$refs[this.category.id].$el
      this.scrollPosition = wrapper.scrollLeft
      wrapper.scrollLeft = this.scrollPosition + wrapper.clientWidth
    },
    addScrollListener () {
      const wrapper = this.$refs[this.category.id].$el

      let lastKnownScrollPosition = 0
      let ticking = false

      wrapper.addEventListener('scroll', () => {
        lastKnownScrollPosition = wrapper.scrollLeft

        if (!ticking) {
          window.requestAnimationFrame(() => {
            this.scrollPosition = lastKnownScrollPosition
            this.calculateCurrentPage()
            ticking = false
          })

          ticking = true
        }
      })
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
      scroll-snap-type: x mandatory;
      margin: 0 24px;
      display: flex;
      overflow: auto;
      flex-wrap: nowrap;
      scroll-behavior: smooth;
      transform: translate3d(0,0,1px);
      backface-visibility: hidden;
      will-change: transform;
    }
    .play-item-desktop {
      scroll-snap-align: start;
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

    .arrow-left-enter-active {
       transition: all .3s ease;
     }
    .arrow-left-leave-active {
      transition: all .3s ease;
    }
    .arrow-left-enter,
    .arrow-left-leave-to {
      transform: translateX(-10px);
      opacity: 0;
    }

    .arrow-right-enter-active {
      transition: all .3s ease;
    }
    .arrow-right-leave-active {
      transition: all .3s ease;
    }
    .arrow-right-enter,
    .arrow-right-leave-to {
      transform: translateX(10px);
      opacity: 0;
    }

</style>
