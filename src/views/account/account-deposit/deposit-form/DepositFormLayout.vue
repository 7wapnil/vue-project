<template>
  <b-row
    no-gutters>
    <b-col
      cols="12"
      md="6"
      class="m-0 mr-md-4">
      <slot name="depositform"/>
    </b-col>
    <slot name="summary"/>
  </b-row>
</template>
