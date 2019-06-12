<template>
  <b-row no-gutters>
    <b-tabs
      class="w-100"
      justified>
      <template slot="tabs">
        <b-nav-item
          v-for="(category, index) in categories"
          :key="index"
          :active="getSidebarKind === category.name"
          :class="[ getSidebarKind === 'esports' ? 'mobile-navigation-sidemenu-category-esports' : 'mobile-navigation-sidemenu-category-sports' ]"
          class="mobile-navigation-sidemenu-category"
          @click="changeCategory(category.name)">
          {{ category.label }}
        </b-nav-item>
      </template>
    </b-tabs>
  </b-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      categories: [
        {
          label: this.$i18n.t('homePage.esport'),
          name: 'esports',
        },
        {
          label: this.$i18n.t('homePage.sport'),
          name: 'sports',
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'getSidebarKind'
    ])
  },
  methods: {
    changeCategory (kind) {
      this.$emit('category-changed', kind)
      this.changeSidebarKind(kind)
    },
    ...mapMutations([
      'changeSidebarKind'
    ])
  }
}
</script>
