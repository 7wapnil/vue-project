<template>
  <div>
    <nav-bar/>
    <div class="container">
      <slot/>
    </div>
  </div>
</template>

<style>
    li.socket > div {
        width: 8px;
        height: 8px;
        margin: auto;
        border-radius: 50px;
        background: red;
    }

    li.socket > div.online {
        background: green;
    }
</style>

<script>
import NavBar from './NavBar'

export default {
  components: {
    NavBar
  }
}
</script>
