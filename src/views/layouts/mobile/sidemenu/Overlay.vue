<template>
  <div @click.stop="toggleSidebar"
       class="mobile-navigation-sidemenu-overlay">
    <slot/>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    methods: {
      ...mapMutations([
        'toggleSidebar'
      ])
    }
  }
</script>
