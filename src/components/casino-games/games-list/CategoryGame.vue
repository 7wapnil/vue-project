<template>
  <div class="category-game">
    <b-img
      :src="gameIcon"
      :alt="gameTitle"
      center
      height="156"
      @click="launchGame"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { CREATE_EVERY_MATRIX_SESSION_MUTATION } from '@/graphql'

export default {
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'getUserActiveWallet'
    }),
    gameIcon () {
      return this.game.icon || require('@/assets/images/logo/arcanebet-logo.png')
    },
    gameTitle () {
      return this.game.title || 'Unknown game'
    }
  },
  methods: {
    launchGame () {
      this
        .$apollo
        .mutate({
          mutation: CREATE_EVERY_MATRIX_SESSION_MUTATION,
          variables: { walletId: parseInt(this.activeWallet.id) }
        })
        .then((payload) => {
          let session = payload.data.createEveryMatrixSession.sessionId
          let launcherUrl = this.gameLauncherUrl(session)
          window.open(launcherUrl, '_blank')
        })
        .catch(() => {
          this.$router.push({ name: 'not-found' })
        })
    },
    gameLauncherUrl (session) {
      return this.game.url + session
    }
  }
}
</script>
