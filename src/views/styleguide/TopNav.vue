<template>
  <b-navbar
    fixed="top"
    toggleable="lg"
    class="px-0"
    type="dark"
    style="height: 80px">
    <b-container
      fluid
      class="p-0 max-container-size">
      <b-navbar-brand
        :to="{ name: 'home' }"
        class="mr-0"/>

      <b-collapse
        id="styleguide_collapse"
        is-nav>
        <b-navbar-nav id="styleguide-top-navigation">
          <b-nav-item
            v-for="(siteColor, index) in siteColors"
            :key="index"
            :class="'navbar-menu-item ' + `${siteColor.background}`"
            class="mr-2"
            @click="$emit('changeColor', siteColor.category)">
            <span class="font-weight-bold text-arc-clr-white font-size-14">
              {{ siteColor.label }}
            </span>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-toggle
        class="mr-3"
        target="styleguide_collapse"/>

      <b-navbar-nav class="d-none d-lg-block">
        <b-nav-item class="mr-4">
          ArcaneBet Styleguide
        </b-nav-item>
      </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>
<script>
export default {
  data () {
    return {
      siteColors: [
        { label: 'Green',
          background: 'bg-arc-clr-sport-glow',
          category: 'sports'
        },
        { label: 'Blue',
          background: 'bg-arc-clr-esport-glow',
          category: 'esports'
        },
        { label: 'Orange',
          background: 'bg-arc-clr-inplay-glow',
          category: 'live'
        }
      ]
    }
  }
}
</script>
