<template>
  <div
    :class="[isMobile ? 'play-item-mobile' : 'play-item-desktop']"
    @click="launchGame"
    @mouseover="hover = true"
    @mouseleave="hover = false">
    <b-img
      :src="itemIcon"
      :alt="itemTitle"
      class="image"
      blank-color="#2F2F2F"/>
    <div
      v-show="hover && !isMobile"
      class="zbutton">
      <h4 class="mb-0">
        {{ buttonText }}
      </h4>
    </div>
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
      return this.item.logoUrl || this.defaultIcon
    },
    defaultIcon () {
      return require('@/assets/images/logo/arcanebet-logo.png')
    },
    itemTitle () {
      return this.item.name
    },
    buttonText () {
      if (this.isLoggedIn) return this.$i18n.t('casino.realModeLaunch')
      if (this.isTableGame) return this.$i18n.t('casino.liveDealerLaunch')

      return this.$i18n.t('casino.funModeLaunch')
    },
    walletId () {
      if (this.activeWallet) return parseInt(this.activeWallet.id)
    },
    isTableGame () {
      return this.item.type === 'table'
    }
  },
  methods: {
    launchGame () {
      if (!this.isLoggedIn && this.isTableGame) return

      if (this.isDesktop) {
        return this.$router.push({
          name: `${this.$route.params.titleKind}-game`,
          params: {
            playItemSlug: this.item.slug,
            category: this.category.name
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
      .zbutton {
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
        font-size: 12px;
        letter-spacing: .002em;
        text-transform: uppercase;
      }
      .image {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 5px;
        transition: all .4s ease-in-out;
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
        }
      }
    }
</style>
