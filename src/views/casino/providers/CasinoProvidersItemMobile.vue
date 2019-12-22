<template>
  <b-row no-gutters>
    <b-col class="bg-arc-clr-soil-dark mx-2 my-1 p-0 border-4 pointer">
      <b-row
        class="mb-0"
        no-gutters>
        <b-col
          cols="4"
          class="p-3">
          <b-img
            :height="50"
            :width="100"
            :src="itemImg"
          />
        </b-col>
        <b-col
          cols="6"
          class="p-3 d-flex align-items-center justify-content-start">
          <h5 class="font-weight-light mb-0">
            {{ provider.name }}
          </h5>
        </b-col>
        <b-col
          cols="auto"
          class="p-3 d-flex align-items-center justify-content-end item-header-block">
          <icon
            :size="12"
            name="chevron-right"/>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import CasinoProvidersItem from '@/views/casino/providers/CasinoProvidersItem'

export default {
  extends: CasinoProvidersItem,
  props: {
    provider: {
      type: Object,
      required: true
    }
  }
}
</script>
