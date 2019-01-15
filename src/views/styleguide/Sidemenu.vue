<template>
  <b-nav
    vertical>
    <b-nav-item
      v-b-toggle="`title-${index}`"
      v-for="(title, index) in titles"
      :to="{ name: `${ title.page }` }"
      :key="index"
      class="sidemenu">
      <b-row
        class="sidebar-collapsed-title"
        no-gutters>
        <b-col
          cols="auto"
          class="px-4 py-3 sidemenu-main-logo d-flex align-items-center justify-content-center">
          <icon
            name="sidemenu-game-icon"
            size="24px"/>
        </b-col>
        <b-col class="py-4 d-flex align-items-center justify-content-start">
          <h6 class="mb-0">
            <b>{{ title.name }}</b>
          </h6>
        </b-col>
        <b-col
          cols="auto"
          class="bg-arc-clr-esport-opacity-like px-4 sidemenu-chevron d-flex align-items-center justify-content-center"/>
      </b-row>

      <b-collapse
        :id="`title-${index}`"
        :is-nav="true"
        accordion="styleguide-titles-menu"/>
    </b-nav-item>
  </b-nav>
</template>
<script>
export default {
  data () {
    return {
      titles: [
        { name: 'Typography', page: 'styleguide-typography' },
        { name: 'Buttons', page: 'styleguide-buttons' },
        { name: 'Tabs', page: 'styleguide-tabs' },
        { name: 'Grouped Events', page: 'styleguide-grouped-events' },
      ]
    }
  }
}
</script>
