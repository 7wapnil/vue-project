<template>
  <b-row no-gutters>
    <b-col
      class="promotional-block"
      @click="pushGame"/>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    computed: {
      ...mapGetters([
        'isLoggedIn'
      ])
    }
  },
  methods: {
    pushGame () {
      if (this.isLoggedin) {
        this.$router.push({ name: 'live-casino-game',
          params: { category: 'all-games',
            playItemSlug: 'double-ball-roulette-evo'
          }
        })
      }
      return this.$bvModal.show('AuthModal')
    }
  }
}
</script>

<style lang="scss"
       scoped>
    .promotional-block {
        height: 259px;
        border-radius: 4px;
        box-shadow: 0 0 10px 2px #101010;
        background-image:
                url(#{'~@/assets/images/promotional/arcanebet-live-casino-page-small-banner.png'});
    }
</style>
