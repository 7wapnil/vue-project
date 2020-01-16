<template>
  <div v-if="!$apollo.loading">
    <overview-providers-item-header
      :category="providersCategory"
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
        tag="div"
        class="no-scrollbars items-wrapper mx-md-4 mx-2"
        name="items-appearance"
        appear>
        <provider-overview-item
          v-for="(provider, index) in gameProviders"
          :key="provider.id"
          :provider="provider"
          :style="{ transitionDelay: index * .1 + 's' }"/>
      </transition-group>
      <transition name="arrow-right">
        <div
          v-show="scrollPosition < endPosition"
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
import ProviderOverviewItem from '@/components/casino-games/ProviderOverviewItem'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { GAME_PROVIDERS_QUERY } from '@/graphql'
import OverviewProvidersItemHeader from '@/components/casino-games/play-items-list/OverviewProvidersItemHeader'

export default {
  components: {
    ProviderOverviewItem,
    OverviewProvidersItemHeader
  },
  data () {
    return {
      gameProviders: [],
      paginationProps: Object,
      itemsPerPage: 0,
      visibleItems: 0,
      numberOfPages: 0,
      currentPage: 0,
      wrapperWidth: 0,
      scrollPosition: 0,
      endPosition: 0,
      rowWidth: 0,
      itemWidth: 160,
      providersCategory: {
        icon: 'casino-providers',
        name: 'providers',
        label: this.$i18n.t('casino.headings.providers')
      }
    }
  },
  apollo: {
    gameProviders () {
      return {
        query: GAME_PROVIDERS_QUERY,
        fetchPolicy: NETWORK_ONLY
      }
    }
  },
  updated () {
    if (this.gameProviders.length === 0 || this.wrapperWidth > 0) return
    this.calculateDimensions()
    this.calculateCurrentPage()
    this.addScrollListener()
  },
  methods: {
    calculateDimensions () {
      if (this.gameProviders.length) {
        const wrapper = document.getElementsByClassName('items-wrapper')[0]
        this.wrapperWidth = wrapper.clientWidth
        this.itemsPerPage = this.gameProviders.length
        this.visibleItems = Math.floor(this.wrapperWidth / this.itemWidth)
        this.numberOfPages = Math.ceil(this.itemsPerPage / this.visibleItems)
        this.rowWidth = this.numberOfPages * this.wrapperWidth
        this.scrollPosition = wrapper.scrollLeft
        this.endPosition = wrapper.scrollWidth - this.wrapperWidth - 20
      }
    },
    calculateCurrentPage () {
      const currentPageNumber = Math.ceil(this.scrollPosition / (this.visibleItems *
          this.itemWidth))
      this.currentPage = currentPageNumber < 1 ? 1 : currentPageNumber + 1
    },
    slideLeft () {
      const wrapper = document.getElementsByClassName('items-wrapper')[0]
      this.scrollPosition = wrapper.scrollLeft
      wrapper.scrollLeft = this.scrollPosition - wrapper.clientWidth
    },
    slideRight () {
      const wrapper = document.getElementsByClassName('items-wrapper')[0]
      this.scrollPosition = wrapper.scrollLeft
      wrapper.scrollLeft = this.scrollPosition + wrapper.clientWidth
    },
    addScrollListener () {
      const wrapper = document.getElementsByClassName('items-wrapper')[0]

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
  .items-wrapper {
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
  }
  .provider-overview-item {
    scroll-snap-align: start;
  }
  .items-appearance-enter-active {
    transition: all .3s ease-in-out;
  }
  .items-appearance-leave-active {
    transition: all .3s ease-in-out;
  }
  .items-appearance-enter,
  .items-appearance-leave-to {
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
