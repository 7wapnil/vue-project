<template>
  <b-navbar
    fixed="top"
    class="navbar-mobile">
    <b-row
      no-gutters
      class="w-100 h-100">
      <b-col
        class="navbar-mobile-burger-section d-flex align-items-center justify-content-start"
        @click="$emit('burger-clicked')">
        <icon
          v-show="$route.meta.components.mobileSidemenu"
          name="sidebar-menu"
          color="arc-clr-white"
          size="20px"/>
      </b-col>
      <b-col class="navbar-brand-mobile d-flex align-items-center justify-content-center">
        <b-navbar-brand
          :to="{ name: 'home' }"
          class="mb-1">
          <img :src="require(`@/assets/images/logo/arcanebet-logo-mobile.svg`)">
        </b-navbar-brand>
      </b-col>
      <b-col :class="[isLoggedIn ? 'navbar-mobile-profile-section' : 'mobile-login-section']">
        <div
          v-if="isLoggedIn"
          class="h-100 w-100 d-flex flex-column align-items-end justify-content-center"
          @click="showModal">
          <b-button variant="arc-profile-button-mobile"/>
          <div
            v-if="activeWallet"
            class="font-size-12 letter-spacing-2">
            <span>{{ amount }} </span>
            {{ currencyCode }}
          </div>
        </div>
        <div
          v-if="!hasLoginBlock && !isLoggedIn"
          class="d-flex align-items-center justify-content-end">
          <b-btn
            v-b-modal.AuthModal
            variant="arc-primary"
            class="mobile-auth-button">
            {{ $t('auth.cta.login') }}
          </b-btn>
        </div>
      </b-col>
    </b-row>
  </b-navbar>
</template>

<script>
import UserProfileMenu from '@/components/navbar/profile/UserProfileMenu'

export default {
  extends: UserProfileMenu,
  props: {
    hasLoginBlock: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped
       lang="scss">
  .mobile-auth-button {
    padding: 6px 25px;
    letter-spacing: .02em;
    font-size: 12px;
  }
  .mobile-login-section {
    padding: 14px 16px !important;
  }
</style>
