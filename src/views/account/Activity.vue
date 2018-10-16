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
          <b-table :items="tableItems"/>
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
      }],
      tableItems: [{
        Date: '20.07.2018',
        Details: 'Match Winner',
        Stake: 'Stake',
        Odds: 'Odds',
        Status: 'Status',
        Number: '1222321'
      },{
        Date: '21.07.2018',
        Details: 'Match Winner',
        Stake: 'Stake',
        Odds: 'Odds',
        Status: 'Status',
        Number: '1222322'
      },{
        Date: '22.07.2018',
        Details: 'Match Winner',
        Stake: 'Stake',
        Odds: 'Odds',
        Status: 'Status',
        Number: '1222323'
      },{
        Date: '23.07.2018',
        Details: 'Match Winner',
        Stake: 'Stake',
        Odds: 'Odds',
        Status: 'Status',
        Number: '1222324'
        },{
        Date: '24.07.2018',
        Details: 'Match Winner',
        Stake: 'Stake',
        Odds: 'Odds',
        Status: 'Status',
        Number: '1222325'
        }]
    }
  }
}
</script>
