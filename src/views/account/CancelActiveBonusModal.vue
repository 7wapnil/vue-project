<template>
  <modal
    id="CancelActiveBonusModal"
    ref="CancelActiveBonusModalRef"
    :lazy="false"
    size="md"
    header-bg-variant="arc-clr-soil-darker"
    header-class="profile-modal-header"
    header-border-variant="arc-clr-soil-darker"
    body-bg-variant="arc-clr-soil-dark"
    dialog-class="m-0 mx-md-auto my-md-5"
    body-class="p-4">

    <template slot="modal-header">
      <span class="text-capitalize text-arc-clr-white text-text-truncate font-weight-light">
        {{ $t('cancelActiveBonusModal.header') }}
      </span>
      <div @click="hideModal">
        <icon
          name="modal-close"
          size="24px"
          color="arc-clr-iron-light"/>
      </div>
    </template>

    <b-row
      v-if="activeWallet"
      no-gutter>
      <b-col class="text-center p-4">
        <h5 class="mb-0 mb-md-4 letter-spacing-2 font-weight-light">
          {{ $t('cancelActiveBonusModal.body', { submitButton: $t('cancelActiveBonusModal.submitButton'), amount: activeWallet.bonusBalance, currency: activeWallet.currency.code }) }}
        </h5>
      </b-col>
    </b-row>
    <b-row
      class="p-4"
      no-gutters>
      <b-col
        cols="12"
        md="6"
        order="2"
        order-md="1"
        offset-md="0"
        offset="3"
        class="text-center">
        <b-button
          :block="isMobile"
          class="text-arc-clr-soil-black w-50"
          variant="secondary"
          @click="hideModal">
          {{ $t('cancelActiveBonusModal.backButton') }}
        </b-button>
      </b-col>
      <b-col
        cols="12"
        md="6"
        order="1"
        order-md="2"
        offset="3"
        offset-md="0"
        class="text-center mb-4 mb-md-0">
        <b-button
          :block="isMobile"
          class="w-50"
          variant="user-profile-button"
          @click.prevent="cancelActiveBonus">
          {{ $t('cancelActiveBonusModal.submitButton') }}
        </b-button>
      </b-col>
    </b-row>
  </modal>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { BONUS_CANCELLATION_MUTATION } from '@/graphql'

export default {
  computed: {
    ...mapGetters({
      activeWallet: 'getUserActiveWallet'
    })
  },
  methods: {
    ...mapMutations('tabs', ['changeTabIndex']),
    hideModal () {
      this.$bvModal.hide('CancelActiveBonusModal')
    },
    cancelActiveBonus () {
      this
        .$apollo
        .mutate({
          mutation: BONUS_CANCELLATION_MUTATION
        }).then(({ data }) => {
          this.hideModal()
          this.changeTabIndex(0)
          this.changeTabIndex(1)
        }).catch(({ graphQLErrors }) => {
          console.log(this.bonusError)
          this.hideModal()
          this.bonusError = graphQLErrors[0].message
          console.log(this.bonusError)
        }).finally(() => {
          this.bonusLoading = false
        })
    }
  }
}
</script>
