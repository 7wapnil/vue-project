<template>
  <b-row no-gutters>
    <b-tabs
      class="w-100"
      justified>
      <template #tabs>
        <b-nav-item
          v-for="(category, index) in categories"
          :key="index"
          :active="getSidebarKind === category.name"
          :class="[ getSidebarKind === 'esports' ? 'mobile-navigation-sidemenu-category-esports' : 'mobile-navigation-sidemenu-category-sports' ]"
          class="mobile-navigation-sidemenu-category"
          @click.stop="changeCategory(category.name)">
          {{ category.label }}
        </b-nav-item>
      </template>
    </b-tabs>
  </b-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    link: {
      type: Boolean,
      default: false
    }
  },
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
  created () {
    this.changeSidebarKind(this.$route.params.titleKind)
  },
  methods: {
    changeCategory (kind) {
      if (this.link) {
        this.$router.push({ path: `/${kind}` })
      } else {
        this.changeSidebarKind(kind)
      }
    },
    ...mapMutations([
      'changeSidebarKind'
    ])
  }
}
</script>
