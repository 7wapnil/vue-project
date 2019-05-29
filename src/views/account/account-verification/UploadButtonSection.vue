<template>
  <b-row
    class="py-4"
    no-gutters>
    <b-col class="mt-2 letter-spacing-2 text-arc-clr-iron">
      You don’t have any files chosen.<br> Please choose files to upload
    </b-col>
    <b-col class="text-right mt-2">
      <b-button
        :disabled="!isSubmitEnabled"
        variant="user-profile-button"
        @click="$emit('files-submited')">
        Upload Files
      </b-button>
    </b-col>
  </b-row>
</template>
<script>
export default {
  props: {
    isSubmitEnabled: {
      type: Boolean,
      required: true
    }
  }
}
</script>
