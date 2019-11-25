<template>
  <b-container
    class="p-0"
    fluid>
    <b-row no-gutters>
      <b-col>
        <router-view name="gamelist">
          <router-view/>
        </router-view>
      </b-col>
    </b-row>
  </b-container>
</template>
