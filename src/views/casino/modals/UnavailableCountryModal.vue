<template>
  <modal
    id="UnavailableCountryModal"
    @hide="redirectToLobby">

    <div class="m-2">
      <h4>{{ $t('casino.unavailableCountryModal.title') }}</h4>
      <p class="letter-spacing-2 text-arc-clr-iron mt-4">
        {{ $t('casino.unavailableCountryModal.text') }}
      </p>

      <b-button
        class="w-50 m-auto"
        variant="user-profile-button"
        block
        @click="redirectToLobby">

        {{ $t('casino.unavailableCountryModal.buttonText') }}
      </b-button>
    </div>
  </modal>
</template>

<script>
export default {
  methods: {
    redirectToLobby () {
      this.$bvModal.hide('UnavailableCountryModal')
      this.$router.push(`/${this.$route.params.titleKind}`)
    }
  }
}
</script>
