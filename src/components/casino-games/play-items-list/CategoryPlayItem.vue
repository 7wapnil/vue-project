<template>
  <div
    :class="[isMobile ? 'play-item-mobile' : 'play-item-desktop']"
    @click="launchGame"
    @mouseover="hover = true"
    @mouseleave="hover = false">
    <img
      v-lazy="itemIcon"
      :alt="itemTitle"
      class="image">
    <div
      v-if="hover && !isMobile"
      class="launch-button">
      <h5 class="mb-0 letter-spacing-2 text-center">
        {{ buttonText }}
      </h5>
    </div>
    <div
      v-if="isFunModeLabelAvaible"
      class="fun-mode-button"
      @click.stop="lauchFunMode">
      <h6 class="try-for-free-label">
        {{ $t('casino.tryForFree') }}
      </h6>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { CREATE_EVERY_MATRIX_SESSION_MUTATION } from '@/graphql'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    category: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      hover: false
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      activeWallet: 'getUserActiveWallet'
    }),
    itemIcon () {
      return {
        src: this.item.logoUrl,
        error: require('@/assets/images/logo/arcanebet-logo.png')
      }
    },
    itemTitle () {
      return this.item.name
    },
    walletId () {
      if (this.activeWallet) return parseInt(this.activeWallet.id)
    },
    buttonText () {
      if (this.isLoggedIn) return this.$i18n.t('casino.realModeLaunch')

      return this.$i18n.t('casino.loginToPlay')
    },
    isTableGame () {
      return this.item.type === 'table'
    },
    isFunModeLabelAvaible () {
      return this.hover && !this.isMobile && !this.isTableGame
    }
  },
  methods: {
    ...mapMutations([
      'storeGameSlug'
    ]),
    launchGame () {
      if (!this.isLoggedIn && this.isMobile) return this.openGameModalMobile()

      if (!this.isLoggedIn && !this.isMobile) return this.$bvModal.show('AuthModal')

      if (this.isDesktop) {
        return this.$router.push({
          name: `${this.currentLobbyName}-game`,
          params: {
            playItemSlug: this.item.slug,
            category: this.category.context
          }
        })
      }

      this
        .$apollo
        .mutate({
          mutation: CREATE_EVERY_MATRIX_SESSION_MUTATION,
          variables: {
            walletId: this.walletId,
            playItemSlug: this.item.slug
          }
        })
        .then(({ data }) => {
          window.location = data.createEveryMatrixSession.launchUrl
        })
        .catch(() => {
          this.$router.push({ name: 'not-found' })
        })
    },
    lauchFunMode () {
      return this.$router.push({
        name: `${this.currentLobbyName}-game`,
        params: {
          playItemSlug: this.item.slug,
          category: this.category.context,
          gameMode: 'fun'
        }
      })
    },
    openGameModalMobile () {
      this.storeGameSlug(this.item.slug)
      return this.$bvModal.show('GameModeModal')
    }

  }
}
</script>
<style lang="scss"
       scoped>
  .play-item {
    &-desktop {
    flex: 0 0 auto;
    margin: 10px;
    cursor: pointer;
    border-radius: 5px;
    height: 200px;
    max-width: 300px;
    width: 100%;
    position: relative;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        & > .image {
          filter: brightness(0.5);
          transform: scale(1.09);
        }
      }
      .try-for-free-label {
        color: $arc-clr-grey-light;
        margin-bottom: 0;
      }
      .launch-button {
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        top: 25%;
        position: absolute;
        border: 3px solid white;
        background: #000000ab;
        border-radius: 5px;
        width: 200px;
        height: 100px;
        align-items: center;
        justify-content: center;
        display: flex;
        text-transform: uppercase;
        padding: 10px;
      }
      .fun-mode-button {
        display: flex;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 20%;
        align-items: center;
        justify-content: center;
        &:hover > .try-for-free-label{
          color: $arc-clr-white;
          transition: color .3s ease;
        }
      }
      .image {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 5px;
        transition: all .4s ease-in-out;

        &[lazy=loading] {
          background: url(#{'~@/assets/images/casino-common/loading-icon.svg'}) no-repeat 50% 50%, #2F2F2F 0 0 no-repeat padding-box !important;
        }
      }
    }
      &-mobile {
        margin: 5px;
        border-radius: 5px;
        height: 120px;
        width: 180px;
        background: #343434;
        flex: 0 0 auto;
        overflow: hidden;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
        .image {
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: 5px;
          transition: all .4s ease-in-out;

          &[lazy=loading] {
            background: url(#{'~@/assets/images/casino-common/loading-icon.svg'}) no-repeat 50% 50%, #2F2F2F 0 0 no-repeat padding-box !important;
          }
        }
      }
    }
</style>
