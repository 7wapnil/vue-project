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
    <div v-if="hover && !isMobile">
      <div class="launch-button">
        <div class="triangle"/>
      </div>
      <div
        class="fun-mode-button"
        @click.stop="launchFunMode">
        <h6 class="try-for-free-label">
          {{ funModeLabel }}
        </h6>
      </div>
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
    funModeLabel () {
      if (!this.isFunModeAvailable && !this.isLoggedIn) return this.$i18n.t('casino.loginToPlay')
      if (this.isFunModeAvailable && !this.isLoggedIn) return this.$i18n.t('casino.tryForFree')
      if (this.isFunModeAvailable && this.isLoggedIn) return this.$i18n.t('casino.tryForFree')
      if (!this.isFunModeAvailable && this.isLoggedIn) return this.$i18n.t('casino.play')
    },
    itemTitle () {
      return this.item.name
    },
    walletId () {
      if (this.activeWallet) return parseInt(this.activeWallet.id)
    },
    isFunModeAvailable () {
      return this.item.freeMode === 'true'
    }
  },
  methods: {
    ...mapMutations([
      'storeGameSlug'
    ]),
    launchGame () {
      if (!this.isLoggedIn) {
        if (!this.isMobile) return this.$bvModal.show('AuthModal')
        if (this.isMobile) return this.openGameModalMobile()
      }

      if (this.isLoggedIn) {
        if (this.isDesktop) {
          return this.$router.push({
            name: `${this.currentLobbyName}-game`,
            params: {
              playItemSlug: this.item.slug,
              category: this.contextName()
            }
          })
        } else {
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
        }
      }
    },
    launchFunMode () {
      if (!this.isFunModeAvailable && !this.isLoggedIn) return this.$bvModal.show('AuthModal')
      if (this.isFunModeAvailable && !this.isLoggedIn) return this.launchFunModeGame()
      if (this.isFunModeAvailable && this.isLoggedIn) return this.launchFunModeGame()
      if (!this.isFunModeAvailable && this.isLoggedIn) return this.launchFunModeGame()
    },
    launchFunModeGame () {
      return this.$router.push({
        name: `${this.currentLobbyName}-game`,
        params: {
          playItemSlug: this.item.slug,
          category: this.contextName(),
          gameMode: 'fun'
        }
      })
    },
    openGameModalMobile () {
      this.storeGameSlug(this.item.slug)
      return this.$bvModal.show('GameModeModal')
    },
    contextName () {
      if (this.category.context === 'providers') return 'all-games'

      return this.category.context
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
        width: 80px;
        height: 80px;
        top: 25%;
        position: absolute;
        background-color: #ECA95F;
        box-shadow: 0 0 10px 0 black;
        border-radius: 8px 0 8px 0;
        padding: 30px;
        align-items: center;
        justify-content: center;
        display: flex;
      }
      .triangle {
        border-color: transparent black;
        border-style: solid;
        border-width: 15px 0 15px 25px;
        height: 0;
        width: 0;
      }
      .fun-mode-button {
        margin-left: auto;
        margin-right: auto;
        display: flex;
        position: absolute;
        right: 0;
        left: 0;
        bottom: 10%;
        width: 110px;
        height: 35px;
        background: $arc-clr-soil-black;
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
