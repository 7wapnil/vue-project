<template>
  <div class="bg-arc-clr-soil-darker">
    <b-row no-gutters>
      <b-col class="text-center mt-4">
        <b-img :src="require('@/assets/images/logo/arcanebet-logo.png')"/>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col cols="2"/>
      <b-col class="p-5">
        <h1 class="font-weight-light text-arc-clr-iron px-5 pb-5">Oops, the page you are looking for doesn't seem to exist</h1>
        <p class="font-size-18 letter-spacing-2 text-arc-clr-iron px-5 pb-5">
          We're sorry but the page you are looking for cannot be found. It may
          have been removed, had its name changed, or is temporarily unavailable.
          If this is a problem from our end, please be assured we're doing all we
          can to resolve the situation.
        </p>
        <b-row
          style="margin-bottom: 200px"
          no-gutters>
          <b-col class="text-left">
            <b-button
              :to="{ path: '/esports' }"
              size="lg"
              variant="arc-secondary"
              class="px-5 bg-arc-clr-esport-bg border-0 letter-spacing-2 font-weight-bold">
              ESPORT HOME
            </b-button>
          </b-col>
          <b-col class="text-right">
            <b-button
              :to="{ path: '/sports'}"
              size="lg"
              variant="arc-secondary"
              class="px-5 bg-arc-clr-sport-bg border-0 letter-spacing-2 font-weight-bold">
              SPORT HOME
            </b-button>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="2"/>
    </b-row>
    <arc-footer/>
  </div>
</template>

<script>
import ArcFooter from '@/views/layouts/main/ArcFooter'

export default {
  components: {
    ArcFooter
  }
}
</script>
