<template>
  <div>
    <div class="px-2 py-4 text-center text-arc-clr-iron">
      Sign up now and get bonuses!
    </div>
    <b-jumbotron
      v-if="!isLoggedIn"
      bg-variant="dark"
      class="p-3 mb-0 mx-2 promotional-area">
      <p class="my-4 text-center">
        Promotional area with interesting things
      </p>
      <b-row>
        <b-col>
          <b-button
            block
            variant="arc-secondary">
            <b-row no-gutters>
              <b-col class="text-left">
                Discover more
              </b-col>
              <b-col class="d-inline-flex align-items-center justify-content-end">
                <icon name="arrow-right"/>
              </b-col>
            </b-row>
          </b-button>
        </b-col>
      </b-row>
    </b-jumbotron>
  </div>
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
