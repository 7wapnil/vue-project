<template>
  <b-nav
    class="casino-tabs-nav no-scrollbars"
    fill
    justified
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
            class="casino-tab-icon"/>
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
    <b-nav-form class="w-50"/>
  </b-nav>
</template>

<script>
import { GAMES_CATEGORIES_QUERY } from '@/graphql'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'

export default {
  name: 'CasinoTabs',
  data () {
    return {
      arrows: true,
      defaultTab: {
        id: 0,
        name: 'popular',
        icon: 'casino-popular',
        label: 'Popular',
        route: { name: 'casino' }
      },
      tabs: []
    }
  },
  apollo: {
    categories () {
      return {
        query: GAMES_CATEGORIES_QUERY,
        fetchPolicy: NETWORK_ONLY,
        result ({ data }) {
          let categories = data.categories.map((data, index) => {
            return {
              ...data,
              id: index + 1, // +1 because of default tab
              icon: `casino-${data.name}`,
              route: {
                name: 'casino-category',
                params: {
                  category: `${data.name}`,
                  label: data.label
                }
              }
            }
          })

          this.tabs = [this.defaultTab, ...categories]
        }
      }
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
            margin: 0 20px;
        }

    }
    .casino-tab {
      padding: 16px;
      min-width: 75px;
        &-active {
            letter-spacing: -0.004em;
            transition: all .3s ease-in-out;
            background: #3D3D3D !important;
            border-radius: 4px 4px 0 0;
            min-width: 75px;
            .casino-tab-icon {
                color: $arc-clr-casino-glow !important;
            }
        }
        &-icon {
            color: $arc-clr-iron;
            .casino-tab:hover & {
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
