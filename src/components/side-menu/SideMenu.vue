<template>
  <b-nav
    tag="div"
    class="flex-nowrap"
    vertical>
    <b-nav-item class="d-inline-flex align-items-center justify-content-start p-3 bg-arc-clr-soil-dark side-menu-categories w-100">
      <span class="text-arc-clr-iron letter-spacing-2">
        CATEGORIES
      </span>
    </b-nav-item>
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
