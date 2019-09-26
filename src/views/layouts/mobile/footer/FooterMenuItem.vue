<template>
  <div>
    <div
      v-b-toggle="`item-${item.path}`"
      class="collapsed">
      <footer-menu-item-content :item="item"/>
      <b-collapse
        :id="`item-${item.path}`"
        :visible="item.active"
        accordion="footermenu">
        <b-nav
          vertical
          class="flex-nowrap py-4">
          <b-nav-item
            v-for="child in item.children"
            :to="{ name: child.name }"
            :key="child.path"
            class="text-capitalize letter-spacing-2 font-size-14 text-arc-clr-iron-light">
            {{ child.title }}
          </b-nav-item>
        </b-nav>
      </b-collapse>
    </div>
    <!--<b-link-->
    <!--v-if="!hasChildren && item.path"-->
    <!--:to="item.path"-->
    <!--exact>-->
    <!--<footer-menu-item-content :item="item"/>-->
    <!--</b-link>-->

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
