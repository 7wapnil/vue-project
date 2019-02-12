<template>
  <b-nav class="my-2"
    vertical>
    <b-nav-item
      v-for="(title, index) in titles"
      :to="{ name: `${ title.page }` }"
      :key="index"
      active-class="styleguide-sidemenu-active"
      class="styleguide-sidemenu mx-3 my-1">
      <b-row no-gutters>
        <b-col class="p-2 d-flex align-items-center justify-content-center">
          <h6 class="mb-0 font-weight-bold">
            {{ title.name }}
          </h6>
        </b-col>
      </b-row>
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
        { name: 'Betslip', page: 'styleguide-betslip' },
        { name: 'Cards', page: 'styleguide-cards' },
      ]
    }
  }
}
</script>
