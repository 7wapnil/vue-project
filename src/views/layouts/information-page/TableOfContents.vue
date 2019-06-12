<template>
  <b-row no-gutters>
    <b-col class-name="p-4">
      <div
        v-for="(item, key) in items"
        :key="key">
        <b-link @click="scroll(item.id)">{{ item.name }}</b-link>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    scroll (id) {
      let ololo = document.getElementById(id)
      ololo.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'end' })
    }
  }
}
</script>
