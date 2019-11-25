<template>
  <b-nav
    class="casino-tabs-nav no-scrollbars"
    tabs>
    <b-nav-item
      v-for="tab in tabs"
      :key="tab.id"
      :to="tab.route"
      active-class="casino-tab-active"
      link-classes="casino-tab">
      <b-row no-gutters>
        <b-col
          class="text-center"
          cols="12">
          <icon
            :name="tab.icon"
            :size="26"
            class="casino-tab-icon"
            color="arc-clr-iron"/>
        </b-col>
        <b-col
          class="text-center"
          cols="12">
          <span class="casino-tab-label">
            {{ tab.label }}
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
      arrows: true,
      tabs: [
        {
          id: 0,
          name: 'live-casino',
          icon: 'live-casino-tabs-live-casino',
          label: 'Live Casino',
          route: { name: 'live-casino-category', params: { category: 'skill-games' } }
        },
        {
          id: 1,
          name: 'roulette',
          icon: 'live-casino-tabs-roulette',
          label: 'Roulette',
          route: { name: 'live-casino-category', params: { category: 'roulette' } }
        },
        {
          id: 2,
          name: 'blackjack',
          icon: 'live-casino-tabs-blackjack',
          label: 'Blackjack',
          route: { name: 'live-casino-category', params: { category: 'blackjack' } }
        },
        {
          id: 3,
          name: 'poker',
          icon: 'live-casino-tabs-poker',
          label: 'Poker',
          route: { name: 'live-casino-category', params: { category: 'poker' } }
        },
        {
          id: 4,
          name: 'hot-tables',
          icon: 'live-casino-tabs-hot-tables',
          label: 'Hot Tables',
          route: { name: 'live-casino-category', params: { category: 'hot-tables' } }
        }
      ]
    }
  }
}
</script>

<style lang="scss"
       scoped>
    @import '@/assets/styles/variables.scss';

    .casino-tabs {
        &-nav {
            flex-wrap: nowrap;
            white-space: nowrap;
            max-width: 100%;
            overflow: auto;
            padding: 0 20px;
        }

    }
    .casino-tab {
        padding: 16px;
        &-active {
            letter-spacing: -0.004em;
            transition: all .3s ease-in-out;
            background: #3D3D3D !important;
            border-radius: 4px 4px 0 0;
            .casino-tab-icon {
                color: $arc-clr-live-casino-glow !important;
            }
        }
        &-icon {
            .casino-tab:hover &{
                color: $arc-clr-live-casino-glow !important;
                transition: .3s ease-in-out;
            }
        }
        &-label {
            font-size: $small-font-size;
            color: $arc-clr-iron-light;
            line-height: 14px;
        }
    }
</style>
