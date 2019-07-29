<template>
  <div>
    <b-row no-gutters>
      <b-col class="mb-3 text-center">
        <span class="font-size-14 letter-spacing-2 text-arc-clr-iron">
          Sign up now and get bonuses!
        </span>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col class="text-right">
        <b-button
          class="mx-2 w-75"
          variant="arc-secondary"
          @click="showAuthModal(0)">
          Login
        </b-button>
      </b-col>
      <b-col class="text-left">
        <b-button
          class="mx-2 w-75"
          variant="arc-primary"
          @click="showAuthModal(1)">
          SignUp
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import DesktopNavigationBar from '@/views/layouts/desktop/NavigationBar'

export default {
  extends: DesktopNavigationBar
}
</script>
