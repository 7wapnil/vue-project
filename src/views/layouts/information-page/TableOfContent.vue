<template>
  <b-row
    v-if="items"
    no-gutters>
    <b-col class-name="p-4">
      <div
        v-for="(item, key) in items"
        :key="key">
        <b-link
          class="text-arc-clr-iron-light font-size-14"
          @click="scroll(item.id)">{{ item.name }}</b-link>
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
      let elemrntToScrollTo = document.getElementById(id)
      elemrntToScrollTo.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'end' })
    }
  }
}
</script>
