<template>
  <b-tabs
    v-model="tabIndex"
    nav-class="mb-2 bg-transparent"
    nav-wrapper-class="sorting-panel">
    <b-tab
      title-link-class="mx-4 pb-4 pt-2 bg-transparent">
      <template slot="title">
        <b-row no-gutters>
          <b-col class="d-flex justify-content-center align-items-center">
            <h5 class="m-0">
              LIVE Now
            </h5>
          </b-col>
        </b-row>
      </template>
      <slot name="live"/>
    </b-tab>
    <b-tab title-link-class="mx-4 pb-4 pt-2 bg-transparent">
      <template slot="title">
        <b-row no-gutters>
          <b-col class="d-flex justify-content-center align-items-center">
            <h5 class="m-0">
              Upcoming
            </h5>
          </b-col>
        </b-row>
      </template>
      <slot name="upcoming"/>
    </b-tab>
    <b-tab title-link-class="mx-4 pb-4 pt-2 bg-transparent">
      <template slot="title">
        <b-row no-gutters>
          <b-col class="d-flex justify-content-center align-items-center">
            <h5 class="m-0">
              Results
            </h5>
          </b-col>
        </b-row>
      </template>
      <slot name="results"/>
    </b-tab>
  </b-tabs>
</template>
<script>
export default {
  data () {
    return {
      tabIndex: 1
    }
  }
}
</script>
