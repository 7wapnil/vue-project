<template>
  <b-nav
    class="side-menu"
    role="navigation"
    vertical>
    <b-nav-item class="d-inline-flex align-items-center justify-content-start p-3 bg-arc-clr-soil-dark side-menu-categories">
      <span class="text-arc-clr-iron letter-spacing-2">
        CATEGORIES
      </span>
    </b-nav-item>

    <b-nav-item
      v-b-toggle="`item-${index}`"
      v-for="(item, index) in menuItems"
      :key="index"
      class="bg-arc-clr-soil-cover collapsed">
      <div>
        <div class="d-flex align-items-center information-page-sidemenu">
          <span class="p-3">
            <icon
              :name="!!item.icon ? `${ item.icon }` : 'promotional'"
              size="24px"/>
          </span>
          <span class="text-capitalize font-size-14 font-weight-bold h-100 w-100 d-flex align-items-center item-name letter-spacing-2 pointer">
            {{ item.title }}
          </span>
          <span class="px-4 d-flex align-items-center h-100">
            <icon
              name="sidemenu-chevron-down"
              size="7.5px"/>
          </span>
        </div>
        <b-collapse
          :visible="item.path === currentPath"
          :id="`item-${index}`"
          accordion="information-sidebar">
          <b-nav
            vertical
            role="navigation"
            class="bg-arc-clr-soil-darker py-3">
            <b-nav-item
              v-for="(child, childIndex) in item.children"
              :key="childIndex"
              :to="{ name: `${ child.name }` }"
              link-classes="information-page-sidemenu-item"
              class="text-capitalize text-arc-clr-iron-light font-size-14 font-weight-bold text-truncate letter-spacing-2"
              active-class="information-page-sidemenu-active"
              exact>
              {{ child.title }}
            </b-nav-item>
          </b-nav>
        </b-collapse>
      </div>
    </b-nav-item>
  </b-nav>
</template>
<script>
import InformationPages from '@/routes/information_pages'

export default {
  data () {
    return {
      menuItems: InformationPages.routes
    }
  },
  computed: {
    currentPath () {
      return this.$route.path.split('/')[1]
    }
  }
}
</script>
