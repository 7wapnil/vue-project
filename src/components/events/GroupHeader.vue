<template>
  <b-row no-gutters>
    <b-col class="px-0 px-md-4 pt-4 d-inline-flex events-list-title">

      <icon
        :name="findTitleIcon(item)"
        class="ml-4 ml-md-2"
        size="24px"/>

      <h4
        tabindex="0"
        class="ml-2 ml-md-4 mb-0 text-arc-clr-white font-weight-light letter-spacing-1 pointer"
        style="outline: 0;"
        @click="() => emitTitleChange(item.id)">
        {{ getTitleName(item) }}
      </h4>

    </b-col>
  </b-row>
</template>

<script>
import { TITLE_CHANGED } from '@/constants/custom-events'
import { findTitleIcon } from '@/helpers/icon-finder'
import { getTitleName } from '@/helpers/title-names'

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
    findTitleIcon,
    getTitleName
  }
}
</script>
