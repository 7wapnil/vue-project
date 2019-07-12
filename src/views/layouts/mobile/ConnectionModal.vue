<template>
  <modal
    id="ConnectionModal"
    ref="ConnectionModalRef"
    :lazy="false"
    size="md">
    <b-row no-gutters>
      <b-col class="p-5">
        <h1 class="font-weight-light text-arc-clr-iron px-5 pb-5">Something went wrong!</h1>
        <p class="font-size-18 letter-spacing-2 text-arc-clr-iron px-5 pb-5">
          Please check your internet connection.
        </p>
      </b-col>
    </b-row>
  </modal>
</template>
