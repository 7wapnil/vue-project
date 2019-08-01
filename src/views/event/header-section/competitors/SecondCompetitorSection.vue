<template>
  <b-col>
    <b-row
      v-if="secondCompetitor"
      class="h-100 d-flex align-items-center text-center"
      no-gutters>
      <b-col class="font-weight-bold my-4 mx-2 letter-spacing-2">
        {{ secondCompetitor.name }}
      </b-col>

      <div
        v-if="showicons"
        class="w-100"/>

      <b-col
        v-if="showicons"
        class="mt-1">
        <icon
          name="sidemenu-game-icon"
          size="56px"/>
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
    },
    showicons: {
      type: Boolean,
      default: true
    }
  }
}
</script>
