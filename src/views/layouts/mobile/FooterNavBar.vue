<template>
  <b-row no-gutters>
    <b-col class="footer-nav-bar-container">
      <b-nav
        class="h-100"
        justified>
        <b-nav-item
          v-for="item in items"
          :key="item.id"
          :exact-active-class="`footer-nav-bar-item-active-${item.name}`"
          :to="item.route"
          class="footer-nav-bar-item"
          exact>
          <b-row
            class="h-50"
            no-gutters>
            <b-col class="d-flex align-items-end justify-content-center">
              <icon
                :name="item.icon"
                :size="22"/>
            </b-col>
          </b-row>
          <b-row
            class="h-50"
            no-gutters>
            <b-col class="footer-nav-bar-title d-flex align-items-center justify-content-center text-capitalize">
              {{ item.title }}
            </b-col>
          </b-row>
        </b-nav-item>
      </b-nav>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          id: 1,
          title: this.$t('bottomNavBar.casino'),
          name: 'casino',
          icon: 'sidemenu-casino-games',
          route: { name: 'casino' }
        },
        {
          id: 2,
          title: this.$t('bottomNavBar.liveCasino'),
          name: 'live-casino',
          icon: 'sidemenu-live-casino',
          route: { name: 'live-casino' }
        },
        {
          id: 3,
          title: this.$t('bottomNavBar.sports'),
          name: 'sports',
          icon: 'sidemenu-sports',
          route: { name: 'sports' }
        },
        {
          id: 4,
          title: this.$t('bottomNavBar.esports'),
          name: 'esports',
          icon: 'sidemenu-esports',
          route: { name: 'esports' }
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
    .footer-nav-bar {
        &-container {
            width: 100%;
            height: 64px;
            background: $arc-clr-soil-dark;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1020;
            box-shadow: 0 0 5px $black;
            will-change: transform;
            transform: translateZ(0);
        }
        &-item {
            & > .nav-link {
                padding: 0;
                height: 100%;
            }
            &-active {
                &-sports {
                    color: $arc-clr-sport-glow;
                    div > .footer-nav-bar-title {
                        color: $arc-clr-sport-glow;
                    }
                }
                &-esports {
                    color: $arc-clr-esport-glow;
                    div > .footer-nav-bar-title {
                        color: $arc-clr-esport-glow;
                    }
                }
                &-casino {
                    color: $arc-clr-casino-glow;
                    div > .footer-nav-bar-title {
                        color: $arc-clr-casino-glow;
                    }
                }
                &-live-casino {
                    color: $arc-clr-live-casino-glow;
                    div > .footer-nav-bar-title {
                        color: $arc-clr-live-casino-glow;
                    }
                }
            }
        }
        &-title {
          font-size: 12px;
          color: $arc-clr-iron;
          letter-spacing: .002em;
        }
    }
</style>
