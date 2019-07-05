<template>
  <b-row
    :class="`item-title mobile-item-title-${level}`"
    no-gutters>
    <b-col
      v-if="item.icon"
      :class="[getSidebarKind === 'esports' ? 'text-arc-clr-esport-glow' : 'text-arc-clr-sport-glow']"
      cols="auto"
      class="px-4 sidemenu-main-logo py-3 d-flex align-items-center justify-content-center">
      <icon
        :name="item.icon"
        size="24px"/>
    </b-col>
    <b-col class="py-1 pr-3 d-flex align-items-center justify-content-start">
      <span class="text-truncate letter-spacing-2">
        {{ item.label }}
      </span>
    </b-col>
    <b-col
      v-if="item.children && item.children.length"
      :class="[getSidebarKind === 'esports' ? 'text-arc-clr-esport-glow' : 'text-arc-clr-sport-glow']"
      cols="auto"
      class="sidemenu-chevron d-flex align-items-center justify-content-center">
      <icon
        v-if="level === 0"
        name="sidemenu-chevron-down"
        size="8px"/>
      <icon
        v-if="level > 0"
        :class="[getSidebarKind === 'esports' ? 'text-arc-clr-esport-glow' : 'text-arc-clr-sport-glow']"
        name="sidemenu-triangle-down"
        size="6px"/>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    level: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters([
      'getSidebarKind'
    ])
  }
}
</script>
