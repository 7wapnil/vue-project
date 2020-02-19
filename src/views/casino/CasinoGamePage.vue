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
import { buildDefaultMetaTags } from '@/helpers/meta'
import { mapGetters } from 'vuex'
import CasinoGameSidebar from '@/views/casino/CasinoGameSidebar'
import { CREATE_EVERY_MATRIX_SESSION_MUTATION } from '@/graphql'
import { TITLE_KINDS } from '@/constants/title-kinds'

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
  metaInfo () {
    if (!this.$i18n) return

    return buildDefaultMetaTags({
      title: this.metaTitle,
      description: this.metaDescription,
      i18n: this.$i18n,
      siteUrl: window.location.href
    })
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      activeWallet: 'getUserActiveWallet'
    }),
    metaTitle () {
      if (!this.playItem.id) return this.$i18n.t(`meta.${this.$route.params.titleKind}.playItem.blankTitle`)

      return this.playItem.metaTitle ||
             this.$i18n.t(`meta.${this.$route.params.titleKind}.playItem.title`, { name: this.playItem.name })
    },
    metaDescription () {
      if (!this.playItem.id) return this.$i18n.t(`meta.${this.$route.params.titleKind}.playItem.blankDescription`)

      return this.playItem.metaDescription ||
             this.$i18n.t(`meta.${this.$route.params.titleKind}.playItem.description`, { name: this.playItem.name })
    },
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
      if (!this.$route.meta.fromPage ||
            TITLE_KINDS.includes(this.$route.meta.fromPage) ||
            this.$route.params.category === 'all-games') { return this.$router.push({ name: this.currentLobbyName }) }

      this.$router.push({ name: `${this.currentLobbyName}-category`,
        params: { category: this.$route.params.category } })
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
