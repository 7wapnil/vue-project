<template>
    <main-layout>
        <div class="row">
            <div class="col">
                <b-card class="mt-4" v-if="event">
                    <div slot="header">{{ event.description }}</div>
                    <b-card class="mt-2"
                            v-for="market in event.markets"
                            :key="market.id">
                        {{ market.name }}
                        <div class="row">
                            <div class="col mt-2"
                                 v-for="odd in market.odds"
                                 :key="odd.id">
                                <odd-button :odd="odd"></odd-button>
                            </div>
                        </div>
                    </b-card>
                </b-card>
            </div>
        </div>
    </main-layout>
</template>

<script>
  import OddButton from '@/components/custom/OddButton.vue'
  import ApiService, { LIST_QUERY } from '@/services/api/events'

  export default {
    components: {
      OddButton
    },
    data() {
      return {
        apiService: new ApiService(this),
        event: null
      }
    },
    created(){
      this
        .apiService
        .loadById(this.eventId)
        .catch(console.log)
    },
    computed: {
      eventId() {
        return this.$route.params.id
      }
    }
  }
</script>
