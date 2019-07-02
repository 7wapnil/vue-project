<template #modal-header>
  <div>
    <span class="text-capitalize text-arc-clr-white text-text-truncate font-weight-light">
      {{ user.username + '\'s profile' }}
    </span>
    <div @click="hideModal">
      <icon
        name="modal-close"
        size="24px"
        color="arc-clr-iron-light"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    hideModal () {
      this.$bvModal.hide('AccountModal')
    }
  }
}
</script>
