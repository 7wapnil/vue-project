<template>
  <div class="mobile-navigation-sidemenu">
    <b-row
      class="mobile-navigation-sidemenu-logo-section"
      no-gutters>
      <b-col class="d-flex align-items-center justify-content-center bg-arc-clr-esport-bg">
        <img
          :src="require(`@/assets/images/logo/arcanebet-logo.svg`)"
          alt="arcanebet-logo">
      </b-col>
    </b-row>
    <b-row
      class="mobile-navigation-sidemenu-category-switch-section"
      no-gutters>
      <b-nav
        class="w-100"
        justified>
        <b-nav-item
          v-for="(category, index) in categories"
          :key="index"
          :active="category.label === 'Esport'"
          class="mobile-navigation-sidemenu-category">
          {{ category.label }}
        </b-nav-item>
      </b-nav>
    </b-row>
    <b-row
      class="mobile-navigation-sidemenu-list-section"
      no-gutters>
        <b-col>
            <vue-scroll>
                <side-menu :items="menuItems"/>
            </vue-scroll>
        </b-col>
    </b-row>
  </div>
</template>
<script>
    import SideMenu from '@/components/side-menu/SideMenu'

    export default {
      components: {
        SideMenu
      },
      data () {
        return {
          categories: [
            {
              label: this.$i18n.t('homePage.esport'),
            },
            {
              label: this.$i18n.t('homePage.sport'),
            }
          ]
        }
      }
    }
</script>
