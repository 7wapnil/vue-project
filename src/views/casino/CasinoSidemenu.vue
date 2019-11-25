<template>
  <b-nav
    tag="div"
    class="flex-nowrap"
    vertical>
    <b-nav-item
      v-for="item in menuItems"
      :key="item.id"
      @click="goTo(item.name)">
      <b-row
        :class="[item.name ? 'casino-sidemenu-item' : 'casino-sidemenu-separator-item']"
        no-gutters>
        <b-col
          v-if="item.icon"
          cols="auto"
          class="px-4 py-3 sidemenu-main-logo d-flex align-items-center justify-content-center">
          <icon
            :name="item.icon.name"
            :size="item.icon.size ? item.icon.size : 24"
            class="casino-sidemenu-icon"/>
        </b-col>
        <b-col class="py-1 pr-3 d-flex align-items-center justify-content-start letter-spacing-2">
          <span class="text-truncate text-capitalize">
            {{ item.label }}
          </span>
        </b-col>
      </b-row>
    </b-nav-item>
  </b-nav>
</template>

<script>
export default {
  data () {
    return {
      menuItems: [
        {
          id: 1,
          name: 'my cashier',
          label: this.$t('casino.sidemenu.labels.myCashier'),
          icon: { name: 'sidemenu-cashier' },
        },
        {
          id: 2,
          label: this.$t('casino.sidemenu.labels.interestingCategories')
        },
        {
          id: 3,
          name: 'casino',
          label: this.$t('casino.sidemenu.labels.casinoGames'),
          icon: { name: 'sidemenu-casino-games' },
        },
        {
          id: 4,
          name: 'live-casino',
          label: this.$t('casino.sidemenu.labels.liveCasino'),
          icon: { name: 'sidemenu-live-casino' }
        },
        {
          id: 5,
          name: 'sports',
          label: this.$t('casino.sidemenu.labels.sportsBetting'),
          icon: { name: 'sidemenu-sports' }
        },
        {
          id: 6,
          name: 'esports',
          label: this.$t('casino.sidemenu.labels.esportsBetting'),
          icon: {
            name: 'sidemenu-esports',
            size: 19
          }
        },
        {
          id: 7,
          label: this.$t('casino.sidemenu.labels.special')
        },
        {
          id: 8,
          name: 'bonuses',
          label: this.$t('casino.sidemenu.labels.bonusesPromos'),
          icon: { name: 'sidemenu-bonuses',
            size: 22
          }
        },
        {
          id: 9,
          name: 'Contact Us',
          label: this.$t('casino.sidemenu.labels.contactSupport'),
          icon: { name: 'sidemenu-support',
            size: 26 },
        },
      ]
    }
  },
  methods: {
    goTo (page) {
      this.$router.push({ name: `${page}` })
    }
  }
}
</script>
<style lang="scss"
       scoped>
    @import '@/assets/styles/variables.scss';

    .casino-sidemenu {
        &-item {
        background-color: $arc-clr-soil-dark;
        box-shadow: $sidemenu-box-shadow;
        height: $sidemenu-item-height;
        font-size: $h6-font-size;
        font-weight: $font-weight-bold;
            &:hover {
                background-color: #343434;
                .casino-sidemenu-icon {
                    color: $arc-clr-casino-glow;
                }
            }
            &:active {
                background-color: #292929;
            }
        }
        &-icon {
            color: #9A9A9A;
        }
        &-separator-item {
            color: $arc-clr-iron;
            letter-spacing: .06em;
            background-color: $arc-clr-soil-dark;
            padding: 16px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: $sidemenu-item-height;
            cursor: default;
            box-shadow: $sidemenu-box-shadow;
            user-select: none;
            & > div {
                padding: 0 !important;
                & > span {
                    text-transform: uppercase !important;
                    font-size: 11px;
                }
            }

        }
    }
</style>
