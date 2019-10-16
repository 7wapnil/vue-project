<template>
  <modal
    id="PageLeaveModal"
    :dialog-class="[ isMobile ? 'bg-arc-clr-soil-darker h-100 m-0' : '']"
    no-close-on-esc
    no-close-on-backdrop
    hide-header-close
    size="lg"
    header-bg-variant="arc-clr-soil-darker"
    header-class="profile-modal-header"
    header-border-variant="arc-clr-soil-darker"
    content-class="bg-arc-clr-soil-light"
    body-class="p-0 h-100">

    <template #modal-header>
      <b-row
        class="h-100 w-100"
        no-gutters>
        <b-col class="text-arc-clr-white letter-spacing-2 text-truncate font-weight-light pr-2">
          {{ $t('pageLeaveModal.header') }}
        </b-col>
      </b-row>
    </template>

    <b-row no-gutters>
      <b-col class="p-5">
        {{ $t('pageLeaveModal.description') }}
      </b-col>
    </b-row>
  </modal>
</template>
