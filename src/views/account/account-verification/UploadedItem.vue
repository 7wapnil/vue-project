<template>
  <b-row
    v-if="!!item.file"
    no-gutters>
    <b-col>
      <b-card
        no-body
        class="bg-arc-clr-soil-dark mt-3 border-3">
        <b-row
          class="p-4"
          no-gutters>
          <b-col class="text-truncate">
            <span class="font-weight-bold text-arc-clr-white font-size-14 letter-spacing-2">
              {{ item.file.name }}
            </span>
            <span
              v-if="!item.id && !item.error"
              class="font-size-14 text-arc-clr-iron letter-spacing-2 d-flex align-items-center mt-1">
              <arc-circle
                :bg-color="'arc-clr-iron'"
                :size="18"
                class="mr-2"/>
              {{ $t('account.accountVerification.information.waiting') }}
            </span>
            <span
              v-else
              class="d-flex align-items-center mt-1">
              <arc-circle
                v-if="!item.error"
                :bg-color="statusColors[item.status]"
                :size="18"
                class="mr-2"/>
              <span class="font-size-14 text-arc-clr-iron letter-spacing-2 text-capitalize d-flex align-items-center mt-1">
                {{ item.status }}
              </span>
            </span>
          </b-col>
          <b-col
            cols="auto"
            class="d-flex align-items-center ml-4">
            <b-link
              v-if="item.status !== 'confirmed'"
              class="text-arc-clr-iron-light font-size-14 letter-spacing-1"
              @click="$emit('item-removed', item)">
              {{ $t('account.accountVerification.cta.remove') }}
            </b-link>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    statusColors () {
      return {
        confirmed: 'arc-clr-sport-glow',
        rejected: 'wp-clr-notif-red',
        pending: 'arc-clr-iron'
      }
    }
  }
}
</script>
