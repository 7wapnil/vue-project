<template lang="pug">
    main-layout
        .row
            .col-xs-12.col-md-4.pull-right.order-md-12
                b-card.mt-4(
                    header="Betslip(2)"
                )
                    .row
                        button.m-2.btn.col.btn-primary
                            = "Single"
                        button.m-2.btn.col.btn-outline-secondary.disabled
                            = "Combo"
                        button.m-2.btn.col.btn-outline-secondary.disabled
                            = "System"              
                    .div.mt-4.font-weight-bold
                        h4
                            = "One Team vs. Another Team"  
                    .div
                        .div.my-4
                            = "Match Winner"
                            button.close(aria-label="Close")
                                span(aria-hidden="true")
                                    ="×"   
                        .row
                            button.m-2.btn.col.btn-primary
                                = "Option 1"
                                br
                                = "1.23"
                            button.m-2.btn.col.btn-outline-secondary
                                = "Draw"
                                br
                                = "0.3"
                            button.m-2.btn.col.btn-outline-secondary
                                = "Option 2"
                                br
                                = "7.8"
                        .div.mt-4.text-right
                            .row.my-2
                                .col.text-nowrap.text-right
                                    = "My Stake:"
                                    br
                                    button.btn.btn-sm.btn-outline-secondary.my-2             
                                        = "Place max bet"
                                .col-2
                                    = "0"
                            .row.my-2.text-nowrap
                                .col.text-nowrap.text-right
                                    = "Potential Return:"
                                .col-2
                                    = "NaN"                 
                    hr  
                    .div
                        .div.my-4
                            = "Map #1 Total number of Rounds"
                            button.close(aria-label="Close")
                                span(aria-hidden="true")
                                    ="×"   
                        .row
                            button.m-2.btn.col.btn-primary
                                = "Option 1"
                                br
                                = "1.23"
                            button.m-2.btn.col.btn-outline-secondary
                                = "Option 2"
                                br
                                = "7.8"
                        .div.mt-4.text-right
                            .row.my-2
                                .col.text-nowrap.text-right
                                    = "My Stake:"
                                    br
                                    button.btn.btn-sm.btn-outline-secondary.my-2            
                                        = "Place max bet"
                                .col-2
                                    = "0"
                            .row.my-2.text-nowrap
                                .col.text-nowrap.text-right
                                    = "Potential Return:"
                                .col-2
                                    = "NaN"                 
                    hr  
                    .div.mt-4.text-right
                            .row.my-2
                                .col.text-nowrap.text-right
                                    = "Total Odds:"
                                .col-2
                                    = "0"
                            .row.my-2
                                .col.text-nowrap.text-right
                                    = "Total stake:"
                                .col-2
                                    = "0"        
                            .row.my-2
                                .col.text-nowrap.text-right
                                    = "Total return:"
                                .col-2
                                    = "0"      
                    .div.mt-4
                        button.btn.btn-danger.btn-lg.btn-block     
                            = "Place bet"
                            
                            
                               
            .col-xs-12.col-md-8.order-md-1
                b-card.mt-4(
                    header="Events"
                )
                    b-card.mt-2(
                        v-for="event in events"
                        :key="event.id"
                    )
                        .row
                            .col
                                h5.card-title {{ event.description }}
        
                        event-item(:event="event")
</template>

<script>
  import ApiService from '@/services/api/events'
  import EventItem from './EventItem.vue'

  export default {
    components: {
      EventItem
    },
    data() {
      return {
        apiService: new ApiService(this),
        events: []
      }
    },
    created() {
      this.apiService.load()
    }
  }
</script>
