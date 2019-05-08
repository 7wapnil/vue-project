<template>
  <b-row no-gutters>
    <b-col class="d-inline-flex px-4 pt-4 events-list-title">

      <icon
        :name="findTitleIcon(item)"
        class="ml-2"
        size="24px"/>

      <h4
        tabindex="0"
        class="ml-4 mb-0 text-arc-clr-white font-weight-light letter-spacing-1 pointer"
        style="outline: 0;"
        @click="() => emitTitleChange(item.id)">
        {{ item.name }}
      </h4>

    </b-col>
  </b-row>
</template>

<script>
import { TITLE_CHANGED } from '@/constants/custom-events'
import { findTitleIcon } from '@/helpers/icon-finder'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    emitTitleChange (id) {
      this.$root.$emit(TITLE_CHANGED, id)
    },
    findTitleIcon
  }
}
</script>
