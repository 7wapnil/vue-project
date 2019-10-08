<template>
  <b-nav
    tag="div"
    class="flex-nowrap"
    vertical>
    <menu-header/>
    <menu-section
      v-for="(section, index) in menuSections"
      :key="index"
      :section="section"/>
  </b-nav>
</template>

<script>
import MenuSection from './MenuSection'
import MenuHeader from './MenuHeader'

export default {
  components: {
    MenuHeader,
    MenuSection
  },
  data () {
    return {
      menuSections: [
        {
          items: [
            {
              icon: 'sidemenu-basketball',
              title: 'My Cashier',
              path: '#'
            }
          ]
        },
        {
          title: 'Interesting categories',
          items: [
            {
              icon: 'sidemenu-basketball',
              title: 'Casino games',
              path: '/casino'
            },
            {
              icon: 'sidemenu-basketball',
              title: 'Live casino',
              path: '/live-casino'
            },
            {
              icon: 'sidemenu-basketball',
              title: 'Sports betting',
              path: '/sports'
            },
            {
              icon: 'sidemenu-basketball',
              title: 'Esports betting',
              path: '/esports'
            }
          ]
        },
        {
          title: 'Special',
          items: [
            {
              icon: 'promotional',
              title: "Bonuses and promo's",
              path: '#'
            },
            {
              icon: 'support',
              title: 'Contact support',
              path: '#'
            }
          ]
        }
      ]
    }
  }
}
</script>
