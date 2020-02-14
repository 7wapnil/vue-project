<template>
  <b-row
    no-gutters>
    <b-col
      cols="12"
      class="p-4">
      <slot name="deposit-amount"/>
      <slot name="deposit-methods"/>
      <slot name="deposit-bonus"/>
      <slot name="deposit-summary"/>
    </b-col>
  </b-row>
</template>
