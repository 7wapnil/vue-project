<template>
  <b-row
    class="item-header-block mt-2"
    no-gutters>
    <b-col
      cols="8"
      class="d-flex align-items-center p-4">
      <icon
        :size="isMobile ? 20 : 26"
        name="casino-providers"
        class="mr-2 mx-md-4"/>
      <h4 class="mb-0 font-weight-light">
        {{ $t('casino.headings.gameProviders') }}
      </h4>
    </b-col>
    <b-col
      cols="4"
      class="p-4 d-flex align-items-center justify-content-end pointer"
      @click="pushLobby">
      <icon
        :size="12"
        name="chevron-left"
        class="mr-1"/>
      <span class="mr-1">
        {{ this.$i18n.t('casino.return') }}
      </span>
    </b-col>
  </b-row>
</template>

<script>
export default {
  methods: {
    pushLobby () {
      const lobby = this.$route.params.titleKind
      this.$router.push({ name: lobby })
    }
  }
}
</script>
