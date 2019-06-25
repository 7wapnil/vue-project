<template>
  <b-container
    fluid
    class="mobile-content">
    <b-row no-gutters>
      <b-col class="bg-arc-clr-soil-light min-vh-100 min-vw-100">
            <router-view :key="$route.fullPath"/>
      </b-col>
    </b-row>
  </b-container>
</template>
