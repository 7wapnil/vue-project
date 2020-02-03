<template>
  <div>
    <div
      v-b-toggle="`item-${item.id}`"
      class="collapsed">
      <footer-menu-item-content :item="item"/>
    </div>
    <b-link
      v-if="!hasChildren && item.route"
      :to="item.route"
      exact>
      <footer-menu-item-content :item="item"/>
    </b-link>
    <b-collapse
      :id="`item-${item.id}`"
      accordion="footermenu">
      <b-nav
        vertical
        class="flex-nowrap py-4">
        <b-nav-item
          v-for="child in item.children"
          :to="child.route"
          :key="child.id"
          class="text-capitalize letter-spacing-2 font-size-14 text-arc-clr-iron-light py-3">
          {{ child.title }}
        </b-nav-item>
      </b-nav>
    </b-collapse>
  </div>
</template>

<script>
import FooterMenuItemContent from './FooterMenuItemContent'

export default {
  components: {
    FooterMenuItemContent
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasChildren () {
      return this.item.children && this.item.children.length
    }
  }
}
</script>
