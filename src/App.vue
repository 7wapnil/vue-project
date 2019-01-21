<template>
  <router-view/>
</template>

<script>
import { APP_STATE_QUERY, APP_STATE_SUBSCRIPTION } from '@/graphql'
import { UPDATE_STATE } from '@/stores/app'
import { mapMutations } from 'vuex'

export default {
  apollo: {
    app () {
      return {
        query: APP_STATE_QUERY,
        result ({ data: { app } }) {
          this.updateAppState(app)
        },
        subscribeToMore: {
          document: APP_STATE_SUBSCRIPTION,
          result ({ app }) {
            this.updateAppState(app)
          }
        }
      }
    }
  },
  methods: {
    ...mapMutations('app', {
      updateAppState: UPDATE_STATE
    })
  }
}
</script>
