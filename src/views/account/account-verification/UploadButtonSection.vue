<template>
  <b-row
    class="py-md-4 py-0"
    no-gutters>
    <b-col
      cols="12"
      md="6"
      class="mt-0 mt-md-2 letter-spacing-2 text-arc-clr-iron p-4 p-md-0"
      v-html="$t('account.accountVerification.information.upload')"/>
    <b-col
      cols="12"
      md="6"
      class="text-right mt-0 mt-md-2 p-4 p-md-0">
      <b-button
        :block="isMobile"
        :disabled="!isSubmitEnabled"
        variant="user-profile-button"
        @click="$emit('files-submited')">
        {{ $t('account.accountVerification.cta.uploadFiles') }}
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
