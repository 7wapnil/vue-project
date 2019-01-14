<template>
  <b-row class="align-items-center h-100 market-odds">
    <b-col
      class="mr-2 text-truncate market-odd">
      <b-row no-gutters>
        <b-col class="px-1 mb-1 text-center text-truncate">
          <small class="text-arc-clr-iron">
            <strong>FaZe Clan</strong>
          </small>
        </b-col>
      </b-row>
      <b-row no-gutters>
        <b-col>
          <b-button
            variant="arc-odd"
            class="text-arc-clr-gold position-relative"
            style="overflow: hidden">
            <h6 class="m-0">
              <strong>
                6.12
              </strong>
            </h6>
          </b-button>
        </b-col>
      </b-row>
    </b-col>
    <b-col class="flex-grow-0">
      <icon
        class="text-arc-clr-iron"
        name="sidemenu-game-icon"
        size="30px"/>
    </b-col>
    <template>
      <b-col
        v-if="withDraw"
        class="mr-2 text-truncate market-odd">
        <b-row no-gutters>
          <b-col class="px-1 mb-1 text-center text-truncate">
            <small class="text-arc-clr-iron" style="opacity: .4">
              <strong>Draw</strong>
            </small>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col>
            <b-button
              variant="arc-odd"
              class="text-arc-clr-gold position-relative"
              style="overflow: hidden">
              <h6 class="m-0">
                <strong>
                  6.1
                </strong>
              </h6>
            </b-button>
          </b-col>
        </b-row>
      </b-col>
      <b-col
        v-else
        class="flex-grow-0">
        <small>
          VS
        </small>
      </b-col>
    </template>
    <b-col class="flex-grow-0">
      <icon
        class="text-arc-clr-iron"
        name="sidemenu-game-icon"
        size="30px"/>
    </b-col>
    <b-col
      class="mr-2 text-truncate market-odd">
      <b-row no-gutters>
        <b-col class="px-1 mb-1 text-center text-truncate">
          <small class="text-arc-clr-iron">
            <strong>mousesports</strong>
          </small>
        </b-col>
      </b-row>
      <b-row no-gutters>
        <b-col>
          <b-button
            variant="arc-odd"
            class="text-arc-clr-gold position-relative"
            style="overflow: hidden">
            <h6 class="m-0">
              <strong>
                3.06
              </strong>
            </h6>
          </b-button>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
export default {
  props: {
    withDraw: {
      type: Boolean,
      default: false
    }
  }
}
</script>
