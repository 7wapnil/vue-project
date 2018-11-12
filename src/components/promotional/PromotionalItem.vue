<template>
  <b-jumbotron
    v-if="!isLoggedIn"
    bg-variant="dark"
    class="p-4 m-2 mb-4">
    <p class="p-4 text-center">Sign up now and <br> get bonuses!</p>

    <p class="my-4">
      Promotional area with interesting things
    </p>

    <b-row>
      <b-col class="text-center">
        <b-button>Discover more</b-button>
      </b-col>
    </b-row>

  </b-jumbotron>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('betslip', [
      'getBets'
    ]),
    ...mapGetters([
      'isLoggedIn'
    ])
  }
}
</script>
