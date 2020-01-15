<template>
  <b-row no-gutters>
    <b-col
      class="px-4 pt-4 pb-2 overview-item-header-block">
      <icon
        :name="category.icon"
        :size="isMobile ? 20 : 26"
        class="overview-item-header-icon ml-md-4 ml-2"/>
      <component
        v-if="isCasino"
        :is="isMobile ? 'h5' : 'h4'"
        :class="[ currentLobbyName === 'live-casino' ? 'not-active' : '']"
        class="overview-item-header-title">
        {{ category.label }}
      </component>
      <b-link
        v-else
        :to="{ name: `${currentLobbyName}-category`, params: { category: category.context,
                                                               label: category.label }}"
        :router-tag="isMobile ? 'h5' : 'h4'"
        class="overview-item-header-title">
        {{ category.label }}
      </b-link>
    </b-col>
    <b-col
      v-if="!isMobile"
      class="px-4 pt-4 pb-2 overview-item-header-indication-block">
      <overview-item-header-indication
        :pages="pages"
        :current-page="currentPage"/>
    </b-col>
    <b-col
      class="px-4 pt-4 pb-2 overview-item-header-viewall-block">
      <span
        v-if="isCasino && (isLoggedIn || !isMobile)"
        class="mr-md-2 mr-0 pointer"
        @click="openLobby">
        {{ this.$i18n.t('casino.goToLobby') }}
      </span>
      <b-link
        v-if="!isCasino"
        :to="{ name: `${currentLobbyName}-category`, params: { category: category.context,
                                                               label: category.label }}"
        class="mr-md-2 mr-0">
        {{ this.$i18n.t('casino.viewAll') }}
      </b-link>
    </b-col>
  </b-row>
</template>

<script>
import OverviewItemHeaderIndication from '@/components/casino-games/play-items-list/OverviewItemHeaderIndication'
import { mapGetters, mapMutations } from 'vuex'
import { CREATE_EVERY_MATRIX_SESSION_MUTATION } from '@/graphql'
export default {
  name: 'OverviewItemHeader',
  components: {
    OverviewItemHeaderIndication
  },
  props: {
    category: {
      type: Object,
      required: true
    },
    pages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      lobbySlugs: {
        roulette: 'roulette-evo',
        blackjack: 'blackjack-evo',
        poker: 'holdem-evo',
        'hot-tables': 'roulette-evo',
        'other-tables': 'dream-catcher'
      }
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      activeWallet: 'getUserActiveWallet'
    }),
    walletId () {
      if (this.activeWallet) return parseInt(this.activeWallet.id)
    },
    isCasino () {
      return this.currentLobbyName === 'live-casino'
    }
  },
  methods: {
    ...mapMutations(['storeSuccessLoginUrl']),
    openLobby () {
      const playItemSlug = this.lobbySlugs[this.category.context]
      const route = {
        name: `${this.currentLobbyName}-game`,
        params: {
          playItemSlug,
          category: this.category.context
        }
      }

      if (!this.isLoggedIn) {
        this.storeSuccessLoginUrl(route)
        return this.$bvModal.show('AuthModal')
      }

      if (this.isDesktop) return this.$router.push(route)

      this
        .$apollo
        .mutate({
          mutation: CREATE_EVERY_MATRIX_SESSION_MUTATION,
          variables: {
            walletId: this.walletId,
            playItemSlug
          }
        })
        .then(({ data }) => {
          window.location = data.createEveryMatrixSession.launchUrl
        })
        .catch(() => {
          this.$router.push({ name: 'not-found' })
        })
    },
  }
}
</script>

<style lang="scss" scoped>
    .overview-item {
        &-header {
            &-block {
                display: inline-flex;
                align-items: center;
            }
            &-icon {
                pointer-events: none;
            }
            &-title {
                margin-left: 16px;
                margin-bottom: 0;
                color: $arc-clr-iron-light;
                font-weight: $font-weight-light;
                letter-spacing: .01em;
                cursor: pointer;
                &:hover {
                    color: $arc-clr-white;
                }
                &.not-active {
                  cursor: default;
                  &:hover {
                    color: $arc-clr-iron-light;
                  }
                }
            }
            &-indication-block {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            &-viewall-block {
                text-align: right;
            }
        }
    }
    .disabled {
        pointer-events: none;
        opacity: .3;
    }
</style>
