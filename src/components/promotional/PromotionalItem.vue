<template>
  <div v-if="!isLoggedIn">
    <div class="px-2 py-4 text-center text-arc-clr-iron">
      <h6 class="m-0">Sign up now and get bonuses!</h6>
    </div>
    <b-jumbotron
      bg-variant="dark"
      class="p-3 mb-0 mx-2 promotional-area">
      <h6 class="my-4 text-center">
        Promotional area <br> with interesting things
      </h6>
      <b-row>
        <b-col>
          <b-button
            block
            variant="arc-secondary">
            <b-row no-gutters>
              <b-col class="text-left">
                <h6 class="m-0">
                  <strong>
                    Discover more
                  </strong>
                </h6>
              </b-col>
              <b-col class="d-inline-flex align-items-center justify-content-end">
                <icon name="arrow-right"
                      size="10px"/>
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
