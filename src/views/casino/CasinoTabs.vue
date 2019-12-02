<template>
  <b-nav
    class="casino-tabs-nav no-scrollbars"
    tabs>
    <b-nav-item
      v-for="tab in tabs"
      :key="tab.id"
      :to="tab.route"
      exact
      exact-active-class="casino-tab-active"
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
          name: 'popular',
          icon: 'casino-popular',
          label: 'Popular',
          route: { name: 'casino' }
        },
        {
          id: 1,
          name: 'new',
          icon: 'casino-new',
          label: 'New',
          route: { name: 'casino-category', params: { category: 'new' } }
        },
        {
          id: 2,
          name: 'favorites',
          icon: 'casino-favorites',
          label: 'Favorites',
          route: { name: 'casino-category', params: { category: 'favorites' } }
        },
        {
          id: 3,
          name: 'slots',
          icon: 'casino-slots',
          label: 'Slots',
          route: { name: 'casino-category', params: { category: 'slots' } }
        },
        {
          id: 4,
          name: 'jackpots',
          icon: 'casino-jackpots',
          label: 'Jackpots',
          route: { name: 'casino-category', params: { category: 'jackpots' } }
        },
        {
          id: 5,
          name: 'table games',
          icon: 'casino-table-games',
          label: 'Table games',
          route: { name: 'casino-category', params: { category: 'table-games' } }
        },
        {
          id: 6,
          name: 'skill games',
          icon: 'casino-skill-games',
          label: 'Skill games',
          route: { name: 'casino-category', params: { category: 'skill-games' } }
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
                color: $arc-clr-casino-glow !important;
            }
        }
        &-icon {
            .casino-tab:hover &{
              color: $arc-clr-casino-glow !important;
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
