<template>
  <b-row
    :class="`item-title item-title-${level}`"
    no-gutters>
    <b-col
      v-if="item.icon"
      cols="auto"
      class="px-4 py-3 sidemenu-main-logo d-flex align-items-center justify-content-center">
      <icon
        :name="item.icon"
        size="24px"/>
    </b-col>
    <b-col class="py-1 pr-3 d-flex align-items-center justify-content-start letter-spacing-2">
      <span class="text-truncate">
        {{ item.label }}
      </span>
    </b-col>
    <b-col
      v-if="item.children && item.children.length"
      cols="auto"
      class="sidemenu-chevron d-flex align-items-center justify-content-center">
      <icon
        v-if="level === 0"
        name="sidemenu-chevron-down"
        size="8px"/>
      <icon
        v-if="level > 0"
        name="sidemenu-triangle-down"
        size="6px"/>
    </b-col>
  </b-row>
</template>

<script>
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
  }
}
</script>
