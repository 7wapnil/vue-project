<template>
  <b-row
    v-if="user"
    no-gutters
    class="mb-5">
    <b-col v-if="!isMobile"
           class="text-left">
      <h3 class="m-0 font-weight-light">
        {{ $t('account.tabs.accountStatus') }}
      </h3>
    </b-col>
    <b-col class="p-4 p-md-0">
      <span
        v-if="!!user.verified"
        class="d-flex align-items-center justify-content-end">
        <b-img :src="require('@/assets/images/account/account-verification/verified_user.svg')"/>
        <span class="font-size-18 font-weight-bold letter-spacing-5 text-arc-clr-sport-glow ml-2">
          Verified
        </span>
      </span>
      <span
        v-if="!user.verified"
        class="d-flex align-items-center justify-content-end">
        <b-img :src="require('@/assets/images/account/account-verification/not_verified_user.svg')"/>
        <span class="font-size-18 font-weight-bold letter-spacing-5 text-wp-clr-notif-red ml-2">
          Not Verified
        </span>
      </span>
    </b-col>
  </b-row>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
