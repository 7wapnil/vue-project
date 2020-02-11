<template>
  <b-row
    :style="{ backgroundImage: `url(${playItem.backgroundImageUrl})`}"
    class="game-background"
    no-gutters>
    <b-col class="game-container">
      <b-embed
        ref="gameContainer"
        :src="launchUrl"
        type="iframe"
        aspect="16by9"
        allowfullscreen
      />
    </b-col>
    <b-col
      cols="auto"
      class="py-4">
      <b-row no-gutters>
        <b-col class="iframe-controls-wrapper">
          <b-row
            class="h-50"
            no-gutters>
            <b-col
              class="d-flex align-items-center justify-content-center"
              @click="openFullScreen">
              <icon name="game-fullscreen"/>
            </b-col>
          </b-row>
          <b-row
            class="h-50"
            no-gutters>
            <b-col
              class="d-flex align-items-center justify-content-center"
              @click="pushBack">
              <icon
                :size="13"
                name="game-close"/>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
    <b-col
      v-if="!isMobile"
      class="sidebar-container">
      <casino-game-sidebar :play-item="playItem"/>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import CasinoGameSidebar from '@/views/casino/CasinoGameSidebar'
import { CREATE_EVERY_MATRIX_SESSION_MUTATION } from '@/graphql'

export default {
  components: { CasinoGameSidebar },
  data () {
    return {
      playItem: {
        id: '',
        slug: ''
      },
      launchUrl: ''
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
  },
  watch: {
    $route () {
      this.launchGame()
    },
    walletId () {
      this.launchGame()
    }
  },
  mounted () {
    this.launchGame()
  },
  methods: {
    launchGame () {
      this
        .$apollo
        .mutate({
          mutation: CREATE_EVERY_MATRIX_SESSION_MUTATION,
          variables: this.gameMode()
        })
        .then(({ data }) => {
          this.launchUrl = data.createEveryMatrixSession.launchUrl
          this.playItem = data.createEveryMatrixSession.playItem
        })
        .catch(() => {
          this.$bvModal.show('UnavailableCountryModal')
        })
    },
    openFullScreen () {
      const elem = this.$refs.gameContainer

      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen()
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen()
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen()
      }
    },
    pushBack () {
        this.$router.go(-1) || this.$router.push({ name: this.currentLobbyName })
    },
    gameMode () {
      if ((this.isLoggedIn && this.walletId === undefined) ||
          (this.$route.params.gameMode === 'fun')) {
        return { playItemSlug: this.$attrs.playItemSlug }
      } else {
        return {
          walletId: this.walletId,
          playItemSlug: this.$attrs.playItemSlug
        }
      }
    }
  }
}
</script>
<style lang="scss"
       scoped>
    .game-container {
        min-height: calc(100vh - 80px);
        padding: 20px 0 20px 20px;
        .embed-responsive {
            max-height: 90%;
            border-radius: 6px 0 6px 6px;
            box-shadow: 2px 2px 10px 0 $black;
        }
    }
    .game-background {
        background-repeat: no-repeat;
        background-size: cover;
    }
    .sidebar-container {
        max-width: 268px;
    }
    .iframe-controls-wrapper {
        border-radius: 0 6px 6px 0;
        background: $arc-clr-soil-darker;
        width: 40px;
        height: 80px;
        opacity: .8;
        box-shadow: 2px 0 10px 0 $black;
    }
</style>
