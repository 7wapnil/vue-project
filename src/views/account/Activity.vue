<template>
  <b-container>
    <b-row>
      <b-col>
        <h1 class="mb-4 ml-4">
          My activity
        </h1>
      </b-col>
    </b-row>
    <b-tabs card>
      <b-tab
        v-for="tab in tabs"
        :key="tab.id"
        :title="tab.title">
        Not Implemented
      </b-tab>
    </b-tabs>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      tabs: [{
        id: 1,
        title: 'Esport',
      }, {
        id: 2,
        title: 'Sport'
      }, {
        id: 3,
        title: 'Casino'
      }]
    }
  }
}
</script>
