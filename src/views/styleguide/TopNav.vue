<template>
  <b-navbar
    fixed="top"
    toggleable="lg"
    class="px-0"
    type="dark"
    style="height: 80px">
    <b-container
      fluid
      style="max-width: 1920px"
      class="p-0">
      <b-navbar-brand
        :to="{ name: 'home' }"
        class="mr-0"/>

      <b-navbar-nav id="top-navigation">
        <b-nav-item
          v-for="(siteColor, index) in siteColors"
          :key="index"
          :class="'navbar-menu-item ' + `${siteColor.background}`"
          style="height: 80px"
          @click="changeSiteColor(siteColor.category)">
          <h6 class="m-0 font-weight-bold">
            {{ siteColor.label }}
          </h6>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav>
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
        },
      ]
    }
  },
  methods: {
    changeSiteColor (color) {
      this.$emit('changeColor', color)
    }
  }
}
</script>
