<template>
  <div>
    <b-row no-gutters>
      <b-col class="px-4 pt-4 pb-2 d-inline-flex events-list-title">
        <icon
          :size="26"
          name="casino-providers"
          style="margin-left: 26px"/>
        <h4
          class="ml-3 mb-0 text-arc-clr-white font-weight-light letter-spacing-1 pointer">Providers</h4>
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
        name="providers-appearance"
        appear>
        {{ providersCollection }}
        <provider-overview-item
          v-for="(provider, index) in providers"
          :key="provider.id"
          :provider="provider"
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
import ProviderOverviewItem from '@/components/casino-games/ProviderOverviewItem'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { GAME_PROVIDERS_QUERY } from '@/graphql'

export default {
  components: {
    ProviderOverviewItem
  },
  data () {
    return {
      providersCollection: [],
      paginationProps: Object,
      itemsPerPage: 20
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
        .providers-appearance-enter-active {
            transition: all .3s ease-in-out;
        }
        .providers-appearance-leave-active {
            transition: all .3s ease-in-out;
        }
        .providers-appearance-enter,
        .providers-appearance-leave-to {
            transform: scale(1.1);
        }
    </style>
