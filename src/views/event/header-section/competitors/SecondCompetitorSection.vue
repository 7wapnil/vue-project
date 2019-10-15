<template>
  <b-col>
    <b-row
      v-if="secondCompetitor"
      class="h-100 d-flex align-items-center text-center"
      no-gutters>
      <b-col class="font-weight-bold my-4 mx-2 letter-spacing-2">
        {{ secondCompetitor.name }}
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
export default {
  props: {
    secondCompetitor: {
      type: Object,
      required: true
    }
  }
}
</script>
