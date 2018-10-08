<template>
  <main-layout>
    <div class="row">
      <div class="col-xs-12 col-lg-3">
        <b-card
          class="mt-4"
          header="Menu">
          <b-nav
            vertical
            pills>
            <li
              v-for="item in items"
              :key="item.name"
              class="nav-item">
              <router-link
                :to="{name: item.name}"
                exact
                class="nav-link">
                {{ item.label }}
              </router-link>
            </li>
          </b-nav>
        </b-card>
      </div>
      <div class="col-xs-12 col-lg-9">
        <b-card class="mt-4 mb-4">
          <router-view/>
        </b-card>
      </div>
    </div>
  </main-layout>
</template>

<script>
import items from '@/routes/account.js'

export default {
  data () {
    return {
      items
    }
  }
}
</script>
