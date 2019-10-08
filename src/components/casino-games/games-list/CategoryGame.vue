<template>
  <div class="category-game">
    <b-img
      :src="gameIcon"
      :alt="gameTitle"
      center
      height="156"/>
  </div>
</template>

<script>
export default {
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  computed: {
    gameIcon () {
      return this.game.icon || require('@/assets/images/logo/arcanebet-logo.png')
    },
    gameTitle () {
      return this.game.title || 'Unknown game'
    }
  }
}
</script>
