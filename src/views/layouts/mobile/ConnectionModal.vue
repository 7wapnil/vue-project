<template>
  <modal
    id="ConnectionModal"
    :lazy="false"
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    hide-header
    body-class="py-5 px-0">
    <b-row no-gutters>
      <b-col class="text-center my-5">
        <b-img :src="require(`@/assets/images/common/no-connection.svg`)"/>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col class="text-center">
        <h4
          class="letter-spacing-2"
          v-html="$t('offlineModal.establishingConnection')"/>
      </b-col>
    </b-row>

    <div class="position-absolute bottom-0 mb-5 w-100">
      <b-row no-gutters>
        <b-col
          cols="12"
          class="mb-5">
          <loader/>
        </b-col>
        <b-col
          class="mb-5 text-center"
          cols="12">
          <b-button variant="arc-secondary">
            {{ $t('offlineModal.recconect') }}
          </b-button>
        </b-col>
      </b-row>
    </div>

  </modal>
</template>
