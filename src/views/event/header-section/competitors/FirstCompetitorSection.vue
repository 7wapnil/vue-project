<template>
  <b-col>
    <b-row
      v-if="firstCompetitor"
      class="h-100 d-flex align-items-center text-center"
      no-gutters>
      <b-col v-if="!isMobile"
             class="font-weight-bold my-4 mx-2 letter-spacing-2">
        {{ firstCompetitor.name }}
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
export default {
  props: {
    firstCompetitor: {
      type: Object,
      required: true
    }
  }
}
</script>
