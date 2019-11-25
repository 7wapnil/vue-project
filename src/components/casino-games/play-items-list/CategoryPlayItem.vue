<template>
  <div>
    <b-img-lazy
      :src="itemIcon"
      :alt="itemTitle"
      :class="[isMobile ? 'play-item-mobile' : 'play-item-desktop']"
      block
      blank-color="#2F2F2F"/>

      <!--<div class="play-item-button">-->
      <!--<b-button-->
      <!--class="casino"-->
      <!--variant="link"-->
      <!--@click="launchGame">-->
      <!--{{ buttonText }}-->
      <!--</b-button>-->
      <!--</div>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { CREATE_EVERY_MATRIX_SESSION_MUTATION } from '@/graphql'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      activeWallet: 'getUserActiveWallet'
    }),
    itemIcon () {
      return this.item.logoUrl || this.defaultIcon()
    },
    defaultIcon () {
      return require('@/assets/images/logo/arcanebet-logo.png')
    },
    itemTitle () {
      return this.item.name
    },
    buttonText () {
      if (this.isLoggedIn) return this.$i18n.t('casino.realModeLaunch')

      return this.$i18n.t('casino.funModeLaunch')
    },
    walletId () {
      if (this.activeWallet) return parseInt(this.activeWallet.id)
    }
  },
  methods: {
    launchGame () {
      this
        .$apollo
        .mutate({
          mutation: CREATE_EVERY_MATRIX_SESSION_MUTATION,
          variables: {
            walletId: this.walletId,
            playItemId: this.item.id
          }
        })
        .then((payload) => {
          this.$router.push({ name: 'casino-game', params: { gameName: this.item.slug } })
          // window.open(payload.data.createEveryMatrixSession.launchUrl, '_blank')
        })
        .catch(() => {
          this.$router.push({ name: 'not-found' })
        })
    }
  }
}
</script>
<style lang="scss"
       scoped>
  .play-item {
    &-desktop {
    margin: 10px;
    cursor: pointer;
    backface-visibility: hidden;
    border-radius: 4px;
    height: 14vw;
    width: 14vw;
    min-height: 12vh;
    min-width: 12vw;
        img {
          object-fit: cover;
          text-align: center;
        }
    }
      &-mobile {
          height: 35vw;
          width: 35vw;
          margin: 10px;
      }
  }
</style>
