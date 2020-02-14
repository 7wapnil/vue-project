<template>
  <div v-if="category.playItems.length">
    <overview-item-header
      :category="category"
      :pages="numberOfPages"
      :current-page="currentPage"/>
    <component
      v-if="showPromoItem && isMobile && itemsPerPage <= 3"
      key="promo-item"
      :is="promoItem"
      :items-per-page="itemsPerPage"
      :category="category" />
    <div class="position-relative">
      <transition name="arrow-left">
        <div
          v-if="scrollPosition > 0 && !isMobile"
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
        :class="[isMobile ? 'play-items-wrapper-mobile' : 'play-items-wrapper']"
        tag="div"
        class="no-scrollbars"
        name="play-items-appearance"
        appear>
        <component
          v-if="showPromoItem && !isMobile || showPromoItem && itemsPerPage > 3"
          key="promo-item"
          :is="promoItem"
          :items-per-page="itemsPerPage"
          :category="category" />
        <category-play-item
          v-for="(playItem, index) in playItems"
          :key="playItem.id"
          :item="playItem"
          :category="category"
          :style="{ transitionDelay: index * .1 + 's' }"/>
        <view-more-component
          v-if="currentLobbyName === 'casino'"
          ref="viewMoreComponent"
          key="view-more-item"
          :category="category"/>
      </transition-group>
      <transition name="arrow-right">
        <div
          v-if="scrollPosition <= endPosition && !isMobile && numberOfPages > 1"
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
import ViewMoreComponent from '@/components/casino-games/ViewMoreComponent'

export default {
  components: {
    CategoryPlayItem,
    OverviewItemHeader,
    ViewMoreComponent
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
      endPosition: 0,
      itemsPerPage: 0,
      rowWidth: 0,
      viewMoreComponentWidth: 0,
      itemMargin: 20
    }
  },
  computed: {
    showPromoItem () {
      switch (this.category.context) {
        case 'jackpots':
        case 'hot-tables':
          return true
        default: return false
      }
    },
    promoItem () {
      switch (this.category.context) {
        case 'jackpots': return () => import(`@/components/casino-games/play-items-list/promo-items/PromoItemJackpot`)
        case 'hot-tables': return () => import(`@/components/casino-games/play-items-list/promo-items/PromoItemHotTables`)
        default: return null
      }
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
      const children = this.$refs[this.category.id].$children
      const item = this.showPromoItem ? children[1].$el : children[0].$el

      if (this.currentLobbyName === 'casino') {
        const viewMoreComponent = this.$refs.viewMoreComponent.$el
        this.viewMoreComponentWidth = viewMoreComponent.clientWidth
      }

      this.wrapperWidth = wrapper.clientWidth
      this.itemWidth = item.clientWidth + this.itemMargin
      this.itemsPerPage = Math.floor(this.wrapperWidth / this.itemWidth)

      const additionalPartsWithPromo = this.currentLobbyName === 'casino' ? 3 : 2
      const additionalPartsWithoutPromo = this.currentLobbyName === 'casino' ? 1 : 0

      this.numberOfPages = Math.ceil((this.showPromoItem
        ? this.playItems.length + additionalPartsWithPromo
        : this.playItems.length + additionalPartsWithoutPromo) / this.itemsPerPage)
      this.rowWidth = this.numberOfPages * this.wrapperWidth + this.viewMoreComponentWidth
      this.endPosition = wrapper.scrollWidth - this.wrapperWidth - this.itemMargin
    },
    calculateCurrentPage () {
      const currentPageNumber = Math.ceil(this.scrollPosition / (this.itemsPerPage *
          this.itemWidth))
      this.currentPage = currentPageNumber < 1 ? 1 : currentPageNumber + 1
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
    .play-items-wrapper,
    %play-items-wrapper {
      -webkit-overflow-scrolling: touch;
      scroll-snap-type: x mandatory;
      margin: 0 24px;
      display: flex;
      overflow-x: auto;
      overflow-y: hidden;
      flex-wrap: nowrap;
      scroll-behavior: smooth;
      transform: translate3d(0,0,0);
      backface-visibility: hidden;
      will-change: transform;
      &-mobile {
        @extend %play-items-wrapper;
        margin: 0 12px;
      }
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
