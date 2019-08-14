<template>
  <b-row
    :class="isMobile ? 'h-auto mt-4' : 'h-100'"
    no-gutters
    align-v="end">
    <b-col>
      <slot/>
    </b-col>
  </b-row>
</template>
