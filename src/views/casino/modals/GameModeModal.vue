<template>
  <modal
    id="GameModeModal"
    :lazy="false"
    centered
    header-class="auth-modal-header"
    body-class="auth-modal-body">
    <template #modal-header="{ close }">
      <img
        src="~@/assets/images/logo/arcanebet-logo.svg"
        height="20"
        alt="arcanebet-logo">
      <span @click="close">
        <icon
          name="modal-close"
          size="24px"
          color="arc-clr-iron-light"/>
      </span>
    </template>
    <div class="p-5">
      <b-row no-gutters>
        <b-col class="mb-4">
          <b-btn
            class="text-uppercase"
            block
            variant="user-profile-button"
            @click="openAuthModal">
            {{ $t('casino.loginToPlayNow') }}
          </b-btn>
        </b-col>
      </b-row>
      <b-row no-gutters>
        <b-col>
          <b-btn
            class="text-uppercase"
            block
            variant="arc-secondary"
            @click="lauchFunMode">
            {{ $t('casino.tryForFree') }}
          </b-btn>
        </b-col>
      </b-row>
    </div>
  </modal>
</template>

<script>
import { mapGetters } from 'vuex'
import { CREATE_EVERY_MATRIX_SESSION_MUTATION } from '@/graphql'

export default {
  computed: {
    ...mapGetters({
      getGameSlug: 'getGameSlug',
    })
  },
  methods: {
    lauchFunMode () {
      this.$bvModal.hide('GameModeModal')
      this
        .$apollo
        .mutate({
          mutation: CREATE_EVERY_MATRIX_SESSION_MUTATION,
          variables: {
            playItemSlug: this.getGameSlug
          }
        })
        .then(({ data }) => {
          window.location = data.createEveryMatrixSession.launchUrl
        })
        .catch(() => {
          this.$router.push({ name: 'not-found' })
        })
    },
    openAuthModal () {
      this.$bvModal.hide('GameModeModal')
      this.$bvModal.show('AuthModal')
    }
  }
}
</script>
