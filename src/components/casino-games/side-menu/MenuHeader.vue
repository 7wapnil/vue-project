<template>
  <b-card
    :img-src="background"
    img-height="300"
    overlay
    body-class="m-2 game-of-the-day">
    <div class="w-100 mb-2">
      <b-img
        :src="gameIcon"
        :alt="gameTitle"
        center
        height="128"
        class="w-100"/>
    </div>
    <p class="game-title-label font-weight-bold text-uppercase">Game of the Day</p>
    <p class="game-title font-weight-bold mb-2">{{ gameTitle }}</p>
    <b-link
      class="btn text-uppercase btn-game-of-the-day"
      href="#">Play it now</b-link>
  </b-card>
</template>

<script>
import { findBackgroundSource } from '@/helpers/background-finder'

export default {
  computed: {
    gameIcon () {
      return this.game.icon || require('@/assets/images/logo/arcanebet-logo.png')
    },
    gameTitle () {
      return this.game.title || 'Unknown game'
    },
    background () {
      const name = 'Basketball'
      const route = 'sports'

      return findBackgroundSource({ name, route })
    }
  }
}
</script>
