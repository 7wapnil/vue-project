<template>
  <b-nav
    class="casino-tabs-nav no-scrollbars"
    fill
    justified
    tabs>
    <b-nav-item
      v-for="(tab, index) in tabs"
      :key="tab.id"
      :active="activeIndex === index"
      :class="[activeIndex === index ? 'casino-tab-active' : '']"
      link-classes="casino-tab"
      @click="scrollIntoView(tab.context, index)">
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
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { TABLES_CATEGORIES_QUERY } from '@/graphql'

export default {
  name: 'LiveCasinoTabs',
  data () {
    return {
      defaultTab: {
        id: 0,
        name: 'live-casino',
        icon: 'live-casino-live-casino',
        label: this.$i18n.t('casino.sidemenu.labels.liveCasino'),
        route: { name: 'live-casino' }
      },
      tabs: [],
      activeIndex: 0
    }
  },
  apollo: {
    categories () {
      return {
        query: TABLES_CATEGORIES_QUERY,
        fetchPolicy: NETWORK_ONLY,
        result ({ data }) {
          let categories = data.categories.map((data, index) => {
            return {
              ...data,
              id: index + 1, // +1 because of default tab
              icon: `live-casino-${data.context}`,
              route: {
                name: 'live-casino-category',
                params: {
                  category: `${data.context}`,
                  label: data.label
                }
              }
            }
          })

          this.tabs = [this.defaultTab, ...categories]
        }
      }
    }
  },
  methods: {
    scrollIntoView (section, index) {
      this.activeIndex = index
      if (section) {
        const targetSection = document.getElementById(section)
        const bodyRect = document.body.getBoundingClientRect().top
        const elementRect = targetSection.getBoundingClientRect().top
        const elementPosition = elementRect - bodyRect
        this.scrollToPosition(elementPosition)
      } else {
        this.scrollToPosition(0)
      }
    },
    scrollToPosition (position) {
      return window.scrollTo({
        top: position,
        behavior: 'smooth'
      })
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
        &-active a {
            letter-spacing: -0.004em;
            transition: all .3s ease-in-out;
            background: $arc-clr-soil-light !important;
            border-radius: 4px 4px 0 0;
            .casino-tab-icon {
                color: $arc-clr-live-casino-glow !important;
            }
        }
        &-icon {
             color: $arc-clr-iron;
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
