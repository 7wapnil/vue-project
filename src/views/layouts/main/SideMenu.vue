<template>
  <div>
    <titles-list :query-options="queryOptions">
      <ul
        slot-scope="{ titles }"
        class="nav flex-column">
        <li
          v-for="title in titles"
          :key="title.id"
          class="nav-item">
          <router-link
            :to="{ name: 'esports-title', params: { title: title.id } }"
            :exact="true"
            class="nav-link">
            {{ title.name }}
          </router-link>
        </li>
      </ul>
    </titles-list>
  </div>
</template>

<script>
import TitlesList from '@/components/TitlesList'

export default {
  components: {
    TitlesList
  },
  computed: {
    queryOptions () {
      return { kind: 'esports' }
    },
    titleId () {
      return this.$route.params.title
    }
  }
}
</script>
