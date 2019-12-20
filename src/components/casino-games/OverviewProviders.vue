<template>
  <div>
    <overview-item-header
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
          v-for="(provider, index) in providers"
          :key="provider.id"
          :provider="provider"
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
import ProviderOverviewItem from '@/components/casino-games/ProviderOverviewItem'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { GAME_PROVIDERS_QUERY } from '@/graphql'
import OverviewItemHeader from '@/components/casino-games/play-items-list/OverviewItemHeader'

export default {
  components: {
    ProviderOverviewItem,
    OverviewItemHeader
  },
  data () {
    return {
      providersCollection: [],
      paginationProps: Object,
      itemsPerPage: 20,
      visibleItems: 0,
      numberOfPages: 0,
      currentPage: 0,
      wrapperWidth: 0,
      scrollPosition: 0,
      rowWidth: 0,
      itemWidth: 160,
      providersCategory: {
        icon: 'casino-providers',
        name: 'providers',
        label: 'Providers'
      }
    }
  },
  apollo: {
    gameProviders () {
      return {
        query: GAME_PROVIDERS_QUERY,
        fetchPolicy: NETWORK_ONLY,
        variables () {
          return {
            page: 1,
            perPage: this.itemsPerPage
          }
        },
        result ({ data }) {
          this.providersCollection = data.gameProviders.collection
          this.paginationProps = data.gameProviders.pagination
        }
      }
    }
  },
  computed: {
    providers () {
      if (this.providersCollection) {
        return this.providersCollection.filter(provider => provider.enabled === 'true')
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
      const wrapper = document.getElementsByClassName('items-wrapper')[0]
      this.wrapperWidth = wrapper.clientWidth
      this.visibleItems = Math.floor(this.wrapperWidth / this.itemWidth)
      this.numberOfPages = Math.floor(this.itemsPerPage / this.visibleItems)
      this.rowWidth = this.numberOfPages * this.wrapperWidth
      this.scrollPosition = wrapper.scrollLeft
    },
    calculateCurrentPage () {
      const currentPageNumber = Math.round(this.scrollPosition / (this.visibleItems * this.itemWidth))
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
    overflow: auto;
    flex-wrap: nowrap;
    scroll-behavior: smooth;
    transform: translate3d(0,0,1px);
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
