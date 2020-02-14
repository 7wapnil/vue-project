<template>
  <b-row
    no-gutters>
    <b-col class="p-md-0 py-2 px-4">
      <div class="text-arc-clr-iron font-size-14 p-2 warning-message">
        <p>
          {{ warningMessage }}
        </p>
        <b-row align-h="end">
          <b-col cols="auto">
            <b-button-group>
              <b-button
                variant="arc-secondary"
                @click="cancelCancellation">{{ $t('cancelActiveBonus.backButton') }}</b-button>
              <b-button
                class="ml-2"
                variant="user-profile-button"
                @click="cancelActiveBonus">{{ $t('cancelActiveBonus.submitButton') }}</b-button>
            </b-button-group>
          </b-col>
        </b-row>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { BONUS_CANCELLATION_MUTATION } from '@/graphql'

export default {
  props: {
    amount: {
      type: String,
      required: true
    }
  },
  computed: {
    warningMessage () {
      return this.$i18n.t('cancelActiveBonus.warning', { amount: this.amount })
    }
  },
  methods: {
    cancelCancellation () {
      this.$emit('hide-confirmation')
    },
    cancelActiveBonus () {
      this
        .$apollo
        .mutate({
          mutation: BONUS_CANCELLATION_MUTATION
        }).then(({ data }) => {
          const message = this.$i18n.t('cancelActiveBonus.successfulCancellation')
          this.emitData('success', message)
        }).catch(({ graphQLErrors }) => {
          this.emitData('error', graphQLErrors[0].message)
        }).finally(() => {
          this.cancelCancellation()
        })
    },
    emitData (status, message) {
      this.$emit('bonus-cancellation', status, message)
    }
  }
}
</script>

<style lang="scss" scoped>
  .warning-message {
    border: 2px solid #FFC67E;
    border-radius: 2px !important;
  }
</style>
