<template>
  <b-nav
    class="side-menu flex-nowrap"
    vertical>
    <b-nav-item
      v-for="(item, index) in items"
      :key="index">

      <menu-item
        :item="item"
        :index="index"/>

    </b-nav-item>
  </b-nav>
</template>

<script>
import MenuItem from './MenuItem'

export default {
  components: {
    MenuItem
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
