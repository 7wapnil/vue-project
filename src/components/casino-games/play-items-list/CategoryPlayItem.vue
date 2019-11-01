<template>
  <b-col
    cols="2"
    class="m-2 category-play-item">
    <b-img
      :src="itemIcon"
      :alt="itemTitle"
      class="play-item-icon"
      center
      height="156"/>
    <div class="play-item-button">
      <b-button
        class="casino"
        variant="link"
        @click="launchGame">
        {{ buttonText }}
      </b-button>
    </div>
  </b-col>
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
      activeWallet: 'getUserActiveWallet',
      isLoggedIn: 'isLoggedIn'
    }),
    itemIcon () {
      return this.item.logoUrl || require('@/assets/images/logo/arcanebet-logo.png')
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
          window.open(payload.data.createEveryMatrixSession.launchUrl, '_blank')
        })
        .catch(() => {
          this.$router.push({ name: 'not-found' })
        })
    }
  }
}
</script>
