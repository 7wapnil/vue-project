<template>
  <div>
    <b-row
      class="item-header-block mt-2"
      no-gutters>
      <b-col
        cols="8"
        class="d-flex align-items-center p-4">
        <icon
          :name="categoryIcon"
          :size="isMobile ? 20 : 26"
          class="mr-2 mx-md-4"/>
        <h4 class="mb-0 font-weight-light">
          {{ category.label }}
        </h4>
      </b-col>
      <b-col
        cols="4"
        class="p-4 d-flex align-items-center justify-content-end pointer"
        @click="pushLobby">
        <icon
          :size="12"
          name="chevron-left"
          class="mr-1"/>
        <span class="mr-1">
          {{ this.$i18n.t('casino.return') }}
        </span>
      </b-col>
    </b-row>
    <component
      v-if="playItems.length > 0"
      :is="currentComponent"
      :play-items="playItems"
      :category="category" />
  </div>
</template>
<script>

export default {
  name: 'CategoryPlayItems',
  props: {
    playItems: {
      type: Array,
      default: () => { return [] }
    }
  },
  computed: {
    category () {
      return {
        context: this.$route.params.category,
        label: this.$route.params.label || this.categoryFromParams
      }
    },
    categoryIcon () {
      return `${this.$route.params.titleKind}-${this.category.context}`
    },
    currentComponent () {
      const Mobile = () => import(`@/components/casino-games/play-items-list/CategoryPlayItemsMobile`)
      const Desktop = () => import(`@/components/casino-games/play-items-list/CategoryPlayItemsDesktop`)
      return this.isMobile ? Mobile : Desktop
    },
    categoryFromParams () {
      const name = this.$route.params.category
      if (name) {
        const capitalizedName = (name) => {
          return name
            .toLowerCase()
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        }
        return capitalizedName(name)
      }
    }
  },
  methods: {
    pushLobby () {
      this.$router.push({ name: this.currentLobbyName })
    }
  }
}
</script>
