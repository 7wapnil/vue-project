<template>
  <modal
    id="ConnectionModal"
    :lazy="false"
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    hide-header
    body-class="p-0"
    dialog-class="m-0">

    <b-row
      class="h-50"
      align-v="end"
      no-gutters>
      <b-col>
        <b-row no-gutters>
          <b-col class="text-center my-5">
            <b-img :src="require(`@/assets/images/common/no-connection.svg`)"/>
          </b-col>
        </b-row>
        <b-row
          no-gutters>
          <b-col class="text-center mb-5">
            <h4
              class="letter-spacing-2"
              v-html="$t('offlineModal.establishingConnection')"/>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row
      class="h-50"
      no-gutters>
      <b-col>
        <b-row no-gutters>
          <b-col
            cols="12"
            class="mt-5 mb-4">
            <loader/>
          </b-col>
          <b-col
            class="mb-5 text-center"
            cols="12">
            <b-button
              variant="arc-secondary"
              @click="checkStatus">
              {{ $t('offlineModal.recconect') }}
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </modal>
</template>

<script>
export default {
  methods: {
    checkStatus () {
      if (navigator.onLine) {
        this.$bvModal.hide('ConnectionModal')
      }
    }
  }
}
</script>
