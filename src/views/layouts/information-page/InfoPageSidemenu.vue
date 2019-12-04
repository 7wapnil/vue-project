<template>
  <b-nav
    class="flex-nowrap"
    role="navigation"
    vertical>
    <b-nav-item class="d-inline-flex align-items-center justify-content-start p-3 bg-arc-clr-soil-dark side-menu-categories w-100">
      <span class="text-arc-clr-iron letter-spacing-2">
        CATEGORIES
      </span>
    </b-nav-item>
    <b-nav-item
      v-b-toggle="`item-${index}`"
      v-for="(item, index) in menuItems"
      :key="item.id"
      class="bg-arc-clr-soil-cover collapsed">
      <div>
        <div class="d-flex align-items-center information-page-sidemenu">
          <span class="p-3">
            <icon
              :name="item.icon"
              size="24px"/>
          </span>
          <span class="text-capitalize font-size-14 font-weight-bold h-100 w-100 d-flex align-items-center item-name letter-spacing-2 pointer">
            {{ item.title }}
          </span>
          <span class="px-4 d-flex align-items-center h-100">
            <icon
              name="sidemenu-chevron-down"
              size="7.5px"/>
          </span>
        </div>
        <b-collapse
          :visible="item.route.name === $route.params.titleKind"
          :id="`item-${index}`"
          accordion="information-sidebar">
          <b-nav
            vertical
            role="navigation"
            class="bg-arc-clr-soil-darker py-3">
            <b-nav-item
              v-for="child in item.children"
              :key="child.id"
              :to="child.route"
              link-classes="information-page-sidemenu-item"
              class="text-arc-clr-iron-light font-size-14 font-weight-bold text-truncate letter-spacing-2"
              exact-active-class="information-page-sidemenu-active"
              exact>
              {{ child.title }}
            </b-nav-item>
          </b-nav>
        </b-collapse>
      </div>
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
          title: 'Support',
          icon: 'support',
          route: { name: 'support' },
          children: [
            {
              id: 1.1,
              title: 'Contact us',
              route: { name: 'contact us' }
            },
            {
              id: 1.2,
              title: 'Terms and conditions',
              route: { name: 'terms and conditions' }
            },
            {
              id: 1.3,
              title: 'Sports betting rules',
              route: { name: 'sports betting rules' }
            },
            {
              id: 1.4,
              title: 'Privacy policy',
              route: { name: 'privacy policy' }
            },
            {
              id: 1.5,
              title: 'Cookie policy',
              route: { name: 'cookie policy' }
            },
            {
              id: 1.6,
              title: 'FAQ',
              route: { name: 'faq' }
            }]
        },
        {
          id: 2,
          title: 'About',
          icon: 'arcanebet-default-icon',
          route: { name: 'about' },
          children: [{
            id: 2.1,
            title: 'About Arcanebet',
            route: { name: 'about arcanebet' }
          },
          {
            id: 2.2,
            title: 'Affiliates',
            route: { name: 'affiliates' }
          }],
        },
        {
          id: 3,
          title: 'Promotions',
          icon: 'promotional',
          route: { name: 'promotions' },
          children: [
            {
              id: 3.1,
              title: 'Promotions',
              route: { name: 'promotions' }
            },
            {
              id: 3.2,
              title: 'Bonus rules',
              route: { name: 'bonus rules' }
            }],
        },
        {
          id: 4,
          title: 'Responsible gaming',
          icon: 'help',
          route: { name: 'responsible gaming' },
          children: [
            {
              id: 4.1,
              title: 'Introduction',
              route: { name: 'introduction' }
            },
            {
              id: 4.2,
              title: 'Setting limits',
              route: { name: 'setting limits' }
            }],
        },

      ]
    }
  }
}
</script>
